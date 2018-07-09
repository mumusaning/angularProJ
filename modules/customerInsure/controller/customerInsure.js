(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('customerInsureController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            //查询条件
            vm.query = {
                ticketNo: null,
                expressNo: null,
                clientName: '',
                telephone: '',
                status: null,
                applyStartTime: '',
                applyEndTime: '',
                source: $cookies.get('source'),
                pageNum: 1,
                pageSize: 10
            };
            //excel认证数据
            vm.excelData = {
                productIdList: [],
                source: ''
            };
            //获取列表
            //0-未生效 1-已生效 2-作废
            vm.getPagedDataAsync = function () {
                $api.post('/order/ordersByCondition', angular.toJson(vm.query), function (result) {
                    if (result.code === 0) {
                        vm.list = result.data.list;

                        for (var i = 0; i < vm.list.length; i++) {
                            vm.list[i].discountAmount = vm.list[i].discountAmount / 100;
                            if (vm.list[i].status == 0) {
                                vm.list[i].statusText = '未生效'
                            } else if (vm.list[i].status == 1) {
                                vm.list[i].statusText = '已生效'
                            } else if (vm.list[i].status == 2) {
                                vm.list[i].statusText = '作废'
                            }
                        }
                        vm.query.pages = result.data.pages;
                    }
                });
            };
            //日期初始化
            var toDay = new Date();
            //开始时间
            initDate('#applyStartTime', 'yyyy-mm-dd', 2, function (date) {
                $('#applyEndTime').datetimepicker('setStartDate', date);
            });
            //结束时间
            initDate('#applyEndTime', 'yyyy-mm-dd', 2, function (date) {
                $('#applyStartTime').datetimepicker('setEndDate', date);
            });
//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //查询
            vm.search = function () {
                vm.query.pageNum = 1;
                vm.getPagedDataAsync();
            };
            //重置
            vm.clear = function () {
                vm.query = {
                    ticketNo: null,
                    channelOrderNo: null,
                    clientName: '',
                    telephone: '',
                    status: null,
                    applyStartTime: '',
                    applyEndTime: '',
                    source: $cookies.get('source'),
                };
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
                            // console.log(fromTo);
                            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            break; // 如果只取第一张表，就取消注释这行
                        }
                    }
                    var str = "";
                    vm.excelData.source = persons[0]['商户标识'];
                    for (var key in persons[0]) {
                        if (key.indexOf('_') != -1) {
                            var id = key.match(/(\S*)_/)[1];
                            var name = key.match(/_(\S*)/)[1];
                            vm.excelData.productIdList.push(id);
                        }
                    }
                    if ($cookies.get('source') == vm.excelData.source) {
                        $api.post('/order/productIdListBySource', angular.toJson(vm.excelData), function (result) {
                            if (result.code === 0) {
                                vm.canUpload = true;
                                vm.excelData.productIdList = [];
                                return layer.msg(result.msg, {time: 1000});
                            } else {
                                vm.canUpload = false;
                                vm.file = '';
                                vm.excelData.productIdList = [];
                                return layer.msg(result.msg, {time: 1000});
                            }
                        })
                    } else {
                        layer.msg('商户标识不一致,请重新上传', {time: 1000});
                        $scope.$apply(function () {
                            vm.fileName = '';
                            vm.file = '';
                            vm.excelData.productIdList = [];
                        });
                    }

                };
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
                // body...
            };
            //附件上传-提交
            vm.uploadExcel = function () {
                $layer.loading();
                $upload.upload({
                    url: $defaultConfig.app_uri + '/order/uploadOrderExcel',
                    headers: {
                        token: $cookies.get('token')
                    },
                    file: vm.file
                }).progress(function (evt) {//上传进度
                }).success(function (data, status, headers, config) {
                    if (data.code == 0) {
                        $layer.close();
                        vm.fileName = '';
                        vm.file = '';
                        vm.excelData.productIdList = [];
                        if (data.data.message == 'error') {
                            vm.canUpload = false;
                            layer.alert(data.data.sb, {
                                area: ['380px', '280px']
                            });
                        } else {
                            vm.popAnnex = false;
                            vm.canUpload = false;
                            layer.msg(data.msg, {time: 1000});
                            $timeout(function () {
                                vm.getPagedDataAsync();
                            }, 1200);
                        }
                    } else {
                        vm.fileName = '';
                        vm.file = '';
                        vm.excelData.productIdList = [];
                        layer.msg(data.msg, {time: 1000});
                    }
                }).error(function (data, status, headers, config) {
                });
            };
            //导出Excel
            vm.downloadExcel = function () {
                if (vm.list && vm.list.length > 0) {
                    $(".tableInfo").table2excel({
                        exclude: ".noExl",
                        name: "Excel Document Name",
                        filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, "") + '.xls',
                        fileext: ".xls",
                        exclude_img: true,
                        exclude_links: true,
                        exclude_inputs: true
                    });
                } else {
                    layer.msg('请先查询出结果', {time: 1000});
                }
            };
            // 下载Excel模板
            vm.downloadExcelList = function () {
                $api.get('/company/getCompanyIdListAndApplyCompensation/' + $cookies.get('source'), function (result) {
                    if (result.code === 0) {
                        vm.downloadList = result.data;
                        if (vm.downloadList.length > 0) {
                            vm.downloadList.unshift('商户标识');
                            $timeout(function () {
                                $(".tableInfo02").table2excel({
                                    exclude: ".noExl",
                                    name: "Excel Document Name",
                                    filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, "") + '.xls',
                                    fileext: ".xls",
                                    exclude_img: true,
                                    exclude_links: true,
                                    exclude_inputs: true
                                });
                            }, 1200);
                        }
                    } else {
                        layer.msg(result.msg, {time: 1500})
                    }
                });
            };
        }])
}());