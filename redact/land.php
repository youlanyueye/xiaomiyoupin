<?php 
 	header('Access-Control-Allow-Origin: *');
	// php链接数据库，总结为天龙八部
	// 设置编码方式
	header("Content-type:text/html;charset=utf-8");

	$user = $_POST['user'];
	$password = $_POST['password'];

	//$user = '1003';
	//$password = '1111';
	
	//1、链接数据库
	$link = mysql_connect('localhost', 'root', '123456');
	//2、判断是否链接成功
	if(!$link){
		echo '数据库链接失败';
		exit; //退出
	}

	//3、设置字符集
	mysql_set_charset('utf8');

	//4、选择用哪个数据库
	mysql_select_db('mi');

	//5、准备sql语句

	$sql = "select * from users where username='{$user}' or id='{$user}' or phone='{$user}'";
	
	//6、发送sql语句
	$res = mysql_query($sql);

	$result = mysql_fetch_assoc($res);

	if($result){
		if($result["password"] == $password){

			echo '{"username":"'.$result["username"].'","id":"'.$result["id"].'"}';

		}else{
			echo '2';
		}
	}else{
		echo '3';
	}


	//8、关闭数据库
	mysql_close();
 ?>