$('#searchBtn').click(function(){
		$.ajax({
			type : 'POST',
			url : '/kgmall/main/searchDetail.do',
			data : {keyword : $('#keyword').val(), majorcategory : $('#majorcategory').val(), search_type : $('#search_type').val(), product_price1 : $('#product_price1').val(),
				product_price2 : $('#product_price2').val(), order : $('#order').val(), order_by : $('#order_by').val()},
			dataType : 'json',
			success : function(data){
				alert('들어옴');
				$('#search_cnt').text(data.list.length);
				$('#pageMoved').val()=='no';
				$.each(data.list, function(index, items){
					alert(items.name);
					$('#product_list').append("<li id='anchorBoxId_126' class='item xans-record-'><div class='box'>"
					+"<span class='label-best'>BEST</span>"
					+"<span class='label-new'>NEW</span>"
					+"<div class='thumbnail'>"
					+"	<a href='#' name='anchorBoxName_126'><img src='"+items.imageLink+"' width='400' height='300' id='eListPrdImage126_' alt='실용있는 기능이 진정한 기능입니다' class='thumb' style='opacity: 1;'></a>"
					+"	<div class='likeButton likePrd likePrd_126 ' style='opacity: 0; bottom: -10px;'>"
					+"		<button type='button'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448230500.png' class='likePrdIcon' product_no='126' category_no='108' icon_status='off' alt='좋아요 등록 전'><strong class=''><span class='likePrdCount likePrdCount_126'>2</span></strong></button>"
					+"</div>"
					+"</div>"
					+"<div class='description'>"
					+"	<div class='fadearea'>"
					+"		<p class='name'>"
					+"			<a href='#' class=''><strong class='title displaynone'><span style='font-size:12px;color:#555555;'>상품명</span> :</strong> <span style='font-size:12px;color:#555555;'>"+items.name+"</span></a>"
					+"		</p>"
					+"		<ul class='xans-element- xans-search xans-search-listitem'>"
					+"<li item-title='모델' class=' xans-record-'>"
					+"<span style='font-size:11px;color:#555555;'>"+items.company+"</span></li>"
					+"<li item-title='판매가' class=' xans-record-'>"
					+"<span style='font-size:12px;color:#333333;'>"+items.price+" won</span><span id='span_product_tax_type_text' style=''> </span></li>"
					+"</ul>"
					+"<div class='icon'>   <img src='http://ecudemo31431.cafe24.com/web/upload/icon_201601081108285800.gif' class='icon_img' alt='New'>   </div>"
					+"	</div>"
					+"	<a href='#' class='fadebox-link'></a>"
					+"</div>"
					+"<div class='status'>"
					+"	 <div class='button'>"
					+"		<span class='basket ' style='opacity: 0;'><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448018000.png' onclick='CAPP_SHOP_NEW_PRODUCT_OPTIONSELECT.selectOptionCommon(126,  108, 'basket', '')' alt='장바구니 담기' class='ec-admin-icon cart'></span>"
					+"</div></div></div></li>");
					
				});//each

			}//succes
		});//ajax
	
});
