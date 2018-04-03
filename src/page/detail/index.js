/*
* @Author: Administrator
* @Date:   2018-04-03 14:46:11
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 19:00:30
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm = require('util/sm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateDetail = require('./index.string');

var _page = {
	data:{
		productId:_sm.getUrlParam('productId') || ''
	},
	init:function(){
		this.onLoad();
		this.bindEvent();		
	},
	onLoad:function(){
		// 如果没有传productId自动跳回首页
		if(!this.data.productId){
			_sm.goHome();
		}
		this.loadDetail();
	},
	bindEvent:function(){
		var _this = this;
		// 图片预览：因为一进页面就加载，所以无法直接绑定事件到元素，要通过事件代理
		$(document).on('mouseenter','.p-img-item',function(){
			var imgUrl = $(this).find('.p-img').prop("src");
			$(".main-img").prop("src",imgUrl);
		});
		// count操作
		$(document).on("click",".p-count-btn",function(){
			var type = $(this).hasClass("plus") ? 'plus' : 'minus',
				$pCount = $(".p-count"),
				curCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if(type === 'plus'){
				$pCount.val(curCount < maxCount ? curCount + 1 : maxCount);
			} else if(type === 'minus') {
				$pCount.val(curCount > minCount ? curCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on("click",".cart-add",function(){
			_cart.addToCart({
				productId:_this.data.productId,
				count:parseInt($(".p-count").val())
			},function(res){
				window.location.href = './result.html?type=cart-add';
			},function(errMsg){
				_sm.errorTips(errMsg);
			});
		});
	},
	loadDetail:function(){
		var _this = this,
			html = '',
			$pageWrap = $(".page-wrap");
		$pageWrap.html('<div class="loading"></div>');
		_product.getProductDetail(this.data.productId,function(res){
			_this.filter(res);
			// 缓存detail的数据
			_this.data.detailInfo = res;
			html = _sm.renderHtml(templateDetail,res);
			$pageWrap.html(html);
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});
	},
	// 返回的subImages是一个多个img拼接，要分隔成字符串
	filter:function(data){
		data.subImages = data.subImages.split(',');
	}
};

$(function(){
	_page.init();
})