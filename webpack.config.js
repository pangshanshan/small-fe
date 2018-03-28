var path = require("path");
var webpack             = require('webpack');
var ExtractTextPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

// 环境变量配置 dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV,'--------')

var getHtmlConfig = function(name){
	return {
        	template: './src/view/'+name+'.html',	//
        	filename:'view/'+name+'.html',	//输出的文件名，以output的path为路径
        	inject:true,
        	hash:true,	//每次编译产生的唯一hash值
        	chunks:['common',name]	//引入common.js,index.js
        }
}

var config = {
	// mode:'development',	//开发模式
	entry:{	//多入口
		'common':['./src/page/common/index.js'],	//提取公共模块，和CommonsChunkPlugin配合使用
		'index'	:['./src/page/index/index.js'],
		'login'	:['./src/page/login/index.js']
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
    		{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }	//图片
    	]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;