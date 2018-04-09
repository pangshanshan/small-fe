/*
* @Author: Administrator
* @Date:   2018-04-05 17:39:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 16:43:38
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _sm = require('util/sm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressModal = require('./address-modal.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var page = {
	data:{
		selectedAddressId:null
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		// 地址选择
		$(document).on("click",".address-item",function(){
			var $this = $(this);
			$this.addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $this.data('id');
		});
		// 地址添加
		$(document).on("click",".address-add",function(){
			addressModal.show({
				isUpdate:false,
				onSuccess:function(){
					_this.loadAddressList();
				}
			});
		});
		// 编辑地址
		$(document).on("click",".address-update",function(e){
			e.stopPropagation();
			var shippingId = $(this).parents(".address-item").data("id");
			_address.getAddress(shippingId,function(res){
				addressModal.show({
					isUpdate:true,
					data:res,
					onSuccess:function(){
						_this.loadAddressList();
					}
				});
			},function(errMsg){
				_sm.errorTips(errMsg);
			});
		});
		// 删除地址
		$(document).on("click",".address-delete",function(e){
			e.stopPropagation();
			var shippingId = $(this).parents(".address-item").data("id");
			if(window.confirm('确定要删除该地址吗？')){
				_address.deleteAddress(shippingId,function(res){
					_this.loadAddressList();
				},function(errMsg){
					_sm.errorTips(errMsg)
				});
			}
		});
		// 订单提交
		$(document).on("click",".order-submit",function(){
			var shippingId = _this.data.selectedAddressId;
			if(shippingId){
				_order.createOrder({
					shippingId:shippingId
				},function(res){
					window.location.href = './payment.html?orderNumber='+res.orderNo;
				},function(errMsg){
					_sm.errorTips(errMsg);
				})
			} else {
				_sm.errorTips('请选择地址后再提交');
			}
		});
	},
	// 加载地址列表
	loadAddressList:function(){
		var _this = this;
		$(".address-con").html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressHtml = _sm.renderHtml(templateAddress,res);
			$(".address-con").html(addressHtml);
		},function(errMsg){
			$(".address-con").html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		});
	},
	// 处理地址列表中选中状态
	addressFilter:function(data){
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for(var i=0,len = data.list.length;i<len;i++){
				if(this.data.selectedAddressId === data.list[i].id){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			}
			// 如果以前选中的地址不在列表了，将其删除
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品清单
	loadProductList:function(){
		var _this = this;
		$(".product-con").html('<div class="loading"></div>');
		_order.getProductList(function(res){
			var productListHtml = _sm.renderHtml(templateProduct,res);
			$(".product-con").html(productListHtml);
		},function(errMsg){
			$(".product-con").html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
		});
	}
};

$(function(){
	page.init();
})