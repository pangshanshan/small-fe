/*
* @Author: Administrator
* @Date:   2018-04-03 11:14:10
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 14:29:08
*/
require('./index.css');
var _sm = require('util/sm.js');
var templatePagination = require('./index.string');

function Pagination(){
	var _this = this;
	this.defaultOption = {
		container	:null,
		pageNum		:1,	//当前选中页数
		pageRange	:3,	//左右浮动数
		onSelectPage:null	//回调函数
	};
	// 事件的处理 点击分页
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		// 对active和disabled按钮点击，不做处理
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? 
			_this.option.onSelectPage($this.data('value')) : null;
	});
}
// 渲染分页组件
Pagination.prototype.render = function(userOption){
	// 合并选项
	this.option = $.extend({},this.defaultOption,userOption);
	// 判断容器是否为合法的jquery对象
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	// 判断是否只有一页
	if(this.option.pages <= 1){
		return;
	}
	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html |上一页|1234 =5= 6|下一页| 5/6
Pagination.prototype.getPaginationHtml = function(){
	var html = '',
		option = this.option,
		pageArray = [],
		start = option.pageNum - option.pageRange > 0
			? option.pageNum - option.pageRange : 1;
		end = option.pageNum + option.pageRange < option.pages
			? option.pageNum + option.pageRange : option.pages;
	pageArray.push({
		name	:'上一页',
		value	:option.prePage,
		disabled:!option.hasPreviousPage
	});
	for(var i=start;i<=end;i++){
		pageArray.push({
			name:i,
			value:i,
			active:(i=== option.pageNum)
		});
	}
	pageArray.push({
		name	:'下一页',
		value	:option.nextPage,
		disabled:!option.hasNextPage
	});
	html = _sm.renderHtml(templatePagination,{
		pageArray	:pageArray,
		pageNum		:option.pageNum,
		pages		:option.pages
	});
	return html;
}

module.exports = Pagination;