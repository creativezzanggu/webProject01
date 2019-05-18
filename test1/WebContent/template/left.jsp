<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<form id="loginForm" action="/test1/login/login.do" method="post">
<table border = "1">
<tr>
	<td>아이디</td>
	<td><input type="text" name="id" id="idInput"></td>
</tr>
<tr>
	<td colspan="2">
	<div id="idInputDiv"></div>
	</td>
</tr>
<tr>
	<td>비밀번호</td>
	<td><input type="password" name="pwd" id="pwdInput"></td>
</tr>
<tr>
	<td colspan="2">
	<div id="pwdInputDiv"></div>
	</td>
</tr>
<tr>
	<td colspan="2" align="center">
	<input type="button" id="joinB" value="회원가입">
	<input type="button" id="loginB" value="로그인">
	</td>
</tr>
</table>
</form>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script>
$('#joinB').click(function(){
	location.href="../join/joinForm.do"
});
$('#loginB').click(function(){
	$('#idInputDiv,#pwdInputDiv').empty();
	
	if($('#idInput').val().length==0){
		$('#idInputDiv').text("아이디를 입력해주세요").css('color','red').css('font-size', '8pt');
		$('#id').focus();
	}else if($('#pwdInput').val().length==0){
		$('#pwdInputDiv').text("비밀번호를 입력해주세요").css('color', 'red').css('font-size', '8pt');
		$('#pwd').focus();
	}else{
		$('#loginForm').submit();
	}
});
</script>