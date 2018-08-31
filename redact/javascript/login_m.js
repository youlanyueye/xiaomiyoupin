define(["jquery", "jquery-cookie"], function($){
	var login_m = function(){
		console.log("成功");
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


		$('#phone_num,#captcha-code').keypress(function(event) {
			$(this).css('border-color', '#e0e0e0');
			$(this).parent().css('border-color', '#e0e0e0');
			$('.error-con').html('');
			$('.err_tip').css('display', 'none');
			sut = true;
		})

		//手机号
		var sut = true;
		$('#phone_num').blur(function(event) {
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	        if (!myreg.test($('#phone_num').val())) {
	        	if($('#phone_num').val()){
	        		$('.e1 .error-con').html('手机号码格式错误');
	        	}else{
	        		$('.e1 .error-con').html('请输入手机号码');
	        	}
	        	$('#phone_num').css('border-color', '#ff6700');
	            $('.e1').css('display', 'block');
	            sut = false;
	        }
		})

		//点击返回
		$('#sutmit').click(function(event) {
			if(sut){
				$('#phone_step1').css('display', 'none');
				$('.checkbox').css('display', 'none');

				$('#phone_step2').css('display', 'block');
				$('.chkcode_img').html(testCode(5));
				$('.chkcode_img').click(function(event) {
					$('.chkcode_img').html(testCode(5));
				});

			}
		})



		//验证码
		$('#captcha-code').blur(function(event) {
	        if (!$('#captcha-code').val()) {
	        	$('.e2 .error-con').html('请输入验证码');
	        	$('.code_label').css('border-color', '#ff6700');
	            $('.e2').css('display', 'block');
	            sut = false;
	        }
		})

		$('.return').click(function(event) {
			$('#phone_step1').css('display', 'block');
			$('.checkbox').css('display', 'block');
			
			$('#phone_step2').css('display', 'none');

			$('.error-con').html('');
			$('.err_tip').css('display', 'none');
		});

		$('#next').click(function(event) {
			var str1 = $('#captcha-code').val();
			str1 = str1.toLowerCase();
			var str2 = $('.chkcode_img').html();
			str2 = str2.toLowerCase();

			if(str1 !== str2){
		    	$('.err_tip').css('display', 'block');
		        $('.e2 .error-con').html('验证码不正确');
		        $('.code_label').css('border-color', '#f56700');
		        sut = false;
		    }else{
		    	if(sut){
		    		
					$.ajax({
						url: 'http://localhost/mi/redact/login.php',
						type: 'POST',
						data: {phone_num: $('#phone_num').val()},
					})
					.done(function(data) {
						if(!data){
							$('#phone_step2').css('display', 'none');
							$('.checkbox').css('display', 'none');
							$('#phone_step3').css('display', 'block');
							$('.num').html($('#phone_num').val());
						}else{
							$('.err_tip').css('display', 'block');
		        			$('.e2 .error-con').html('您的手机号已进行过注册，请返回修改手机号');
						}
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});

		    	} else {
		    		console.log('错误，未进行验证');
		    	}
		    }
		})

		//密码
		var pass = false;
		$('#password, #password2').focus(function(event) {
			$('.rule').css('display', 'block');
			$(this).css('border-color', '#e0e0e0');
			$('.error-con').html('');
			$('.err_tip').css('display', 'none');
			pass = true;
		});

		$('#password').blur(function(event) {
			if($('#password').val()){
				var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/; 
				if (!regex.test($('#password').val())) {
		        	$('.rule').css('display', 'none');
		        	$('.e3 .error-con').html('密码长度8~16位,必须包含数字和字母');
		        	$('#password').css('border-color', '#ff6700');
		            $('.e3').css('display', 'block');
		            pass = false;
		        }
			}else{
				$('.rule').css('display', 'none');
				$('.err_tip').css('display', 'block');
		        $('.e3 .error-con').html('请输入密码');
		        $('#password').css('border-color', '#f56700');
		        pass = false;
			}
		});

		$('#password2').blur(function(event) {
			if($('#password2').val()){
				if($('#password').val() !== $('#password2').val()){
					$('.rule').css('display', 'none');
					$('.err_tip').css('display', 'block');
			        $('.e3 .error-con').html('密码输入不一致');
			        $('#password2').css('border-color', '#f56700');
			        pass = false;
				}else{
					pass = true;
				}
			}else{
				$('.rule').css('display', 'none');
				$('.err_tip').css('display', 'block');
		        $('.e3 .error-con').html('请输入确认密码');
		        $('#password2').css('border-color', '#f56700');
		        pass = false;
			}
		});

		$('#submit-a').click(function(event) {
			if(pass){
				$.ajax({
						url: 'http://localhost/mi/redact/login2.php',
						type: 'POST',
						data: {phone_num: $('#phone_num').val(),
							   password:$('#password').val()
							  },
					})
					.done(function(data) {
						if(data.charAt(0) == '注'){
							alert(data);
						}else{
							$('#phone_step3').css('display', 'none');
							$('.checkbox').css('display', 'none');
							$('#phone_step4').css('display', 'block');
							$('#id').html(data);
						}

					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
			}else{
				$('.rule').css('display', 'none');
				$('.err_tip').css('display', 'block');
		        $('.e3 .error-con').html('密码不符合规则，请重新设置');
		        $('#password2').css('border-color', '#f56700');
			}
		});

	}

	return {
		login_m: login_m
	}

})