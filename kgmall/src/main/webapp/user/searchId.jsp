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
<h3>아이디 찾기</h3>
<p class="info">이메일 인증을 하셔야 아이디 찾기가 가능합니다.</p>
<legend>아이디 찾기</legend>
<p class="member"><strong>회원유형</strong>
<select id="searchType" name="searchType">
<option value="indi" selected="selected">개인회원</option>
</select></p>
<p class="check">
<input id="check_method1" name="check_method" type="radio" checked="checked"><label>이메일</label>
<p id="email_view" class="email" style=""><strong>이메일</strong><input id="email" name="email" type="text"></p>
<!-- <p id="email_view" class="email" style=""><strong>인증 번호</strong> <input id="email" name="email" type="text"></p> -->
<p class="button ">
<a class="df-btn dark big" id="searchBtn">확인</a>
</p></div></div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$('#searchBtn').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/user/emailCheck.do',
		data : 'email='+$('#email').val(),
		dataType : 'json',
		success : function(data) {
			if (data.email == null) {
				alert("이메일을 다시 확인해주세요");
			} else {
				alert("인증번호를 전송했습니다");
				location.href="/kgmall/user/emailCheckNumSend.do?email="+data.email;
			}

		}

	});

});
</script>
</html>