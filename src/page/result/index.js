/*
* @Author: Administrator
* @Date:   2018-03-29 14:37:32
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-09 20:32:29
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _sm = require('util/sm.js');

$(function(){
	var type = _sm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success');

	if(type == 'payment'){
		var orderNumber = _sm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
	}

	// 显示对应的提示元素
	$element.show();
})