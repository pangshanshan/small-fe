/*
* @Author: Administrator
* @Date:   2018-03-30 18:12:41
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-30 19:29:33
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/sm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		// 初始化左侧菜单
		navSide.init({
			name:'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo:function(){
		var userHtml = '';
		// 加载用户信息
		_user.getUserInfo(function(res){
			userHtml = _sm.renderHtml(templateIndex,res);
			$(".panel-body").html(userHtml);
		},function(errMsg){
			_sm.errorTips(errMsg);
		});
		
	}
};

$(function(){
	page.init();
})