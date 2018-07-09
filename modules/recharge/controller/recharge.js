(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('rechargeController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            vm.subAccountInfo = {
                t: "",
                chargeCurrency: 156,
                chargeAmount: "",
                paymentCategoryCode: "wxpay",
                outOrderID: ''
            };

            vm.subAccountBalance = 0;//余额
            vm.popShow = false;

            //定义可选充值金额
            vm.chooseMoneyBox = [
                {
                    id: 500,
                    amount: "500元"
                },
                {
                    id: 1000,
                    amount: "1000元"
                },
                {
                    id: 1500,
                    amount: "1500元"
                },
                {
                    id: 2000,
                    amount: "2000元"
                },
                {
                    id: 2500,
                    amount: "2500元"
                },
                {
                    id: 3000,
                    amount: "3000元"
                }
            ];

            // 二维码转码大小设置
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width: 200,
                height: 200
            });
            vm.chooseMoneyBox.id = 500;//设置第一个元素的默认样式
            // 点击选择充值金额
            vm.chooseMoney = function (id) {
                vm.chooseMoneyBox.id = id;
                vm.subAccountInfo.chargeAmount = vm.chooseMoneyBox.id;
            };
            // 验证充值金额
            vm.checkMoney = function () {
                vm.valueReg = /^(?:[\+\-]?\d+(?:\.\d+)?)?$/g;
                if (vm.subAccountInfo.chargeAmount == "") {
                    return layer.msg("充值金额不能为空！", {time: 2000});
                } else if (vm.valueReg.test(vm.subAccountInfo.chargeAmount)) {
                    if (vm.subAccountInfo.chargeAmount <= 0) {
                        return layer.msg("充值金额需大于0！", {time: 2000});
                    } else if (vm.subAccountInfo.chargeAmount > 3000) {
                        return layer.msg("请转入大额充值页面进行充值！", {time: 2000});
                    }
                } else {
                    return layer.msg("请输入正确的金额！", {time: 2000});
                }
            };


            //获取ticket
            $api.post('/account/ssoService', function (result) {
                if (result.code == 0) {
                    vm.ticket = result.data.ticket;
                    //余额
                    $api.post('/account/info', angular.toJson({t: vm.ticket}), function (res) {
                        vm.subAccountBalance = res.data.subAccountInfos[0].subAccountBalance
                    });
                    // 充值
                    vm.recharge = function () {
                        vm.subAccountInfo.t = vm.ticket;
                        $api.post('/account/payment', angular.toJson(vm.subAccountInfo), function (res) {
                            if (res.code === 0) {
                                // 生成二维码
                                vm.subAccountInfo.outOrderID = res.data.billNo;
                                vm.imgUrl = qrcode.makeCode(res.data.paymentResponse);
                                vm.popShow = true;
                                // 扫描二维码
                                var n = 0;
                                var timeCyc = setInterval(function () {
                                    $api.post("/account/callBack", angular.toJson({outOrderID: vm.subAccountInfo.outOrderID}), function (res) {
                                        if (res.code == 0) {
                                            clearInterval(timeCyc);
                                            vm.popShow = false;
                                            layer.msg('支付成功', {time: 1000});

                                            $api.post('/account/info', angular.toJson({t: vm.ticket}), function (res) {
                                                vm.subAccountBalance = res.data.subAccountInfos[0].subAccountBalance
                                            });

                                        } else {
                                            n += 1;
                                            if (n == 60) {
                                                vm.popShow = false;
                                                clearInterval(timeCyc);
                                                layer.msg("支付失败，网络延迟等原因，请重新支付,如重复提交支付，我们会如数退还！", {time: 1000});
                                            }
                                        }
                                    })
                                }, 5000);
                                // 点击弹框清除定时
                                vm.clearTimeout = function () {
                                    vm.popShow = false;
                                    clearInterval(timeCyc);
                                };
                            } else {
                                return layer.msg(result.data.msg, {time: 1000})
                            }
                        })
                    };
                } else {
                    return layer.msg(result.data.message, {time: 1000});
                }
            });

        }])
}());