<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
<style type="text/css">
#paging{
	color: black;
	text-decoration: none;
	cursor: pointer;
}
#currentPaging{
	color: red;
	text-decoration: underline;
	cursor: pointer;
}
</style>
<link rel="stylesheet" type="text/css" href="../css/productCss1.css">
<link rel="stylesheet" type="text/css" href="../css/productCss2.css">
<title></title>
</head>
<body>
<input type="hidden" id="pg" name="pg" value="${pg }">
<input type="hidden" id="category" name="category" value="">

<div class="xans-element- xans-product xans-product-menupackage" style="margin-left: 322px;">
		<div class="location-product">
			<div id="title">
				<h2>PHOTO REVIEW</h2>
				<p>상품 사용후기입니다.</p>
			</div>
		</div>
		<div class="df-sub-menu type-box grid6">
			<ul class="depth1">
				<li class="xans-element- xans-product xans-product-headcategory view-all displaynone "><a href="/product/list.html?cate_no=54"></a></li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
					<p class="name" id='OUTER' onclick="ReviewSearch('OUTER')">OUTER</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
						<p class="name" id='TOP' onclick="ReviewSearch('TOP')">TOP</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
						<p class="name" id='BOTTOM' onclick="ReviewSearch('BOTTOM')">BOTTOM</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
				<a href="#">
					<p class="name" id='SHOES&BAG' onclick="ReviewSearch('SHOES&BAG')">SHOES&BAG</p>
				</a>
				</li>
			</ul>
		</div>
</div>

<div id="wrap">
	<div id="container">
		<div id="contents">
			<div class="xans-element- xans-product xans-product-normalpackage ">
				<div class="xans-element- xans-product xans-product-normalmenu ">
					<div class="function">
						<p class="prdCount">Total <strong id="total"> </strong> items </p>
					</div>
				</div>
				<div class="xans-element- xans-product xans-product-listnormal df-list-product">
					<ul class="prdList grid3">
					</ul>
				</div>
				<div id="paging" style="float: left; text-align: center; width:100%;"></div>
				<c:if test="${id != null}">
					<a id="qawrite" href="/kgmall/review/reviewWriteForm.do" class="btn Normal Wnormal Dark ">쓰기</a>
				</c:if>
			</div>
		</div>
	</div>
</div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/review/reviewListForm.do',
		data : {'pg' : $('#pg').val()},
		dataType : 'json',
		success : function(data){
			$('#total').text(data.totalA);
			$('.prdList').html(data.reviewList);
			$('#paging').html(data.reviewPaging.pagingHTML);
		}//success
	});//ajax
});
function aler(name){
	alert(name);
}
function ReviewSearch(name){
	$.ajax({
		type : 'POST',
		url : '/kgmall/review/reviewSelectListForm.do',
		data : {'pg' : $('#pg').val(),
				'majorcategory':name},
		dataType : 'json',
		success : function(data){
			$('#total').text(data.totalA);
			$('.prdList').html(data.reviewList);
			$('#paging').html(data.reviewPaging.pagingHTML);
		}//success
	});//ajax
}

function reviewSelect(pg,name){
	$('#pg').val(pg);
	ReviewSearch(name);
}

</script>
</html>