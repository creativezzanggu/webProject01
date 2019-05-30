<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../css/searchIdCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss2.css">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss3.css">

<form id="updatePwdForm" name="updatePwdForm" action="/kgmall/user/updatePwd.do" method="post">
<input type="hidden" name="email" value="${email }" />

<div class="xans-element- xans-member xans-member-findid">
<div class="findId">
<h3>비밀번호 찾기</h3><br><br>
<p id="pwd_view" class="pwd"><strong>새로운 비밀번호</strong><input id="pwd" name="pwd" type="password"></p>
<div id="new_pwd"></div>
<p id="repwd_view" class="repwd"><strong>비밀번호 확인</strong><input id="repwd" name="repwd" type="password"></p>
<div id="new_repwd"></div>
<p class="button ">
<a class="df-btn dark big" id="updatePwdBtn">확인</a>
</p></div></div>
</form>
</body>
<script type="text/javascript">
$('#updatePwdBtn').click(function(){
	$('#new_pwd,#new_repwd').empty();
	
	if($('#pwd').val().length == 0 ){
		$('#new_pwd').text('비밀번호를 입력해주세요');
		$('#new_pwd').css('color','red');
		$('#new_pwd').css('font-size','8pt');
		$('#pwd').focus();
	}else if($('#repwd').val()!=$('#pwd').val()){
		$('#new_repwd').text('비밀번호가 같지 않습니다');
		$('#new_repwd').css('color','red');
		$('#new_repwd').css('font-size','8pt');
		$('#repwd').focus();
	}else{
		alert("비밀번호 변경이 완료되었습니다.");
		$('#updatePwdForm').submit();
	}

});
</script>
</html>