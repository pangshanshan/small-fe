/*
* @Author: Administrator
* @Date:   2018-04-05 11:04:55
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-05 17:32:36
*/
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _sm = require('util/sm.js');
var _cart = require('service/cart-service.js');
var templateDetail = require('./index.string');

var _page = {
	data:{
		cartInfo:null
	},
	init:function(){
		this.onLoad();
		this.bindEvent();		
	},
	onLoad:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		// 商品的选择 / 取消选择
		$(document).on("click",".cart-select",function(){
			var $this = $(this);
			var productId = $this.parents("tr").data("product-id");
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			} else {
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				});
			}
		});
		// 商品的全选 / 取消全选
		$(document).on("click",".cart-select-all",function(){
			var $this = $(this);
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			} else {
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				});
			}
		});
		// 商品数量
		$(document).on("click",".count-btn",function(){
			var $this 		= $(this),
				$pCount 	= $this.siblings('.count-input'),
				currCount 	= parseInt($pCount.val()),
				type 		= $this.hasClass('minus') ? 'minus' : 'plus',
				productId 	= $this.parents("tr").data("product-id"),
				minCount 	= 1,
				maxCount 	= $pCount.data('max'),
				newCount 	= 0;

			if(type === 'minus'){
				if(currCount <= minCount){
					return;
				}			
				newCount = currCount - 1;	
			} else if(type === 'plus'){
				if(currCount >= maxCount){
					_sm.errorTips('该商品数量已达到上限');
					return;
				}
				newCount = currCount + 1;
			}
			_cart.updateProduct({
				productId:productId,
				count:newCount
			},function(res){
				_this.renderCart(res);
			},function(errMsg){
				_this.showCartError();
			});
		});
		// 删除单个商品
		$(document).on("click",".cart-delete",function(){
			if(window.confirm('确定要删除该商品吗？')){
				var $this = $(this);
				var productId = $this.parents("tr").data("product-id");
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选择商品
		$(document).on("click",".delete-selected",function(){
			var arrProductIds = [],
				$selectedItem = $(".cart-select:checked");
			if($selectedItem.length){
				if(window.confirm('确定要删除选择的商品吗？')){
					for(var i=0,len = $selectedItem.length;i<len;i++){
						arrProductIds.push($($selectedItem[i]).parents("tr").data("product-id"));
					}
					if(arrProductIds.length){
						_this.deleteCartProduct(arrProductIds.join(","));
					}
				}
			} else {
				_sm.errorTips('您还没有选中要删除的商品');
			}
		});
		// 提交购物车
		$(document).on("click",".btn-submit",function(){
			// 总价大于0，进行提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './order-confirm.html';
			} else {
				_sm.errorTips('请选择商品后再提交');
			}
		})
	},
	loadCart:function(){
		var _this = this;

		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	},
	// 渲染购物车
	renderCart:function(data){
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;
		var	cartHtml = _sm.renderHtml(templateDetail,data);
		$(".page-wrap").html(cartHtml);
		// 通知导航的购物车更新数量
		nav.loadCartCount();
	},
	// 删除指定商品，支持批量，productId用逗号分隔
	deleteCartProduct:function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(){
			_this.showCartError();
		});
	},
	filter:function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError:function(){
		$(".page-wrap").html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
	}
};

$(function(){
	_page.init();
})