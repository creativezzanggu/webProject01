<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<link rel="stylesheet" type="text/css" href="http://ecudemo31431.cafe24.com/ind-script/optimizer.php?filename=tZVdbsMgDMffk77uHF7a7Qo7wHoCQtyEDTDD0LW3n5ukVaVq0pSRh0hg8O8PwR8wkENothFCpD4qBxGZctQImhkOkXwCTc6R34jhCf6yH3XFZHMy5KuWTgsdc0pLRa06Y1zmmlRr8RdXFQLsBwrwfs94Gxmyp8s6LfBkVFEPd46o68wYWQa5Q0e75mXXQMitNboekrPAHdYdsuk98KfxTTPinJzA4vUkM7c-UHTl4PJnKSdw2SbDcqH9YEIwvi-uoMkfBSJPEvQ_4d3BEsVRY4pksVQPMV2MPF1gDXI2q1AZ18C2irFKJtn16A8loix-TqTKGi70nNOqmIA9X77n1zLgYHNvprhWCXuK5_txUQ08Ve2JrekwwsdXRsFf56V1WEeytlU3oZuhjJJUZWkBUoPVt5RlN7cEmVezYeNMwfC6kBm88tn1lAajS6MjtZRojXyQphnIszmOyfwD&amp;type=css&amp;k=08db3a0511022b7e8020b18986dff266a3e0a2e0&amp;t=1559179802">
<link rel="stylesheet" type="text/css" href="http://ecudemo31431.cafe24.com/ind-script/optimizer.php?filename=rZAxDsIwDEX3lpVzmFCOwSXaxG0i4jiKY4nevil0YQUm28_Ss_XBMyGg7VWwSGvUIfFgboOBrFMMtveVIojD3qGEJYE8QjIG3ByZC1gRsEzEqZHOqlSmU4Nn-Nq8K4mdRoQ4rqwVSGMN4jnfg9Qf7cff721DIDgW649yuf5Hn6Mu4RXJHJ7TmBKWj6Gra0az39oA&amp;type=css&amp;k=f70776aab6411a2433c464220b48f68fdb4d1797&amp;t=1556261055">
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
<input type="hidden" id="pageMoved" val="">

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
<option value="name">상품명</option>
<option value="code">상품코드</option>
<option value="company">제조사</option>
</select>				
	
<!-- 검색어(keyword)-->
<input id="keyword" name="keyword" fw-filter="" fw-label="상품명/제조사" fw-msg="" class="inputTypeText" placeholder="" size="15" value="${keyword}" type="text"></div>
				<div class="item">
				
<!-- 판매가격대(product_price1, product_price2)-->
<strong>판매가격대</strong> 
<input id="product_price1" name="product_price1" fw-filter="isNumber" fw-label="최소판매가격" fw-msg="" class="input01" placeholder="" size="15" value="" type="text"> ~ 
<input id="product_price2" name="product_price2" fw-filter="isNumber" fw-label="최대판매가격" fw-msg="" class="input01" placeholder="" size="15" value="" type="text"></div>
				<div class="item">
				
<!-- 검색정렬기준(order)-->
<strong>검색정렬기준</strong> <select id="order" name="order" fw-filter="" fw-label="검색정렬기준" fw-msg="">
<option value="" selected="selected">::: 기준선택 :::</option>
<option value="date">날짜 순</option>
<option value="name">상품명 순</option>
<option value="priceasc">가격 순</option>
</select></div>
<!-- 오름/내림차순(order_by) -->
				<div class="item">
<strong>오름/내림차순</strong> <select id="order_by" name="order_by" fw-filter="" fw-label="오름/내림차순" fw-msg="">
<option value="asc">오름차순</option>
<option value="desc">내림차순</option>
</select></div>
 
				<p class="button"><input type="button" id="searchBtn" value="검색하기" class="df-btn big light"></p>
			</fieldset>
</div>
    </div>
<div class="searchResult">
		<p class="record">Total <strong id="search_cnt">0</strong> items</p>
		<ul class="xans-element- xans-search xans-search-orderby listType">
<li rel="recent" style="" class="btn_order xans-record-">신상품</li>
<li rel="name" style="" class="btn_order xans-record-">상품명</li>
<li rel="priceasc" style="" class="btn_order xans-record-">낮은가격</li>
<li rel="price" style="" class="btn_order xans-record-">높은가격</li>
</ul>
</div>
<c:if test="${list == null}">
<div class="noData ">
        <strong class="warning"><i class="fa fa-search" aria-hidden="true"></i>검색결과가 없습니다.</strong>
        <strong>정확한 검색어 인지 확인하시고 다시 검색해 주세요.</strong>
        <ul>
<li>검색어/제외검색어의 입력이 정확한지 확인해 보세요.</li>
            <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
            <li>검색 옵션을 다시 확인해 보세요.</li>
        </ul>
</div>
</c:if>

<c:if test="${list != null}">
<div class="xans-element- xans-search xans-search-result df-list-product">
<ul class="prdList grid3" id="product_list">

    </ul>
</div>

</c:if>

	<!-- 페이징 처리 -->
<div class="xans-element- xans-search xans-search-paging df-base-paging"><p class="first"><a href="#none"><img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingFirst.png" class="img_on" alt="first"></a></p>
<p><a href="#none"><img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingPrev.png" class="img_on" alt="prev"></a></p>
<ol>
<li class="xans-record-"><a href="?banner_action=&amp;keyword=%EC%83%88&amp;page=1" class="this">1</a></li>
            </ol>
<p><a href="#none"><img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingNext.png" class="img_on" alt="next"></a></p>
<p class="last"><a href="#none"><img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingLast.png" class="img_on" alt="last"></a></p>
</div>
</div>
</form><!-- //참고 -->

<!-- 검색결과 상품목록 -->
<!-- //검색결과 상품목록 끝 -->

</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	alert('${pageMoved}');
	$('#pageMoved').val('${pageMoved}');
});
</script>
<script type="text/javascript" src="../js/search.js"></script>