<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<link rel="stylesheet" type="text/css" href="../css/loginCss1.css">
<link rel="stylesheet" type="text/css" href="../css/loginCss2.css">

<form id="loginForm" action="/kgmall/user/getUser.do" method="post">
<div class="xans-element- xans-member xans-member-login ">
<div class="login">
<h3>MEMBER LOGIN</h3>
<fieldset>
<legend>회원로그인</legend>
	<label class="id"><span>ID</span><input type="text" id="id2" name="id2" autocomplete="off"></label>
	<div id="idDiv" style="color : red;"></div>
	<label class="password"><span>PASSWORD</span><input type="password" id="pwd2" name="pwd2" autocomplete="off" ></label>
	<div id="pwdDiv" style="color : red;"></div>
	<p class="security">
		<span class="securityLogin"><img src="../image/ico_security.png" class="ico"><img src="../image/ico_access.gif" alt="보안접속"> 보안접속 </span>
		<span class="saveId"><input id="member_check_save_id0" name="check_save_id" type="checkbox"><label for="member_check_save_id0">아이디 저장</label></span>
	</p>
	<a href="#" class="btn Login" id="login">로그인</a>
<ul>
<li><a href="/kgmall/user/searchId.do">아이디찾기</a></li>
<li><a href="/kgmall/user/searchPwd.do">비밀번호찾기</a></li>
</ul>
<p class="link"><a href="/kgmall/user/writeForm.do" class="btn Join" id="writeForm">회원가입</a></p>
</div></div>
</fieldset>
</form>
</link>
</link>
<script>
	$('#writeForm').click(function(){
		location.href="/kgmall/user/writeForm.do";
	});
	
	$('#login').click(function(){
		$('#idDiv,#pwdDiv').empty();
		
		if($('#id2').val().length == 0 ){
			$('#idDiv').text('아이디를 입력해주세요').css("font-size","8pt");
			$('#id2').focus();
		}else if($('#pwd2').val().length == 0 ){
			$('#pwdDiv').text('비밀번호를 입력해주세요').css("font-size","8pt");
			$('#pwd2').focus();
		}else{
			$.ajax({
				type : 'POST',
				url : '/kgmall/user/getUser.do',
				data : {'id' : $('#id2').val() , 'pwd' : $('#pwd2').val()},
				dataType : 'json',
				success : function(data){
					$.each(data,function(){
						if(this.ID){
							alert("로그인성공");
							location.href="/kgmall/main/index.do";
						}else alert("아이디 또는 비밀번호를 다시 확인해주세요");
					});
					
				}
			});
		}
	});
	
</script>
</html>