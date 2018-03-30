/*
* @Author: Administrator
* @Date:   2018-03-28 18:54:14
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-30 20:34:25
*/
var _sm = require('util/sm.js');

var _user = {
	// 检查用户名是否已存在
	checkUsername:function(username,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/check_valid.do'),
			method:'POST',
			data: {
                type : 'username',
                str  : username
            },
			success:resolve,
			error:reject
		});
	},
	// 用户注册
	register:function(userInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/register.do'),
			data:userInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 用户登录
	login:function(userInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/login.do'),
			data:userInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 登出
	logout:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/logout.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 检查登录状态
	checkLogin:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/get_user_info.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 获取用户密码提示问题
	getQuestion:function(username,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/forget_get_question.do'),
			data:{
				username:username
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 检查密码提示问题答案
	checkAnswer:function(userInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/forget_check_answer.do'),
			data:userInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 重置密码
	resetPassword:function(userInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/forget_reset_password.do'),
			data:userInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 获取用户信息
	getUserInfo:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/get_information.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 更新个人信息
	updateUserInfo:function(userInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/update_information.do'),
			data:userInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	updatePassword:function(info,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/user/reset_password.do'),
			data:info,
			method:'POST',
			success:resolve,
			error:reject
		});
	}
};

module.exports = _user;