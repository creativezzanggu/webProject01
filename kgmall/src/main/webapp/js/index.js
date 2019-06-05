$(function(){
	$('#searchKeyword').click(function(){
		var keyword = $('#keyword').val();
		location.href="/kgmall/main/search.do?keyword="+keyword;
	});
});