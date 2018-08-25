define(["headf", "public"], function(headf, public){
	var product = function(){
		public.public();

		function cli_src(node){
			//边框变色
			node.addClass('active').siblings().removeClass('active');
			//改变主图
			$('.main-img img').attr('src', node.find('img').attr('src'));
			$('.max-img img').attr('src', node.find('img').attr('src'));
		}
		//获取选中节点的下标
		var ind = null;
		function active_ind(){
			$('.thumb-pic').each(function(index, el){
				if($(el).attr('class') == 'thumb-pic active'){
					ind = index;
				}
			})
		}

		//点击选中节点
		var num = $('.thumb-pic').length;
		$('.thumb-pic').click(function(event) {
			cli_src($(this));
			var ptop = $(this).offset().top - $('.thumb').offset().top;
			var pindex = $(this).index();
			//alert(ptop);
			if(ptop == 0){
				if(pindex !== 0){
					$('.thumb-container').animate({top: ((pindex - 1) * -111)});
				}
			}
			if(ptop == 333){
				if(pindex !== $('.thumb-pic').length - 1)
					$('.thumb-container').animate({top: ((pindex - 2) * -111)});
			}
		});
		$('.arrow-up').click(function(event) {
			var thumb_top = $('.thumb').offset().top;
			var container_top = $('.thumb-container').offset().top;
			active_ind();
			if(ind != 0){
				cli_src($('.thumb-pic').eq(ind - 1));
			}

			var ind_off = $('.thumb-pic').eq(ind).offset().top;
			if(thumb_top - container_top > 0 && ind_off == 296){
				let top = $('.thumb-container').css('top');
				top = parseInt(top);
				$('.thumb-container').animate({top: (top + 111)});
			}
		});
		$('.arrow-down').click(function(event) {
			var thumb_top = $('.thumb').offset().top;
			var container_top = $('.thumb-container').offset().top;
			active_ind();
			if(ind != num){
				cli_src($('.thumb-pic').eq(ind + 1));				
			}

			var ind_off = $('.thumb-pic').eq(ind).offset().top;
			if(thumb_top - container_top < 222 && ind_off == 407){
				let top = $('.thumb-container').css('top');
				top = parseInt(top);
				$('.thumb-container').animate({top:(top - 111)});
			}
		});


		//主图放大镜效果
		$('.main-img').on('mouseenter', function(e) {

			$('.slider').css('display', 'block');
			$('.max-img').css('display', 'block');
			
			$('.main-img').on('mousemove', function(e) {
				var sleft = e.pageX - $('.main-img').offset().left - ($('.slider').width())/2;
				if(sleft < 0){
					sleft = 0;
				}else if(sleft > $('.main-img').width() - ($('.slider').width())){
					sleft = $('.main-img').width() - $('.slider').width();
				}
				var stop = e.pageY - $('.main-img').offset().top - ($('.slider').height())/2;
				if(stop < 0){
					stop = 0;
				}else if(stop > $('.main-img').height() - ($('.slider').height())){
					stop = $('.main-img').height() - $('.slider').height();
				}
				$('.slider').css('left', sleft + 'px');
				$('.slider').css('top', stop + 'px');

				var bX = $('.main-img').width() / ($('.main-img').width() - $('.slider').width());
				var bY = $('.main-img').height() / ($('.main-img').height() - $('.slider').height());
				

				$('.max-img img').css('left', (-sleft * bX) + 'px');
				$('.max-img img').css('top', (-stop * bY) + 'px');
			});
		});
		$('.main-img').on('mouseleave', function(event) {
			$('.slider').css('display', 'none');
			$('.max-img').css('display', 'none');
			
			$('.main-img').on('mousemove', function(e) {});
		});	


		//点击+ —
		$('.minus-btn-active').click(function(){
			let num = $('.count-input').attr('value');

			if(num > 1){
				$('.count-input').attr('value', num - 1);
				if(num == 2){
					$('.minus-btn-active i').css('background-position', '0 -1390px');
				}
			}
		})
		$('.minus-btn').click(function(){
			let num = $('.count-input').attr('value');
			$('.count-input').attr('value', parseInt(num) + 1);
			$('.minus-btn-active i').css('background-position', '0 -1356px');
		})


		//页面滚动时nav-title详细信息导航栏的动作
		$(window).on("scroll", function(){
			var dist = $(window).scrollTop();
			var oNav = $('.nav-title')[0];
			var nleft = $('.logo').offset().left - $(document).scrollLeft();
			if(dist > 557){
				oNav.style.position = 'fixed';
				oNav.style.top = '52px';
				oNav.style.left = nleft + 'px';
			}else{
				oNav.style.position = 'static';
			}
		})

		//点击切换详细信息
		$('.nav-title li').click(function(event) {
			let num = $(this).index();
			$('.nav-arr').animate({left:(128 * num)}, .2);
			$('.main-body').find('.no').css('display', 'none');
			$('.main-body').find('.no').eq(num).css('display', 'block');
		});
	}
	return {
		product: product
	}

})