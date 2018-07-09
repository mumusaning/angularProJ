(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('businessClaimAddController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            vm.applyData = {
                source: '',//商户标识
                companyName: '',//商户名称
                channelOrderNo: '',//渠道订单号
                ticketNo: '',//豆沙包订单号
                productName: '',//产品名称
                productId: '',//申请的产品Id
                combinationId: '',//组合Id
                applyAmount: '',//理赔金额
                remark: '',//备注
                documentList: []//单证列表
            };

            vm.testImg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
            vm.fontRules = {};

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//

            //获取商户名称
            vm.getSourceNmae = function () {
                if (vm.applyData.source) {
                    $api.post('/apply/findCompanyBySource', angular.toJson({source: vm.applyData.source}), function (result) {
                        if (result.code === 0) {
                            vm.applyData.companyName = result.data.companyName;
                        } else {
                            layer.msg(result.msg);
                        }
                    });
                    vm.getOrder();
                }
            };
            //获取订单
            vm.getOrder = function () {
                if (vm.applyData.channelOrderNo || vm.applyData.ticketNo && vm.applyData.source) {
                    $api.post('/apply/orderByChannelOrderNoOrTicketNo', angular.toJson(vm.applyData), function (result) {
                        if (result.code == 0) {
                            vm.productIdList = result.data.productList;
                            if (result.data.ticketNo != '') {
                                vm.applyData.ticketNo = result.data.ticketNo;
                            }
                        }
                    })
                }
            };
            //理赔产品监听
            $scope.$watch('vm.applyData.productId', function (newVal, oldVal) {
                if (newVal) {
                    for (var i = 0; i < vm.productIdList.length; i++) {
                        if (newVal == vm.productIdList[i].id) {
                            vm.applyData.productName = vm.productIdList[i].productName;
                            if (vm.productIdList[i].productType == 3) {
                                vm.isGroup = true;
                                $api.post('/apply/combinationsByProductId', angular.toJson({productId: vm.productIdList[i].id}), function (result) {
                                    if (result.code == 0) {
                                        vm.compositeProductList = result.data;
                                    }
                                })
                            } else {
                                vm.isGroup = false;
                                console.log(vm.productIdList[i]);
                                $api.post('/apply/compensationByProductId', angular.toJson({productId: vm.productIdList[i].id}), function (result) {
                                    if (result.code == 0) {
                                        if (result.code == 0) {
                                            vm.img = result.data.img;
                                            vm.font = result.data.font;
                                        } else {
                                            layer.msg(result.msg, {time: 1000});
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            });
            //组合产品监听
            $scope.$watch('vm.applyData.combinationId', function (newVal, oldVal) {
                if (newVal) {
                    for (var i = 0; i < vm.compositeProductList.length; i++) {
                        if (newVal == vm.compositeProductList[i].id) {
                            $api.post('/apply/compensationByCombinationId', angular.toJson({combinationId: vm.compositeProductList[i].id}), function (result) {
                                if (result.code == 0) {
                                    vm.img = result.data.img;
                                    vm.font = result.data.font;
                                } else {
                                    layer.msg(result.msg, {time: 1000});
                                    vm.img = [];
                                    vm.font = [];
                                }
                            })
                        }
                    }
                }
            });
            //上传
            vm.readExcel = function (file, obj) {
                var files = file[0];
                // obj.url = files[0].name;
                if (files) {
                    $upload.upload({
                        url: $defaultConfig.app_uri + '/apply/upload',
                        headers: {
                            token: $cookies.get('token')
                        },
                        file: files
                    }).progress(function (evt) {//上传进度
                    }).success(function (data, status, headers, config) {
                        if (data.code == 0) {
                            $layer.close();
                            if (vm.testImg.test(data.data)) {
                                obj.isImg = true;
                                obj.isFont = false;
                            } else {
                                obj.isFont = true;
                                obj.isImg = false;
                            }
                            obj.value = $defaultConfig.app_uri + '/' + data.data;
                        } else {
                            layer.msg(data.msg, {time: 1000});
                        }
                    }).error(function (data, status, headers, config) {
                    });
                }
            };
            //提交
            vm.submit = function () {
                vm.applyData.documentList = [];
                for (var x in vm.img) {
                    vm.applyData.documentList.push(
                        {
                            documentId: vm.img[x].id,
                            value: vm.img[x].value,
                            type: vm.img[x].type
                        }
                    )
                }
                for (var x in vm.font) {
                    vm.applyData.documentList.push(
                        {
                            documentId: vm.font[x].id,
                            value: vm.font[x].value,
                            type: vm.font[x].type
                        }
                    )
                }
                $api.post('/apply/applyByCompany', angular.toJson(vm.applyData), function (result) {
                    if (result.code == 0) {
                        layer.msg(result.msg, {time: 1000});
                        $timeout(function () {
                            $state.go('businessClaim');
                        }, 1200)
                    } else {
                        layer.msg(result.msg, {time: 1000});
                    }
                })
            };
        }])
}());