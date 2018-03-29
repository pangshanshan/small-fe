/*
* @Author: Administrator
* @Date:   2018-03-29 14:37:32
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-29 15:09:13
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _sm = require('util/sm.js');

$(function(){
	var type = _sm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success');
	// 显示对应的提示元素
	$element.show();
})