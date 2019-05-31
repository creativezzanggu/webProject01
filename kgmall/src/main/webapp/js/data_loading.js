
$(function(){
	$.ajax({/*공지사항 불러오기*/
		type : 'GET',
		url : '/kgmall/notice/getNotice.do',
		dataType : 'json',
		success : function(data){ //data " List<Map<String, String>>
			$.each(data.list, function(index, items){
				var subject = items.subject;
				$("#notice"+(index+1)).text(subject);
				
			});
		}
	});
	
});


$('#notice1').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/notice/getNoticeSeq.do?',
		data : 'num=1',
		dataType : 'text',
		success : function(data){
			location.href = '/kgmall/notice/noticeView.do?seq='+data;
		}
	});
	
});
$('#notice2').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/notice/getNoticeSeq.do?',
		data : 'num=2',
		dataType : 'text',
		success : function(data){
			location.href = '/kgmall/notice/noticeView.do?seq='+data;
		}
	});
});
$('#notice3').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/notice/getNoticeSeq.do?',
		data : 'num=3',
		dataType : 'text',
		success : function(data){
			location.href = '/kgmall/notice/noticeView.do?seq='+data;
		}
	});
});
$('#notice4').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/notice/getNoticeSeq.do?',
		data : 'num=4',
		dataType : 'text',
		success : function(data){
			location.href = '/kgmall/notice/noticeView.do?seq='+data;
		}
	});
});
$('#notice5').click(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/notice/getNoticeSeq.do?',
		data : 'num=5',
		dataType : 'text',
		success : function(data){
			location.href = '/kgmall/notice/noticeView.do?seq='+data;
		}
	});
});