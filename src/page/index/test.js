/*
* @Author: Administrator
* @Date:   2018-03-28 18:01:33
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-28 18:02:05
*/

// var $$ = require('jquery');
// $$("body").html('hello index112~~~~~');
// console.log('hello index');

var _sm = require('util/sm.js');
// 测试ajax
_sm.request({
	// url:'./test.do',
	// url:'http://happymmall.com/product/list.do?keyword=1',
	url:'/product/list.do?keyword=1',
	success:function(res){
		console.log(res);
	},
	error:function(errMsg){
		console.log(errMsg);
	}
});
// 测试获取url参数
console.log(_sm.getUrlParam('age'));	//http://localhost:8088/dist/view?age=中国

// 测试html渲染模板
var html = '<div>123{{name}}</div>';
var data = {
	name:'abc'
};
console.log(_sm.renderHtml(html,data));