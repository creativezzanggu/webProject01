$(function(){
	
	if($('#pageMoved').val()=="yes"){
		alert("페이지 이동");
		$.ajax({
			type : 'GET',
			url : '/kgmall/main/searchDetail.do',
			data : {keyword : $('#keyword').val(), majorcategory : $('#majorcategory').val(), search_type : $('#search_type').val(), product_price1 : $('#product_price1').val(), 
				product_price2 : $('#product_price2').val(), order : $('#order').val(), order_by : $('#order_by').val()},
			dataType : 'json',
			success : function(data){
				$.each(data.list, function(index, items){
					alert("json 도착!!");
					
					$('<li/>',{
						id : 'anchorBoxId_83',
						class : 'item xans-record-'
					}).append($('<div/>',{
						class : 'box'
					})).append($('<span/>',{
						class : 'label-best',
						text : 'BEST'
					})).append($('<span/>',{
						class : 'label-new',
						text : 'NEW'
					})).append($('<div/>',{
						class : 'thumbnail'
					})).append($('<span/>',{
						class : 'chk'
						}).append($('<input/>',{
							type : 'checkbox',
							class : ' displaynone'
						}))
					).append($('<a/>',{
						href : '#',
						name : 'anchorBoxName_83'>
						}).append($('<img/>'),{
							src : '//ecudemo31431.cafe24.com/web/product/medium/df_sample_list29.jpg',
							id : 'eListPrdImage83_',
							class : 'thumb'
						})
					).append($('<div/>',{
						class : 'likeButton likePrd likePrd_83 '
					})).append($('<button/>',{
						type : 'button'
						}).append($('<img/>'),{
							src : items.imageLink,
							class : 'likePrdIcon',
							product_no : '83',
							category_no : '42',
							icon_status : 'off',
							alt : '종아요 등록 전'
						})
					).
							
							$('appendTo($('#product_list'));
					/*"<li id='anchorBoxId_83' class='item xans-record-'>"
					+"<div class='box'>"
					+"<span class='label-best'>BEST</span>"
					+"<span class='label-new'>NEW</span>"
					+"<div class='thumbnail'>"
					+"<span class='chk'><input type='checkbox' class=' displaynone'></span>"
					+"<a href='#' name='anchorBoxName_83'><img src='//ecudemo31431.cafe24.com/web/product/medium/df_sample_list29.jpg' id='eListPrdImage83_' class='thumb'></a>"
					
					0+"<div class='likeButton likePrd likePrd_83 '>"
					+"<button type='button'>
					<img src='"+items.imageLink+"' class='likePrdIcon' product_no='83' category_no='42' icon_status='off' alt='좋아요 등록 전'>
					<strong class=''><span class='likePrdCount likePrdCount_83'>"+itmes.thumbsup+"</span></strong></button>"
					+"<span class='bg-layer1'></span><span class='bg-layer2'></span><span class='bg-layer3'></span><span class='bg-layer4'></span>"
					+"</div>"
					
					+"<span class='discountrate displaynone' df-data-custom='67,000' df-data-price='재입고 중입니다.' style='display: none;'>"
					+"<span class='rate'></span>%"
					+"<span class='df-data-sale displaynone'></span>"
					+"<span>"
					+"</span></span>"
					+"</div>"
					+"<div class='timesale' df-data-timesales='' df-data-timesalee=''>"
					+"<span class='before'></span><span class='ing'></span><span class='after'></span>"
					+"</div>"
					+"<div class='timesaleSpace'></div>"
					+"<div class='description'>"
					+"<div class='fadearea'>"
					+"<div class='displaynone'>"
					+"</div>"
					+"<p class='name'>"
					+"<a href='/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1' class=''><strong class='title displaynone'><span style='font-size:12px;color:#555555;'>상품명</span> :</strong>"
					+"<span style='font-size:12px;color:#555555;'>"+items.name+"</span></a>"
					+"</p>"
					+"<ul class='xans-element- xans-search xans-search-listitem'><!-- 검색목록 상품정보 -->"
					+"<li item-title='모델' class=' xans-record-'>"
					+"<strong class='title displaynone'><span style='font-size:11px;color:#555555;'>모델</span> :</strong> <span style='font-size:11px;color:#555555;'>"+items.company+"</span></li>"
					+"<li item-title='판매가' class=' xans-record-'>"
					+"<strong class='title displaynone'><span style='font-size:12px;color:#333333;'>판매가</span> :</strong> <span style='font-size:12px;color:#333333;'>"+items.price+"</span></li>"
					+"</ul>"
					+"<div class='icon'>  <img src='http://ecudemo31431.cafe24.com/web/upload/icon_201601081108247400.gif' class='icon_img' alt='추천'></div>"
					+"</div>"
					+"<a href='/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1' class='fadebox-link'></a>"
					+"</div>"
					+"<div class='status'>"
					+"<div class='button'>"
					+"<span class='option displaynone'></span><span class='basket '><img src='http://ecudemo31431.cafe24.com/web/upload/icon_201606070448018000.png' onclick='category_add_basket('83','42', '1', 'A0000', false, '1', 'P00000DE', 'A', 'F', '0');' alt='장바구니 담기' class='ec-admin-icon cart'></span>"
					+"</div>"
					+"</div>"
					+"</div></li>";*/

					$('#product_list').html(str);
					
				});
				$('#product_list').html("사람");
				$('#pageMoved').attr("value","no");
			}
		});
	}

	
	
});