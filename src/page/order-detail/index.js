/*
* @Author: Administrator
* @Date:   2018-04-09 18:07:59
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 19:38:20
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/sm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data:{
		orderNumber:_sm.getUrlParam('orderNumber')
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		navSide.init({
			name:'order-list'
		});
		this.loadDetail();
	},
	bindEvent:function(){
		var _this = this;
		$(document).on("click",".order-cancel",function(){
			if(window.confirm('确定取消该订单吗？')){
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_sm.successTips('该订单取消成功');
					_this.loadDetail();
				},function(errMsg){
					_sm.errorTips(errMsg);
				});
			}
		});
	},
	loadDetail:function(){
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(_this.data.orderNumber,function(res){
			_this.dataFilter(res);
			orderDetailHtml = _sm.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);
		},function(errMsg){
			$content.html('<p class="err-tip">'+errMsg+'</p>');
		});
	},
	dataFilter:function(data){
		data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
	}
};

$(function(){
	page.init();
})