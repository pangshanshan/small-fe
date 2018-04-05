/*
* @Author: Administrator
* @Date:   2018-03-28 19:15:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-05 14:37:33
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
	},
	// 获取购物车列表
	getCartList:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/list.do'),
			success:resolve,
			error:reject
		});
	},
	// 选中商品
	selectProduct:function(productId,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/select.do'),
			data:{
				productId:productId
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 取消选中
	unselectProduct:function(productId,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/un_select.do'),
			data:{
				productId:productId
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 全选商品
	selectAllProduct:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/select_all.do'),
			success:resolve,
			error:reject
		});
	},
	// 取消全选
	unselectAllProduct:function(resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/un_select_all.do'),
			success:resolve,
			error:reject
		});
	},
	// 更新购物车商品数量
	updateProduct:function(productInfo,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/update.do'),
			data:productInfo,
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	// 删除购物车商品
	deleteProduct:function(productIds,resolve,reject){
		_sm.request({
			url:_sm.getServerUrl('/cart/delete_product.do'),
			data:{
				productIds:productIds
			},
			method:'POST',
			success:resolve,
			error:reject
		});
	},
};

module.exports = _cart;