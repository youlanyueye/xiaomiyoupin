define(["headf"], function(headf){

	var public = function(){

		//用户名称部分移入移出
		$('.log_later').mouseenter(
			function(){
				$('.userinfo').css('display', 'block')
			}
		)
		$('.log_later').mouseleave(
			function(){
				$('.userinfo').css('display', 'none')
			}
		)
		
		//页面滚动时head动作
		$(window).on("scroll", function(){
			var dist = $(window).scrollTop();
			var oHead = $('#head')[0];
			var oNav_part = $('.nav_part')[0];
			if(dist > 482){
				oHead.style.position = 'fixed';
				oHead.style.top = '0px';
				oHead.style.left = '0px';
				oHead.style.right = '0px';
				oHead.style.marginBottom = '0px';
				oHead.style.paddingTop = '0px';
				oHead.style.borderBottom = '1px solid #eee';
				oHead.style.opacity = '1';
				oNav_part.style.display = 'block';
			}else{
				oHead.style.position = 'static';
				oHead.style.marginBottom = '5px';
				oHead.style.paddingTop = '20px';
				oHead.style.borderBottom = 'none';
				oNav_part.style.display = 'none';
			}
		})



		
		//点击火箭滚动到页头
		$('.rocket').click(function(){
			$("html,body").animate({scrollTop:0},1000);
		});

	}
	return {
		public: public
	}

})