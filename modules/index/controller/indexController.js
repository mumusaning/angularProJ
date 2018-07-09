(function () {
    'use strict';
    angular.module('app.controllers', ['ngCookies', 'angularFileUpload'])
    // 首页
        .controller('indexController', ['$state', '$cookies', '$timeout', '$api', '$defaultConfig', '$location', '$filter', '$http', '$layer', function ($state, $cookies, $timeout, $api, $defaultConfig, $location, $filter, $http, $layer) {
            var vm = this;
            vm.state = $state;
            vm.user = $cookies.get('user');//获取用户名
            vm.isFront = $cookies.get('isFront');//获取用户前台后台显示
            vm.ePoints = $cookies.get('epoints');//获取ePoints
            vm.isAdmin = $cookies.get('isAdmin');//是否是admin
            var menuList = JSON.parse(localStorage.getItem('menuList'));
            //默认加载左侧导航
            vm.init = function () {
                vm.menuList = menuList;
                $timeout(function () {
                    initMenu();
                    menuClick();
                }, 100);
            };
            //登出
            vm.logout = function () {
                $api.post('/user/logout', function (result) {
                    localStorage.clear();//清除缓存
                    var getCookies = $cookies.getAll();//获取所有cooikes的值
                    //循环删除
                    angular.forEach(getCookies, function (v, k) {
                        $cookies.remove(k);
                    });
                    window.location.href = $defaultConfig.current_uri + '/login.html';
                });
            };
            //总览
            vm.toDashborad = function () {
                window.open($defaultConfig.current_uri + '/dashboard.html');
            };
            //后台管理
            vm.toSelf = function () {
                window.location.href = $defaultConfig.current_uri + '/index.html#/' + $cookies.get('landingPage') + '.html'
            }
        }])
}());