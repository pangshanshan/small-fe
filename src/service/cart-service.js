/*
* @Author: Administrator
* @Date:   2018-03-28 19:15:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-28 19:18:41
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
	}
};

module.exports = _cart;