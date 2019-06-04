<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<link rel="stylesheet" type="text/css" href="../css/cartCss1.css">
<link rel="stylesheet" type="text/css" href="../css/cartCss2.css">
<link rel="stylesheet" type="text/css" href="../css/cartCss3.css">
</head>
<div id="container">
<div id="contents">
<br><br>
<div class="location-subpage">
<div class="tit-subpage">
<h2>Cart</h2>
</div>
</div>

<div class="xans-element- xans-order xans-order-basketpackage">
<div class="xans-element- xans-order xans-order-tabinfo df-base-tab typeLight"><ul class="menu">
<li class="selected "><a href="#none">국내배송상품 (0)</a></li>
</ul>
</div>

<!-- 장바구니 비어있을 때 -->
<div class="xans-element- xans-order xans-order-empty ">
<p><img src="../image/search.png"/><br><br>장바구니가 비어 있습니다.</p>
</div>

<!-- 주문 버튼 -->
<div class="xans-element- xans-order xans-order-totalorder df-base-button justify fs-0">
<a href="#none" class="df-btn highlight big mr-3">상품주문</a>
<span><a href="#" class="df-btn light big" id="ing_shopping">쇼핑계속하기</a></span>
</div></div>

<!-- 이용안내 -->
<div class="xans-element- xans-order xans-order-basketguide df-base-help ">
<h3>이용안내</h3>
<div class="inner">
<h4>장바구니 이용안내</h4>
<ol>
<li class="item1">해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
<li class="item2">해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
<li class="item3">선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
<li class="item4">[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
<li class="item5">장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
<li class="item6">파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
</ol>

<h4>무이자할부 이용안내</h4>
<ol>
<li class="item1">상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
<li class="item2">[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
<li class="item3">단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
</ol>
</div>
</div>
</div>
</div>
<script>
$('#ing_shopping').click(function(){
	location.href="/kgmall/main/index.do";
});
</script>