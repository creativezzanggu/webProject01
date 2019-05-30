<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../css/searchIdCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss2.css">
<link rel="stylesheet" type="text/css" href="../css/searchIdCss3.css">

<div class="xans-element- xans-member xans-member-findid">
<div class="findId">
<br><br><br><br><br>
<p id="email_check" class="email"><strong>아이디 :</strong><span id="getId"></span></p><br><br><br>
<p class="button ">
<a class="df-btn dark big" id="toLoginBtn">로그인창으로</a>
</p></div></div>
<script type="text/javascript">
$(function(){
	$('#getId').text('${id}').css("font-size","16pt");	
});

$('#toLoginBtn').click(function(){
	location.href="/kgmall/main/index.do";
});
</script>
</html>