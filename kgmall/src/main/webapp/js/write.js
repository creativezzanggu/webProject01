$(function(){
	$('#check1').click(function(){
		if($("input:checkbox[id='check1']").is(":checked")){
			if($("input:checkbox[id='check2']").is(":checked")){
		   	$("input:checkbox[id='allcheck']").attr("checked",true);
			}
		}else {
			$("input:checkbox[id='allcheck']").attr("checked",false);
		}
	});
	$('#check2').click(function(){
		if($("input:checkbox[id='check2']").is(":checked")){
			if($("input:checkbox[id='check1']").is(":checked")){
		   	$("input:checkbox[id='allcheck']").attr("checked",true);
			}
		}else {
			$("input:checkbox[id='allcheck']").attr("checked",false);
		}
	});

		$('#allcheck').click(function(){
			if($("input:checkbox[id='allcheck']").is(":checked")){
				$("input:checkbox[id='check1']").attr("checked",true);
				$("input:checkbox[id='check2']").attr("checked",true);
				
			}else{
				$("input:checkbox[id='check1']").attr("checked",false);
				$("input:checkbox[id='check2']").attr("checked",false);
			}
		});
		
		var a;
		var b;
		
		$('#id').focusout(function(){
			$.ajax({
				type : 'POST',
				url : '/kgmall/user/checkId.do',
				data : 'id='+$('#id').val(),
				dataType : 'text',
				success : function(data){
					a=data;
					if(data=='exist'){
						$('#member_idDiv').text('사용 불가능합니다');
						$('#member_idDiv').css('color','red');
						$('#member_idDiv').css('font-size','8pt');
					}else if(data=='not_exist'){
						$('#member_idDiv').text('사용 가능합니다');
						$('#member_idDiv').css('color','red');
						$('#member_idDiv').css('font-size','8pt');
					}else if(data=='empty'){
						$('#member_idDiv').text('먼저 아이디를 입력하세요');
						$('#member_idDiv').css('color','red');
						$('#member_idDiv').css('font-size','8pt');
					}
				}
			});
		});
		
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
		
		$('#joinBtn').click(function(){
			$('#member_idDiv,#member_pwdDiv,#member_repwdDiv,#member_nameDiv,#member_phoneDiv,#member_emailDiv').empty();
			
			if($('#id').val().length == 0 ){
				$('#member_idDiv').text('아이디을 입력해주세요');
				$('#member_idDiv').css('color','red');
				$('#member_idDiv').css('font-size','8pt');
				$('#id').focus();
			}else if($('#pwd').val().length == 0 ){
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
			}else if(!$("input:checkbox[id='allcheck']").is(":checked")){
				alert("이용약관에 동의 해주세요");
			}else if(a=='exist'){
				$('#member_idDiv').text('아이디를 확인해주세요');
				$('#id').focus();
			}else {
				if(b=='1'){
					$('#member_emailDiv').text('이메일을 확인해주세요').css('color','red').css('font-size','8pt');
					$('#email1').focus();
				}else{
					$('#joinForm').submit();
					alert("회원가입 완료");
				}
			}
		});
});