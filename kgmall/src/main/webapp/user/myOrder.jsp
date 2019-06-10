<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="../css/myPageCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/myPageCss2.css">
<link rel="stylesheet" type="text/css" href="../css/myPageCss3.css">
</head>
<body>
<form id="myOrder">
<div class="myShop">
<div class="xans-element- xans-myshop xans-myshop-orderhistorylistitem section orderList" id="productList">
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
</form>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript" src="../js/myPage2.js">
</script>
</html>