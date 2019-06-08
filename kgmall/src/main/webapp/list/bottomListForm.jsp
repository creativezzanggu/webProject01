<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<link rel="stylesheet" type="text/css" href="../css/productCss1.css">
<link rel="stylesheet" type="text/css" href="../css/productCss2.css">
<title></title>
</head>
<body>
<input type="hidden" id="pg" name="pg" value="${pg }">
<input type="button" id="category" name="category" value="">

<div class="xans-element- xans-product xans-product-menupackage" style="margin-left: 322px;">
		<div class="location-product">
	<div class="xans-element- xans-product xans-product-headcategory tit-product "style="margin-top: 30px;">
		<h2><span>BOTTOM</span></h2>
	</div>
</div>
		<div class="df-sub-menu type-box grid6">
			<ul class="depth1">
				<li class="xans-element- xans-product xans-product-headcategory view-all displaynone "><a href="/product/list.html?cate_no=54"></a></li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
					<p class="name" onclick="Bottom('SKIRT')">SKIRT</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
						<p class="name" onclick="Bottom('LEGGINGS')">LEGGINGS</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
					<a href="#">
						<p class="name" onclick="Bottom('PANTS')">PANTS</p>
					</a>
				</li>
				<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
				<a href="#">
					<p class="name" onclick="Bottom('DENIM')">DENIM</p>
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
						<ul id="type" class="xans-element- xans-product xans-product-orderby">
							<li class="xans-record-"><a href="javascript:void(0);" onclick="BottomOption('productName',"")" id="productName">상품명</a></li>
							<li class="xans-record-"><a href="javascript:void(0);" onclick="BottomOption('lowPrice')" id="lowPrice">낮은가격</a></li>
							<li class="xans-record-"><a href="javascript:void(0);" onclick="BottomOption('highPrice')" id="highPrice">높은가격</a></li>
							<li class="xans-record-"><a href="javascript:void(0);" onclick="BottomOption('company')" id="company">제조사</a></li>
						</ul>
					</div>
				</div>
				<div class="xans-element- xans-product xans-product-listnormal df-list-product">
					<ul class="prdList grid3">
					</ul>
				</div>
				<div id="paging" style="float: left; text-align: center; width:100%;"></div>
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
		url : '/kgmall/list/BottomList.do',
		data : 'pg='+$('#pg').val(),
		dataType : 'json',
		success : function(data){
			$('#category').val('BOTTOM');
			$('#total').text(data.totalA);
			$('.prdList').html(data.pruductList);
			$('#paging').html(data.listPaging.pagingHTML);
		}
	});
	
});
function Bottom(name){
	$.ajax({
		type : 'POST',
		url : '/kgmall/list/bottomSelectListForm.do',
		data : {'pg' : $('#pg').val(),
				'subcategory' : name},
		dataType : 'json',
		success : function(data){
			$('#category').val(name);
			$('#total').text(data.totalA);
			$('.prdList').html(data.pruductList);
			$('#paging').html(data.listPaging.pagingHTML);
			
			
			
		}//success
	});//ajax
}	

function BottomOption(option){
	$.ajax({
		type : 'POST',
		url : '/kgmall/list/bottomSelectOptionForm.do',
		data : {'pg' : $('#pg').val(),
				'majorcategory' : 'BOTTOM',
				'option' : option},
		dataType : 'json',
		success : function(data){
			$('#total').text(data.totalA);
			$('.prdList').html(data.pruductList);
			$('#paging').html(data.listPaging.pagingHTML);
		}
	});
}

function bottomSelect(pg){
	$('#pg').val(pg);
	$('#SKIRT').trigger('click','trigger');
}
</script>
</html>

						