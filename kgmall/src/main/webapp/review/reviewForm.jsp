<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
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
		type : 'POST',
		url : '/kgmall/review/reviewListForm.do',
		data : {'pg' : $('#pg').val()},
		dataType : 'json',
		success : function(data){
			$('#total').text(data.totalA);
			$('.prdList').html(data.reviewList);
			$('#paging').html(data.listPaging.pagingHTML);
		}
	});
	
});
</script>
</html>