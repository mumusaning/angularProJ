(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('pricingFactorController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer) {
            var vm = this;
            $timeout(function () {
                initMenu();
            }, 100);
            vm.popShow = false;
            //查询条件
            vm.query = {
                pageNum: 1,
                pageSize: 10
            };
            vm.list_1 = [
                {
                    id: "101",
                    obj: "商品类别",
                    content: "一类产品",
                    code: 0.95,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "102",
                    obj: "商品类别",
                    content: "二类产品",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "103",
                    obj: "商品类别",
                    content: "三类产品",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "104",
                    obj: "商品类别",
                    content: "四类产品",
                    code: 1.2,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "105",
                    obj: "商品类别",
                    content: "五类产品",
                    code: 1.3,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_2 = [
                {
                    id: "106",
                    obj: "商品订单金额",
                    content: "（0,2000]",
                    code: 0.8,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "107",
                    obj: "商品订单金额",
                    content: "（2000，20000]",
                    code: 1.0,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "108",
                    obj: "商品订单金额",
                    content: "（20000，50000]",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "109",
                    obj: "商品订单金额",
                    content: "（50000，100000]",
                    code: 1.2,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "110",
                    obj: "贸易方式",
                    content: "进口",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_3 = [
                {
                    id: "111",
                    obj: "贸易方式",
                    content: "出口",
                    code: 2,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "112",
                    obj: "物流/清关方式",
                    content: "平邮",
                    code: 1.5,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "113",
                    obj: "物流/清关方式",
                    content: "EMS",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "114",
                    obj: "物流/清关方式",
                    content: "快件",
                    code: 1.2,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "115",
                    obj: "物流/清关方式",
                    content: "其他",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_4 = [
                {
                    id: "116",
                    obj: "邮寄方式",
                    content: "直邮",
                    code: 0.95,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "117",
                    obj: "邮寄方式",
                    content: "转运",
                    code: 1.0,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "118",
                    obj: "物流直寄",
                    content: "物流直寄",
                    code: 1.05,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "119",
                    obj: "年龄",
                    content: "25周岁以下",
                    code: 1.02,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "120",
                    obj: "年龄",
                    content: "25~40周岁",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_5 = [
                {
                    id: "121",
                    obj: "年龄",
                    content: "40周岁以上",
                    code: 0.95,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "122",
                    obj: "性别",
                    content: "男",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "123",
                    obj: "性别",
                    content: "女",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "124",
                    obj: "学历",
                    content: "高中及以下",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "125",
                    obj: "学历",
                    content: "大专",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_6 = [
                {
                    id: "126",
                    obj: "学历",
                    content: "本科",
                    code: 1,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "127",
                    obj: "学历",
                    content: "研究生",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "128",
                    obj: "职业",
                    content: "第一大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "129",
                    obj: "职业",
                    content: "第二大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "130",
                    obj: "职业",
                    content: "第三大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_7 = [
                {
                    id: "131",
                    obj: "职业",
                    content: "第四大类",
                    code: 1,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "132",
                    obj: "职业",
                    content: "第五大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "133",
                    obj: "职业",
                    content: "第六大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "134",
                    obj: "职业",
                    content: "第七大类",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "135",
                    obj: "职业",
                    content: "第八大类",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_8 = [
                {
                    id: "136",
                    obj: "城市",
                    content: "一线城市",
                    code: 1.05,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "137",
                    obj: "城市",
                    content: "二线城市",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "138",
                    obj: "城市",
                    content: "三线城市",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "139",
                    obj: "城市",
                    content: "四线城市",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "140",
                    obj: "城市",
                    content: "五线城市",
                    code: 0.85,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_9 = [
                {
                    id: "141",
                    obj: "客户",
                    content: "C端用户",
                    code: 7,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "142",
                    obj: "客户",
                    content: "普通商户",
                    code: 6,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "143",
                    obj: "客户",
                    content: "省级商户",
                    code: 4,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "144",
                    obj: "客户",
                    content: "大区级商户",
                    code: 2,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "145",
                    obj: "渠道类型",
                    content: "二维码/链接",
                    code: 1.05,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_10 = [
                {
                    id: "146",
                    obj: "渠道类型",
                    content: "Assa商户平台",
                    code: 1,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "147",
                    obj: "渠道类型",
                    content: "API对接",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "148",
                    obj: "单笔赔付限额",
                    content: "初级",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "149",
                    obj: "单笔赔付限额",
                    content: "中级",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "150",
                    obj: "单笔赔付限额",
                    content: "高级",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_11 = [
                {
                    id: "151",
                    obj: "利润空间",
                    content: "初级",
                    code: 0.9,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "152",
                    obj: "利润空间",
                    content: "中级",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "153",
                    obj: "利润空间",
                    content: "高级",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_a = [
                {
                    id: "101",
                    obj: "投保单量稳定度",
                    content: "较上月增幅<0%",
                    code: 1.05,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "102",
                    obj: "投保单量稳定度",
                    content: "较上个月增幅在（0~10%）",
                    code: 1.00,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "103",
                    obj: "投保单量稳定度",
                    content: "较上个月增幅在（10%~50%）",
                    code: 0.98,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "104",
                    obj: "投保单量稳定度",
                    content: "较上月增幅>50%",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "105",
                    obj: "赔付率",
                    content: "40％及以下",
                    code: '0.7-0.8',
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_b = [
                {
                    id: "106",
                    obj: "赔付率",
                    content: "40％-60％",
                    code: '0.8-0.9',
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "107",
                    obj: "赔付率",
                    content: "60％-70％",
                    code: '1.0',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "108",
                    obj: "赔付率",
                    content: "70％-90％",
                    code: '1.0-1.3',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "109",
                    obj: "赔付率",
                    content: "90％以上",
                    code: '>1.3',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "110",
                    obj: "风险管理水平",
                    content: "根据被保险人的风险管理水平，对费率进行浮动",
                    code: '0.7－3.0',
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_c = [
                {
                    id: "111",
                    obj: "商户等级",
                    content: "一级商户",
                    code: '0.8',
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "112",
                    obj: "商户等级",
                    content: "二级商户",
                    code: '0.9',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "113",
                    obj: "商户等级",
                    content: "三级商户",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "114",
                    obj: "商户信用等级",
                    content: "高级信用商户",
                    code: '1.0',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "115",
                    obj: "商户信用等级",
                    content: "无骗保倾向商户",
                    code: '2.0',
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_d = [
                {
                    id: "116",
                    obj: "商户信用等级",
                    content: "轻度骗保嫌疑商户",
                    code: '2.0',
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "117",
                    obj: "商户信用等级",
                    content: "中度骗保嫌疑商户",
                    code: '3.0',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "118",
                    obj: "商户信用等级",
                    content: "黑名单商户",
                    code: '拒保',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "119",
                    obj: "累计赔付限额",
                    content: "低于常规",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "120",
                    obj: "累计赔付限额",
                    content: "等于常规",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_e = [
                {
                    id: "121",
                    obj: "累计赔付限额",
                    content: "高于常规",
                    code: 1.05,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "122",
                    obj: "复购情况",
                    content: "C端用户重复购买<5次、B端商户连续投保<4个月",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "123",
                    obj: "复购情况",
                    content: "C端用户重复购买<50次、B端商户连续投保<10个月",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "124",
                    obj: "复购情况",
                    content: "C端用户重复购买100次、B端商户连续投保<15个月",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "125",
                    obj: "复购情况",
                    content: "C端用户重复购买<500次、B端商户连续投保<20个月",
                    code: 0.85,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_f = [
                {
                    id: "126",
                    obj: "复购情况",
                    content: "C端用户重复购买>=500次、B端商户连续投保>=20个月",
                    code: 0.8,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "127",
                    obj: "用户等级",
                    content: "金卡会员",
                    code: 0.8,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "128",
                    obj: "用户等级",
                    content: "银卡会员",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "129",
                    obj: "用户等级",
                    content: "普通会员",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "130",
                    obj: "用户信用等级",
                    content: "高级信用用户",
                    code: 0.8,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_g = [
                {
                    id: "131",
                    obj: "用户信用等级",
                    content: "无骗保倾向用户",
                    code: '1.0',
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "132",
                    obj: "用户信用等级",
                    content: "轻度骗保嫌疑用户",
                    code: '2.0',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "133",
                    obj: "用户信用等级",
                    content: "中度骗保嫌疑用户",
                    code: '3.0',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "134",
                    obj: "用户信用等级",
                    content: "黑名单用户",
                    code: '拒保',
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "135",
                    obj: "购物商品起运地",
                    content: "欧洲",
                    code: '1.5',
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_h = [
                {
                    id: "136",
                    obj: "购物商品起运地",
                    content: "亚洲",
                    code: 1,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "137",
                    obj: "购物商品起运地",
                    content: "美洲",
                    code: 1.1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "138",
                    obj: "购物商品起运地",
                    content: "大洋洲",
                    code: 1.3,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "139",
                    obj: "购物商品起运地",
                    content: "非洲",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "140",
                    obj: "购物网站等级",
                    content: "A级",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_i = [
                {
                    id: "141",
                    obj: "购物网站等级",
                    content: "B级",
                    code: 0.95,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "142",
                    obj: "购物网站等级",
                    content: "C级",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "143",
                    obj: "购物网站等级",
                    content: "D级",
                    code: 1.05,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "144",
                    obj: "运输方式",
                    content: "铁路运输",
                    code: 0.8,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "145",
                    obj: "运输方式",
                    content: "航空运输",
                    code: 0.9,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_j = [
                {
                    id: "146",
                    obj: "运输方式",
                    content: "海洋运输",
                    code: 1.1,
                    date: "2017-05-15 15:06:24"
                },
                {
                    id: "147",
                    obj: "运输方式",
                    content: "公路运输",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "148",
                    obj: "目的口岸",
                    content: "A类口岸",
                    code: 1.2,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "149",
                    obj: "目的口岸",
                    content: "B类口岸",
                    code: 0.95,
                    date: "2017-01-15 15:06:24"
                },
                {
                    id: "150",
                    obj: "目的口岸",
                    content: "C类口岸",
                    code: 1,
                    date: "2017-01-15 15:06:24"
                }
            ];
            vm.list_k = [
                {
                    id: "151",
                    obj: "目的口岸",
                    content: "D类口岸",
                    code: 1.1,
                    date: "2017-05-15 15:06:24"
                }
            ];
            vm.pageNum = 1;
            vm.pageNumber = 1;
            vm.listBase = vm.list_1;
            vm.listFloat = vm.list_a;
            vm.goTo = function (number) {
                switch(number){
                    case 1:
                        vm.listBase = vm.list_1;
                        vm.pageNum = 1;
                        break;
                    case 2:
                        vm.listBase = vm.list_2;
                        vm.pageNum = 2;
                        break;
                    case 3:
                        vm.listBase = vm.list_3;
                        vm.pageNum = 3;
                        break;
                    case 4:
                        vm.listBase = vm.list_4;
                        vm.pageNum = 4;
                        break;
                    case 5:
                        vm.listBase = vm.list_5;
                        vm.pageNum = 5;
                        break;
                    case 6:
                        vm.listBase = vm.list_6;
                        vm.pageNum = 6;
                        break;
                    case 7:
                        vm.listBase = vm.list_7;
                        vm.pageNum = 7;
                        break;
                    case 8:
                        vm.listBase = vm.list_8;
                        vm.pageNum = 8;
                        break;
                    case 9:
                        vm.listBase = vm.list_9;
                        vm.pageNum = 9;
                        break;
                    case 10:
                        vm.listBase = vm.list_10;
                        vm.pageNum = 10;
                        break;
                    case 11:
                        vm.listBase = vm.list_11;
                        vm.pageNum = 11;
                        break;
                }
            };
            vm.goToNumber = function (number) {
                switch(number){
                    case 1:
                        vm.listFloat = vm.list_a;
                        vm.pageNumber = 1;
                        break;
                    case 2:
                        vm.listFloat = vm.list_b;
                        vm.pageNumber = 2;
                        break;
                    case 3:
                        vm.listFloat = vm.list_c;
                        vm.pageNumber = 3;
                        break;
                    case 4:
                        vm.listFloat = vm.list_d;
                        vm.pageNumber = 4;
                        break;
                    case 5:
                        vm.listFloat = vm.list_e;
                        vm.pageNumber = 5;
                        break;
                    case 6:
                        vm.listFloat = vm.list_f;
                        vm.pageNumber = 6;
                        break;
                    case 7:
                        vm.listFloat = vm.list_g;
                        vm.pageNumber = 7;
                        break;
                    case 8:
                        vm.listFloat = vm.list_h;
                        vm.pageNumber = 8;
                        break;
                    case 9:
                        vm.listFloat = vm.list_i;
                        vm.pageNumber = 9;
                        break;
                    case 10:
                        vm.listFloat = vm.list_j;
                        vm.pageNumber = 10;
                        break;
                    case 11:
                        vm.listFloat = vm.list_k;
                        vm.pageNumber = 11;
                        break;
                }
            };

            //获取列表
            // vm.getPagedDataAsync = function () {
            //     $layer.loading();
            //     $http({
            //         url: $defaultConfig.current_uri + 'json/list.json',//请求的url路径
            //         method: 'GET',    //GET/POST
            //         params: {query: angular.toJson(vm.query)},   //参数
            //         // data: data        //通常在POST请求时使用
            //     }).success(function (result) {
            //         //成功处理
            //         $layer.close();
            //         vm.list = result.data.list;
            //         vm.query.pages = result.data.pages;
            //         for (var i = 0; i < vm.list.length; i++) {
            //             vm.list[i].checked = false;//添加默认选中状态
            //         }
            //     }).error(function () {
            //         //错误处理
            //     });
            // };
//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            var data = [
                [[0, 1.05, 150000000, '投保单量稳定度', 1990], [4, 0.8, 80000000, '商户信用等级', 1990], [6, 1, 50000000, '复购情况', 2015], [9, 1.5, 150000000, '购物商品起运地', 1990], [11, 1.1, 80000000, '运输方式', 2015]],
                [[1, 0.75, 150000000, '赔付率', 2015], [3, 0.8, 80000000, '商户等级', 2015], [5, 0.95, 50000000, '低于常规', 2015], [8, 2, 10000000, '用户信用等级', 2015], [10, 0.9, 10000000, '购物网站等级', 2015], [12, 1.2, 80000000, '目的口岸', 2015]]
            ];
            var pricing = echarts.init(document.getElementById('pricing'));
            var pricing_option = {
                textStyle: {
                    color: '#000'
                },
                backgroundColor: "#fff",
                // legend: {
                //     right: 10,
                //     data: ['1990', '2015']
                // },
                xAxis: {
                    min: 0,
                    max: 14,
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    data: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14"]
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    scale: true,
                    min: 0,
                    max: 2.5

                },
                series: [{
                    name: '1990',
                    data: data[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        textStyle: {
                            color: '#000'
                        },
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: '#fe6c59'
                        }
                    }
                }, {
                    name: '2015',
                    data: data[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        textStyle: {
                            color: '#000'
                        },
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: '#4687e6'
                        }
                    }
                }]
            };
            pricing.setOption(pricing_option);
        }])
}());