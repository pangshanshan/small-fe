/*
* @Author: Administrator
* @Date:   2018-03-28 19:31:33
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-28 20:00:46
*/
require('./index.css');
var _sm = require('util/sm.js');

var header = {
	init:function(){
		this.bindEvent();
	},
	onLoad:function(){
		var keyword = _sm.getUrlParam('keyword');
		// keyword存在，则回填输入框
		if(keyword){
			$("#search-input").val(keyword);
		}
	},
	bindEvent:function(){
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$("#search-btn").click(function(){
			_this.searchSubmit();
		});
		// 输入回车后，做搜索提交
		$("#search-input").keyup(function(e){
			// 13是回车键的keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit:function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳转list页
		if(keyword){
			window.location.href = './list.html?keyword='+keyword;
		}
		// 如果keyword为空，直接返回首页
		else {	
			_sm.goHome();
		}
	}
};

header.init();	//不需要exports,只在内部使用