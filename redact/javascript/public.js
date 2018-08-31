define(["headf"], function(headf){

	var public = function(){
		//点击logo到首页
		$(".logo").on("click", function(){
			open('index.html');
		})

	

		//是否登录
		var cUser = $.cookie("user") == null ? true : false;
		//alert(cUser);
		if(cUser){
			$('.log_later').css('display', 'none');
			$('.log').css('display', 'block');
		}else{
			$('.log_later').css('display', 'block');
			var user = JSON.parse($.cookie("user"));

			if(user[0]["username"]){
				$('#username').html(`${user[0]["username"]}`);
			}else{
				$('#username').html(`${user[0]["id"]}`);
			}
			
			$('.log').css('display', 'none');
		}

		$('#exit').click(function(event) {
			$.cookie('user', 'null', {expires: -1});
			$('.log_later').css('display', 'none');
			$('.log').css('display', 'block');
		});

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
		

		//加载导航
		$.ajax({
			url: 'data/nav.json'
		})
		.done(function(arr) {
			for(var i = 0; i < arr.length; i++){
				$(`<li>
					<a href="${arr[i][0].grouping_http}" target = "_blank" class="${arr[i][0].grouping_id}">${arr[i][0].grouping_name}</a>
					</li>`
				).appendTo($('#nav2 ul'));
				if(arr[i][1]){
					$(`<span>/</span>
						<a href="${arr[i][1].grouping_http}" target = "_blank" class="${arr[i][1].grouping_id}">${arr[i][1].grouping_name}</a>`
				).appendTo($('#nav2 ul li').eq(i));
				}
			}

			$('#nav2 ul li').each(function(index, el){
					$(`<div class="nav_detail detail_${index}"></div>`).appendTo(el);

					for(var i = 0; i < arr[index].length; i++){

						$(`<div class="grouping">
								<p class="title">
									${arr[index][i].grouping_name}
								</p>
								<ul class="clear">
									
								</ul>
							</div>`).appendTo($('.detail_' + index));
						var subclass = arr[index][i].subclass;
						//alert(index);
						for(var j = 0; j < subclass.length; j++){
							
							$(`<div class="subclass" data-src = "${subclass[j].sub_http}">
									<img src="${subclass[j].sub_src}" alt="${subclass[j].sub_name}">
									<span>
										${subclass[j].sub_name}
									</span>
								</div>`).appendTo($('#nav2 ul li').eq(index).find('.nav_detail .grouping ul').eq(i));
						}
					}
			})
		
		})
		.fail(function(msg) {
			console.log(msg);
		})
		.always(function() {
			$('#nav2').clone(true).attr('id', 'nav').prependTo($('#banner'));
		});

		$("#nav2 ul").on("mouseenter", "li", function(){
			$(this).css('background', '#684b34');
			var index = $(this).index();
			$(this).find('.nav_detail').css('display', 'block');
		})
		$("#nav2 ul").on("mouseleave", "li", function(){
			$(this).css('background', '#845f3f');
			var index = $(this).index();
			$(this).find('.nav_detail').css('display', 'none');
		})
		//子导航点击事件
		$("#nav2 ul").on("click", ".subclass", function(){
			var data_src = $(this).attr('data-src');
			open(data_src);
		})

		


		//分类下的导航栏移入移出
		$('.nav_part_box').on('mouseenter', function(){
			$('.nav_part_box #nav2').css('display', 'block');
		})
		$('.nav_part_box').on('mouseleave', function(){
			$('.nav_part_box #nav2').css('display', 'none');
		})



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


		//购物车

		// 购物车数字
		function sc_car(){
			var str = $.cookie("goods");
			if(str){
				var arr = eval(str);
				var sum = 0;
				for(var i = 0; i < arr.length; i++){
					sum += arr[i].num;
				}

				$(".cart-news").html(sum);
				$(".cart-news").css('display', 'block');
			}else{
				$(".cart-news").css('display', 'none');
			}
		}

		sc_car();



		//显示购物车内商品
		function sc_msg(){
			$.ajax({
				url: 'data/product.json',
				success: function(arr){
					//在所有商品信息里面找出，加入购物车的商品信息
					var cookie_arr = eval($.cookie('goods'));
					for(var i = 0; i < cookie_arr.length; i++){
						for (var j = 0; j < arr.length; j++) {
							//alert(arr[j].pro_id);
							if(arr[j].pro_id == cookie_arr[i].id){
								$(`<li class='clear'>
										<div class = "sc_goodsPic">
											<img src="${arr[j].pro_src_s}" alt="">
										</div>
										<div class = "sc_goodsTitle">
											<p>${arr[j].sub_name}</p>
										</div>
										<div class = "sc_goodsNum">商品数量:${cookie_arr[i].num}</div>
									</li>`).appendTo($(".shop_lish ul"));
							}
						}
					}
				}
			})
		}


		$("#cart").mouseenter(function(){
			$(".shop_lish ul").html("");
			$('.shop_lish').css('display', 'block');
			sc_msg();
		});
		$("#cart").mouseleave(function(){
			$('.shop_lish').css('display', 'none');

		});



		
		//点击火箭滚动到页头
		$('.rocket').click(function(){
			$("html,body").stop().animate({scrollTop:0},1000);
		});

	}
	return {
		public: public
	}

})