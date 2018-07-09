var app = angular.module('register', ['ngCookies', 'app.config', 'app.services', 'app.layer', 'app.util']);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
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
app.controller('registerController', ['$scope', '$cookies', '$cookieStore', '$defaultConfig', '$api', '$util', '$http', '$layer', '$timeout', '$location', '$anchorScroll', function ($scope, $cookies, $cookieStore, $defaultConfig, $api, $util, $http, $layer, $timeout, $location, $anchorScroll) {
    var vm = this;
    vm.regular = {
        phone: /^[1][3,4,5,7,8][0-9]{9}$/,
        password: /[\u4E00-\u9FA5]/g
    };

    vm.register = {
        username: '',
        password: '',
        confirm_password: '',
        type: 0
    };
    vm.errors = {
        username: false,
        usernameText: '',
        password: false,
        passwordText: '',
        cfmPassword: false,
        cfmPasswordText: ''
    };

    //计算字符长度
    function sumChartCode(str) {
        if (str) {
            return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
        }
        else {
            return 0
        }
    }

    //获得焦点
    vm.getFocus = function (id) {
        $location.hash(id);
        $anchorScroll();
        $('#' + id).focus();
    };

    //判断手机号是否重复
    vm.isUsernameRegister = function () {
        if (vm.register.username == '') {
            vm.errors.username = false;
            vm.errors.usernameText = '手机号不能为空';
            return false;
        } else if (!vm.regular.phone.test(vm.register.username)) {
            vm.errors.username = false;
            vm.errors.usernameText = '手机号不正确';
            return false;
        }
        $api.post('/user/isUsernameRegister', angular.toJson({username: vm.register.username}), function (result) {
            if (result.code === 1) {
                vm.errors.username = false;
                vm.errors.usernameText = result.msg;
                return false;
            }else{
                vm.errors.username = true;
            }
        });
    };
    //判断密码
    vm.isPassword = function () {
        if (vm.register.password == '') {
            vm.errors.password = false;
            vm.errors.passwordText = '密码不能为空';
            return false;
        } else if (vm.regular.password.test(vm.register.password)) {
            vm.errors.password = false;
            vm.errors.passwordText = '不能输入中文';
            return false;
        } else if (sumChartCode(vm.register.password) < 8 || sumChartCode(vm.register.password) > 20) {
            vm.errors.password = false;
            vm.errors.passwordText = '不能少于8位或多于20位';
            return false;
        } else if (vm.register.confirm_password != '') {
            if (vm.register.password != vm.register.confirm_password) {
                vm.errors.password = false;
                vm.errors.passwordText = '密码与确认密码不一致';
                return false;
            }
        }else{
            vm.errors.password = true;
        }
    };
    //确认密码匹配一致
    vm.iscfmPassword = function () {
        if (vm.register.password != '' && vm.errors.password == true) {
            if (vm.register.password != vm.register.confirm_password) {
                vm.errors.cfmPassword = false;
                vm.errors.cfmPasswordText = '密码与确认密码不一致';
                return false;
            }else{
                vm.errors.cfmPassword = true;
            }
        }
    };
    //注册按钮
    vm.regiter = function () {
        if (vm.errors.username && vm.errors.password && vm.errors.cfmPassword) {
            $api.post('/user/register', angular.toJson(vm.register), function (result) {
                if (result.code === 0) {
                    layer.msg(result.msg, {time: 1000});
                    $timeout(function () {
                        window.location.href = $defaultConfig.current_uri + '/login.html';
                    }, 1200)
                } else {
                    return layer.msg(result.msg, {time: 1000});
                }
            });
        }

    }
}])
;