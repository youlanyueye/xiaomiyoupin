define(["headf", "public"], function(headf, public){
	var goods = function(){
		
		public.public();

		//加载产品分类数据
		$.ajax({
			url: '../data/goods.json'
		})
		.done(function(arr) {
			//alert(arr[0].typeGoods);
			for(var i = 0; i < arr.length; i++){
				$(`<div class="typeGoods-item">
						<h2>${arr[i].typeGoods}</h2>
						<div class="product-list clear"></div>
					</div>`).appendTo($('#main .margin'));
					var pro = arr[i].product;
					for(var j = 0; j < pro.length; j++){
						$(`<div class="pro-item-box">
								<div class="pro-item tag-a" data-src="http://localhost:8888/${pro[j].pro_id}.html">
									<div class="pro-img valign">
										<img src="${pro[j].pro_src}">
									</div>
									<p class="pro-info over">${pro[j].sub_name}</p>
									<p class="pro-desc over">${pro[j].pro_intro}</p>
									<p class="pro-price">
										<span class="pro-num">¥${pro[j].pro_price}</span>
										
									</p>
								</div>
							</div>`).appendTo($('.product-list').eq(i));
						if(pro[j].sale){
							$(`<span class="sale-tag">直降</span>`).appendTo($('.product-list').eq(i).find('.pro-price').eq(j));
						}
					}							
				}
		})
		.fail(function(msg) {
			alert(msg);
		})
		.always(function() {
			$('.tag-a').click(function(){
				var phtml = $(this).attr('data-src');
				open(phtml);
			});
		});

	}
	return {
		goods: goods
	}

})