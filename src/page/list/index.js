/*
* @Author: Administrator
* @Date:   2018-04-02 18:59:31
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 14:27:58
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm = require('util/sm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var _page = {
	data:{
		listParam:{
			keyword		:_sm.getUrlParam('keyword') || '',
			categoryId	:_sm.getUrlParam('categoryId') || '',
			orderBy     :_sm.getUrlParam('orderBy')    || 'default',
            pageNum     :_sm.getUrlParam('pageNum')    || 1,	//可以直接跳到第几页
            pageSize    :_sm.getUrlParam('pageSize')   || 20	//一次请求数
		}
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
        this.loadList();
    },
	bindEvent:function(){
		var _this = this;
		// 点击排序，注意，此时是一个新的列表，因此要把页码pageNum置1
		$(".sort-item").click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			if($this.data('type') === 'default'){	//默认排序
				if($this.hasClass('active')){
					return;
				} else {
					$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			} else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				} else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			// 重新加载列表
			_this.loadList();
		});
	},
	// 加载list数据
	loadList:function(){
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			$pListCon   = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		// 删除参数中不必要的字段
		listParam.keyword ? (delete listParam.categoryId) : (delete listParam.keyword);
		// 请求接口
		_product.getProductList(listParam,function(res){
			console.log(res);
			listHtml = _sm.renderHtml(templateIndex,{
				list:res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage	:res.hasPreviousPage,
				prePage 		:res.prePage,
				hasNextPage		:res.hasNextPage,
				nextPage 		:res.nextPage,
				pageNum 		:res.pageNum,	//当前页数
				pages 			:res.pages 		//pages总页数
			});
		},function(errMsg){
			_sm.errorTips(errMsg);
		});
	},
	// 加载分页信息
	loadPagination:function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container:$(".pagination"),
			onSelectPage:function(pageNum){	//分页按钮点击的返回
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}))
	}
};

$(function(){
	_page.init();
})