require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
navSide.init({
	name:'user-center'	//切换的时候会闪，是因为没有给nav-side设置高度，设置min-height即可
});