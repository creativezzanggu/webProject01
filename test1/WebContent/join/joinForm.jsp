<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div align="center">
<form id="writeForm" method="post" action="/test1/join/join.do">
<table border="1">
<tr>
<td>이름</td>
<td><input type="text" name="name" id="name"></td>
</tr>
<tr>
<td colspan="2"><div id="nameDiv"></div></td>
</tr>
<tr>
<td>아이디</td>
<td><input type="text" name="id" id="id"></td>
</tr>
<tr>
<td colspan="2"><div id="idDiv"></div></td>
</tr>
<tr>
<td>비밀번호</td>
<td><input type="password" name="pwd" id="pwd"></td>
</tr>
<tr>
<td colspan="2"><div id="pwdDiv"></div></td>
</tr>
<tr>
<td>비밀번호확인</td>
<td><input type="password" id="repwd"></td>
</tr>
<tr>
<td colspan="2"><div id="repwdDiv"></div></td>
</tr>
<tr>
<td>이메일</td>
<td><input type="text" name="email1" id="email1">
@<input type="text" name="email2" id="email2">
</td>
</tr>
<tr>
<td colspan="2"><div id="emailDiv"></div></td>
</tr>
<tr>
<td colspan="2" align="center">
<input type="button" value="회원가입" id="writeB">
<input type="button" value="다시작성" id="resetB">
</td>
</tr>
</table>
</form>
</div>

<script>
$('#writeB').click(function(){
	$('#nameDiv,#idDiv,#pwdDiv,#repwdDiv,#emailDiv').empty();
	if($('#name').val()==""){
		$('#nameDiv').text("이름을 입력하세요").css('color','red').css('font-size','8pt');
		$('#name').focus();
	}else if($('#id').val()==""){
		$('#idDiv').text("아이디를 입력하세요").css('color','red').css('font-size','8pt');
		$('#id').focus();
	}else if($('#pwd').val()==""){
		$('#pwdDiv').text("비밀번호를 입력하세요").css('color','red').css('font-size','8pt');
		$('#pwd').focus();
	}else if($('#pwd').val() != $('#repwd').val()){
		$('#repwdDiv').text("비밀번호가 일치하지 않습니다").css('color','red').css('font-size','8pt');
		$('#repwd').focus();
	}else if($('#email1').val()=="" || $('#email2').val()==""){
		$('#emailDiv').text("이메일을 입력하세요").css('color','red').css('font-size','8pt');
		$('#name').focus();
	}else{
		$('#writeForm').submit();
	}
	
});
$('#resetB').click(function(){
	$('#nameDiv,#idDiv,#pwdDiv,#repwdDiv,#emailDiv').empty();
	$('#name').val('');
	$('#id').val('');
	$('#pwd').val('');
	$('#repwd').val('');
	$('#email1').val('');
	$('#email2').val('');
});
</script>