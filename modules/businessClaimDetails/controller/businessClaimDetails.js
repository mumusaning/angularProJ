(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('businessClaimDetailsController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$stateParams', '$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $stateParams, $cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            vm.analysis = false;
            vm.popShow = false;
            vm.infoLog = 0; // 0 - 基本信息 1 - 理赔日志
            vm.testImg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
            vm.applyAudit = {
                id: "",
                ticketNo: $stateParams.ticketNo,
                productId: $stateParams.applyProductId,
                auditStatus: "1",
                indemnifySum: "",//实际打款金额
                applyIndemnify: "",//状态
                applyRemark: ""
            };
//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //查询
            vm.search = function () {
                vm.query.pageNum = 1;
                vm.getPagedDataAsync();
            };
            //开始解析
            vm.toAnalysis = function () {
                $layer.loading();
                $timeout(function () {
                    vm.analysis = true;
                    $layer.close()
                }, 2000)
            };
            //订单画像
            vm.toDetail = function () {
                window.open($defaultConfig.current_uri + 'detail.html');
            };


            //获取理赔基本信息
            vm.getClaimDataAsync = function () {
                $api.get('/apply/applyClaim?ticketNo=' + $stateParams.ticketNo + '&id=' + $stateParams.id + '&applyProductId=' + $stateParams.applyProductId, function (result) {
                    if (result.code === 0) {
                        vm.info = result.data[0];
                        vm.info.discountAmount = vm.info.discountAmount / 100;
                        vm.info.premium = vm.info.premium / 100;
                        vm.info.goodsValue = vm.info.goodsValue / 100;
                        vm.docList = result.data[0].doclist;
                        result.data[0].indem == null ? vm.sum = 0 : vm.sum = result.data[0].indem;
                        vm.applyAudit.id = result.data[0].id;
                        vm.applyAudit.applyIndemnify = result.data[0].status;
                        // 获取图片和链接
                        if (vm.docList.length > 0) {
                            for (var x in vm.docList) {
                                if (vm.testImg.test(vm.docList[x].path)) {
                                    vm.docList[x].isPic = true;
                                } else {
                                    vm.docList[x].isPic = false;
                                }
                            }
                        }
                        // 文字转换
                        if (vm.info.status == 2) {
                            vm.info.statusTxt = "初审";
                        } else if (vm.info.status == 6) {
                            vm.info.statusTxt = "复审";
                        } else if (vm.info.status == 11) {
                            vm.info.statusTxt = "待付款";
                        } else if (vm.info.status == 3) {
                            vm.info.statusTxt = "已打款";
                        } else if (vm.info.status == 4) {
                            vm.info.statusTxt = "驳回";
                        } else if (vm.info.status == 5) {
                            vm.info.statusTxt = "小额快审";
                        }
                    }
                })
            };
            // 获取列表
            vm.getPagedDataAsync = function () {
                $api.get('/apply/applyClaimLog?userId=' + $cookies.get('userId'), function (result) {
                    vm.list = result.data;
                    for (var i in vm.list) {
                        vm.list[i].operateResult == 1 ? vm.list[i].operateResultTxt = '成功' : vm.list[i].operateResultTxt = '失败';
                    }
                })
            };
            // 审核提交
            vm.submit = function () {
                $api.post('/apply/applyAudit', angular.toJson(vm.applyAudit), function (result) {
                    if (result.code === 0) {
                        layer.msg(result.msg, {time: 1000});
                        vm.popShow = false;
                        $state.go('businessClaim');
                    } else {
                        layer.msg(result.msg, {time: 1500});
                    }
                });
            };
            // 切换
            vm.changeInfo = function (type) {
                vm.infoLog = type;
                type == 0 ? vm.getClaimDataAsync() : vm.getPagedDataAsync();
            };
        }])
}());