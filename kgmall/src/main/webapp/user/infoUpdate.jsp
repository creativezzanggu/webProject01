<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="../css/joinCss1.css" />
<link rel="stylesheet" type="text/css" href="../css/joinCss2.css" />

<form id="infoUpdateForm" name="infoUpdateForm" action="/kgmall/user/infoUpdate.do">
<div id="container">
<div id="contents">
<div class="ec-base-table typeWrite">
<br><br><br>
<h3>&nbsp;개인정보수정</h3>
<table border="1" summary="">
<caption>회원 기본정보</caption>
<colgroup>
<col style="width:170px;"/>
<col style="width:auto;"/>
</colgroup>
<tbody>
<tr>
<th scope="row">아이디 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td><input id="id" name="id" autocomplete="off" type="text" readonly />
<div id="member_idDiv"></div>
</td>
</tr>

<tr>
<th scope="row">비밀번호 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td><input id="pwd" name="pwd" autocomplete="off" type="password" />
<div id="member_pwdDiv"></div>
</td>
</tr>

<tr>
<th scope="row">비밀번호 확인 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td><input id="repwd" name="repwd" autocomplete="off" type="password" /> 
<div id="member_repwdDiv"></div>
</td>
</tr>

<tr>
<th scope="row">이름 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td><input id="name" name="name" autocomplete="off" type="text" />
<div id="member_nameDiv"></div>
</td>
</tr>

<tr>
<th scope="row">휴대전화 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td>
<select id="phone1" name="phone1">
<option value="010">010</option>
<option value="011">011</option>
<option value="019">019</option>
</select>-<input type="text" id="phone2" name="phone2" maxlength="4">-<input type="text" id="phone3" name="phone3" maxlength="4">
<div id="member_phoneDiv"></div>
</td>
</tr>

<tr>
<th scope="row">이메일 <img src="../image/user_icon/ico_required.png" alt="필수"/></th>
<td><input type="text" id="email1" name="email1">@<input type="text" id="email2" name="email2">
<div id="member_emailDiv"></div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="ec-base-button fs-0">
  <a href="#" class="df-btn big dark mr-3" id="confirmBtn">확인</a>
  <a href="" class="df-btn big medium ml-3" id="cancelBtn">취소</a>
</div>
</div>
</div>
</form>
<script type="text/javascript">
$(document).ready(function(){
	$('#id').val('${id}');
	$('#name').val('${name}');
	var phone = '${phone}';
	var phoneArray = phone.split("-");
	$('#phone2').val(phoneArray[1]);
	$('#phone3').val(phoneArray[2]);
	var email = '${email}';
	var emailArray = email.split("@");
	$('#email1').val(emailArray[0]);
	$('#email2').val(emailArray[1]);
	
	$('#email1').focusout(function(){
		if($('#email2').val().length==0){
			$('#member_emailDiv').text('이메일을 확인해주세요');
			$('#member_emailDiv').css('color','red');
			$('#member_emailDiv').css('font-size','8pt');
		}else{
			$.ajax({
				type : 'POST',
				url : '/kgmall/user/checkEmail.do',
				data : 'email='+$('#email1').val()+'@'+$('#email2').val(),
				dataType : 'text',
				success : function(data){
					b=data;
					if(data=='1'){
						$('#member_emailDiv').text('중복된 이메일입니다');
						$('#member_emailDiv').css('color','red');
						$('#member_emailDiv').css('font-size','8pt');
					}else if(data=='0'){
						$('#member_emailDiv').text('사용 할 수 있는 이메일 입니다');
						$('#member_emailDiv').css('color','red');
						$('#member_emailDiv').css('font-size','8pt');
					}
				}
			});
		}
	});
	
	$('#email2').focusout(function(){
		$.ajax({
			type : 'POST',
			url : '/kgmall/user/checkEmail.do',
			data : 'email='+$('#email1').val()+'@'+$('#email2').val(),
			dataType : 'text',
			success : function(data){
				b=data;
				if(data=='1'){
					$('#member_emailDiv').text('중복된 이메일입니다');
					$('#member_emailDiv').css('color','red');
					$('#member_emailDiv').css('font-size','8pt');
				}else if(data=='0'){
					$('#member_emailDiv').text('사용 할 수 있는 이메일 입니다');
					$('#member_emailDiv').css('color','red');
					$('#member_emailDiv').css('font-size','8pt');
				}
			}
		});
	});
	
	$('#confirmBtn').click(function(){
		$('#member_pwdDiv,#member_repwdDiv,#member_nameDiv,#member_phoneDiv,#member_emailDiv').empty();
		
		if($('#pwd').val().length == 0 ){
			$('#member_pwdDiv').text('비밀번호를 입력해주세요');
			$('#member_pwdDiv').css('color','red');
			$('#member_pwdDiv').css('font-size','8pt');
			$('#pwd').focus();
		}else if($('#repwd').val()!=$('#pwd').val()){
			$('#member_repwdDiv').text('비밀번호가 같지 않습니다');
			$('#member_repwdDiv').css('color','red');
			$('#member_repwdDiv').css('font-size','8pt');
			$('#repwd').focus();
		}else if($('#name').val().length == 0 ){
			$('#member_nameDiv').text('이름을 입력해주세요');
			$('#member_nameDiv').css('color','red');
			$('#member_nameDiv').css('font-size','8pt');
			$('#name').focus();
		}else if($('#phone2').val().length == 0 || $('#phone3').val().length==0){
			$('#member_phoneDiv').text('휴대전화 번호를 확인해주세요');
			$('#member_phoneDiv').css('color','red');
			$('#member_phoneDiv').css('font-size','8pt');
		}else if($('#email1').val().length == 0 || $('#email2').val().length == 0){
			$('#member_emailDiv').text('이메일을 확인해주세요');
			$('#member_emailDiv').css('color','red');
			$('#member_emailDiv').css('font-size','8pt');
		}else{
				$('#infoUpdateForm').submit();
		}
	});
	
	$('#cancelBtn').click(function(){
		location.href="/kgmall/user/myPage.do";
	});
	
});
</script>