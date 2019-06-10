<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<style type="text/css">
.subject a{color:#2e2e2e;text-decoration: none;}
.subject a:hover{color:#888;}
</style>

<link href="../css/myPageCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/myPageCss2.css">
<link rel="stylesheet" type="text/css" href="../css/myPageCss3.css">

<meta name="keywords" content="BEAUTY INSIDE">
<body>
<form id="myPage">
<div id="container">
<div id="contents">
<div class="location-subpage">
<br><br>
<div class="tit-subpage myshop">
<h2></h2>
</div>
</div>

<div class="myShop">
	<div class="xans-element- xans-myshop xans-myshop-asyncbenefit myInfo "><div class="userLeft">
	<div class="userImage"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/member/img_member_default.gif"  
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
<li class="order"><a href="/kgmall/user/infoUpdateForm.do"></a></li>
<!-- 장바구니 -->
<li class="cart"><a href="/kgmall/cart/cart.do"></a></li>
<!-- 내가쓴글 -->
<li class="mypostings"><a href="#myWrite"></a></li>
</ul>
</div>
<div class="xans-element- xans-myshop xans-myshop-asyncbankbook mileage">
<ul>
<li class="totalorder">
	<span class="title">&nbsp;:&nbsp;
	<strong class="data total"><span id="xans_myshop_bankbook_order_price">0 won</span></strong></span>
</li>
</ul>
</div></div></div>

<div class="xans-element- xans-myshop xans-myshop-asyncbenefit benefitInfo"><h3 class="title"></h3>
<div class="content">
<div class="benefit ko ">
<p><span>항상 저희 KG mall 을 이용해 주셔서 감사합니다. 
<strong class="txtEm"><span><span class="xans-member-var-name">${id}</span></span></strong>
 회원님은 <strong>[ <span class="xans-member-var-group_name" id="member">${usergrade}</span>
<span class="myshop_benefit_ship_free_message"></span>]</strong> 등급 회원이십니다.</span></p>
</div>
</div>
</div>

<!-- 주문내역 -->
<div class="xans-element- xans-myshop xans-myshop-orderhistorylistitem section orderList" id="productList">
<div><h3 class="title" style="text-align:left; margin-bottom:-15px">주문 상품 정보</h3></div>
<div style="text-align:right; margin-bottom:15px;"><a href="#none" align="right" id="extend1">더보기</a></div>
<div class="content">
<table border="1" id="orderState">
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
<th scope="col">주문번호</th>
<th scope="col">이미지</th>
<th scope="col">상품명</th>
<th scope="col">수량</th>
<th scope="col">상품구매금액</th>	
<th scope="col">주문상태</th>				
</tr></thead>
</table>
<p id="empty1" class="empty"></p>
</div>
</div>

<!-- 내 게시글 -->
<div class="xans-element- xans-myshop xans-myshop-boardpackage section myBoard " id="myWrite">
<div style="text-align:left; margin-bottom:-15px"><strong style="font-size:10pt;">내 게시글</strong></div>
<div style="text-align:right; margin-bottom:15px;"><a href="#none" align="right" id="extend2">더보기</a></div>
<div class="xans-element- xans-myshop xans-myshop-boardlist content">

<table id="myQA" width="100%" border="1">
<caption>게시물 관리 목록</caption>
<colgroup class="xans-element- xans-board xans-board-listheader-1002 xans-board-listheader xans-board-1002">
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
</form>
</body>
<script type="text/javascript" src="../js/myPage.js"></script>