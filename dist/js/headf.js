define(["jquery", "jquery-cookie"], function($){

	var headf = function(){
		$(`		<!-- 顶部 -->
		<div id="top">
			<div class="margin clear">
				<div class="top_right">

					<!-- 用户名下拉列表 -->
					<div class="log_later">
						<a href="#">
							<i id='buddha'></i>
							<u id='username'>用户名称</u>
							<i class="arrows"></i>
						</a>
						<div class="userinfo">
							<ul>
								<li><a href="#">我的订单</a></li>
								<li><a href="#">我的资产</a></li>
								<li><a href="#">我的收藏</a></li>
								<li><a href="#">地址管理</a></li>
								<li id = 'exit'><a href="#">退出登陆</a></li>
							</ul>
						</div>
					</div>
					
					<div class="log">
						<a class='float' href="landing.html">登陆</a>
						<a class='float' href="login.html">注册</a>
					</div>
					<span>|</span>
					<a class='float' href="#">帮助中心</a>
					<span>|</span>
					<a class='float' href="#"><i id = 'app'></i>下载 APP</a>
				</div>
			</div>
		</div>

		<!-- 页头 -->
		<div id='head'>
			<div class="margin clear">
				<h1 class="logo"></h1>
				<div class="nav_part_box">
					<div class="nav_part">
						<span class='box'>分类</span>
						<i class="arrows"></i>
						<div id="nav2">
							<ul>
								<!-- nav数据导入 -->
								<!-- 子导航动态加载 -->
							</ul>
						</div>

					</div>	
				</div>

				<ul class="head_c">
					<li><a href="#" target="_blank">小米自营</a></li>
					<li><a href="#" target="_blank">清凉居室</a></li>
					<li><a href="#" target="_blank">星品驾到</a></li>
					<li><a href="#" target="_blank">世界风物</a></li>
				</ul>
				<div class="shopping_cart" id='cart'>
					<a href="cart.html"></a>
					<span class="cart-news">0</span>
					<div class="shop_lish">
						<ul>
							
						</ul>
					</div>
				</div>
				<div class="search">
					<a href="#"></a>
					<input type="text" placeholder="克莱超级品牌日">
				</div>

			</div>
		</div>`).prependTo($('body'));


		$(`		<!-- 侧边滑块 -->
		<div id="fixedBar">
			<ul class="fixed-nav">
				<li>
					<i class="f-icons"></i>
					<p class="text">
						联系客服
					</p>
					<div class="fixed-pop">
						<div class="pop-inner">
							<p class="info-title">
								小米有品平台问题，建议反馈，商户和物流问题投诉等请拨打 小米有品客服热线
							</p>
							<p class="info-phone">
								400-100-1199
							</p>
							<p class="info-day">
								(周一至周日 8：00-18：00)
							</p>
							<p class="info-des">
								小米/米家自营品牌，手机电视智能硬件商品或订单发货/退款售后问题 请在线咨询（7x24小时）
							</p>
							<div class="to-service">
								<i class="point-icons"></i>
								<span class="to-service-text">
									联系客服
								</span>
							</div>
						</div>
						<i class="box_ang"></i>
					</div>
				</li>
				<li>
					<i class="f-icons"></i>
					<p class="text">下载 APP</p>
					<div class="fixed-pop">
						<div class="pop-inner">
							<img class="qr-code" src="images/fixedBar_app.jpg">
							<p class="site-info">下载小米有品APP<br>得新人礼包</p>
						</div>
						<i class="box_ang"></i>
					</div>
				</li>
				<li>
					<i class="f-icons"></i>
					<p class="text">新人有礼</p>
					<div class="fixed-pop">
						<div class="pop-inner">
							<img class="gift-bg" src="images/fixedBar_lw.jpg">
							<img class="qr-code" src="images/fixedBar_app.jpg">
							<p class="site-info">立即扫码下载·小米有品 APP</p>
						</div>
						<i class="box_ang"></i>
					</div>
				</li>
				<li>
					<i class="f-icons"></i>
					<p class="text">关注微信</p>
					<div class="fixed-pop">
						<div class="pop-inner">
							<img class="qr-code" src="images/fixedBar_wx.jpg">
							<p class="site-info">扫码关注【小米有品生活电商】微信服务号，赢取小爱mini活动哦</p>
						</div>
						<i class="box_ang"></i>
					</div>
				</li>
				<li class="rocket">
					<i class="f-icons"></i>
					<p class="text">回到顶部</p>
				</li>
			</ul>
		</div>
		<!-- 页尾 -->
		<div id="footer">
			<div class="margin clear">
				<div class="foot-l">
					<img src="images/logo.png" alt="logo">
					版权归米家商城所有
				</div>
				<div class="foot-r">
					<div class="foot-icons">
						<a href="#">
							<img src="images/f-logo.png">
						</a>
					</div>
					<div class="foot-content">
						<p class="foot-item">
							<span>
								©mi.com 京ICP证110507号 京ICP备10046444号
							</span>
							<span>
								京公网安备11010802020134号 京网文[2014]0059-0009号
							</span>
						</p>
						<p class="foot-item">
							<span>
								企业名称：小米科技有限责任公司
							</span>
							<a href="#" target="_blank">
								经营证照
							</a>
							<span>
								联系电话：010-60606666
							</span>
							<a href="#" target="_blank">
								关于我们
							</a>
							<a class="active" href="#" target="_blank">
								入驻有品
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>`).appendTo($('body'));
		
	}
	return {
		headf: headf
	}

})