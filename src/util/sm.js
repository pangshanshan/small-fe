/*
* @Author: Administrator
* @Date:   2018-03-28 13:06:30
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-28 18:36:25
*/
var Hogan = require('hogan.js');	//渲染html模板
var conf = {
	serverHost:''
};

var _sm = {
	// 网络请求
	request:function(param){
		var _this = this;
		$.ajax({
			url		:param.url 		|| '',
			type 	:param.method 	|| 'get',
			dataType:param.type 	|| 'json',
			data 	:param.data 	|| '',
			success:function(res){
				// 请求成功
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				// 没有登录状态，需要强制登录
				else if(res.status === 10){
					_this.doLogin();	//ajax异步
				}
				// 请求数据错误
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error:function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	// 获取服务器地址
	getServerUrl:function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam:function(name){
		var reg = new RegExp('(?:^|&)'+name+'=([^&]*)(?:&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[1]) : null;
	},
	// 渲染html模板
	renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    // 成功提示
    successTips:function(msg){
    	alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips:function(msg){
    	alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持是否为空、手机、邮箱的判断
    validate:function(value,type){
    	value = $.trim(value);
    	// 非空验证
    	if(type === 'require'){
    		return !!value;
    	}
    	// 手机号验证
    	if(type === 'phone'){
    		return /^1\d{10}$/.test(value);
    	}
    	// 邮箱格式验证
    	if(type === 'email'){
    		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    	}
    },
	// 统一登录处理
	doLogin:function(){
		window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
	},
	// 返回主页
	goHome:function(){
		window.location.href = './index.html'
	}
};

module.exports = _sm;