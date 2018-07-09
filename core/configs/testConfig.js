(function() {
	"use strict";
	angular.module('app.config', [])
		.constant('$defaultConfig', {
			//后台应用URI
			app_uri: 'http://api.dousha8ao.com',
			//当前的URI
			current_uri: '/DSB_SaaS_front',
			//登录失效CODE
			session_timeout_code: 203,
			//session_code
			session_code: 'token',
			//请求头TokenCode
			header_token_code: 'token',
			//外层总URL
			local_url:'/DSB_SaaS_front'
		})
}());