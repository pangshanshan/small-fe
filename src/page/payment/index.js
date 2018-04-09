/*
* @Author: Administrator
* @Date:   2018-04-09 19:55:14
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 20:18:42
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _sm = require('util/sm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
        orderNumber : _sm.getUrlParam('orderNumber')
    },
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		this.loadPaymentInfo();
	},
	// 加载订单列表
	loadPaymentInfo:function(){
		var _this 			= this,
			paymentHtml 	= '',
			$pageWrap 		= $(".page-wrap");
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNumber,function(res){
			paymentHtml = _sm.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus();
		},function(errMsg){
			$listCon.html('<p class="err-tip">'+errMsg+'</p>');
		});
	},
	// 监听订单状态
	listenOrderStatus:function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if(res == true){
					window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
				}
			},function(errMsg){

			});
		},5e3);
	}
};

$(function(){
	page.init();
})
