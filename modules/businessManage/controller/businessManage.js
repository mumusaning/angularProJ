(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('businessManageController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer) {
            var vm = this;
            vm.regular = {
                phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
                sourceReg: /^[A-Z]{6}$/,
                emailReg: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                password: /[\u4E00-\u9FA5]/g
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
            //重置密码数据
            vm.userInfo = {
                userId:'',
                username: '',
                password:''
            };

            //海外电商
            vm.companyTypeList = [
                {
                    id: 0,
                    name: '海外电商'
                },
                {
                    id: 1,
                    name: '跨境电商'
                },

                {
                    id: 2,
                    name: '转运公司'
                },

                {
                    id: 3,
                    name: '清关公司'
                },

                {
                    id: 4,
                    name: '物流公司'
                },

                {
                    id: 5,
                    name: '个人代购/微商'
                },

                {
                    id: 6,
                    name: '供应链服务'
                },

                {
                    id: 7,
                    name: '保税区'
                },

                {
                    id: 8,
                    name: 'ERP、物流系统服务平台'
                },

                {
                    id: 9,
                    name: '三方支付'
                },
                {
                    id: 10,
                    name: '其他'
                }
            ];
            //查询条件
            vm.query = {
                companyName: '',
                contactName: '',
                contactPhone: '',
                tradeType: null,
                companyType: null,
                pageNum: 1,
                pageSize: 10
            };
            //获取列表
            vm.getPagedDataAsync = function () {
                $api.post('/company/getCompanyList', angular.toJson(vm.query), function (result) {
                    if (result.code === 0) {
                        vm.list = result.data.list;
                        vm.query.pages = result.data.pages;
                    }
                });
            };
            //日期初始化
            var toDay = new Date();
            //开始时间
            initDate('#startDate', 'yyyy-mm-dd', 2, function (date) {
                $('#endDate').datetimepicker('setStartDate', date);
            }, toDay);
            //结束时间
            initDate('#endDate', 'yyyy-mm-dd', 2, function (date) {
                $('#startDate').datetimepicker('setEndDate', date);
            }, toDay);

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //查询
            vm.search = function () {
                vm.query.pageNum = 1;
                vm.getPagedDataAsync();
            };
            //跳转修改页
            vm.toEditPage = function (id) {
                console.log(id);
                $state.go('businessEdit', {id: id});

            };
            //重置密码弹出框
            vm.resetPasswordPop = function (obj) {
                vm.popShow = true;
                vm.userInfo.userId = obj.userId;
                vm.userInfo.username = obj.sysUser.username;
            };
            //确认重置密码
            vm.resetPassword = function () {
                if (vm.userInfo.password == '') {
                    return layer.msg('密码不能为空！', {time: 1000});
                } else if (vm.regular.password.test(vm.userInfo.password)) {
                    return layer.msg('密码不能输入中文！', {time: 1000});
                } else if (sumChartCode(vm.userInfo.password) < 8 || sumChartCode(vm.userInfo.password) > 20) {
                    return layer.msg('密码不能少于8位或多于20位！', {time: 1000});
                }
                console.log(vm.userInfo);
                $api.post('/company/resetPassword', angular.toJson(vm.userInfo), function (result) {
                    if (result.code === 0) {
                        vm.popShow = false;
                        layer.msg(result.msg, {time: 1000});
                    }
                });
            }
            //清除用记提交信息
            vm.clearUserInfo = function () {
                vm.popShow = false;
                vm.userInfo = {
                    username:'',
                    userId:'',
                    password:''
                }
            };
        }])

}());