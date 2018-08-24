
/*
	配置模块
 */ 
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"index": "index",
	},
	//设置，模块之间的依赖关系
	shim: {
		//保证，先加载JQuery，再加载
		"jquery-cookie": ["jquery"]

	}
})

//调用函数
require(["index"], function(index){
	index.main();
})