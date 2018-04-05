var path = require("path");
var webpack             = require('webpack');
var ExtractTextPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

// 环境变量配置 dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV,'--------')

var getHtmlConfig = function(name,title){
	return {
        	template: './src/view/'+name+'.html',	//
        	filename:'view/'+name+'.html',	//输出的文件名，以output的path为路径
            title:title,
        	inject:true,
        	hash:true,	//每次编译产生的唯一hash值
        	chunks:['common',name]	//引入common.js,index.js
        }
}

var config = {
	// mode:'development',	//开发模式
	entry:{	//多入口
		'common'            :['./src/page/common/index.js'],	//提取公共模块，和CommonsChunkPlugin配合使用
        'index'             :['./src/page/index/index.js'],
        'list'              :['./src/page/list/index.js'],
        'detail'            :['./src/page/detail/index.js'],
		'cart'	            :['./src/page/cart/index.js'],
        'user-login'        :['./src/page/user-login/index.js'],
        'user-register'     :['./src/page/user-register/index.js'],
        'user-pass-reset'   :['./src/page/user-pass-reset/index.js'],
        'user-center'       :['./src/page/user-center/index.js'],
        'user-center-update':['./src/page/user-center-update/index.js'],
		'user-pass-update'  :['./src/page/user-pass-update/index.js'],
        'result'            :['./src/page/result/index.js']
	},
	output:{
		path:path.resolve(__dirname, 'dist'),
		publicPath:'/dist/',
		filename:'js/[name].js'		//分文件类别
	},
	externals : {	//外部依赖的声明
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
    		{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },	//css单独打包的使用方式
    		{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },	//图片
            { test: /\.string$/, loader:'html-loader'}
    	]
    },
    resolve:{
        alias:{
            node_modules:__dirname + '/node_modules',
            image:__dirname + '/src/image',
            page:__dirname + '/src/page',
            service:__dirname + '/src/service',
            util:__dirname + '/src/util'
        }
    },
    plugins: [
    	// 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'	//输出路径，如果不指定，则会生成common.js，以output的path为路径
        }),
        // 把css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),	//输出路径，以output的path为路径
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;