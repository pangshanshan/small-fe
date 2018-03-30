/*
* @Author: Administrator
* @Date:   2018-03-30 20:05:56
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-30 20:38:00
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/sm.js');
var _user = require('service/user-service.js');

var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		// 点击提交按钮
		$(document).on("click",".btn-submit",function(){
			var userInfo = {
					password:$.trim($("#password").val()),
					passwordNew:$.trim($("#password-new").val()),
					passwordConfirm:$.trim($("#password-confirm").val())
				},
				validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld:userInfo.password,
					passwordNew:userInfo.passwordNew
				},function(data,msg){
					_sm.successTips(msg);
				},function(errMsg){
					_sm.errorTips(errMsg);
				});
			}
			else {
				_sm.errorTips(validateResult.msg);
			}
		});
	},
	// 验证字段信息
	validateForm:function(formData){
		var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_sm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
	},
	onLoad:function(){
		// 初始化左侧菜单
		navSide.init({
			name:'user-pass-update'
		});
	}
};

$(function(){
	page.init();
})