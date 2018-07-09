(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('productManageDefaultController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            vm.importExport = 0;//0-进口 1-出口
            vm.currentId = 0;
            //产品类型
            vm.companyTypeList = [
                {
                    id: 0,
                    name: '海外电商'
                },
                {
                    id: 1,
                    name: '跨境电商'
                },
                {
                    id: 2,
                    name: '转运公司'
                },
                {
                    id: 3,
                    name: '清关公司'
                },
                {
                    id: 4,
                    name: '物流公司'
                },
                {
                    id: 5,
                    name: '个人代购/微商'
                },
                {
                    id: 6,
                    name: '供应链服务'
                },
                {
                    id: 7,
                    name: '保税区'
                },
                {
                    id: 8,
                    name: 'ERP、物流系统服务平台'
                },
                {
                    id: 9,
                    name: '三方支付'
                },
                {
                    id: 10,
                    name: '其他'
                }
            ];
            //新增产品数据
            vm.addProductObj = {
                template: null,
                productId: null,
                type: null
            };
            //查询条件
            vm.query = {
                pageNum: 1,
                pageSize: 10
            };
            vm.getId = function (id) {
                vm.currentId = id;
                vm.getPagedDataAsync();
            };
            //获取列表
            vm.getPagedDataAsync = function () {
                $api.get('/get_template/' + vm.currentId + '/' + vm.importExport + '?pageSize=' + vm.query.pageSize + '&pageNum=' + vm.query.pageNum, function (result) {
                    if (result.code == 0) {
                        vm.list = result.data.list;
                        for (var i = 0; i < vm.list.length; i++) {
                            if (vm.list[i].productType == 0) {
                                vm.list[i].productTypeText = '费率';
                            } else if (vm.list[i].productType == 1) {
                                vm.list[i].productTypeText = '定价';
                            } else if (vm.list[i].productType == 2) {
                                vm.list[i].productTypeText = '份数';
                            } else if (vm.list[i].productType == 3) {
                                vm.list[i].productTypeText = '组合';
                            }
                        }
                        vm.query.pages = result.data.pages;
                    } else {
                        vm.list = [];
                    }
                });
            };

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //进出口切换
            vm.changeIE = function (type) {
                vm.importExport = type;
                vm.getPagedDataAsync(0);
            };

            //删除
            vm.deleteProduct = function (id) {
                layer.confirm('确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    layer.closeAll();
                    $api.post('/product/del_product/' + id, function (result) {
                        if (result.code == 0) {
                            layer.msg(result.msg, {
                                time: 1000
                            });
                            $timeout(function () {
                                vm.getPagedDataAsync();
                            }, 1200)
                        }
                    });
                })
            };
            //新增产品
            vm.toAddProduct = function () {
                vm.addProductObj.type = vm.importExport;
                vm.addProductObj.template = vm.currentId;
                $api.post('/product_template', angular.toJson(vm.addProductObj), function (result) {
                    if (result.code == 0) {
                        vm.addIdPop = false;
                        vm.addProductObj.productId = null;
                        layer.msg(result.msg, {time: 1000});
                        $timeout(function () {
                            vm.getPagedDataAsync();
                        }, 1200)
                    } else {
                        return layer.msg(result.msg, {time: 1000});
                    }
                });
            };
            //移除
            vm.remove = function (id) {
                vm.addProductObj.productId = id;
                console.log(vm.addProductObj);
                $api.post('/product/updateStatusByProductIdAndTemplateId', angular.toJson(vm.addProductObj), function (result) {
                    if (result.code == 0) {
                        vm.addProductObj.productId = '';
                        layer.msg(result.msg, {time: 1000});
                        $timeout(function () {
                            vm.getPagedDataAsync();
                        }, 1200);
                    } else {
                        layer.msg(result.msg, {time: 1000});
                    }
                });

            };
            //删除
            vm.deleteProduct = function (id) {
                layer.confirm('确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    layer.closeAll();
                    $api.post('/product/del_product/' + id, function (result) {
                        if (result.code == 0) {
                            layer.msg(result.msg, {
                                time: 1000
                            });
                            $timeout(function () {
                                vm.getPagedDataAsync();
                            }, 1200);
                        }
                    });
                })
            };
            //excel上传
            vm.readExcel = function (obj) {
                var files = obj;
                var fileReader = new FileReader();
                fileReader.onload = function (ev) {
                    try {
                        var data = ev.target.result,
                            workbook = XLSX.read(data, {
                                type: 'binary'
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        console.log('文件类型不正确');
                        return;
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
                    $.each(persons, function (i, n) {
                        // console.log(n.name);
                    });
                    for (var key in persons[0]) {
                        console.log(key)
                    }
                    // console.log(persons[0]);
                };
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
                // body...
            };


            // $upload.upload({
            //     url: $defaultConfig.app_uri + 'service/addByOrgServiceRecord_1', //上传的url
            //     data: {uploadEditObj: angular.toJson(vm.uploadEditObj)},
            //     file: vm.file
            // }).progress(function (evt) {//上传进度
            // }).success(function (data, status, headers, config) {
            //     if (data.code == '200') {
            //         vm.uploadEditObj.dateTime = new Date().format('yyyy-MM-dd');
            //         vm.showUpload = false;
            //         vm.uploadEditObj.dateTime = '';
            //         vm.uploadEditObj.content = '';
            //         vm.uploadEditObj.rcdFiles = '';
            //         vm.uploadEditObj.contenText = '';
            //         vm.inputText = '';
            //         $layer.tip('记录/上传提交成功', 1000);
            //         $timeout(function () {
            //             vm.getPagedDataAsync();
            //         }, 1000)
            //     }
            // }).error(function (data, status, headers, config) {
            //     $layer.tip('服务器异常,请重新尝试');
            // });

        }])
}());