(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('businessOrderAddController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer) {
            var vm = this;
            vm.rules = {};//统计规则
            vm.popShow = false;
            //投保提交数据
            vm.orderApi =
                {
                    source: '',//商户标识
                    productName: '',//产品名称
                    productId: '',//产品Id
                    companyName: '',//商户名称
                    phoneNo: '',//手机号
                    idCard: '',//身份证号码
                    expressNo: '',//物流单号
                    expressTime: '',//物流发货日期
                    receiverAddress: '',//收货地址
                    purchasOrderNo: '',//购物网站订单号/海淘商品订单号
                    shoppingSite:'',//购物网站
                    goodsCategory: '',//商品列表
                    premium:'',//保费
                    name: '',//姓名
                    shoppingTime:'',//购买日期
                    loadingPort:'',//起运地
                    destinationPort:'',//目的口岸
                    expressChannel:'',//运输方式
                    goodsValueDetail:'',//商品价值明细
                    goodsValue: '',//商品价值
                    goodsKind: '',//商品种类
                    sex:'男',//性别
                    type: 1//后台投保
                };

            vm.productIdList = [];
            //日期初始化
            var toDay = new Date();
            initDate('#expressTime', 'yyyy-mm-dd', 2, function (){});
            initDate('#shoppingTime', 'yyyy-mm-dd', 2, function (){});

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//

            //计算字符长度
            function sumChartCode(str) {
                if (str) {
                    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
                }
                else {
                    return 0;
                }
            }

            //获取商户标识
            vm.getSource = function (source) {
                if (sumChartCode(source) == 6) {
                    $api.get('/order/findCompanyBySource/' + source, function (result) {
                        if (result.code == 0) {
                            if (result.data.company) {
                                vm.orderApi.companyName = result.data.company.companyName;
                                vm.productIdList = result.data.product;
                            } else {
                                layer.msg('没有查到相关商户,请重新输入', {time: 1000});
                            }
                        } else {
                            layer.msg(result.msg, {time: 1000});
                        }
                    });
                }
            };
            //监听产品ID选择
            $scope.$watch("vm.orderApi.productId", function (newValue, oldValue, scope) {
                vm.ruleList = [];
                vm.rules = {};
                for (var i = 0; i < vm.productIdList.length; i++) {
                    if (vm.productIdList[i].id == newValue) {
                        vm.orderApi.productName = vm.productIdList[i].productName;
                        vm.ruleList = vm.productIdList[i].insuranceInformationList;
                    }
                }
                angular.forEach(vm.ruleList, function (obj) {
                    vm.rules[obj.type] = true;
                });
            }, true);
            //校验数据
            vm.checkData = function (obj) {
                vm.phone=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (obj.source === '') {
                    layer.msg('请输入商户标识', {time: 1000});
                    return false;
                }
                if (obj.productId === '') {
                    layer.msg('请选择产品ID', {time: 1000});
                    return false;
                }
                if(vm.rules['姓名']){
                    if (obj.name === '') {
                        layer.msg('请输入购买人姓名', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['手机号']){
                    if (obj.phoneNo === '') {
                        layer.msg('请输入手机号', {time: 1000});
                        return false;
                    }else if(!vm.phone.test(obj.phoneNo)){
                        layer.msg('请输入正确的手机号', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['身份证号码']){
                    if (obj.idCard === '') {
                        layer.msg('请输入身份证号', {time: 1000});
                        return false;
                    } else if (!convertCardID(obj.idCard)) {
                        layer.msg('请输入正确的身份证号', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['起运地']){
                    if(obj.loadingPort === ''){
                        layer.msg('请输入起运地', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['目的口岸']){
                    if(obj.destinationPort === ''){
                        layer.msg('请输入目的口岸', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['物流单号']){
                    if (obj.expressNo === '') {
                        layer.msg('请输入物流单号', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['物流发货日期']){
                    if (obj.expressTime === '') {
                        layer.msg('请选择物流发货日期', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['收货地址']){
                    if (obj.receiverAddress === '') {
                        layer.msg('请输入收货地址', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['运输方式']){
                    if (obj.expressChannel === '') {
                        layer.msg('请输入运输方式', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['购物网站']){
                    if (obj.shoppingSite === '') {
                        layer.msg('请输入购物网站', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['购买日期']){
                    if (obj.shoppingTime === '') {
                        layer.msg('请输入购买日期', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['商品价值']){
                    if (obj.goodsValue === '') {
                        layer.msg('请输入商品价值', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['商品列表']){
                    if (obj.goodsCategory === '') {
                        layer.msg('请输入商品列表', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['商品价值明细']){
                    if (obj.goodsValueDetail === '') {
                        layer.msg('请输入商品价值明细', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['商品种类']){
                    if (obj.goodsKind === '') {
                        layer.msg('请输入商品种类', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['保费']){
                    if (obj.premium === '') {
                        layer.msg('请输入保费', {time: 1000});
                        return false;
                    }
                }
                if(vm.rules['购物网站订单号/海淘商品订单号']){
                    if (obj.purchasOrderNo === '') {
                        layer.msg('请输入购物网站订单号', {time: 1000});
                        return false;
                    }
                }
                return true;

            };
            //提交
            vm.submit = function () {
                if (vm.checkData(vm.orderApi)) {
                    $api.post('/order/addOrderApi', angular.toJson(vm.orderApi), function (result) {
                        if (result.code == 0) {
                            layer.msg(result.msg, {time: 1000});
                            $timeout(function () {
                                $state.go('businessOrder');
                            }, 1200)
                        } else {
                            layer.msg(result.msg, {time: 1000});
                        }
                    });
                }
            };
        }]);
}());