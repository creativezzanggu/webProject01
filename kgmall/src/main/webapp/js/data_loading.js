
$(function(){
	$.ajax({/*공지사항 불러오기*/
		type : 'GET',
		url : '/kgmall/board/getNotice.do',
		dataType : 'json',
		success : function(data){ //data " List<Map<String, String>>
			$.each(data.list, function(index, items){
				var title = items.title;
				$("#notice"+(index+1)).text(title);
				
			});
		}
	});
	
});


$('#notice1').click(function(){
	/*1번 글 보기로 이동*/
});
$('#notice2').click(function(){
	/*2번 글 보기로 이동*/
});
$('#notice3').click(function(){
	/*3번 글 보기로 이동*/
});
$('#notice4').click(function(){
	/*4번 글 보기로 이동*/
});
$('#notice5').click(function(){
	/*5번 글 보기로 이동*/
});