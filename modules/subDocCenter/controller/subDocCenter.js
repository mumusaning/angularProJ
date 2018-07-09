(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('subDocCenterController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer','$cookies', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer,$cookies) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //获取文档中心数据
            $api.get('/document/doc_list/', function (result) {
                if (result.code == 0) {
                    vm.list = result.data;
                }
            });
        }])
}());