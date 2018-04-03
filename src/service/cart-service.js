/*
* @Author: Administrator
* @Date:   2018-03-28 19:15:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 19:01:19
*/
var _sm = require('util/sm.js');

var _cart = {
	// 获取购物车数量
	getCartCount:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/get_cart_product_count.do'),
			success:resolve,
			error:reject
		});
	},
	// 添加到购物车
	addToCart:function(productInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/add.do'),
			data:productInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	}
};

module.exports = _cart;