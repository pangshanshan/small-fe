/*
* @Author: Administrator
* @Date:   2018-03-28 18:54:14
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-28 19:10:44
*/
var _sm = require('util/sm.js');

var _user = {
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
	}
};

module.exports = _user;