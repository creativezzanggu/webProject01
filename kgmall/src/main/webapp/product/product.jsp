<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width"><!--PG크로스브라우징필수내용 시작--><meta http-equiv="Cache-Control" content="no-cache"><meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache">

<link href="//fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
<meta name="naver-site-verification" content="dd85968ac57ed1d64007f8ef41ba2a6cf51dc33f">
<link rel="canonical" href="http://ecudemo31431.cafe24.com/product/겉만-보지-말고/82/">
<meta property="og:url" content="http://ecudemo31431.cafe24.com/product/겉만-보지-말고/82/">
<meta property="og:title" content="겉만 보지 말고">
<meta property="og:site_name" content="BEAUTY INSIDE">
<meta property="og:type" content="product">
<meta property="og:image" content="http://ecudemo31431.cafe24.com/web/product/big/df_sample_detail14_1.jpg">
<meta property="product:price:amount" content="53000">
<meta property="product:price:currency" content="KRW">
<meta property="product:sale_price:amount" content="53000">
<meta property="product:sale_price:currency" content="KRW">
<!-- <script type="text/javascript" src="http://ecudemo31431.cafe24.com/app/Eclog/js/cid.generate.js?vs=3d0b473968a0ec4ec41e3bf59df3aa51"></script>
 --><script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>

<style type="text/css">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
<%String name= request.getParameter("name");%>


<script type="text/javascript">

//comma
function addComma(num) {
	  var regexp = /\B(?=(\d{3})+(?!\d))/g;
	  return num.toString().replace(regexp, ',');
}
var sale;
var total=0;
var name="<%=name%>";

$(document).ready(function(){
	
	$.ajax({
		type : 'POST',
		url : '/kgmall/product/getDTO.do',
		data : "name="+name,
		dataType : 'json',
		success : function(data){
			var discount = 0;
			sale=(data.productDTO.price)-(data.productDTO.price*discount);
			$(".big_img_size").attr("src", "../image/productImage/"+data.productDTO.imageLink).attr("alt",data.productDTO.name);
			$('#headingAreaH2').append(data.productDTO.name);
			$('#productName').append(data.productDTO.name);
			$('#productCompany').append(data.productDTO.company);
			$('#span_mileage_text').append(((data.productDTO.price)-(data.productDTO.price*discount))*0.01+"원");
			$('#span_product_price_custom').append("<strike>"+addComma(data.productDTO.price)+"won</strike>");
			$('#span_product_price_text1').append(addComma(sale)+"won");
			$('.rate').text(discount*100);
			$(".image1").attr("src", "../image/productImage/"+data.productDTO.productImage1);
			$(".image2").attr("src", "../image/productImage/"+data.productDTO.productImage2);
			$(".image3").attr("src", "../image/productImage/"+data.productDTO.productImage3);
		}
	});
	$.ajax({
		type : 'POST',
		url : '/kgmall/product/getColor.do',
		data : "name="+name,
		dataType : 'json',
		success : function(data){
			var color = new Array();
			for(var i=0;i<data.list.length;i++){
				color.push(data.list[i]);
			}
			for(var i=0;i<5;i++){
				if(color[i]=="black"){
					$('#headColor').append("<span style='background-color:#000000' class='chips xans-record-'></span>");
					$('#selectColor').append("<li class='licolor' id='blackli' option_value='블랙' link_image='' title='BLACK' ><a id='black' href='javascript:colorFcn(black.id)' style='background-color:#000000'><span>블랙</span></a></li>");
				}else if(color[i]=="white"){
					$('#headColor').append("<span style='background-color:#ffffff' class='chips xans-record-'></span>");
					$('#selectColor').append("<li class='licolor' id='whiteli' option_value='화이트' link_image='' title='WHITE'><a id='white' href='javascript:colorFcn(white.id)' style='background-color:#ffffff'><span>화이트</span></a></li>");
				}else if(color[i]=="yellow"){
					$('#headColor').append("<span style='background-color:#ffd700' class='chips xans-record-'></span>");
					$('#selectColor').append("<li class='licolor' id='yellowli' option_value='화이트' link_image='' title='YELLOW' ><a id='yellow' href='javascript:colorFcn(yellow.id)' style='background-color:#ffd700'><span>노랑</span></a></li>");
				}else if(color[i]=="green"){
					$('#headColor').append("<span style='background-color:#00ff00' class='chips xans-record-'></span>");					
					$('#selectColor').append("<li class='licolor' id='greenli' option_value='화이트' link_image='' title='GREEN'><a id='green' href='javascript:colorFcn(green.id)' style='background-color:#00ff00'><span>초록</span></a></li>");
				}else if(color[i]=="blue"){
					$('#headColor').append("<span style='background-color:#0000ff' class='chips xans-record-'></span>");					
					$('#selectColor').append("<li class='licolor' id='blueli' option_value='화이트' link_image='' title='BLUE'><a id='blue' href='javascript:colorFcn(blue.id)' style='background-color:#0000ff'><span>파랑</span></a></li>");
				}else if(color[i]=="pink"){
					$('#headColor').append("<span style='background-color:#FF007F' class='chips xans-record-'></span>");				
					$('#selectColor').append("<li class='licolor' id='pinkli' option_value='화이트' link_image='' title='PINK'><a id='pink' href='javascript:colorFcn(pink.id)' style='background-color:#FF007F'><span>분홍</span></a></li>");
				}
			}
		}
	});
});

//배송비
$(function(){
	$('#delivery_cost_prepaid').change(function(){
		if($('#delivery_cost_prepaid').val()=='C'){
			total=total+3000;
			$('#totalp').text(addComma(total));
			$('#deliveryPrice').removeClass("displaynone");
		}
		else{
			total=total-3000;
			$('#totalp').text(addComma(total));
			$('#deliveryPrice').addClass("displaynone");
		}
	});
	
});

</script>

<script type="text/javascript">
var color;
var size;

//지우기버튼
function deleteTr(value){
	$('#'+value).remove();
	var totalCount=0;
	for(var i=0; i<$('.productCount').length; i++){
		totalCount = totalCount + parseInt($('.productCount').eq(i).val());
	}
	var id =$(this).attr("id");
	var count = $(this).val();
	total=totalCount*sale;

	if($('#delivery_cost_prepaid').val()=='C'){
		total=total+3000;
		$('#deliveryPrice').removeClass("displaynone");
	}
	$('#totalp').text(addComma(total));
}

//색상
function colorFcn(id){
	    if($('.colorp').text()==id){
			$('.licolor').removeClass('ec-product-selected');
			$('.sizeli').addClass('ec-product-disabled');
			$('.colorp').removeClass('ec-product-value').text("옵션을 선택해 주세요");
	    }
	    else{
			$('.licolor').removeClass('ec-product-selected');
			$('#'+id+'li').addClass('ec-product-selected');
			$('.sizeli').removeClass('ec-product-disabled');
			$('.colorp').addClass('ec-product-value').text(id);
	    }
}
/* 사이즈 구하기 시작 */
function selectS(){
		color=$('#productColor').text();
		size="S";
		$('.sizeli').removeClass('ec-product-selected');

		if($('#'+name+"_"+color+"_"+size+'').length>0){
			alert("이미 추가 된 상품입니다.");
			$('#sizeValue').removeClass('ec-product-value').text("옵션을 선택해 주세요");
			return;
		}
		if($('#productColor').text().length<7){
			$('#sizeS').addClass('ec-product-selected');
			$('#totalTable').append("<tr class='' id="+name+"_"+color+"_"+size+"><td>"+name+"_"+color+"_"+size+"</td><td ><span><input class='productCount' id='"+name+"_"+color+"_"+size+"_text"+"' style='width:33px;'  value='1' min='1' type='number'></span><button value="+name+"_"+color+"_"+size+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png' ></button></td><td class='right'><span class='quantity_price'>"+addComma(sale)+"</span></td></tr>");
			$('#sizeValue').addClass('ec-product-value').text('S');
			total = total+sale;
			$('#totalp').text(addComma(total));
		}
}
function selectM(){
		color=$('#productColor').text();
		size="M";
		$('.sizeli').removeClass('ec-product-selected');

		if($('#'+name+"_"+color+"_"+size+'').length>0){
			alert("이미 추가 된 상품입니다.");
			$('#sizeValue').removeClass('ec-product-value').text("옵션을 선택해 주세요");
			return;
		}
		if($('#productColor').text().length<7){
			$('#sizeM').addClass('ec-product-selected');
			$('#totalTable').append("<tr class='' id="+name+"_"+color+"_"+size+"><td>"+name+"_"+color+"_"+size+"</td><td><span><input class='productCount' id='"+name+"_"+color+"_"+size+"_text"+"'  style='width:33px;' value='1' min='1' type='number'></span><button value="+name+"_"+color+"_"+size+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png' ></button></td><td class='right'><span class='quantity_price'>"+addComma(sale)+"</span></td></tr>");
			$('#sizeValue').addClass('ec-product-value').text('M');
			total = total+sale;
			$('#totalp').text(addComma(total));
		}
}
function selectL(){
		color=$('#productColor').text();
		size="L";
		$('.sizeli').removeClass('ec-product-selected');

		if($('#'+name+"_"+color+"_"+size+'').length>0){
			alert("이미 추가 된 상품입니다.");
			$('#sizeValue').removeClass('ec-product-value').text("옵션을 선택해 주세요");
			return;
		}
		if($('#productColor').text().length<7){
			$('#sizeL').addClass('ec-product-selected');
			$('#totalTable').append("<tr class='' id="+name+"_"+color+"_"+size+"><td>"+name+"_"+color+"_"+size+"</td><td><span><input class='productCount' id='"+name+"_"+color+"_"+size+"_text"+"' style='width:33px;' value='1' min='1' type='number'></span><button value="+name+"_"+color+"_"+size+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png' ></button></td><td class='right'><span class='quantity_price'>"+addComma(sale)+"</span></td></tr>");
			$('#sizeValue').addClass('ec-product-value').text('L');
			total = total+sale;
			$('#totalp').text(addComma(total));
		}
}
function selectXL(){
		color=$('#productColor').text();
		size="XL";
		$('.sizeli').removeClass('ec-product-selected');

		if($('#'+name+"_"+color+"_"+size+'').length>0){
			alert("이미 추가 된 상품입니다.");
			$('#sizeValue').removeClass('ec-product-value').text("옵션을 선택해 주세요");
			return;
		}
		if($('#productColor').text().length<7){
			$('#sizeXL').addClass('ec-product-selected');
			$('#totalTable').append("<tr class='' id="+name+"_"+color+"_"+size+"><td>"+name+"_"+color+"_"+size+"</td><td><span><input class='productCount' id='"+name+"_"+color+"_"+size+"_text"+"' style='width:33px;' value='1' min='1' type='number'></span><button value="+name+"_"+color+"_"+size+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png' ></button></td><td class='right'><span class='quantity_price'>"+addComma(sale)+"</span></td></tr>");
			$('#sizeValue').addClass('ec-product-value').text('XL');
			total = total+sale;
			$('#totalp').text(addComma(total));
		}
}
/* 사이즈 구하기 종료 */

//합계구하기
$(document).on('change', '.productCount', function() {
	var totalCount=0;
	for(var i=0; i<$('.productCount').length; i++){
		totalCount = totalCount + parseInt($('.productCount').eq(i).val());
	}
	var id =$(this).attr("id");
	var count = $(this).val();
	total=totalCount*sale;

	if($('#delivery_cost_prepaid').val()=='C'){
		total=total+3000;
		$('#deliveryPrice').removeClass("displaynone");
	}
	$('#totalp').text(addComma(total));

});




</script>
<script type="text/javascript">
//구매하기
function product_buy(){
	if($('.productCount').length==0){
		alert("구매하실 항목을 선택해 주세요");
	}else{
		var id = <%=(String)session.getAttribute("id")%>
		
		for(var i=0; i<$('.productCount').length; i++){
			var productName = $('.productCount').eq(i).attr("id");
			var number = parseInt($('.productCount').eq(i).val());
			$.ajax({
				type : 'POST',
				url : '/kgmall/product/createCookie.do',
				data : {'productName' : productName , 'number' : number}
			});
		}	
		if(id==null){
			location.href="/kgmall/user/loginForm.do?sell=sell";
		}else{
			location.href="/kgmall/product/order.do?name="+name+"&total="+total;
		}
	}
}


//장바구니
function product_cart(){
	if($('.productCount').length==0){
		alert("구매하실 항목을 선택해 주세요");
	}else{
		for(var i=0; i<$('.productCount').length; i++){
			var productName = $('.productCount').eq(i).parents("tr").attr("id");
			var number = parseInt($('.productCount').eq(i).val());
			$.ajax({
				type : 'POST',
				url : '/kgmall/product/createCookie.do',
				data : {'productName' : productName , 'number' : number}
			});
		}
		location.href="/kgmall/cart/cart.do";
	}
}
</script>


<!-- 
            <script type="text/javascript">
                var EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA = {"common_member_id_crypt":""};
            </script>
            
<script type="text/javascript">var EC_SDE_SHOP_NUM = 1;var SHOP = {getLanguage : function() { return "ko_KR"; },getCurrency : function() { return "KRW"; },getFlagCode : function() { return "KR"; },isMultiShop : function() { return true; },isDefaultShop : function() { return true; },isDefaultLanguageShop : function(sLanguageCode) { return SHOP.isDefaultShop() && SHOP.isLanguageShop(sLanguageCode); },isKR : function() { return true; },isUS : function() { return false; },isJP : function() { return false; },isCN : function() { return false; },isTW : function() { return false; },isES : function() { return false; },isPT : function() { return false; },isLanguageShop : function(sLanguageCode) { return sLanguageCode === "ko_KR"; },getDefaultShopNo : function() { return 1; },getProductVer : function() { return 2; },isSDE : function() { return true; }};var EC_COMMON_UTIL = {convertSslForString : function(sString) { return sString.replace(/http:/gi, '');},convertSslForHtml : function(sHtml) { return sHtml.replace(/((?:src|href)\s*=\s*['"])http:(\/\/(?:[a-z0-9\-_\.]+)\/)/ig, '$1$2');},getProtocol : function() { return 'http'; },moveSsl : function() { if (EC_COMMON_UTIL.getProtocol() === 'http') { var oLocation = jQuery(window.location); var sUrl = 'https://' + oLocation.attr('host') + oLocation.attr('pathname') + oLocation.attr('search'); window.location.replace(sUrl); } }};</script><script type="text/javascript">            var EC_ROOT_DOMAIN = "cafe24.com";
            var EC_GLOBAL_INFO = (function() {
                var oData = {"base_domain":"ecudemo31431.cafe24.com","root_domain":"cafe24.com","is_global":false,"country_code":"KR","language_code":"ko_KR"};
                
                return {
                    getBaseDomain: function() {
                        return oData['base_domain'];
                    },

                    getRootDomain: function() {
                        return oData['root_domain'];
                    },

                    isGlobal: function() {
                        return oData['is_global'];
                    },

                    getCountryCode: function() {
                        return oData['country_code'];
                    },

                    getLanguageCode: function() {
                        return oData['language_code'];
                    }
                };
            })();</script>
 --><!-- 
<link rel="stylesheet" type="text/css" href="http://ecudemo31431.cafe24.com/ind-script/optimizer.php?filename=tZXhUsMgDMe_d_vqc8Q6fQPPB9AnoJC1OCCYgG5vL123c-f0zqv0Q3uQkt8_KSHAQB6hvWOITD0rD4xCmTWCFoEtU0igyXsK62K4gb-sR90IuZwshaaj_UzHnNJcUacOyPNck-oc_uKqYoSXgSI8XzKejoyyxmSdvnluixt-EO--ZLONSu_g9S0jHyC63NsgECnmOL1niHek2Fz4oV5lQZYyyAY9bdr7TQsxd87q1ZC8AzG4Mii2DyA7G9r2SPMlB4fnXMBgUtb9k2u2jojH8AXEK06MYz1hMCDsbML6cStj7LiZytVja8qRwlniscaf-SFyRqfGyOuRy1GgnMBnl6yU8nkZbIw29NUVNIX3AinBR12nZEaNqfUUS3PVhKqRpwSWIGe7CFVwCWynBJtkk1uOftXT6-JPp6hxVipt5_S1mEBKky7P7UMd8NT3j3WtEvZUroKLcVUN3DfdXpw1yKdbZ32ejzqf&type=css&k=00ecde62f9a09de2bbea9018362261d05a6ce239&t=1555846190">
<link rel="stylesheet" type="text/css" href="http://ecudemo31431.cafe24.com/ind-script/optimizer.php?filename=tdLBUsQgDAbge9urzxHZ9TF8CUrTNgoJEtjdvv1SrTqeF08kPzNfMgywSkBA1xfFpLUoEwY5m5ezgVhGT65fc_CgE_YTKi0M-k5sDEyzF0kQfVmIAW-duiTejzbB20fBtA0_weBUn-DRSTZGhVk42yvqblX1s--OYAjEbUZ9ywpsuYRF8kquNZ1klCztVCchCNekS6hRWOmC_6G7olnCg_JOBpmKR_B2k5IhFJ9JV4mvpLnN3l-3NQJFm9x6HM-nNvzx9euTzHQbLTOmP02Xt4im9ayEF8Lrb7X7dw&type=css&k=0b74ca8685776a5715c458b48650fbc4cb864f21&t=1556586844">
  -->

	

	<div id="container">
		<div id="contents">
			
<!-- 업데이트 2018-11-01 -->
<!--
    $category_page = /product/list.html
    $project_page = /product/project.html
    $jointbuy_page = /product/jointbuy.html
-->
<div class="xans-element- xans-product xans-product-headcategory location-product "><div class="path-product">
		<h2>현재 위치</h2>
		<ol>
<li><a href="/"><!--
한국어: 홈 or Home
영  어: Home
중국어: 首页
일본어: ホーム
-->
Home</a></li>
			<li class=""><a href="/product/list.html?cate_no=77">SELF-PAYMENT</a></li>
			<li class="displaynone"><a href="/product/list.html"></a></li>
			<li class="displaynone"><a href="/product/list.html"></a></li>
			<li class="displaynone"><strong><a href="/product/list.html"></a></strong></li>
		</ol>
</div>
</div>


<!-- 상단 전체영역 시작  -->
<div id="df-product-detail" df-data-custom="" df-data-price="" df-data-sale="" class="xans-element- xans-product xans-product-detail"><!-- 디테일전체 영역 시작 -->
<div class="detailArea" style="height:900px;" >

        <!-- 이미지 영역 시작 -->
		<div class="imgArea-wrap">
			<div class="xans-element- xans-product xans-product-image imgArea "><div class="keyImg">
					<div class="thumbnail">

						<!-- 상품 상세이미지 -->
						<span class="detail-image"><img class='big_img_size BigImage'><span id="zoomMouseGiude" style="display:block; position:relative; width:170px; margin:0 auto;"><img src="//img.echosting.cafe24.com/design/skin/admin/ko_KR/txt_product_zoom.gif" id="zoomGuideImage" alt="마우스를 올려보세요." style="position: absolute; top: -27px; right: 0px;"></span></span>
						<div id="zoom_wrap"><p class="image_zoom_large" style="display: none;"><span class="image_zoom_large_relative"><img id="zoom_image" alt="확대 이미지" src="//ecudemo31431.cafe24.com/web/product/big/df_sample_detail14_1.jpg" style="width: 1240px; height: 1240px;"></span></p></div>



					</div>

					<!-- 상품 추가이미지-->
					<div class="xans-element- xans-product xans-product-addimage listImg" style="display: block;"><ul>
<li class="xans-record-" style="display: none;"><div class="thumb"><img src="//ecudemo31431.cafe24.com/web/product/small/df_sample_list30.jpg" class="ThumbImage"></div></li>
													</ul>
</div>
</div>
</div>
		</div>
		<!-- //이미지 영역 종료 -->


        <!-- 상품정보 영역 시작 -->
		<div class="infoArea-wrap" >
			<div class="infoArea">

				<!-- DF픽스박스(상품정보영역) -->
				<div class="df-detail-fixed-box">

					<!-- DF픽스박스(스크롤영역) -->
					<div class="scroll-wrapper df-detail-fixed-scroll scrollbar-macosx" style="position: relative;"><div class="df-detail-fixed-scroll scrollbar-macosx scroll-content" style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 645px;">

						<div class="headingArea ">
							<span class="icon"><img src="http://ecudemo31431.cafe24.com/web/upload/icon_201601081108247400.gif" class="icon_img" alt="추천"></span>

							<!-- 상품명 -->
							<h2 id="headingAreaH2"></h2>

							<!-- 해외배송문구 -->
							<span class="delivery displaynone">[해외배송 가능상품]</span>

							<!-- 상품색상 -->
							<div class="color ">
								<div class="xans-element- xans-product xans-product-colorchip" id="headColor">
							</div>
						</div>

						<!-- 상품요약설명 -->
						<div class="df-summary-desc"></div>


						<!-- 공급사정보 -->
						<table border="1" summary="" class="supply displaynone"><tbody><tr>
<th scope="row">스토어 정보</th>
									<td>
<span></span><a href="#none" onclick=""><img src="" alt="공급사 바로가기"></a>
</td>
								</tr></tbody></table>
<!-- 상품 기본정보 --><div class="xans-element- xans-product xans-product-detaildesign"><!--
								출력 갯수 지정 변수, 없으면 설정된 전체가 나옵니다.
								count = 10
							-->
<table border="1" summary="">
<caption> 기본 정보</caption>
								<tbody>
<tr class="product_name_css  xans-record-">
<th scope="row"><span style="font-size:16px;color:#555555;">상품명</span></th>
										<td><span style="font-size:16px;color:#555555;" id="productName"></span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="prd_model_css  xans-record-">
<th scope="row"><span style="font-size:12px;color:#555555;">제조사</span></th>
										<td><span style="font-size:12px;color:#555555;" id="productCompany"></span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="mileage_value_css  xans-record-">
<th scope="row"><span style="font-size:11px;color:#555555;">적립금</span></th>
										<td><span style="font-size:11px;color:#555555;"><span id="span_mileage_text"></span></span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="product_custom_css  xans-record-">
<th scope="row"><span style="font-size:11px;color:#555555;">소비자가</span></th>
										<td><span style="font-size:11px;color:#555555;"><span id="span_product_price_custom"></span></span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="product_price_css  xans-record-">
<th scope="row"><span style="font-size:12px;color:#333333;font-weight:bold;">판매가</span></th>
										<td><span style="font-size:12px;color:#333333;font-weight:bold;"><strong id="span_product_price_text1"></strong><input id="product_price" name="product_price" value="" type="hidden"></span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="delivery_title_css  xans-record-">
<th scope="row"><span style="font-size:12px;color:#555555;">국내·해외배송</span></th>
										<td><span style="font-size:12px;color:#555555;">국내배송</span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="delivery_css  xans-record-">
<th scope="row"><span style="font-size:12px;color:#555555;">배송방법</span></th>
										<td><span style="font-size:12px;color:#555555;">고객직접선택</span><span class="df-custom-add"></span>
</td>
									</tr>
<tr class="delivery_price_css  xans-record-">
<th scope="row"><span style="font-size:12px;color:#555555;">배송비</span></th>
										<td><span style="font-size:12px;color:#555555;"><span class="delv_price_B"><select name="delivery_cost_prepaid" id="delivery_cost_prepaid">
<option value="P" selected="selected">수령시 결제(착불)</option>
<option value="C">주문시 결제(선결제)</option>
</select>고객직접선택</span></span><span class="df-custom-add"></span>
</td>
									</tr>

</tbody>
</table>
</div>
						<!-- //상품 기본정보 끝 -->


						<!-- 상품간략설명 -->
						<div class="df-simple-desc"></div>


						<p class="displaynone"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/txt_naver.gif" alt="개인결제창을 통한 결제 시 네이버 마일리지 적립 및 사용이 가능합니다."></p>
						<!-- //상세정보 내역 -->


						<!-- 2017-05-25 업데이트 -->
						<!-- 상품옵션 전체영역 -->
						<ul border="1" summary="" class="xans-element- xans-product xans-product-option xans-record-" id="ulul"><!-- 추가옵션 --><!-- 일반옵션 -->
<li class="xans-element- xans-product xans-product-option xans-record-">
<ul>
<li class="title" scope="row"><i class="fa fa-angle-right" aria-hidden="true"></i>컬러</li>
									<li class="content">
										<ul id="selectColor" option_product_no="82" option_select_element="ec-option-select-finder" option_sort_no="1" option_type="T" item_listing_type="S" option_title="컬러" product_type="product_option" product_option_area="product_option_82_0" option_style="preview" ec-dev-id="product_option_id1" ec-dev-name="option1" ec-dev-class="ProductOption0" class="ec-product-button ec-product-preview" required="true">
										</ul>
											<p class="value">[필수] 
												<span class="ec-shop-front-product-option-desc-trigger colorp" data-option_msg="옵션을 선택해 주세요" id="productColor">옵션을 선택해 주세요
												</span>
											</p>
											<select product_option_area_select="product_option_82_0" id="product_option_id1" name="option1" option_title="컬러" option_type="T" item_listing_type="S" class="ProductOption0" style="display:none;" required="true">
												<option value="*">empty</option>
												<option value="화이트">화이트</option>
												<option value="그레이">그레이</option>
												<option value="레드">레드</option>
												<option value="블랙">블랙</option>
												<option value="옐로우">옐로우</option>
											</select>
									</li>
								</ul>
							</li>
<li class="xans-element- xans-product xans-product-option xans-record-"><ul>
<li class="title" scope="row">
<i class="fa fa-angle-right" aria-hidden="true"></i>사이즈</li>
									<li class="content"><ul option_product_no="82" option_select_element="ec-option-select-finder" option_sort_no="2" option_type="T" item_listing_type="S" option_title="사이즈" product_type="product_option" product_option_area="product_option_82_0" option_style="button" ec-dev-id="product_option_id2" ec-dev-name="option2" ec-dev-class="ProductOption0" class="ec-product-button" required="true" id="productSize"><li class="sizeli ec-product-disabled" option_value="42" link_image="" title="s" id="sizeS"><a href="javascript:selectS()" ><span>S</span></a></li><li class="sizeli ec-product-disabled" option_value="44" link_image="" title="m" id="sizeM"><a href="javascript:selectM()" ><span>M</span></a></li><li class="sizeli ec-product-disabled" option_value="46" link_image="" title="L" id="sizeL"><a href="javascript:selectL()" ><span>L</span></a></li><li class="sizeli ec-product-disabled" option_value="48" link_image="" title="XL" id="sizeXL"><a href="javascript:selectXL()" ><span>XL</span></a></li></ul><p class="value">[필수] <span class="ec-shop-front-product-option-desc-trigger sizep" data-option_msg="옵션을 선택해 주세요" id="sizeValue">옵션을 선택해 주세요</span></p>
<select product_option_area_select="product_option_82_0" id="product_option_id2" name="option2" option_title="사이즈" option_type="T" item_listing_type="S" class="ProductOption0" style="display:none;" required="true"><option value="*">empty</option><option value="s">s</option><option value="m">m</option><option value="l">l</option><option value="xl">xl</option></select></li>
								</ul></li>
<!-- 파일첨부 옵션 -->
</ul>
<!-- //상품옵션 전체영역 끝 --><!-- 옵션추가 버튼 --><div class="displaynone add-option" id="">
							<a href="#none" onclick=""><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_manual_select.gif" alt="옵션 선택"></a>
						</div>


						<div class="guideArea">
							<!-- 참고 : 뉴상품관리 전용 변수가 포함되어 있습니다. 뉴상품관리 이외의 곳에서 사용하면 일부 변수가 정상동작하지 않을 수 있습니다. -->
							<p class="info ">최소주문수량 1개 이상<span class="displaynone"> / 최대주문수량 0개 이하</span></p>
							<!-- //참고 -->
							<span class="sizeGuide displaynone"><a href="#none" class="size_guide_info" product_no="82"><i class="fa fa-expand" aria-hidden="true"></i>사이즈 가이드</a></span>
						</div>


						<!-- 참고 : 뉴상품관리 전용 모듈입니다. 뉴상품관리 이외의 곳에서 사용하면 정상동작하지 않습니다. -->
						<!-- //참고 -->


						<!-- 참고 : 뉴상품관리 전용 모듈입니다. 뉴상품관리 이외의 곳에서 사용하면 정상동작하지 않습니다. -->
						<!-- //참고 -->


						<!-- 참고 : 뉴상품관리 전용 변수가 포함되어 있습니다. 뉴상품관리 이외의 곳에서 사용하면 일부 변수가 정상동작하지 않을 수 있습니다. -->
						<div id="totalProducts" class="" style="width: 100%; height:120px;overflow:scroll;" >
							<div class="thead-wrap" >
									</div>
									<table border="1" summary="" >
<caption>상품 목록</caption>
								<colgroup>
<col style="width:320px;">
<col style="width:70px;">
<col style="width:110px;">
</colgroup>
<thead ><tr>
<th scope="col">상품명</th>
											<th scope="col">상품수</th>
											<th scope="col">가격</th>
										</tr></thead>

								<tbody class="" id="totalTable">

								<tr id="deliveryPrice" class="displaynone">
									<td>배송비</td>
									<td>1</td>
									<td class="right">3,000</td>
								</tr>
							</tbody>
</table>
</div>
<!-- //참고 -->


						<div id="totalPrice" class="totalPrice">
							<strong>TOTAL</strong> : <span class="total"><strong><em id="totalp">0</em></strong></span>
						</div>
						<p class="ec-base-help txt11 displaynone EC-price-warning">할인가가 적용된 최종 결제예정금액은 주문 시 확인할 수 있습니다.</p>
						<!-- //2017-05-25 업데이트 끝 -->


					</div><div class="scroll-element scroll-x"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar" style="width: 96px;"></div></div></div><div class="scroll-element scroll-y"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar" style="height: 96px;"></div></div></div></div>
					<!-- //DF픽스박스(스크롤영역 -->

					<!-- 2017-02-25 구매 & 예약구매 버튼확인할것 상품코드: P00000DI -->

					<div class="xans-element- xans-product xans-product-action"><!--구매·장바구니·관심상품·품절 버튼 -->
<div class="ec-base-button df-action-button">
							<div class="ac-buy wrap"><a href="#none" class="df-btn buy " onclick="product_buy()"><span id="btnBuy">바로구매</span><span class="displaynone" id="btnReserve">예약주문</span></a></div>
							<div class="ac-basket wrap"><a href="#none" class="df-btn basket " onclick="product_cart()">장바구니</a></div>
							<div class="ac-soldout wrap displaynone"><span class="df-btn soldout">품절</span></div>
						</div>


<!-- 공통이벤트-B 상품이미지 옆 -->
<div class="common-event type-b displaynone "></div>
</div>
<!-- //참고 -->

				</div>
				<!-- //DF픽스박스(상품정보영역) -->

			<a href="#none" class="df-detail-fixed-btn"><i>옵<br>션<br>보<br>기</i><span class="line1"></span><span class="line2"></span></a></div>
		</div>
        <!-- //상품정보 영역 종료 -->

    </div>
<!-- //디테일 전체영역 종료 -->
<!-- 공급사:판매사정보 -->
<div class="supplyInfo displaynone">
            </div>
<!-- //공급사:판매사정보 -->
</div>
<!-- //상단 전체영역 종료  -->




<div id="df-detail-area" class="xans-element- xans-product xans-product-additional" style="text-align: center;"><!-- 상품상세정보 전체영역 -->
<div id="prdDetail" class="df-prd-detail-tab grid5 ">
        <ul class="menu">
<li class="selected"><a href="#prdDetail" class="movetab">DETAIL INFO</a></li>
            <li class="use-guide"><a href="#prdInfo" class="movetab">SHOP GUIDE</a></li>
            <li class="use-review"><a href="#prdReview" class="movetab">REVIEW<span class="board-count">0</span></a></li>
        </ul>

		<!-- 상품상세정보 영역 -->
        <div class="cont">

			<!-- 공통이벤트A:상품상세정보 위 -->
			<div class="common-event type-a "><div id="CommonEvent4"><p><img class ="image1"></p></div></div>

			<!-- 상품상세페이지 본문 -->
            <p align="center"><img alt="product details" class="image2"></p>
			<!-- 상세페이지 하단 공통이미지 -->
			<div class="detail-common-img">
				<!-- 배너관리 : 상세페이지 하단 공통이미지 -->
<p class="xans-element- xans-bannermanage2 xans-bannermanage2-display-1 xans-bannermanage2-display xans-bannermanage2-1 xans-record-"><a href="" alt="이미지"><img class="image3" alt="이미지" rel="28-1" src=""></a>
</p>
			</div>
        </div>
		<!-- //상품상세정보 영역 -->


    </div>
<!-- //상품상세정보 전체영역 -->
<!-- 상품구매안내 시작 -->
<div id="prdInfo" class="df-prd-detail-tab grid5 use-guide " style="display: block;">
        <ul class="menu">
<li><a href="#prdDetail" class="movetab">DETAIL INFO</a></li>
            <li class="selected use-guide"><a href="#prdInfo" class="movetab">SHOP GUIDE</a></li>
            <li class="use-review"><a href="#prdReview" class="movetab">REIVEW<span class="board-count">0</span></a></li>
        </ul>
<!-- 구매가이드 --><div class="detail-guide">
			<div class="inner-wrap">
				<!-- 결제정보 -->
				<div class="section account">
					<h3>
<i class="fa fa-credit-card" aria-hidden="true"></i>상품 결제정보</h3>
					<div class="df-cont">
						고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등
      정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다. &nbsp; <br>
      <br>
      무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다. &nbsp;<br>
      주문시 입력한&nbsp;입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며&nbsp;입금되지
      않은 주문은 자동취소 됩니다. <br>
					</div>
				</div>

				<!-- 배송안내 -->
				<div class="section delivery">
					<h3>
<i class="fa fa-map-o" aria-hidden="true"></i>배송안내<a href="https://search.naver.com/search.naver?sm=top_sug.pre&fbm=0&acr=2&acq=qothd&qdt=0&ie=utf8&query=%EB%B0%B0%EC%86%A1%EC%A1%B0%ED%9A%8C" class="df-btn tiny light">+ 배송조회</a>
</h3>
					<div class="df-cont">
						<ul>
<li>배송 방법 : 고객직접선택</li>
							<li>배송 지역 : 전국지역</li>
							<li>배송 비용 : 고객직접선택</li>
							<li>배송 기간 : 3일 ~ 7일</li>
							<li>- 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.<br>
    고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.<br>
</li>
						</ul>
</div>
				</div>

				<!-- 교환.반품안내 -->
				<div class="section return">
					<h3>
<i class="fa fa-refresh" aria-hidden="true"></i>교환 및 반품안내</h3>
					<div class="df-cont">
						<b>교환 및 반품이 가능한 경우</b><br>
- 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의<br>
&nbsp;&nbsp;경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.<br>
- 공급받으신 상품 및 용역의 내용이 표시.광고 내용과<br>
&nbsp;&nbsp;다르거나 다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내<br>
<br>

<b>교환 및 반품이 불가능한 경우</b><br>
- 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여<br>
&nbsp;&nbsp;포장 등을 훼손한 경우는 제외<br>
- 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우<br>
&nbsp;&nbsp;(예 : 가전제품, 식품, 음반 등, 단 액정화면이 부착된 노트북, LCD모니터, 디지털 카메라 등의 불량화소에<br>
&nbsp;&nbsp;따른 반품/교환은 제조사 기준에 따릅니다.)<br>
- 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 단, 화장품등의 경우 시용제품을 <br>
&nbsp;&nbsp;제공한 경우에 한 합니다.<br>
- 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우<br>
- 복제가 가능한 상품등의 포장을 훼손한 경우<br>
&nbsp;&nbsp;(자세한 내용은 고객만족센터 1:1 E-MAIL상담을 이용해 주시기 바랍니다.)<br>
<br>
※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.<br>
&nbsp;&nbsp;(색상 교환, 사이즈 교환 등 포함)<br>
					</div>
				</div>

				<!-- 서비스문의 -->
				<div class="section service displaynone">
					<h3>
<i class="fa fa-television" aria-hidden="true"></i>기타 안내</h3>
					<div class="df-cont">
											</div>
				</div>
			</div>
		</div>
		<!-- 구매가이드 종료 -->
    </div>
<!-- //상품구매안내 종료 -->





<!-- 상품사용후기 시작 -->
<div id="prdReview" class="df-prd-detail-tab grid5 use-review ">
        <ul class="menu">
<li><a href="#prdDetail" class="movetab">DETAIL INFO</a></li>
            <li class="use-guide"><a href="#prdInfo" class="movetab">SHOP GUIDE</a></li>
            <li class="selected use-review"><a href="#prdReview" class="movetab">REVIEW<span class="board-count">0</span></a></li>
        </ul>
<div class="board">
            <h3>REVIEW</h3>
            <p class="desc">상품의 사용후기를 적어주세요.</p>

			

<div id="df-review" class="list detail" df-review-act="detail" style="display: block; visibility: visible; opacity: 1;">
	<div class="xans-element- xans-product xans-product-review"><a name="use_review"></a>
<p class="noAccess displaynone">글읽기 권한이 없습니다.</p>
<div class="minor displaynone">
			<p><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/ico_under19.gif" alt=""> &nbsp;<strong>"19세 미만의 미성년자"</strong>는 출입을 금합니다!</p>
			<p class="button"><a href="/intro/board.html"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_adult_certification.gif" alt="성인인증 하기"></a></p>
		</div>
<div class="notice">
			<ul class="list-notice"><li df-data-href="?no=23&amp;board_no=4&amp;spread_flag=T" class="box xans-record-" no="23">
				<div class="chk"><img src="http://ecudemo31431.cafe24.com/web/upload/ico_board_notice.png" alt="공지"></div>
				<div class="product-thumb"><a href="/product/detail.html" class="displaynone"></a></div>
				<div class="subject"><a href="#none" class="open-read"><span><span class="reply displaynone"><i class="fa fa-reply fa-rotate-180"></i></span><span class="file displaynone"><i class="fa fa-camera"></i></span><span class="lock displaynone"><i class="fa fa-lock"></i></span></span>  안되는기능이 없다! 더 많은 기능을 포함한 디자인플로어 스킨! </a><div class="comment displaynone"></div></div>
				<div class="content"><a href="#none" class="open-read c1"></a></div>
				
				<div class="point "><span class="point0"></span></div>
				<div class="writer">
<span class="icon-mobile displaynone"><i class="fa fa-mobile" aria-hidden="true"></i></span>디자인플로어</div>
				<div class="date ">2016-01-08</div>
				<div class="vote "><div>
<a href="#none" class="df-review-btn btn-vote"></a> <span class="vote-num">10</span>
</div></div>
			</li><li df-data-href="?no=22&amp;board_no=4&amp;spread_flag=T" class="box xans-record-" no="22">
				<div class="chk"><img src="http://ecudemo31431.cafe24.com/web/upload/ico_board_notice.png" alt="공지"></div>
				<div class="product-thumb"><a href="/product/detail.html" class="displaynone"></a></div>
				<div class="subject"><a href="#none" class="open-read"><span><span class="reply displaynone"><i class="fa fa-reply fa-rotate-180"></i></span><span class="file displaynone"><i class="fa fa-camera"></i></span><span class="lock displaynone"><i class="fa fa-lock"></i></span></span>카페24 최신 업데이트가 모두 적용되었습니다. </a><div class="comment displaynone"></div></div>
				<div class="content"><a href="#none" class="open-read c1"></a></div>
				
				<div class="point "><span class="point0"></span></div>
				<div class="writer">
<span class="icon-mobile displaynone"><i class="fa fa-mobile" aria-hidden="true"></i></span>디자인플로어</div>
				<div class="date ">2016-01-08</div>
				<div class="vote "><div>
<a href="#none" class="df-review-btn btn-vote"></a> <span class="vote-num">7</span>
</div></div>
			</li><li df-data-href="?no=21&amp;board_no=4&amp;spread_flag=T" class="box xans-record-" no="21">
				<div class="chk"><img src="http://ecudemo31431.cafe24.com/web/upload/ico_board_notice.png" alt="공지"></div>
				<div class="product-thumb"><a href="/product/detail.html" class="displaynone"></a></div>
				<div class="subject"><a href="#none" class="open-read"><span><span class="reply displaynone"><i class="fa fa-reply fa-rotate-180"></i></span><span class="file displaynone"><i class="fa fa-camera"></i></span><span class="lock displaynone"><i class="fa fa-lock"></i></span></span>윈도우와 맥(애플OS) PC환경에서도 동일하게 표현됩니다. </a><div class="comment displaynone"></div></div>
				<div class="content"><a href="#none" class="open-read c1"></a></div>
				
				<div class="point "><span class="point0"></span></div>
				<div class="writer">
<span class="icon-mobile displaynone"><i class="fa fa-mobile" aria-hidden="true"></i></span>디자인플로어</div>
				<div class="date ">2016-01-08</div>
				<div class="vote "><div>
<a href="#none" class="df-review-btn btn-vote"></a> <span class="vote-num">8</span>
</div></div>
			</li><li df-data-href="?no=20&amp;board_no=4&amp;spread_flag=T" class="box xans-record-" no="20">
				<div class="chk"><img src="http://ecudemo31431.cafe24.com/web/upload/ico_board_notice.png" alt="공지"></div>
				<div class="product-thumb"><a href="/product/detail.html" class="displaynone"></a></div>
				<div class="subject"><a href="#none" class="open-read"><span><span class="reply displaynone"><i class="fa fa-reply fa-rotate-180"></i></span><span class="file displaynone"><i class="fa fa-camera"></i></span><span class="lock displaynone"><i class="fa fa-lock"></i></span></span>본 사이트는 장애인차별금지법에 규정된 내용을 준수합니다. </a><div class="comment displaynone"></div></div>
				<div class="content"><a href="#none" class="open-read c1"></a></div>
				
				<div class="point "><span class="point0"></span></div>
				<div class="writer">
<span class="icon-mobile displaynone"><i class="fa fa-mobile" aria-hidden="true"></i></span>디자인플로어</div>
				<div class="date ">2016-01-08</div>
				<div class="vote "><div>
<a href="#none" class="df-review-btn btn-vote"></a> <span class="vote-num">8</span>
</div></div>
			</li></ul>
</div>
<ul class="list-normal  list" style="display: block; visibility: visible; opacity: 1;">

			


		</ul>
</div>

	<div class="btnArea">
		<a href="#none" df-data-href="/board/review/write.html?board_no=4&amp;product_no=82&amp;cate_no=1&amp;display_group=2" class="df-review-btn review-write">리뷰작성</a>
		<a href="/board/review/list.html?board_no=4" class="df-review-btn review-viewall">모두보기</a>
	</div>

	<div class="xans-element- xans-layout xans-layout-footer companyname ">디자인 플로어</div>

</div>


			        </div>
    </div>
<!-- //상품사용후기 종료 -->

<div id="multi_option" style="display:none;"></div>
<form id="frm_image_zoom" style="display:none;"></form>
<script type="text/javascript">var sAuthSSLDomain = "login2.cafe24ssl.com";</script><script type="text/javascript" src="https://login2.cafe24ssl.com/crypt/AuthSSLManager.js"></script><script type="text/javascript" src="https://login2.cafe24ssl.com/crypt/AuthSSLManager.plugin.js"></script>



<script type="text/javascript" src="../js/productOption.js"></script>
<script type="text/javascript" src="../js/productOption2.js"></script>
<script type="text/javascript" src="../js/imageZoom.js"></script>
<script type="text/javascript" src="../js/detailProduct.js"></script>
<!-- <script type="text/javascript" src="../js/banner2.js"></script>
 --> 




<script type="text/javascript">
var mobileWeb = false;
var bUseElastic = false;
var sSearchBannerUseFlag = 'F';
EC_SHOP_FRONT_NEW_LIKE_COMMON.init({"bIsUseLikeProduct":true,"bIsUseLikeCategory":true});
EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT.bIsReviewTalk = 'F';
var bIsDisplaySoldoutOption =true;
var aSoldoutDisplay = {"82":"\ud488\uc808"};
var aReserveStockMessage = {"show_stock_message":"F","Q":"[\uc7ac\uace0 : [:\uc218\ub7c9:]\uac1c][\ub2f9\uc77c\ubc1c\uc1a1]","R":"[\uc7ac\uace0 : [:\uc218\ub7c9:]\uac1c][\uc608\uc57d\uc8fc\ubb38]","N":"","stock_message_replace_name":"[:\uc218\ub7c9:]"};
var SHOP_CURRENCY_INFO = {"1":{"aShopCurrencyInfo":{"currency_code":"KRW","currency_no":"410","currency_symbol":"\uffe6","currency_name":"South Korean won","currency_desc":"\uffe6 \uc6d0 (\ud55c\uad6d)","decimal_place":0,"round_method_type":"F"},"aShopSubCurrencyInfo":null,"aBaseCurrencyInfo":{"currency_code":"KRW","currency_no":"410","currency_symbol":"\uffe6","currency_name":"South Korean won","currency_desc":"\uffe6 \uc6d0 (\ud55c\uad6d)","decimal_place":0,"round_method_type":"F"},"fExchangeRate":1,"fExchangeSubRate":null,"aFrontCurrencyFormat":{"head":"","tail":" won"},"aFrontSubCurrencyFormat":{"head":"","tail":""}}};
var mileage_val = '3710';var mileage_generate_calc = '3710';
var basket_type = 'A0000';var product_name = '겉만 보지 말고';var product_max_type = 'F';var has_option = 'T';var mileage_icon = '//img.echosting.cafe24.com/design/skin/admin/ko_KR/ico_product_point.gif';var mileage_icon_alt = '적립금 ';var price_unit_head = '';var price_unit_tail = ' won';var option_push_button = 'F';var product_image_tiny = 'df_sample_list30_on.jpg';var is_adult_product = 'F';var is_individual_buy = 'F';var is_soldout_icon = 'F';var link_product_detail = '/product/겉만-보지-말고/82/display/2/';
var product_min = '1';var order_limit_type = 'O';
var product_max = '-1';
var buy_unit_type = 'O';var buy_unit = '1';
var product_price = '53000';var product_price_content = '';var is_selling_price = 'S';var product_price_mobile = '53000';var mobile_dc_price = '';var isMobileDcStatus = 'F';var product_price_ref = '';var currency_disp_type = 'P';
if ($("#span_product_coupon_dc_price").length) $('span[id="span_product_price_text"], strong[id="span_product_price_text"], span[id="span_product_tax_type_text"]').css("text-decoration", "line-through");
var delvtype = 'A';
$.data(document,'SameImage','F');
var _iPrdtPriceOrg = 48182;
var _iPrdtPriceTax = 4818;
var qrcode_class = 'EC_Qrcode5ce4c734beaa7';
var qrcode_url = 'http://ecudemo31431.cafe24.com/product/detail.html?product_no=82';
var sSocialUrl="/exec/front/Product/Social/";
var sIsMileageDisplay = 'T';
EC_SHOP_FRONT_NEW_OPTION_COMMON.initObject();
EC_SHOP_FRONT_NEW_OPTION_BIND.initChooseBox();
EC_SHOP_FRONT_NEW_OPTION_DATA.initData();
var sMileageUnit = '[:PRICE:]원';
var sIsDisplayNonmemberPrice = "F";
var sNonmemberPrice = '-';
var _iPrdtPriceOrg = 48182;
var _iPrdtPriceTax = 4818;
var option_type = 'T';var option_name_mapper = '컬러#$%사이즈';var option_stock_data = '{\"P00000DD000A\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ud654\\uc774\\ud2b8-42\",\"stock_number\":0,\"option_value_orginal\":[\"\\ud654\\uc774\\ud2b8\",\"42\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000A\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000B\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ud654\\uc774\\ud2b8-44\",\"stock_number\":0,\"option_value_orginal\":[\"\\ud654\\uc774\\ud2b8\",\"44\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000B\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000C\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ud654\\uc774\\ud2b8-46\",\"stock_number\":0,\"option_value_orginal\":[\"\\ud654\\uc774\\ud2b8\",\"46\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000C\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000D\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ud654\\uc774\\ud2b8-48\",\"stock_number\":0,\"option_value_orginal\":[\"\\ud654\\uc774\\ud2b8\",\"48\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000D\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000E\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\uadf8\\ub808\\uc774-42\",\"stock_number\":0,\"option_value_orginal\":[\"\\uadf8\\ub808\\uc774\",\"42\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000E\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000F\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\uadf8\\ub808\\uc774-44\",\"stock_number\":0,\"option_value_orginal\":[\"\\uadf8\\ub808\\uc774\",\"44\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000F\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000G\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\uadf8\\ub808\\uc774-46\",\"stock_number\":0,\"option_value_orginal\":[\"\\uadf8\\ub808\\uc774\",\"46\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000G\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000H\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\uadf8\\ub808\\uc774-48\",\"stock_number\":0,\"option_value_orginal\":[\"\\uadf8\\ub808\\uc774\",\"48\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000H\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000I\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ub808\\ub4dc-42\",\"stock_number\":0,\"option_value_orginal\":[\"\\ub808\\ub4dc\",\"42\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000I\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000J\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ub808\\ub4dc-44\",\"stock_number\":0,\"option_value_orginal\":[\"\\ub808\\ub4dc\",\"44\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000J\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000K\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ub808\\ub4dc-46\",\"stock_number\":0,\"option_value_orginal\":[\"\\ub808\\ub4dc\",\"46\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000K\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000L\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ub808\\ub4dc-48\",\"stock_number\":0,\"option_value_orginal\":[\"\\ub808\\ub4dc\",\"48\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000L\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000M\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ube14\\ub799-42\",\"stock_number\":0,\"option_value_orginal\":[\"\\ube14\\ub799\",\"42\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000M\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000N\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ube14\\ub799-44\",\"stock_number\":0,\"option_value_orginal\":[\"\\ube14\\ub799\",\"44\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000N\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000O\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ube14\\ub799-46\",\"stock_number\":0,\"option_value_orginal\":[\"\\ube14\\ub799\",\"46\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000O\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"},\"P00000DD000P\":{\"stock_price\":\"0.00\",\"use_stock\":false,\"use_soldout\":\"F\",\"is_display\":\"T\",\"is_selling\":\"T\",\"option_price\":53000,\"option_name\":\"\\uceec\\ub7ec#$%\\uc0ac\\uc774\\uc988\",\"option_value\":\"\\ube14\\ub799-48\",\"stock_number\":0,\"option_value_orginal\":[\"\\ube14\\ub799\",\"48\"],\"use_stock_original\":\"T\",\"use_soldout_original\":\"F\",\"use_soldout_today_delivery\":null,\"is_auto_soldout\":\"F\",\"is_mandatory\":\"T\",\"option_id\":\"000P\",\"is_reserve_stat\":\"N\",\"item_image_file\":null,\"origin_option_added_price\":\"0.00\"}}';var stock_manage = '';var option_value_mapper = '{\"\\ud654\\uc774\\ud2b8#$%42\":\"P00000DD000A\",\"\\ud654\\uc774\\ud2b8#$%44\":\"P00000DD000B\",\"\\ud654\\uc774\\ud2b8#$%46\":\"P00000DD000C\",\"\\ud654\\uc774\\ud2b8#$%48\":\"P00000DD000D\",\"\\uadf8\\ub808\\uc774#$%42\":\"P00000DD000E\",\"\\uadf8\\ub808\\uc774#$%44\":\"P00000DD000F\",\"\\uadf8\\ub808\\uc774#$%46\":\"P00000DD000G\",\"\\uadf8\\ub808\\uc774#$%48\":\"P00000DD000H\",\"\\ub808\\ub4dc#$%42\":\"P00000DD000I\",\"\\ub808\\ub4dc#$%44\":\"P00000DD000J\",\"\\ub808\\ub4dc#$%46\":\"P00000DD000K\",\"\\ub808\\ub4dc#$%48\":\"P00000DD000L\",\"\\ube14\\ub799#$%42\":\"P00000DD000M\",\"\\ube14\\ub799#$%44\":\"P00000DD000N\",\"\\ube14\\ub799#$%46\":\"P00000DD000O\",\"\\ube14\\ub799#$%48\":\"P00000DD000P\"}';var item_count = '16';var item_listing_type = 'S';var product_option_price_display = 'T';
var add_option_name = '';
var iProductNo = '82';var iCategoryNo = '1';var iDisplayGroup = '2';var option_msg = '필수 옵션을 선택해 주세요.';var sLoginURL = 'login.html';var bPrdOptLayer = '';var sOptionType = 'T';
var bCoupondownClick = false;
$('#btn_all_coupondown').bind('click', function() {
if (bCoupondownClick === false) {
bCoupondownClick = true;
//쿠폰발급실행 레이어
if (typeof(sCouponDownResultUrl) !== 'undefined') {
sDownloadURL = '/exec/front/newcoupon/IssueDownload';
aParam = 'coupon_no=44280000000000050,44280000000000049';
aParam += '&return_type=json';
//쿠폰발급 실행
$.post(sDownloadURL, aParam, function( data ) {
COUPON.getDownCouponResultForm(data);
}, 'json');
} else {
location.href='/exec/front/newcoupon/IssueDownload?coupon_no=44280000000000050,44280000000000049&opener_url=%2F%2Fecudemo31431.cafe24.com%2Fproduct%2Fdetail.html%3Fproduct_no%3D82%26cate_no%3D1%26display_group%3D2';
}
}
});
var sCouponDownResultUrl = '/coupon/coupon_down_result.html'
var aCouponInfo = {"44280000000000050":{"coupon_no":44280000000000050,"coupon_name":"%EB%B0%B0%EC%86%A1%EB%B9%84%20%EB%AC%B4%EB%A3%8C%EC%BF%A0%ED%8F%B0","coupon_kind":"\ud560\uc778","coupon_content":"2500 won \ud560\uc778","coupon_period":"2017-02-26%20~%202021-12-31","coupon_period_detail":"2017-02-26%2000%3A00%20~%202021-12-31%2023%3A00","coupon_usecon":"%EC%A0%9C%ED%95%9C%20%EC%97%86%EC%9D%8C","download_url":"\/\/img.echosting.cafe24.com\/design\/skin\/admin\/ko_KR\/btn_coupondown_skin1.png","background_user_img":"F","background_url":"\/\/img.echosting.cafe24.com\/smartAdmin\/img\/promotion\/coupon_skin1.png","background_class":null,"coupon_issue":"%EC%A0%9C%ED%95%9C%20%EC%97%86%EC%9D%8C","coupon_issue_url":"\/exec\/front\/newcoupon\/IssueDownload?coupon_no=44280000000000050&opener_url=http%3A%2F%2Fecudemo31431.cafe24.com%2Fproduct%2Fdetail.html%3Fproduct_no%3D82%26cate_no%3D1%26display_group%3D2","call_coupon_detail":"onclick=\"COUPON.viewInfo('44280000000000050', this)\"","coupon_product_info":"%EC%A0%84%EC%B2%B4%EC%83%81%ED%92%88","foreign_delivery_msg":""},"44280000000000049":{"coupon_no":44280000000000049,"coupon_name":"365%20%EB%B8%94%EB%9E%99%20%ED%94%84%EB%9D%BC%EC%9D%B4%EB%8D%B0%EC%9D%B4","coupon_kind":"% \ud560\uc778","coupon_content":"50.0% \ud560\uc778","coupon_period":"2017-02-26%20~%202021-12-31","coupon_period_detail":"2017-02-26%2000%3A00%20~%202021-12-31%2023%3A00","coupon_usecon":"%EC%A0%9C%ED%95%9C%20%EC%97%86%EC%9D%8C","download_url":"\/\/img.echosting.cafe24.com\/design\/skin\/admin\/ko_KR\/btn_coupondown_skin1.png","background_user_img":"F","background_url":"\/\/img.echosting.cafe24.com\/smartAdmin\/img\/promotion\/coupon_skin1.png","background_class":null,"coupon_issue":"%EC%A0%9C%ED%95%9C%20%EC%97%86%EC%9D%8C","coupon_issue_url":"\/exec\/front\/newcoupon\/IssueDownload?coupon_no=44280000000000049&opener_url=http%3A%2F%2Fecudemo31431.cafe24.com%2Fproduct%2Fdetail.html%3Fproduct_no%3D82%26cate_no%3D1%26display_group%3D2","call_coupon_detail":"onclick=\"COUPON.viewInfo('44280000000000049', this)\"","coupon_product_info":"%EC%A0%84%EC%B2%B4%EC%83%81%ED%92%88","foreign_delivery_msg":""}}
var bIsDisplaySoldoutOption =true;
var aSoldoutDisplay = {"82":"\ud488\uc808","84":"\ud488\uc808"};
var bIsDisplaySoldoutOption =true;
var aSoldoutDisplay = {"82":"\ud488\uc808","84":"\ud488\uc808","85":"\ud488\uc808"};
var bIsDisplaySoldoutOption =true;
var aSoldoutDisplay = {"82":"\ud488\uc808","84":"\ud488\uc808","85":"\ud488\uc808","86":"\ud488\uc808"};
var bIsDisplaySoldoutOption =true;
var aSoldoutDisplay = {"82":"\ud488\uc808","84":"\ud488\uc808","85":"\ud488\uc808","86":"\ud488\uc808","87":"\ud488\uc808"};
var sOptionValueMapper84 = '{\"Gray#$%Small\":\"P00000DF000A\",\"Gray#$%Medium\":\"P00000DF000B\",\"Gray#$%Large\":\"P00000DF000C\",\"Red#$%Small\":\"P00000DF000D\",\"Red#$%Medium\":\"P00000DF000E\",\"Red#$%Large\":\"P00000DF000F\",\"Black#$%Small\":\"P00000DF000G\",\"Black#$%Medium\":\"P00000DF000H\",\"Black#$%Large\":\"P00000DF000I\"}';
var sOptionValueMapper85 = '{\"\\uadf8\\ub808\\uc774#$%42\":\"P00000DG000A\",\"\\uadf8\\ub808\\uc774#$%44\":\"P00000DG000B\",\"\\uadf8\\ub808\\uc774#$%46\":\"P00000DG000C\",\"\\ub808\\ub4dc#$%42\":\"P00000DG000D\",\"\\ub808\\ub4dc#$%44\":\"P00000DG000E\",\"\\ub808\\ub4dc#$%46\":\"P00000DG000F\",\"\\ube14\\ub799#$%42\":\"P00000DG000G\",\"\\ube14\\ub799#$%44\":\"P00000DG000H\",\"\\ube14\\ub799#$%46\":\"P00000DG000I\"}';
var sOptionValueMapper86 = '{\"White#$%Small\":\"P00000DH000Q\",\"White#$%Medium\":\"P00000DH000R\",\"White#$%Large\":\"P00000DH000S\",\"White#$%X-Large\":\"P00000DH000T\",\"Gray#$%Small\":\"P00000DH000U\",\"Gray#$%Medium\":\"P00000DH000V\",\"Gray#$%Large\":\"P00000DH000W\",\"Gray#$%X-Large\":\"P00000DH000X\"}';
var sOptionValueMapper87 = '{\"\\ud654\\uc774\\ud2b8#$%42\":\"P00000DI000A\",\"\\ud654\\uc774\\ud2b8#$%44\":\"P00000DI000B\",\"\\ud654\\uc774\\ud2b8#$%46\":\"P00000DI000C\",\"\\ud654\\uc774\\ud2b8#$%48\":\"P00000DI000D\",\"\\uadf8\\ub808\\uc774#$%42\":\"P00000DI000E\",\"\\uadf8\\ub808\\uc774#$%44\":\"P00000DI000F\",\"\\uadf8\\ub808\\uc774#$%46\":\"P00000DI000G\",\"\\uadf8\\ub808\\uc774#$%48\":\"P00000DI000H\",\"\\ub808\\ub4dc#$%42\":\"P00000DI000I\",\"\\ub808\\ub4dc#$%44\":\"P00000DI000J\",\"\\ub808\\ub4dc#$%46\":\"P00000DI000K\",\"\\ub808\\ub4dc#$%48\":\"P00000DI000L\",\"\\ube14\\ub799#$%42\":\"P00000DI000M\",\"\\ube14\\ub799#$%44\":\"P00000DI000N\",\"\\ube14\\ub799#$%46\":\"P00000DI000O\",\"\\ube14\\ub799#$%48\":\"P00000DI000P\"}';
var relation_product = '{\"83\":{\"buy_unit\":1,\"product_min\":1,\"product_max\":0},\"84\":{\"buy_unit\":1,\"product_min\":1,\"product_max\":0},\"85\":{\"buy_unit\":1,\"product_min\":1,\"product_max\":0},\"86\":{\"buy_unit\":1,\"product_min\":1,\"product_max\":0},\"87\":{\"buy_unit\":1,\"product_min\":1,\"product_max\":0}}';
var EC_SHOP_MULTISHOP_SHIPPING = {"bMultishopShipping":false,"bMultishopShippingCountrySelection":false,"bMultishopShippingLanguageSelection":false};
var aLogData = {"log_server1":null,"log_server2":null,"mid":"ecudemo31431","stype":"e","domain":"","shop_no":1,"etc":""};
var sMileageName = '적립금';
var sMileageUnit = '[:PRICE:]원';
var sDepositName = '예치금';
var sDepositUnit = '원';
var EC_ASYNC_LIVELINKON_ID = '';
$(document).ready(function(){
var cHeight =  $('.xans-srlite-display > .srlite-list').outerHeight(true) + 60;
$('.xans-srlite-display').height( cHeight );
$('.xans-srlite-display > .srlite-list').show()
$('.xans-srlite-display > .srlite-remote').hide();
});
var EC_FRONT_JS_CONFIG_SHOP = {"bECUseItemSalePrice":false,"sCouponDownloadPage":"\/coupon\/coupon_productdetail.html","aOptionColorchip":{"#FFFFFF":"","#C2C2C2":"","#6694CC":"","#4D4D4D":""}};
var EC_FRONT_JS_CONFIG_MANAGE = {"sWebLogEventFlag":"F"};
</script>
<div id="image_zoom_small" style="width: 150px; height: 150px; display: none;"></div><iframe src="http://ecudemo31431.cafe24.com/exec/front/eclog/main/?product_no=82&amp;cate_no=1&amp;isplay_group=2&amp;rloc=http%3A//ecudemo31431.cafe24.com/product/detail.html%3Fproduct_no%3D82%26cate_no%3D1%26display_group%3D2&amp;rref=http%3A//ecudemo31431.cafe24.com/&amp;udim=1440*900&amp;rserv=null&amp;cid=CID066a5ce356a88de48d416ebd40ade8bf&amp;role_path=PRODUCT_DETAIL" id="log_realtime" style="display: none;"></iframe><div style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"><div style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div></div></body></html>