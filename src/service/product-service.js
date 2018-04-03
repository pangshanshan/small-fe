/*
* @Author: Administrator
* @Date:   2018-04-02 19:07:10
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 17:38:42
*/
var _sm = require('util/sm.js');

var _product = {
	// 获取商品列表
	getProductList:function(listParam,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/product/list.do'),
			data:listParam,
			success:resolve,
			error:reject
		});
	},
	// 获取商品详细信息
	getProductDetail:function(productId,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/product/detail.do'),
			data:{
				productId:productId
			},
			success:resolve,
			error:reject
		});
	},
};

module.exports = _product;