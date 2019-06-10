$('#mainLogo').click(function(){
	location.href="/kgmall/main/index.do";
});
$('#searchKeyword').click(function(){
	$('#searchBarForm').submit();
});

$('#keyword').keydown(function(key) {
	//엔터키 이벤트
	if (key.keyCode == 13) {
		$('#searchBarForm').submit();
	}
});
