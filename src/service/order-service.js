/*
* @Author: Administrator
* @Date:   2018-04-05 17:47:15
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 19:38:44
*/
var _sm = require("util/sm.js");

var _order = {
	// 获取商品列表
	getProductList : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder:function(orderInfo,resolve,reject){
    	_sm.request({
            url     : _sm.getServerUrl('/order/create.do'),
            data	:orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList:function(listParam,resolve,reject){
        _sm.request({
            url:_sm.getServerUrl('/order/list.do'),
            data:listParam,
            success:resolve,
            error:reject
        });
    },
    // 获取订单详情
    getOrderDetail:function(orderNumber,resolve,reject){
        _sm.request({
            url:_sm.getServerUrl('/order/detail.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    },
    // 取消订单
    cancelOrder:function(orderNumber,resolve,reject){
        _sm.request({
            url:_sm.getServerUrl('/order/cancel.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    }
};

module.exports = _order;