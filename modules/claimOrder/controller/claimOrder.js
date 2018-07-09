(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('claimOrderController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            //查询条件
            vm.query = {
                pageNum: 1,
                pageSize: 10,
                source: $cookies.get('source'),
                status: '',
                ticketNo: '',
                startTime: '',
                endTime: ''
            };
            vm.exlModel = $defaultConfig.local_url + '/upload/apply/理赔模板.zip';
            vm.upload = {
                dataMap: [],
                filePath: '',
                backFile: ''
            };
            // 状态列表
            vm.statusList = [
                {
                    status: 0,
                    name: '待审核'
                },
                {
                    status: 1,
                    name: '待打款'
                },
                {
                    status: 3,
                    name: '已打款'
                }
            ];
            //获取列表
            vm.getPagedDataAsync = function () {
                $api.post('/apply/applyList', angular.toJson(vm.query), function (result) {
                    if (result.code === 0) {
                        vm.list = result.data.list;
                        vm.query.pages = result.data.pages;

                        for(var i in vm.list) {
                            if (vm.list[i].status == 2 || vm.list[i].status == 5) {
                                vm.list[i].statusText = "待初审";
                            } else if (vm.list[i].status == 6) {
                                vm.list[i].statusText = "审核中";
                            } else if (vm.list[i].status == 11) {
                                vm.list[i].statusText = "待付款";
                            } else if (vm.list[i].status == 3) {
                                vm.list[i].statusText = " 已付款";
                            }
                            else if (vm.list[i].status == 4) {
                                vm.list[i].statusText = "驳回";
                            }
                        }

                    }

                })
            };
            //日期初始化
            var toDay = new Date();
            //开始时间
            initDate('#startDate', 'yyyy-mm-dd', 2, function (date) {
                $('#endDate').datetimepicker('setStartDate', date);
            });
            //结束时间
            initDate('#endDate', 'yyyy-mm-dd', 2, function (date) {
                $('#startDate').datetimepicker('setEndDate', date);
            });

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//

            //查询
            vm.search = function () {
                vm.query.pageNum = 1;
                vm.getPagedDataAsync();
            };
            //附件上传-选择excel
            vm.readExcel = function (obj) {
                var files = obj;
                vm.file = files[0];
                vm.fileName = files[0].name;
                var fileReader = new FileReader();
                fileReader.onload = function (ev) {
                    try {
                        var data = ev.target.result,
                            workbook = XLSX.read(data, {
                                type: 'binary'
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        return layer.msg('文件类型不正确', {time: 1000});
                    }
                    // 表格的表格范围，可用于判断表头是否数量是否正确
                    var fromTo = '';
                    // 遍历每张表读取
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            break; // 如果只取第一张表，就取消注释这行
                        }
                    }
                    var str = "";
                    if (persons.length > 200) {
                        layer.msg('数据不能超过200条', {time: 1000});
                        vm.canUpload = false;
                    } else {
                        vm.upload.dataMap = persons;
                        for (var x in vm.upload.dataMap) {
                            if (vm.upload.dataMap[x]['豆沙包单号']) {
                                vm.upload.dataMap[x].ticketNo = vm.upload.dataMap[x]['豆沙包单号']
                            }
                            if (vm.upload.dataMap[x]['商品品类']) {
                                vm.upload.dataMap[x].goodsKind = vm.upload.dataMap[x]['商品品类']
                            }
                            if (vm.upload.dataMap[x]['产品类型ID']) {
                                vm.upload.dataMap[x].productId = vm.upload.dataMap[x]['产品类型ID']
                            }
                            if (vm.upload.dataMap[x]['理赔金额/元']) {
                                vm.upload.dataMap[x].applyAmount = vm.upload.dataMap[x]['理赔金额/元']
                            }
                            if (vm.upload.dataMap[x]['理赔金额明细']) {
                                vm.upload.dataMap[x].applyAmountDetail = vm.upload.dataMap[x]['理赔金额明细']
                            }
                            if (vm.upload.dataMap[x]['身份证号']) {
                                vm.upload.dataMap[x].idCard = vm.upload.dataMap[x]['身份证号']
                            }
                        }
                        $api.post('/apply/uploadApplyByExcel', angular.toJson(vm.upload), function (result) {
                            if (result.code == 0 && result.data.data == '') {
                                layer.msg(result.msg, {time: 1000});
                                vm.canUpload = true;
                            }
                            if (result.code == 0 && result.data.data != '') {
                                layer.alert(result.data.data, {
                                    area: ['380px', '280px']
                                });
                                vm.file = '';
                                vm.fileName = '';
                            }
                            if (result.code == 1) {
                                layer.msg(result.msg, {time: 1000});
                                vm.file = '';
                                vm.fileName = '';
                            }
                        });
                    }
                };
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
                // body...
            };
            vm.readZip = function (obj) {
                var files = obj;
                vm.fileZip = files[0];
                vm.zipName = files[0].name;
                if (files) {
                    $upload.upload({
                        url: $defaultConfig.app_uri + '/apply/upload',
                        headers: {
                            token: $cookies.get('token')
                        },
                        file: vm.fileZip
                    }).progress(function (evt) {//上传进度
                    }).success(function (data, status, headers, config) {
                        if (data.code == 0) {
                            $layer.close();
                            layer.msg(data.msg, {time: 1000});
                            vm.upload.backFile = data.data;
                            vm.canZip = true;
                        } else {
                            layer.msg(data.msg, {time: 1000});
                        }
                    }).error(function (data, status, headers, config) {
                    });
                }

            };
            //附件上传-提交
            vm.uploadAll = function () {
                vm.upload.filePath = vm.upload.backFile;
                $api.post('/apply/uploadApplyByExcel', angular.toJson(vm.upload), function (result) {
                    if (result.code == 0) {
                        layer.msg(result.msg, {time: 1000});
                        vm.popAnnex = false;
                    } else {
                        layer.msg(result.msg, {time: 1000});
                    }
                });
            };

        }])
}());