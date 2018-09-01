define(["headf","public"], function(headf, public){
	var main = function(){
		$(function(){

			public.public();

			//轮播图
			var oBtns = $("#scrollbar").find("ol").find("span");
			var oUl = $("#scrollbar").find("ul");
			var aLi = oUl.find("li");

			var iNow = 0; //记录当前是第几张
			var timer = null; //设计记录定时器的标识

			function Interval(){
				timer = setInterval(timerInner, 2000);
			}
			Interval();
			function timerInner(){
				iNow++;
				tab();
			}

			function tab(){
				//document.title = iNow;
				if(iNow == oBtns.size()){
					oBtns.attr("class", "");
					oBtns.eq(0).attr("class", "active");
				}else{
					oBtns.attr("class", "");
					oBtns.eq(iNow).attr("class", "active");
				}
				
				oUl.stop().animate({left: iNow * -858}, function(){
					if(iNow == oBtns.size()){
						iNow = 0;
						oUl.css("left", "0px");
					}
				});
			}

			var timeout = null;
			oBtns.click(function(){
				iNow = $(this).index();
				tab();
				clearInterval(timer);
				clearTimeout(timeout);
				timeout = setTimeout(Interval, 3000);

			})

			$('#scrollbar .scr_arrow_l').click(function(){
				if(iNow == 0){
					oUl.css("left", (oBtns.size() * -858) + "px");
					iNow = (oBtns.size() - 1);
				}else{
					iNow--;
				}
				
				tab();
				clearInterval(timer);
				clearTimeout(timeout);
				timeout = setTimeout(Interval, 3000);
			});
			$('#scrollbar .scr_arrow_r').click(function(){
				if(iNow == oBtns.size()){
					iNow = 0;
				}else{
					iNow++;
				}
				
				tab();
				clearInterval(timer);
				clearTimeout(timeout);
				timeout = setTimeout(Interval, 3000);
			});

			//鼠标移入轮播图时停止定时器
		  /*oUl.on("mouseenter", function(){
				clearInterval(timer);
			})
			oUl.on("mouseleave", function(){
				clearInterval(timer);
				Interval();
			})*/


			//点击商品跳转
			$('#crowd .crowd-pos, .hot_box, .brand_box').click(function(){
				var ihttp = $(this).attr('data-src');
				open(ihttp);
			});


			//左右切换函数
			function hot_tab(node, n){
				node.stop().animate({left: n * -271}, function(){
				});
			}
			
			//热门左右切换
			var hot_n = 0;
			$('#hot .scr_arrow_l').click(function(){
				if(hot_n > 0){
					hot_n--;
					hot_tab($('.hot_b_box'), hot_n);
				}
			});
			$('#hot .scr_arrow_r').click(function(){
				if(hot_n < ($('#hot .hot_box').size() - 4)){
					hot_n++;
					hot_tab($('.hot_b_box'), hot_n);
				}
			});



			//品牌左右切换
			var brand_n = 0;
			$('#brand .scr_arrow_l').click(function(){
				if(brand_n > 0){
					brand_n--;
					hot_tab($('.brand_b_box'), brand_n);
				}
			});
			$('#brand .scr_arrow_r').click(function(){
				if(brand_n < ($('#brand .brand_box').size() - 4)){
					brand_n++;
					hot_tab($('.brand_b_box'), brand_n);
				}
			});


			//加载产品分类数据
			$.ajax({
				url: 'data/pro.json'
			})
			.done(function(arr) {
				//alert(arr);
				for(var i = 0; i < arr.length; i++){
					$(`<div class="section_b sec${i}">
							<div class="margin sec-main">
								<!-- 产品分类头部 -->
								<div class="randomBg-top clear">
									<div class="spacial-guide" style="background-color: ${arr[i].background_color};">
										<h2 class="top-tit">${arr[i].classify_name}</h2>
										<span class="pro-more tag-a" data-target="_blank" data-src = "${arr[i].classify_id}.html">更多 &gt;</span>
									</div>
									<div class="randomBg-img tag-a" data-src="product.html?gid=${arr[i].banner_id}">
										<img class="" src="${arr[i].banner_src}">
									</div>
								</div>
								<!-- 产品集合 -->
								<div class="product-list clear"></div>
							</div>
						</div>`).insertBefore($('#fixedBar'));
						var pro = arr[i].product;
						for(var j = 0; j < pro.length; j++){
							$(`<div class="pro-item-box"><div class="pro-item tag-a" data-src="product.html?gid=${pro[j].pro_id}">
									<div class="pro-img valign">
										<img src="${pro[j].pro_src}">
									</div>
									<p class="pro-desc over">${pro[j].pro_intro}</p>
									<div class="pro-text-inner">
										<p class="pro-info over">${pro[j].sub_name}</p>
										<p class="pro-price">
											<span class="pro-num">¥${pro[j].pro_price}起</span>
										</p>
									</div>
								</div></div>`).appendTo($('.product-list').eq(i));
							if(pro[j].sale){
								$(`<span class="sale-tag">直降</span>`).appendTo($('.product-list').eq(i).find('.pro-price').eq(j));
							}
						}							
					}
			})
			.fail(function(msg) {
				console.log(msg);
			})
			.always(function() {
				$('.tag-a').click(function(){
					var phtml = $(this).attr('data-src');
					open(phtml);
				});
			});

		})
	}
	return {
		main: main
	}

})