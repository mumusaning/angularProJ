(function () {
    'use strict';
    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/notFound.html');
            $stateProvider
            //------------------------------------------------------------ 前台路由 ----------------------------------------------------//
            //订单管理-客户投保
                .state('customerInsure', {
                    url: '/customerInsure.html',
                    templateUrl: 'modules/customerInsure/view/customerInsure.html'
                })
                //订单管理-客户投保-详情
                .state('customerInsureDetails', {
                    url: '/customerInsureDetails.html?id?productId',
                    templateUrl: 'modules/customerInsureDetails/view/customerInsureDetails.html'
                })
                //订单管理-客户投保-新增
                .state('customerInsureAdd', {
                    url: '/customerInsureAdd.html',
                    templateUrl: 'modules/customerInsureAdd/view/customerInsureAdd.html'
                })
                //订单管理-订单归档
                .state('orderFiling', {
                    url: '/orderFiling.html',
                    templateUrl: 'modules/orderFiling/view/orderFiling.html'
                })
                //理赔管理-理赔订单
                .state('claimOrder', {
                    url: '/claimOrder.html',
                    templateUrl: 'modules/claimOrder/view/claimOrder.html'
                })
                //理赔管理-理赔订单-新增
                .state('claimOrderAdd', {
                    url: '/claimOrderAdd.html',
                    templateUrl: 'modules/claimOrderAdd/view/claimOrderAdd.html'
                })
                //理赔管理-理赔订单-详情
                .state('claimOrderDetails', {
                    url: '/claimOrderDetails.html?id?applyProductId?ticketNo',
                    templateUrl: 'modules/claimOrderDetails/view/claimOrderDetails.html'
                })
                //理赔管理-理赔账单
                .state('claimBill', {
                    url: '/claimBill.html',
                    templateUrl: 'modules/claimBill/view/claimBill.html'
                })
                //结算中心-待审核账单
                .state('auditedBillFront', {
                    url: '/auditedBillFront.html',
                    templateUrl: 'modules/auditedBillFront/view/auditedBillFront.html'
                })
                //结算中心-结算记录
                .state('settleRecordFront', {
                    url: '/settleRecordFront.html',
                    templateUrl: 'modules/settleRecordFront/view/settleRecordFront.html'
                })
                //文档中心-文档中心
                .state('subDocCenter', {
                    url: '/subDocCenter.html',
                    templateUrl: 'modules/subDocCenter/view/subDocCenter.html'
                })
                //商户中心-商户中心
                .state('businessInform', {
                    url: '/businessInform.html',
                    templateUrl: 'modules/businessInform/view/businessInform.html'
                })
                //账户中心-充值
                .state('recharge', {
                    url: '/recharge.html',
                    templateUrl: 'modules/recharge/view/recharge.html'
                })
                //账户中心-大额充值
                .state('largeRecharge', {
                    url: '/largeRecharge.html',
                    templateUrl: 'modules/largeRecharge/view/largeRecharge.html'
                })
                //账户中心-大额充值详情
                .state('largeRechargeDetails', {
                    url: '/largeRechargeDetails.html',
                    templateUrl: 'modules/largeRechargeDetails/view/largeRechargeDetails.html'
                })
                //账户中心-资金流水
                .state('capitalFlow', {
                    url: '/capitalFlow.html',
                    templateUrl: 'modules/capitalFlow/view/capitalFlow.html'
                })
                //------------------------------------------------------------ 后台路由 ----------------------------------------------------//
                //订单管理-个人订单
                .state('personalOrder', {
                    url: '/personalOrder.html',
                    templateUrl: 'modules/personalOrder/view/personalOrder.html'
                })
                //订单管理-个人订单-个人订单详情
                .state('personalOrderDetails', {
                    url: '/personalOrderDetails.html',
                    templateUrl: 'modules/personalOrderDetails/view/personalOrderDetails.html'
                })
                //订单管理-商户订单
                .state('businessOrder', {
                    url: '/businessOrder.html',
                    templateUrl: 'modules/businessOrder/view/businessOrder.html'
                })
                //订单管理--新增投保
                .state('businessOrderAdd', {
                    url: '/businessOrderAdd.html',
                    templateUrl: 'modules/businessOrderAdd/view/businessOrderAdd.html'
                })
                //订单管理-商户订单-商户订单详情
                .state('businessOrderDetails', {
                    url: '/businessOrderDetails.html?id?productId',
                    templateUrl: 'modules/businessOrderDetails/view/businessOrderDetails.html'
                })
                //理赔管理-个人理赔
                .state('personalClaim', {
                    url: '/personalClaim.html',
                    templateUrl: 'modules/personalClaim/view/personalClaim.html'
                })
                //理赔管理-个人理赔-个人理赔详情
                .state('personalClaimDetails', {
                    url: '/personalClaimDetails.html',
                    templateUrl: 'modules/personalClaimDetails/view/personalClaimDetails.html'
                })
                //理赔管理-商户理赔
                .state('businessClaim', {
                    url: '/businessClaim.html',
                    templateUrl: 'modules/businessClaim/view/businessClaim.html'
                })
                //理赔管理-商户理赔-商户理赔详情
                .state('businessClaimDetails', {
                    url: '/businessClaimDetails.html?ticketNo?id?applyProductId',
                    templateUrl: 'modules/businessClaimDetails/view/businessClaimDetails.html'
                })
                //理赔管理-新增理赔
                .state('businessClaimAdd', {
                    url: '/businessClaimAdd.html',
                    templateUrl: 'modules/businessClaimAdd/view/businessClaimAdd.html'
                })
                //结算中心-待审核账单
                .state('auditedBillBack', {
                    url: '/auditedBillBack.html',
                    templateUrl: 'modules/auditedBillBack/view/auditedBillBack.html'
                })
                //结算中心-结算记录
                .state('settleRecordBack', {
                    url: '/settleRecordBack.html',
                    templateUrl: 'modules/settleRecordBack/view/settleRecordBack.html'
                })
                //信息维护-产品管理
                .state('productManage', {
                    url: '/productManage.html',
                    templateUrl: 'modules/productManage/view/productManage.html'
                })
                //信息维护-默认产品管理
                .state('productManageDefault', {
                    url: '/productManageDefault.html',
                    templateUrl: 'modules/productManageDefault/view/productManageDefault.html'
                })
                //信息维护-产品管理-新增
                .state('productManageAdd', {
                    url: '/productManageAdd.html',
                    templateUrl: 'modules/productManageAdd/view/productManageAdd.html'
                })
                //信息维护-产品管理-修改
                .state('productManageEdit', {
                    url: '/productManageEdit.html?id',
                    templateUrl: 'modules/productManageEdit/view/productManageEdit.html'
                })
                //信息维护-2C产品管理
                .state('twoCProductManage', {
                    url: '/twoCProductManage.html',
                    templateUrl: 'modules/twoCProductManage/view/twoCProductManage.html'
                })
                //信息维护-保司接口管理
                .state('interfaceManage', {
                    url: '/interfaceManage.html',
                    templateUrl: 'modules/interfaceManage/view/interfaceManage.html'
                })
                //保单管理-所有保单
                .state('allPolicies', {
                    url: '/allPolicies.html',
                    templateUrl: 'modules/allPolicies/view/allPolicies.html'
                })
                //动态引擎-定价因子
                .state('pricingFactor', {
                    url: '/pricingFactor.html',
                    templateUrl: 'modules/pricingFactor/view/pricingFactor.html'
                })
                //返费管理-返费订单
                .state('returnOrder', {
                    url: '/returnOrder.html',
                    templateUrl: 'modules/returnOrder/view/returnOrder.html'
                })
                //返费管理-返费账单
                .state('returnBill', {
                    url: '/returnBill.html',
                    templateUrl: 'modules/returnBill/view/returnBill.html'
                })
                //------------------------------------------------------------ 后台顶部入口 ----------------------------------------------------//
                //商户管理
                .state('businessManage', {
                    url: '/businessManage.html',
                    templateUrl: 'modules/businessManage/view/businessManage.html'
                })
                //新增商户
                .state('businessAdd', {
                    url: '/businessAdd.html',
                    templateUrl: 'modules/businessAdd/view/businessAdd.html'
                })
                //修改商户
                .state('businessEdit', {
                    url: '/businessEdit.html?id',
                    templateUrl: 'modules/businessEdit/view/businessEdit.html'
                })
                //用户管理
                .state('userManage', {
                    url: '/userManage.html',
                    templateUrl: 'modules/userManage/view/userManage.html'
                })
                //用户详情-中国人
                .state('userManageDetailsChina', {
                    url: '/userManageDetailsChina.html',
                    templateUrl: 'modules/userManageDetailsChina/view/userManageDetailsChina.html'
                })
                //用户详情-外国人
                .state('userManageDetailsForeigners', {
                    url: '/userManageDetailsForeigners.html',
                    templateUrl: 'modules/userManageDetailsForeigners/view/userManageDetailsForeigners.html'
                })
                //账号管理-账号管理
                .state('accManage', {
                    url: '/accManage.html',
                    templateUrl: 'modules/accManage/view/accManage.html'
                })
                //个人中心
                .state('personalCenter', {
                    url: '/personalCenter.html',
                    templateUrl: 'modules/personalCenter/view/personalCenter.html'
                })
                //404
                .state('notFound', {
                    url: '/notFound.html',
                    templateUrl: 'modules/notFound/view/notFound.html'
                })
        }])
        .run(['$api', '$rootScope', '$defaultConfig', '$templateCache', function ($api, $rootScope, $defaultConfig, $templateCache) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                //监听路由
                // $templateCache.removeAll();
                // $api.get('/checkSession', function(result) {
                // 	if(!result) {
                // 		window.location.href = $defaultConfig.current_uri + '/login.html';
                // 	}
                // })
            });
        }]);
}());