<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../css/searchIdCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss2.css">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss3.css">

<div class="xans-element- xans-member xans-member-findid">
<div class="findId">
<h3>비밀번호 찾기</h3>
<p class="info">이메일 인증을 하셔야 비밀번호 찾기가 가능합니다.</p>
<p id="id_view" class="id" style=""><strong>아이디</strong><input id="id" name="id" type="text"></p>
<p id="email_view" class="email" style=""><strong>이메일</strong><input id="email" name="email" type="text"></p>
<!-- <p id="email_view" class="email" style=""><strong>인증 번호</strong> <input id="email" name="email" type="text"></p> -->
<p class="button ">
<a class="df-btn dark big" id="searchBtn">확인</a>
</p></div></div>
</body>
<script type="text/javascript">
$('#searchBtn').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/user/pwdEmailCheck.do',
		data : 'email='+$('#email').val() + '&id='+$('#id').val(),
		dataType : 'text',
		success : function(data) {
			if (data=="0") {
				alert("다시 확인해주세요");
			} else {
				alert("인증번호를 전송했습니다");
				location.href="/kgmall/user/emailCheckNumSend2.do?email="+data;
			}

		}

	});

});
</script>
</html>