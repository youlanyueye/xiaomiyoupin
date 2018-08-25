define(["jquery", "jquery-cookie"], function($){
	var goods = function(){
		console.log("成功");
		//点击火箭滚动到页头
		$('.rocket').click(function(){
			$("html,body").animate({scrollTop:0},1000);
		});

	}
	return {
		goods: goods
	}

})