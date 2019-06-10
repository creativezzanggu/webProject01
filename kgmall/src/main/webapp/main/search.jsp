<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="http://ecudemo31431.cafe24.com/ind-script/optimizer.php?filename=tZVdbsMgDMffk77uHF7a7Qo7wHoCQtyEDTDD0LW3n5ukVaVq0pSRh0hg8O8PwR8wkENothFCpD4qBxGZctQImhkOkXwCTc6R34jhCf6yH3XFZHMy5KuWTgsdc0pLRa06Y1zmmlRr8RdXFQLsBwrwfs94Gxmyp8s6LfBkVFEPd46o68wYWQa5Q0e75mXXQMitNboekrPAHdYdsuk98KfxTTPinJzA4vUkM7c-UHTl4PJnKSdw2SbDcqH9YEIwvi-uoMkfBSJPEvQ_4d3BEsVRY4pksVQPMV2MPF1gDXI2q1AZ18C2irFKJtn16A8loix-TqTKGi70nNOqmIA9X77n1zLgYHNvprhWCXuK5_txUQ08Ve2JrekwwsdXRsFf56V1WEeytlU3oZuhjJJUZWkBUoPVt5RlN7cEmVezYeNMwfC6kBm88tn1lAajS6MjtZRojXyQphnIszmOyfwD&amp;type=css&amp;k=08db3a0511022b7e8020b18986dff266a3e0a2e0&amp;t=1559179802">
<div id="container">
		<div id="contents">
			
<div class="location-product">
	<div class="path-product">
		<h2>현재 위치</h2>
		<ol><li><a href="/kgmall/main/index.do">
Home</a></li>
			<li title="현재 위치"><strong>
Search</strong></li>
		</ol></div>
	<div class="tit-product">
		<h2>SEARCH</h2>
	</div>
</div>


<form id="searchForm" action="/kgmall/main/search.do">
<div id="searchResult" class="xans-element- xans-search xans-search-form "><div class="searchbox">
		<div class="wrap">
			<fieldset>
<legend>상품 검색</legend>
				<div class="item">
<input type="hidden" id="pg" value="${pg}">
<!-- 상품분류(majorcategory) -->
<strong>상품분류</strong> <select id="majorcategory" name="majorcategory" fw-filter="" fw-label="" fw-msg="">
<option value="" selected="selected">상품분류 선택</option>
<option value="outer">OUTER</option>
<option value="top">TOP</option>
<option value="bottom">BOTTOM</option>
<option value="shoes&bag">SHOES &amp; BAG</option>
</select></div>
	<div class="item">		
	
<!-- 상품검색 (search_type)-->
<strong>검색조건</strong><select id="search_type" name="search_type" fw-filter="" fw-label="상품검색" fw-msg="">
<option value="name" selected="selected">상품명</option>
<option value="code">상품코드</option>
<option value="company">제조사</option>
</select>				
	
<!-- 검색어(keyword)-->
<input id="keyword_detail" name="keyword" fw-filter="" fw-label="상품명/제조사" fw-msg="" class="inputTypeText" placeholder="" size="15" value="${keyword}" type="text"></div>
				<div class="item">
				
<!-- 판매가격대(product_price1, product_price2)-->
<strong>판매가격대</strong> 
<input id="product_price1" name="product_price1" fw-filter="isNumber" fw-label="최소판매가격" fw-msg="" class="input01" placeholder="" size="15" value="${search_paging.product_price1}" type="text"> ~ 
<input id="product_price2" name="product_price2" fw-filter="isNumber" fw-label="최대판매가격" fw-msg="" class="input01" placeholder="" size="15" value="${search_paging.product_price2}" type="text"></div>
				<div class="item">
				
<!-- 검색정렬기준(order)-->
<strong>검색정렬기준</strong> <select id="order" name="order" fw-filter="" fw-label="검색정렬기준" fw-msg="">
<option value="" selected="selected">::: 기준선택 :::</option>
<option value="logtime">날짜 순</option>
<option value="name">상품명 순</option>
<option value="price">가격 순</option>
</select></div>
<!-- 오름/내림차순(order_by) -->
				<div class="item">
<strong>오름/내림차순</strong> <select id="order_by" name="order_by" fw-filter="" fw-label="오름/내림차순" fw-msg="">
<option value="asc" selected="selected">오름차순</option>
<option value="desc">내림차순</option>
</select></div>
 
				<p class="button"><input type="button" id="searchBtn" value="검색하기" class="df-btn big light"></p>
			</fieldset>
</div>
    </div>
<div class="searchResult">
		<p class="record">Total <strong id="search_cnt"></strong> items</p>
		<ul class="xans-element- xans-search xans-search-orderby listType">
<li rel="recent" id="order_by_new" style="" class="">출시일</li>
<li rel="name" id="order_by_name" style="" class="">상품명</li>
<li rel="priceasc" id="order_by_price" style="" class="">가격순</li>
</ul>
</div>

<!-- 검색결과가 없을때 -->
<div class="noData " id="noData">
        
</div>
<!-- 검색 결과 보여주는 div -->
<div class="xans-element- xans-search xans-search-result df-list-product" id="product_div">
<ul class="prdList grid3" id="product_list">
	
    </ul>
</div>

	<!-- 페이징 처리 -->
<div class="xans-element- xans-search xans-search-paging df-base-paging" id="paging">

</div>

</div>
</form><!-- //참고 -->

<!-- 검색결과 상품목록 -->
<!-- //검색결과 상품목록 끝 -->

</div>
</div>
<script type="text/javascript">
	$('#majorcategory').val('${search_paging.majorcategory}');
	$('#search_type').val('${search_paging.search_type}');
	$('#order').val('${search_paging.order}');
	$('#order_by').val('${search_paging.order_by}');
</script>
<script type="text/javascript" src="../js/search.js"></script>