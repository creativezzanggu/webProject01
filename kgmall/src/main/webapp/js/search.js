$(document).ready(function(){
	//트리거 함수로 click 이벤트 실행
	$('#searchBtn').trigger('click'); 
});

$(document).keydown(function(key) {
	//엔터키 이벤트
	if (key.keyCode == 13) {
		$('#searchBtn').trigger('click');
	}
});

$('#order_by_new').click(function(){
	$('#order').val("logtime");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$('#searchBtn').trigger('click');
});
$('#order_by_name').click(function(){
	$('#order').val("name");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$('#searchBtn').trigger('click');
});
$('#order_by_price').click(function(){
	$('#order').val("price");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$('#searchBtn').trigger('click');
});

$('#searchBtn').click(function(){
	if($('#keyword_detail').val()==''){
		alert("검색어 없음");
		$('#noData').empty();
		$('#noData').attr("class","noData");
		$('#noData').append("<img src='../image/search.png'>");
		$('#noData').append("<strong class='warning'>검색결과가 없습니다.</strong>");
		$('#noData').append("<strong>정확한 검색어 인지 확인하시고 다시 검색해 주세요.</strong>");
		$('#noData').append("<ul>");
		$('#noData').append("<li>검색어/제외검색어의 입력이 정확한지 확인해 보세요.</li>");
		$('#noData').append("<li>공백 검색어의 경우 검색되지 않습니다.</li>");
		$('#noData').append("<li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>");
		$('#noData').append("<li>검색 옵션을 다시 확인해 보세요.</li>");
		$('#noData').append("</ul>");
	}else{
		$.ajax({
			type : 'POST',
			url : '/kgmall/main/searchDetail.do',
			data : {keyword : $('#keyword_detail').val(), majorcategory : $('#majorcategory').val(), search_type : $('#search_type').val(), product_price1 : $('#product_price1').val(),
				product_price2 : $('#product_price2').val(), order : $('#order').val(), order_by : $('#order_by').val()},
			dataType : 'json',
			success : function(data){
				alert('들어옴');
				$('#product_list').empty(); //이전 검색 결과 비워주고
				$('#search_cnt').text(data.list.length); //검색 상품 개수 넣기
				
				if(!data){
					$('#noData').empty();
					$('#noData').attr("class","noData");
					$('#noData').append("<img src='../image/search.png'>");
					$('#noData').append("<strong class='warning'>검색결과가 없습니다.</strong>");
					$('#noData').append("<strong>정확한 검색어 인지 확인하시고 다시 검색해 주세요.</strong>");
					$('#noData').append("<ul>");
					$('#noData').append("<li>검색어/제외검색어의 입력이 정확한지 확인해 보세요.</li>");
					$('#noData').append("<li>공백 검색어의 경우 검색되지 않습니다.</li>");
					$('#noData').append("<li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>");
					$('#noData').append("<li>검색 옵션을 다시 확인해 보세요.</li>");
					$('#noData').append("</ul>");
				}else{
					$('#noData').attr("class","");
					$('#noData').empty();
					$.each(data.list, function(index, items){
						alert(items.name);
						
						$('#product_list').append("<li id='anchorBoxId_126' class='item xans-record-'><div class='box'><span class='label-best'>BEST</span><span class='label-new'>NEW</span>" +
								"<div class='thumbnail'><a href='../product/select.do?name="+items.name+"' name='anchorBoxName_126'><img src='"+items.imageLink+"' width='400' height='300' id='eListPrdImage126_' alt='실용있는 기능이 진정한 기능입니다' class='thumb' style='opacity: 1;'></a><div class='likeButton likePrd likePrd_126 ' style='opacity: 0; bottom: -10px;'><button type='button'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448230500.png' class='likePrdIcon' product_no='126' category_no='108' icon_status='off' alt='좋아요 등록 전'><strong class=''><span class='likePrdCount likePrdCount_126'>"+items.thumbsup+"</span></strong></button></div></div>"
								+"<div class='description'><div class='fadearea'><p class='name'><a href='#' class=''><span style='font-size:12px;color:#555555;'>"+items.name+"</span></a></p>"
								+"<ul class='xans-element- xans-search xans-search-listitem'><li item-title='모델' class=' xans-record-'><span style='font-size:11px;color:#555555;'>"+items.company+"</span></li><li item-title='판매가' class=' xans-record-'><span style='font-size:12px;color:#333333;'>"+items.price+" won</span><span id='span_product_tax_type_text' style=''></span></li></ul>"
								+"<div class='icon'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201601081108285800.gif' class='icon_img' alt='New'></div></div><a href='#' class='fadebox-link'></a></div><div class='status'><div class='button'><span class='basket ' style='opacity: 0;'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448018000.png' onclick='CAPP_SHOP_NEW_PRODUCT_OPTIONSELECT.selectOptionCommon(126,  108, 'basket', '')' alt='장바구니 담기' class='ec-admin-icon cart'></span></div></div></div></li>");			
					});//each
					
				}//else
			}//succes
		});//ajax
	}//else
});