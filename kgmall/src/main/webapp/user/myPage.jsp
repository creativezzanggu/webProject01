<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<style type="text/css">
.subject a{color:#2e2e2e;text-decoration: none;}
.subject a:hover{color:#888;}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width"><meta http-equiv="Cache-Control" content="no-cache"><meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache">

<link href="../css/myPageCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/myPageCss2.css">
<link rel="stylesheet" type="text/css" href="../css/myPageCss3.css">

<meta name="keywords" content="BEAUTY INSIDE">
</head>
<body>

<div id="container">
<div id="contents">
<div class="location-subpage">
<br><br>
<div class="tit-subpage myshop">
<h2></h2>
</div>
</div>

<div class="myShop">
	<div class="xans-element- xans-myshop xans-myshop-asyncbenefit myInfo "><div class="userLeft ">
	<div class="userImage"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/member/img_member_default.gif" 
								onerror="this.src='//img.echosting.cafe24.com/skin/base/member/img_member_default.gif';" 
								class="myshop_benefit_group_image_tag"></div>
	<div class="userInfo">
<span class="userName"><span>
<span class="xans-member-var-name">${id }</span></span></span>
<span class="groupName"><span class="displaynone">
<img src="" alt="" class="myshop_benefit_group_icon_tag"></span>
<span class="xans-member-var-group_name">일반회원</span>
<span class="myshop_benefit_ship_free_message"></span></span>
</div>
		</div>
<div class="userRight">
	<div class="quickButton">
	<p class="welcome"><b><span><span class="xans-member-var-name">${id}</span></span></b></p>
<ul class="xans-element- xans-myshop xans-myshop-main ">
<!-- 주문내역 -->
<li class="order"><a href="#productList"></a></li>
<!-- 장바구니 -->
<li class="cart"><a href="#"><span class="count"><span class="xans_myshop_main_basket_cnt">0</span></span></a></li>
<!-- 최근 본 상품 -->
<li class="recent"><a href="#product"><span class="count"><span class="xans_myshop_main_recent_cnt">0</span></span></a></li>
<!-- 내가쓴글 -->
<li class="mypostings"><a href="#myWrite"></a></li>
</ul>
</div>
<div class="xans-element- xans-myshop xans-myshop-asyncbankbook mileage"><ul>
<li class="totalorder">
	<strong class="title"></strong>
	<strong class="data total"><span id="xans_myshop_bankbook_order_price">0 won</span></strong>
</li>
<li class="displaynone">
	<strong class="title"></strong>
	<strong class="data use"></strong>
	<a href="/myshop/deposits/historyList.html" class="df-btn detail"></a>
</li>
<li class="usemileage">
	<strong class="title">적립금</strong>
	<strong class="data use"><span id="xans_myshop_bankbook_avail_mileage">0원</span></strong>
	<a href="/myshop/mileage/historyList.html" class="df-btn detail"></a>
</li>
<li class="totalmileage">
	<strong class="title">적립금</strong>
	<strong class="data"><span id="xans_myshop_bankbook_total_mileage">0원</span></strong>
</li>
<li class="usedmileage">
	<strong class="title">적립금</strong>
	<strong class="data"><span id="xans_myshop_bankbook_used_mileage">0원</span></strong>
</li>
<li class="coupon">
	<strong class="title"></strong>
	<strong class="data"><span id="xans_myshop_bankbook_coupon_cnt">0</span></strong>
	<a href="/myshop/coupon/coupon.html" class="df-btn detail"></a>
</li>
</ul></div></div></div>

<div class="xans-element- xans-myshop xans-myshop-asyncbenefit benefitInfo"><h3 class="title"></h3>
<div class="content">
<div class="benefit ko ">
<p><span>항상 저희 KG mall 을 이용해 주셔서 감사합니다. 
<strong class="txtEm"><span><span class="xans-member-var-name">${id}</span></span></strong>
 회원님은 <strong>[ <span class="xans-member-var-group_name" id="member">${usergrade }</span>
<span class="myshop_benefit_ship_free_message"></span>]</strong> 등급 회원이십니다.</span></p>
</div>
</div>
</div>

<div class="xans-element- xans-myshop xans-myshop-orderhistorylistitem section orderList">
<h3 class="title" id="productList">주문 상품 정보<a href="/myshop/order/list.html"></a></h3>
<div class="content">
<table border="1">
<caption>주문 상품 정보</caption>
<colgroup>
<col style="width:160px;">
<col style="width:100px;">
<col style="width:auto;">
<col style="width:60px;">
<col style="width:150px;">
<col style="width:140px;">
</colgroup>
<thead><tr>
<th scope="col" class="no"></th>
<th scope="col" class="image"></th>
<th scope="col" class="product"></th>
<th scope="col" class="quantity"></th>
<th scope="col" class="price"></th>					
</tr></thead>
</table>
<p id="empty1" class="empty"></p>
</div>
</div>

<!-- 최근 본 상품 -->
<div class="xans-element- xans-product xans-product-recentlist section recentView xans-record-"><h3 id="product" class="title">
<span class="title"></span></h3>

<div class="content">
<table width="100%" border="1" summary="" class="displaynone">
<caption>최근 본 상품 목록</caption>
<colgroup>
<col style="width:100px">
<col style="width:auto">
<col style="width:220px">
<col style="width:140px">
<col style="width:210px">
</colgroup>
<thead><tr class="txtLittle">
<th scope="col" class="image"></th>
	<th scope="col" class="product"></th>
	<th scope="col" class="option"></th>
	<th scope="col" class="price"></th>
	<th scope="col" class="order"></th>
</tr></thead>
</table>
<p id="empty2" class="empty"></p>
</div>
</div>

<!-- 내 게시글 -->
<div class="xans-element- xans-myshop xans-myshop-boardpackage section myBoard "><h3 class="title" id="myWrite">
<span class="title"></span></h3>
<div class="xans-element- xans-myshop xans-myshop-boardlist content">

<table id="myQA" width="100%" border="1">
<caption>게시물 관리 목록</caption>
<colgroup class="xans-element- xans-board xans-board-listheader-1002 xans-board-listheader xans-board-1002 ">
<col style="width:70px;">
<col style="width:140px;">
<col style="width:auto;">
<col style="width:120px;">
<col style="width:100px;">
<col style="width:80px;">
</colgroup>
<thead><tr class="txtLittle">
<th scope="col">번호</th>
<th scope="col">분류</th>
<th scope="col">제목</th>
<th scope="col">작성자</th>
<th scope="col">작성일</th>
<th scope="col">조회</th>
</tr></thead>
</table>
<p id="empty3" class="empty"></p>
</body>
<script>
$(function(){
	//$('#empty3').attr("class","");
	
	if(${usergrade == 'bronze'}){
		$('#member').css("color", "brown");
	}
	else if(${usergrade == 'silver'}){
		$('#member').css("color","silver");
	}
	else{
		$('#member').css("color","gold");
	}
	
	$.ajax({
		type : 'GET',
		url : '/kgmall/board/myQAList.do',
		dataType : 'json',
		success : function(data){
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>',{
					align : 'center',
					text : items.seq
				})).append($('<td/>',{
					align : 'center',
					text : items.category
				})).append($('<td/>',{
					align : 'center',
					class : 'subject'
					}).append($('<a/>',{
						href : '/kgmall/board/QAview.do?seq='+items.seq,
						text : items.subject
					}))
				).append($('<td/>',{
					align : 'center',
					text : items.id
				})).append($('<td/>',{
					align : 'center',
					text : items.logtime
				})).append($('<td/>',{
					align : 'center',
					text : items.hit
				})).appendTo($('#myQA'));
				
			});
		}
	});
	
	
	
});


</script>
</html>