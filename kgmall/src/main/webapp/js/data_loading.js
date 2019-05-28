/*공지사항 불러오기*/
$(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/board/getNotice.do',
		dataType : 'json',
		success : function(data){
			alert(data);
			$.each(data.list, function(index, items){
				var title = items.title;
				alert(title);
				$("#notice"+(index+1)).text(title);
				
			});
		}
	});
});


$('#notice1').click(function(){
	
});
$('#notice2').click(function(){
	
});
$('#notice3').click(function(){
	
});
$('#notice4').click(function(){
	
});
$('#notice5').click(function(){
	
});
$('#notice6').click(function(){
	
});
$('#notice7').click(function(){
	
});