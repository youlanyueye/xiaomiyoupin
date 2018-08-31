define(["headf", "public"], function(headf, public){
	var cart_m = function(){
		public.public();

		//移除空白节点，空白节点的类型是3
		function removeWhiteNode(node) {
		    for (var i = 0; i < node.childNodes.length; i++) {
		        if (node.childNodes[i].nodeType === 3 && /^\s+$/.test(node.childNodes[i].nodeValue)) {
		            node.childNodes[i].parentNode.removeChild(node.childNodes[i]);
		        }
		    }
		    return node;
		}
		var oTitle = $('.title')[0];
		removeWhiteNode(oTitle);

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
				if(sum == 0){
					$(".cart-news").css('display', 'none');
				}else{
					$(".cart-news").css('display', 'block');
				}
				
			}else{
				$(".cart-news").css('display', 'none');
			}
		}


		//获取cookie并转成数组
		var cookie_arr = eval($.cookie('goods'));

		//创建商品选择数组
		var sel_goods = [];
		for (var i = 0; i < cookie_arr.length; i++) {
			let obj = {id:cookie_arr[i].id , isyes:true};
			sel_goods.push(obj);
		}


		//计算商品总数量
		function snum_c(){
			var snum = 0;
			for (var j = 0; j < sel_goods.length; j++) {
				if(sel_goods[j].isyes){
					for(var i = 0; i < cookie_arr.length; i++){
						if(sel_goods[j].id == cookie_arr[i].id){
							snum += cookie_arr[i].num;
						}
					}
				}
			}
			$(".already-select span").html(snum);

		}
		//计算总价
		function sun_c(){
			var sum = null;
			for (var j = 0; j < sel_goods.length; j++) {
				if(sel_goods[j].isyes){
					$('.cart-goods-con').each(function(index, el){
						if(sel_goods[j].id == $(el).attr('gid')){
							var n = $('.subtotal span').eq(index).html();
							n = Number(n.replace('￥', ''));
							sum = sum + n;
						}
					});
				}
			}

			if(sum){
				$('.totol-price-con span').html(`￥${sum}`);
			}else{
				$('.totol-price-con span').html(`￥0`);
			}
		}



		if(cookie_arr){
			$.ajax({
				url: 'data/product.json',
				success: function(arr){
					//在所有商品信息里面找出，加入购物车的商品信息
					for(var i = 0; i < cookie_arr.length; i++){
						for (var j = 0; j < arr.length; j++) {
							//alert(arr[j].pro_id);
							if(arr[j].pro_id == cookie_arr[i].id){
								$(`<div class="cart-goods-con clear" gid="${cookie_arr[i].id}">
										<div class="select">
											<i class="select-icon-s"></i>
										</div>
										<div class="image" data-src="product.html?gid=${arr[j].pro_id}">
											<img class="" src="${arr[j].pro_src_s}">
										</div>
										<div class="name" data-src="product.html?gid=${arr[j].pro_id}">
											<p class="good-name">${arr[j].sub_name}</p>
										</div>
										<div class="price" price = "${arr[j].pro_price}">
											<span>￥${arr[j].pro_price}</span>
										</div>
										<div class="num">
											<div class="count-container fl">
												<div class="minus-btn-active fl" id='minus'>
													<i class="bgicon aaa"></i>
												</div>  
												<input value="${cookie_arr[i].num}" class="count-input fl" type="text">
												<div class="minus-btn fl" id='plus'>
													<i class="bgicon"></i>
												</div>
											</div>
										</div>
										<div class="subtotal">
											<span>￥${arr[j].pro_price * cookie_arr[i].num}</span>
										</div>
										<div class="del">
											<i class="delete-icon"></i>
										</div>
									</div>`).appendTo($(".cart-merchant-list"));
								break;
							}
						}
					}
					//判断-号是否可用 #minus
					$('.count-input').each(function(index, el){
						//alert($(el).val());
						if($(el).val() > 1){
							$('.aaa').eq(index).css('background-position', '0 -1356px');
						}
					})

					//计算商品总数量
					snum_c();
					//计算总价
					sun_c();
				}
			})
		}


		//点击商品跳转
		$('.cart-merchant-list').on('click', '.image, .name', function(event) {
			var ihttp = $(this).attr('data-src');
			open(ihttp);
		});


		//点击选择符号
		//全选
		$('.select-icon').click(function(event) {
			if(sel_goods.every(function(item, index, array){ return item.isyes == true;})){
				$('.select-icon,.select-icon-s').css('background-position', '0 -490px');
				sel_goods.forEach(function(item, index, array){
					item.isyes = false;
				});
				snum_c();
				sun_c();
			}else{
				$('.select-icon,.select-icon-s').css('background-position', '0 -402px');
				sel_goods.forEach(function(item, index, array){
					item.isyes = true;
				});
				snum_c();
				sun_c();
			}
		});
		//单选
		$('.cart-merchant-list').on('click', '.select-icon-s', function(event) {
			let gid = $(this).parent().parent().attr('gid');
			for (var i = 0; i < sel_goods.length; i++) {
				if(sel_goods[i].id == gid){
					var index = i;
					break;
				}
			}
			if(sel_goods[index].isyes){
				$(this).css('background-position', '0 -490px');
				sel_goods[index].isyes = false;
				snum_c();
				sun_c();
			}else{
				$(this).css('background-position', '0 -402px');
				sel_goods[index].isyes = true;
				snum_c();
				sun_c();
			}

			if(sel_goods.every(function(item, index, array){ return item.isyes == true;})){
				$('.select-icon').css('background-position', '0 -402px');
			}else{
				$('.select-icon').css('background-position', '0 -490px');
			}

		});



		//点击+ —
		$('.cart-merchant-list').on('click', '#minus', function(event) {
			let n = Number($(this).next().val());
			if(n > 1){
				$(this).next().val(n - 1);
				let gid = $(this).parent().parent().parent().attr('gid');
				for(var i = 0; i < cookie_arr.length; i++){
					if(cookie_arr[i].id == gid){
						cookie_arr[i].num -= 1;
						//console.log(JSON.stringify(cookie_arr));
						$.cookie('goods', JSON.stringify(cookie_arr));
						$(this).parent().parent().next().find("span").html(`￥${cookie_arr[i].num * $(this).parent().parent().prev().attr('price')}`);
						snum_c();
						sun_c();
						sc_car();
						break;
					}
				}
				if(n == 2){
					$(this).find('i').css('background-position', '0 -1390px');
				}
			}
		});
		$('.cart-merchant-list').on('click', '#plus', function(event) {
			let n = Number($(this).prev().val());
			$(this).prev().val(n + 1);
			$(this).siblings('#minus').find('i').css('background-position', '0 -1356px');
			let gid = $(this).parent().parent().parent().attr('gid');
			for(var i = 0; i < cookie_arr.length; i++){
				if(cookie_arr[i].id == gid){
					cookie_arr[i].num += 1;
					//console.log(JSON.stringify(cookie_arr));
					$.cookie('goods', JSON.stringify(cookie_arr));
					$(this).parent().parent().next().find("span").html(`￥${cookie_arr[i].num * $(this).parent().parent().prev().attr('price')}`);
					snum_c();
					sun_c();
					sc_car();
					break;
				}
			}
		});

		//点击X
		$('.cart-merchant-list').on('click', '.del', function(event) {
			let gid = $(this).parent().attr('gid');
			for(var i = 0; i < cookie_arr.length; i++){
				if(cookie_arr[i].id == gid){
					cookie_arr.splice(i, 1);
					//console.log(JSON.stringify(cookie_arr));
					$.cookie('goods', JSON.stringify(cookie_arr));
					snum_c();
					sc_car();
					$(this).parent().remove();
					sun_c();
					break;
				}
			}
		});


	}
	return {
		cart_m: cart_m
	}

})