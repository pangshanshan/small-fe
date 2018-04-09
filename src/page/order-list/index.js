/*
* @Author: Administrator
* @Date:   2018-04-09 16:47:13
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 18:04:23
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/sm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		// 初始化左侧菜单
		navSide.init({
			name:'order-list'
		});
		// 加载订单列表
		this.loadOrderList();
	},
	// 加载订单列表
	loadOrderList:function(){
		var _this 			= this,
			orderListHtml 	= '',
			$listCon 		= $(".order-list-con");
		_order.getOrderList(_this.data.listParam,function(res){
			orderListHtml = _sm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);

			// 分页
			// _this.loadPagination();
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		});
	}
};

$(function(){
	page.init();
})
