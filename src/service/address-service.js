/*
* @Author: Administrator
* @Date:   2018-04-05 18:49:28
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 15:46:33
*/
var _sm = require("util/sm.js");

var _address = {
	// 获取地址列表
	getAddressList:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/shipping/list.do'),
			data:{
				pageSize:50	//pageNum不写默认为1
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 新建收件人
	save:function(addressInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/shipping/add.do'),
			data:addressInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 更新收件人
	update:function(receiverInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/shipping/update.do'),
			data:receiverInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 删除地址
	deleteAddress:function(shippingId,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/shipping/del.do'),
			data:{
				shippingId:shippingId
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 获取单条收件人信息
	getAddress:function(shippingId,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/shipping/select.do'),
			data:{
				shippingId:shippingId
			},
			success:resolve,
			error:reject
		});
	}
};

module.exports = _address;