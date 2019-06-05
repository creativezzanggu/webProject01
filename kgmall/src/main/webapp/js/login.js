$(function(){
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
});