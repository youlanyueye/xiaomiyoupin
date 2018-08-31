define(["jquery", "jquery-cookie"], function($){
	var land = function(){
		//随机生成n位数的验证码
		function testCode(n){
			var arr = [];
			for(var i = 0; i < n; i++){
				var num = parseInt(Math.random() * 100);
				if(num >= 0 && num <= 9){
					arr.push(num);
				}else if(num >= 65 && num <= 90){
					var str = String.fromCharCode(num);
					arr.push(str);
				}else if(num >= 17 && num <= 42){
					var str = String.fromCharCode(num + 80);
					arr.push(str);
				}else{
					//避免消耗循环次数
					i--;
				}	
			}
			return arr.join("");
		}

		$('.chkcode_img').html(testCode(5));
		$('.chkcode_img').click(function(event) {
			$('.chkcode_img').html(testCode(5));
		});


		$('#username,#pwd,#captcha-code').keypress(function(event) {
			$(this).parent().css('border-color', '#e0e0e0');
			$('.error-con').html('');
			$('.err_tip').css('display', 'none');
		});




		$('#login-button').click(function(ev) {
			var judge = true;

			var str1 = $('#username').val();
			var str2 = $('#pwd').val();
			var str3 = $('#captcha-code').val();
			str3 = str3.toLowerCase();
			var str4 = $('.chkcode_img').html();
			str4 = str4.toLowerCase();
			

			if(!str3){
				$('.err_tip').css('display', 'block');
		        $('.error-con').html('请输入验证码');
		        $('.code_label').css('border-color', '#f56700');
		        judge = false;
		    }else if(!str1){
		    	$('.err_tip').css('display', 'block');
		        $('.error-con').html('请输入账号');
		        $('#region-code').css('border-color', '#f56700');
		        judge = false;
		    }else if(!str2){
		    	$('.err_tip').css('display', 'block');
		        $('.error-con').html('请输入密码');
		        $('.pwd_panel').css('border-color', '#f56700');
		        judge = false;
		    }else if(!(str3 == str4)){
		    	$('.err_tip').css('display', 'block');
		        $('.error-con').html('验证码不正确');
		        $('.code_label').css('border-color', '#f56700');
		        judge = false;
		    }


			if(judge){
				$.ajax({
					url: 'http://localhost/mi/redact/land.php',
					type: 'POST',
					data: {user: $('#username').val(),
						   password: $('#pwd').val()},
				})
				.done(function(data) {
					//alert(data);

					switch(data){
						case '2':
					    	$('.err_tip').css('display', 'block');
					        $('.error-con').html('用户名或密码错误');
					        $('#region-code').css('border-color', '#f56700');
					        break;
						case '3':
							$('.err_tip').css('display', 'block');
					        $('.error-con').html('用户名不正确');
					        $('#region-code').css('border-color', '#f56700');
							break;
						default:
							data = JSON.parse(data);
							//alert(data.username);
							$.cookie('user', `[{"id":"${data.id}","username":"${data.username}"}]`, {expires: 7});
							location.assign('index.html');
							break;
					}

				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			}else{
				console.log('错误，未进行验证');
			}
		});

	}

	return {
		land: land
	}

})