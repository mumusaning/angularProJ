var app = angular.module('login', ['ngCookies', 'app.config', 'app.services', 'app.layer', 'app.util']);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // x-www-form-urlencoded
    $httpProvider.defaults.withCredentials = true;
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' +
                        encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);
app.controller('loginController', ['$scope', '$cookies', '$cookieStore', '$defaultConfig', '$api', '$util', '$http', '$layer', '$timeout', function ($scope, $cookies, $cookieStore, $defaultConfig, $api, $util, $http, $layer, $timeout) {
    var vm = this;
    //登录用户名密码
    vm.query = {
        telephone: '',
        password: ''
    };
    vm.errorMsgIsShow = false;//报错信息是否显示
    vm.errorMsg = '';//报错内容
    //登录按钮
    vm.login = function () {
        if (!vm.query.telephone) {
            return layer.msg('请输入用户名', {time: 1000})
        }
        if (!vm.query.password) {
            return layer.msg('请输入密码', {time: 1000})
        }
        var getCookies = $cookies.getAll();//获取所有cooikes的值
        //循环删除
        angular.forEach(getCookies, function (v, k) {
            $cookies.remove(k);
        });
        $api.post('/user/login', angular.toJson(vm.query), function (result) {
            if (result.code === 0) {
                $cookies.put($defaultConfig.session_code, result.token);//token
                $cookies.put('isFront', result.isFront);//用户属于前台还是后台
                $cookies.put('user', result.user);//用户名
                $cookies.put('epoints', result.epoints);//用户的epotints金额
                $cookies.put('userId', result.userId);//用户的userId
                $cookies.put('isAdmin', result.isAdmin);//是否是admin账号
                if (result.company) {
                    $cookies.put('source', result.company.source);//前台用户source
                }
                localStorage.clear();//清除缓存
                vm.isComplete = result.isComplete;//是否完善良信息
                $api.get('/user/menus', function (result) {
                    var menuList = result.data.menuList;
                    var landingPage = menuList[0].list[0].url;
                    $cookies.put('landingPage', landingPage);//当前第一页
                    localStorage.setItem('menuList', JSON.stringify(menuList));
                    vm.isComplete == 0 ? window.location.href = $defaultConfig.current_uri + '/perfectInfo.html' : window.location.href = $defaultConfig.current_uri + '/index.html#/' + landingPage + '.html';
                });
            } else {
                layer.msg(result.msg, {time: 1000});
            }
        });
    };
    //登录回车事件
    vm.loginKeyPress = function (event) {
        if (event.charCode == 13) {
            vm.login();
        }
    };
    //跳转注册页
    vm.toRegister = function () {
        window.location.href = $defaultConfig.current_uri + '/register.html';
    }
}]);