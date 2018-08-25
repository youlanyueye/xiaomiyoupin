define(["headf", "public"], function(headf, public){
	var product = function(){
		
		public.public();


		function cli_src(node){
			//边框变色
			node.addClass('active').siblings().removeClass('active');
			//改变主图
			$('.main-img img').attr('src', node.find('img').attr('src'));
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



	}
	return {
		product: product
	}

})