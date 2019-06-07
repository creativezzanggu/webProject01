<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<link rel="stylesheet" type="text/css" href="../css/productCss1.css">
<link rel="stylesheet" type="text/css" href="../css/productCss2.css">
<title></title>
</head>
<body>
<input type="hidden" id="pg" name="pg" value="${pg }">

<div class="xans-element- xans-product xans-product-menupackage ">
	<div class="location-product">
		<div class="xans-element- xans-product xans-product-headcategory path-product">
		<h2>현재 위치</h2>
		<ol>
		<li>Home</li>
		<li>BOTTOM</li>
		</ol>
		</div>
		<div class="xans-element- xans-product xans-product-headcategory tit-product ">
		<p class="img"><img src="/web/upload/dfloor_base/web/sample/top_img_category_1260.jpg"></p>
		<h2><span>TOP</span></h2>
		<div class="likeButton btn-effect likeCate likeCate_54">
		<button type="button">LIKE<img src="/web/upload/icon_201606070448230500.png" class="likeCateIcon" category_no="54" icon_status="off">
		<strong class=""><span class="likeCateCount likeCateCount_54">2</span></strong>
		</button>
		</div>
		</div>
	</div>
	<div class="df-sub-menu type-box grid6">
		<ul class="depth1">
		<li class="xans-element- xans-product xans-product-headcategory view-all displaynone "><a href="/product/list.html?cate_no=54"></a></li>
		<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-">
			<a href="/product/list.html?cate_no=55">
			<p class="name">TEE SHIRT<span class="count displaynone">()</span></p>
			<i class="fa fa-angle-down icon displaynone" aria-hidden="true"></i>
			</a>
		</li>
		<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-"><a href="/product/list.html?cate_no=56">
		<p class="name">BLOUSE<span class="count displaynone">()</span></p>
		<i class="fa fa-angle-down icon displaynone" aria-hidden="true"></i>
		</a>
		<div class="depth2">
		</div>
		</li>
		<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-"><a href="/product/list.html?cate_no=57">
		<p class="name">KNIT<span class="count displaynone">()</span></p>
		<i class="fa fa-angle-down icon displaynone" aria-hidden="true"></i>
		</a>
		<div class="depth2">
		</div>
		</li>
		<li style="display:;" class="xans-element- xans-product xans-product-displaycategory  xans-record-"><a href="/product/list.html?cate_no=58">
		<p class="name">CAMI<span class="count displaynone">()</span></p>
		<i class="fa fa-angle-down icon displaynone" aria-hidden="true"></i>
		</a>
		<div class="depth2">
		</div>
		</li>
		</ul>
	</div>
</div>

<div id="wrap">
	<div id="container">
		<div id="contents">
			<div class="xans-element- xans-product">
				<div class="location-product">
					<div class="xans-element- xans-product xans-product-headcategory path-product">
						<h2>현재 위치</h2>
						<ol>
							<li>Home</li>
							<li>OUTER</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="xans-element- xans-product xans-product-normalpackage ">
				<div class="xans-element- xans-product xans-product-normalmenu ">
					<div class="function">
						<p class="prdCount">Total <strong id="total"> </strong> items </p>
						<ul id="type" class="xans-element- xans-product xans-product-orderby">
							<li class="xans-record-"><a href="?cate_no=49&amp;sort_method=1#Product_ListMenu">상품명</a></li>
							<li class="xans-record-"><a href="?cate_no=49&amp;sort_method=3#Product_ListMenu">낮은가격</a></li>
							<li class="xans-record-"><a href="?cate_no=49&amp;sort_method=4#Product_ListMenu">높은가격</a></li>
							<li class="xans-record-"><a href="?cate_no=49&amp;sort_method=2#Product_ListMenu">제조사</a></li>
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
			$('#total').text(data.totalA);
			$('.prdList').html(data.pruductList);
			$('#paging').html(data.listPaging.pagingHTML);
		}
	});
});
</script>
</html>

						