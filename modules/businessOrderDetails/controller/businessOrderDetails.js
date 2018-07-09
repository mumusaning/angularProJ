(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('businessOrderDetailsController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', '$stateParams', '$filter', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer, $stateParams, $filter) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);


//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //订单画像
            vm.toDetail = function () {
                window.open($defaultConfig.current_uri + 'detail.html');
            };
            // 订单详情
            $api.get('/merchant/merchantOrderList?productId=' + $stateParams.productId + '&id=' + $stateParams.id, function (result) {
                if (result.code === 0) {
                    vm.list = result.data[0];
                    vm.list.originalAmount = vm.list.originalAmount / 100;
                    vm.list.discountAmount = vm.list.discountAmount / 100;
                    vm.productType = vm.list.productType;
                    if (vm.productType == 3) {
                        vm.periodList = vm.list.periodList;
                        var days = vm.list.currentTime - vm.list.expressTime;
                        vm.time = parseInt(days / (1000 * 60 * 60 * 24));
                    }
                    for (var x  in vm.periodList) {
                        vm.periodList[x].dashDay = vm.periodList[x].productPeriod - vm.time;
                        if (vm.periodList[x].dashDay < 0) {
                            vm.periodList[x].dashDay = 0;
                        }
                    }
                }
            })
        }])
}());