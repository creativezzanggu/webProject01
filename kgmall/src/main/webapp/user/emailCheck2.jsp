<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<link href="../css/searchIdCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss2.css">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss3.css">

<div class="xans-element- xans-member xans-member-findid">
<div class="findId">
<br><br><br><br><br>
<p id="email_check2" class="email"><strong>인증코드</strong><input id="emailCheck2" name="emailCheck2" type="text"></p><br><br><br>
<!-- <p id="email_view" class="email" style=""><strong>인증 번호</strong> <input id="email" name="email" type="text"></p> -->
<p class="button ">
<a class="df-btn dark big" id="emailCheck2Btn">확인</a>
</p></div></div>
<script type="text/javascript">
$('#emailCheck2Btn').click(function(){
	if($('#emailCheck2').val()=='${keyCode}'){
		alert("성공");
		location.href="/kgmall/user/getPwd.do?email="+'${email}';
	}else{
		alert("다시 입력하세요");
	}
});
</script>
