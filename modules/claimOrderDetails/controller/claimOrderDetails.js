(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('claimOrderDetailsController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer','$stateParams', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer,$stateParams) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);

console.log($stateParams);
//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            $api.get('/apply/applyDetails?id='+$stateParams.id+'&applyProductId='+$stateParams.applyProductId+'&ticketNo='+$stateParams.ticketNo,function(result){
                if(result.code === 0){
                    vm.list = result.data[0];
                    vm.list.discountAmount = vm.list.discountAmount / 100;
                    vm.list.goodsValue = vm.list.goodsValue / 100;
                    vm.list.premium = vm.list.premium / 100;
                    for(var x in vm.list){
                        if (vm.list.status == 2) {
                            vm.list.statusTxt = "初审";
                        } else if (vm.list.status == 6) {
                            vm.list.statusTxt = "复审";
                        } else if (vm.list.status == 11) {
                            vm.list.statusTxt = "待付款";
                        } else if (vm.list.status == 3) {
                            vm.list.statusTxt = "已打款";
                        } else if (vm.list.status == 4) {
                            vm.list.statusTxt = "驳回";
                        } else if (vm.list.status == 5) {
                            vm.list.statusTxt = "小额快审";
                        }
                    }
                }
            })
        }])
}());