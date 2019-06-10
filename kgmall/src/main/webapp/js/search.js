$(document).ready(function(){
	
	$.search = function(){
		if($('#keyword_detail').val()==null || $('#keyword_detail').val()==''){
			$('#search_cnt').text("0"); //검색 상품 개수 넣기
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
			$.ajax({//상품 받아오는 ajax
				type : 'GET',
				url : '/kgmall/main/searchDetail.do',
				data : {keyword : $('#keyword_detail').val(), majorcategory : $('#majorcategory').val(), search_type : $('#search_type').val(), product_price1 : $('#product_price1').val(),
					product_price2 : $('#product_price2').val(), order : $('#order').val(), order_by : $('#order_by').val(), currentPage : $('#pg').val()},
				dataType : 'json',
				success : function(data){
					$('#product_list').html("");
					
					if(data.list==null){
						$('#search_cnt').text("0"); //검색 상품 개수 넣기
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
						$('#search_cnt').text(data.search_paging.totalA); //검색 상품 개수 넣기
						var cnt = 1;
						$.each(data.list, function(index, items){
							$('#product_list').append("<li id='anchorBoxId_9"+cnt+"' class='item xans-record-'><div class='box'><span class='label-best'>BEST</span><span class='label-new'>NEW</span>" +
									"<div class='thumbnail'><a href='../product/select.do?name="+items.name+"' name=''><img src='../image/productImage/"+items.imageLink+"' width='400' height='300' id='eListPrdImage9"+cnt+"_' alt='실용있는 기능이 진정한 기능입니다' class='thumb' style='opacity: 1;'></a><div class='likeButton likePrd likePrd_126 ' style='opacity: 0; bottom: -10px;'><button type='button'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448230500.png' class='likePrdIcon' product_no='126' category_no='108' icon_status='off' alt='좋아요 등록 전'><strong class=''><span class='likePrdCount likePrdCount_126'>"+items.thumbsup+"</span></strong></button></div></div>"
									+"<div class='description'><div class='fadearea'><p class='name'><a href='#' class=''><span style='font-size:12px;color:#555555;'>"+items.name+"</span></a></p>"
									+"<ul class='xans-element- xans-search xans-search-listitem'><li item-title='모델' class=' xans-record-'><span style='font-size:11px;color:#555555;'>"+items.company+"</span></li><li item-title='판매가' class=' xans-record-'><span style='font-size:12px;color:#333333;'>"+items.price+" won</span><span id='' style=''></span></li></ul>"
									+"<div class='icon'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201601081108285800.gif' class='icon_img' alt='New'></div></div><a href='#' class='fadebox-link'></a></div><div class='status'><div class='button'><span class='basket ' style='opacity: 0;'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448018000.png' onclick='CAPP_SHOP_NEW_PRODUCT_OPTIONSELECT.selectOptionCommon(126,  108, 'basket', '')' alt='장바구니 담기' class='ec-admin-icon cart'></span></div></div></div></li>");			
							cnt++;
						});//each
						//페이징 처리
						$('#paging').html(data.search_paging.pagingHTML);
						$('#majorcategory').val(data.search_paging.majorcategory);
						$('#search_type').val(data.search_paging.search_type);
						$('#order').val(data.search_paging.order);
						$('#order_by').val(data.search_paging.search_paging.order_by);
						$('#keyword_detail').val(data.search_paging.keyword);
						$('#pg').val(data.search_paging.currentPage);
					}//else
				}//succes
			});//ajax
		}//else
	}
	$.search();

});

$('#keyword_detail').keydown(function(key) {
	//엔터키 이벤트
	if (key.keyCode == 13) {
		$('#pg').val("1");
		$.search();
	}
});


$('#order_by_new').click(function(){
	$('#pg').val("1");
	$('#order').val("logtime");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$.search();
});
$('#order_by_name').click(function(){
	$('#pg').val("1");
	$('#order').val("name");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$.search();
});
$('#order_by_price').click(function(){
	$('#pg').val("1");
	$('#order').val("price");
	if($('#order_by').val()=='asc'){
		$('#order_by').val('desc');
	}else{
		$('#order_by').val('asc');
	}
	$.search();
});

$('#searchBtn').click(function(){
	$('#pg').val("1");
	$.search();
});
