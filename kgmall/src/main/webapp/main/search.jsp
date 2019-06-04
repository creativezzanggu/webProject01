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
<!-- 상품분류(majorcategory) -->
<strong>상품분류</strong> <select id="category_no" name="majorcategory" fw-filter="" fw-label="" fw-msg="">
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
<input id="keyword" name="keyword" fw-filter="" fw-label="상품명/제조사" fw-msg="" class="inputTypeText" placeholder="" size="15" value="" type="text"></div>
				<div class="item">
				
<!-- 판매가격대(product_price1, product_price2)-->
<strong>판매가격대</strong> 
<input id="product_price1" name="product_price1" fw-filter="isNumber" fw-label="최소판매가격" fw-msg="" class="input01" placeholder="" size="15" value="" type="text"> ~ 
<input id="product_price2" name="product_price2" fw-filter="isNumber" fw-label="최대판매가격" fw-msg="" class="input01" placeholder="" size="15" value="" type="text"></div>
				<div class="item">
				
<!-- 검색정렬기준(order_by)-->
<strong>검색정렬기준</strong> <select id="order" name="order" fw-filter="" fw-label="검색정렬기준" fw-msg="">
<option value="" selected="selected">::: 기준선택 :::</option>
<option value="date">날짜 순</option>
<option value="name">상품명 순</option>
<option value="priceasc">가격 순</option>
</select></div>
<!-- 오름/내림차순 -->
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
<div class="xans-element- xans-search xans-search-result df-list-product"><!--
        $count = 48
        ※ 노출시킬 상품개수를 숫자로 설정할 수 있습니다. 개수가 너무 많으면 쇼핑몰에 부하가 발생할 수 있습니다.
    -->
<ul class="prdList grid3" id="product_list">

<li id="anchorBoxId_83" class="item xans-record-"><div class="box">
	<span class="label-best">BEST</span>
	<span class="label-new">NEW</span>
	<div class="thumbnail">
		<span class="chk"><input type="checkbox" class=" displaynone"></span>
		<a href="/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1" name="anchorBoxName_83" df-data-rolloverimg1="//ecudemo31431.cafe24.com/web/product/medium/df_sample_list29.jpg" df-data-rolloverimg2="//ecudemo31431.cafe24.com/web/product/tiny/df_sample_list29_on.jpg"><img src="//ecudemo31431.cafe24.com/web/product/medium/df_sample_list29.jpg" id="eListPrdImage83_" alt="아직도 FTP를 이용하세요?" class="thumb"><!-- 일반목록꾸미기아이콘 --><!-- 검색목록꾸미기아이콘 --></a>
		<div class="likeButton likePrd likePrd_83 ">
			<button type="button"><img src="/web/upload/icon_201606070448230500.png" class="likePrdIcon" product_no="83" category_no="42" icon_status="off" alt="좋아요 등록 전"><strong class=""><span class="likePrdCount likePrdCount_83">0</span></strong></button>
			<span class="bg-layer1"></span><span class="bg-layer2"></span><span class="bg-layer3"></span><span class="bg-layer4"></span>
		</div>
		<span class="discountrate displaynone" df-data-custom="67,000" df-data-price="재입고 중입니다." style="display: none;">
			<span class="rate"></span>%
			<span class="df-data-sale displaynone"></span>
		<span>
	</span></span>
</div>
	<div class="timesale" df-data-timesales="" df-data-timesalee="">
<span class="before"></span><span class="ing"></span><span class="after"></span>
</div>
	<div class="timesaleSpace"></div>
	<div class="description">
		<div class="fadearea">
			<div class="displaynone">
							</div>
			<p class="name">
				<a href="/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1" class=""><strong class="title displaynone"><span style="font-size:12px;color:#555555;">상품명</span> :</strong> <span style="font-size:12px;color:#555555;">아직도 FTP를 이용하세요?</span></a>
			</p>
			<ul class="xans-element- xans-search xans-search-listitem"><!-- 검색목록 상품정보 --><li item-title="상품요약정보" class=" xans-record-">
<strong class="title displaynone"><span style="font-size:11px;color:#888888;">상품요약정보</span> :</strong> <span style="font-size:11px;color:#888888;">FTP 접속 없이도 간단하게 이미지를 등록하거나 수정해보세요.</span></li>
<li item-title="모델" class=" xans-record-">
<strong class="title displaynone"><span style="font-size:11px;color:#555555;">모델</span> :</strong> <span style="font-size:11px;color:#555555;">한샘</span></li>
<li item-title="소비자가" class=" xans-record-">
<strong class="title displaynone"><span style="font-size:12px;color:#999999;">소비자가</span> :</strong> <span style="font-size:12px;color:#999999;text-decoration:line-through;">67,000 won</span></li>
<li item-title="판매가" class=" xans-record-">
<strong class="title displaynone"><span style="font-size:12px;color:#333333;">판매가</span> :</strong> <span style="font-size:12px;color:#333333;">재입고 중입니다.</span></li>
</ul>
<div class="icon">  <img src="/web/upload/icon_201601081108247400.gif" class="icon_img" alt="추천">    </div>
		</div>
		<a href="/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1" class="fadebox-link"></a>
	</div>
	<div class="status">
		 <div class="button">
			<span class="option displaynone"></span><span class="basket "><img src="/web/upload/icon_201606070448018000.png" onclick="category_add_basket('83','42', '1', 'A0000', false, '1', 'P00000DE', 'A', 'F', '0');" alt="장바구니 담기" class="ec-admin-icon cart"></span><span class="wishIcon "><img src="/web/upload/icon_201606070448153300.png" class="icon_img ec-product-listwishicon" alt="관심상품 등록 전" productno="83" categoryno="1" icon_status="off" login_status="T" individual-set="F"></span><span class="newwindow use-targetblank"><a href="/product/detail.html?product_no=83&amp;cate_no=42&amp;display_group=1" target="_blank"><img src="/web/upload/dfloor_base/web/icon/ico_blank.png"></a></span>
		 </div>
	</div>
</div></li>
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
<script type="text/javascript" src="../js/search.js"></script>