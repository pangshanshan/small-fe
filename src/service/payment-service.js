/*
* @Author: Administrator
* @Date:   2018-04-09 20:04:39
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 20:19:07
*/
var _sm = require('util/sm.js');

var _payment = {
	// 支付
	getPaymentInfo : function(orderNumber,resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/pay.do'),
            data	: {
            	orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 查询订单支付状态
    getPaymentStatus:function(orderNumber,resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _payment;