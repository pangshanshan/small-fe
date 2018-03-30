/*
* @Author: Administrator
* @Date:   2018-03-28 18:15:36
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-30 17:30:48
*/
require('./index.css');
var _sm = require('util/sm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// 导航
var nav = {
	init:function(){
		this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
	},
	bindEvent:function(){
		// 点击登录事件
		$(".js-login").click(function(){
			_sm.doLogin();
		});
		// 点击注册事件
		$(".js-register").click(function(){
			window.location.href = './user-register.html';
		});
		// 退出点击事件
		$(".js-logout").click(function(){
			_user.logout(function(res){
				window.location.reload();	//不同页面退出后样式显示不同， 因此刷新即可
			},function(errMsg){
				_sm.errorTips(errMsg);
			});
		});
	},
	// 加载用户信息
	loadUserInfo:function(){
		_user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
	},
	// 加载购物车数量
	loadCartCount:function(){
		_cart.getCartCount(function(res){
			$(".nav .cart-count").text(res || 0);
		},function(errMsg){
			$(".nav .cart-count").text(0);
		});
	}
};

module.exports = nav.init();