<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	</head>
	<body>
	<div id="container">
	<div id="contents">
		<div class="page-wrapper">
			<div class="container-fluid">
				<div class="col-lg-12"><!--게시판 넓이 -->
					<div class="col-lg-12">
						<h1 class="page-header">상품 관리</h1>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">상품 리스트 </div>
						<div class="panel-body">
							<table class="table table-hover">
								<thead>
									<tr>
										<th>대분류</th>
										<th>소분류</th>
										<th>제조사</th>
										<th>상품명_색상_사이즈</th>
										<th>수량</th>
										<th>상품코드</th>
										<th>상품가격</th>
										<th>메인이미지</th>
										<th>상품이미지1</th>
										<th>상품이미지2</th>
										<th>상품이미지3</th>
										<th>수정버튼</th>
									</tr>
								</thead>
								<tbody id="productList">
								
								</tbody>
							</table>
						</div>
					</div>
				</div>
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
			url : '/kgmall/admin/productList.do',
			dataType : 'json',
			success : function(data){
				$('#productList').html(data.productList);
			}
		});
	});
	function countModify(productname){
		$.ajax({
			type : 'POST',
			url : '/kgmall/admin/countUpdate.do',
			data : {'productname': productname,
					'productcount' :$('#input'+productname).val()},
			dataType : 'json',
			success : function(data){
			}
		});
	}
	function countDelete(productname){
		$.ajax({
			type : 'POST',
			url : '/kgmall/admin/countDelete.do',
			data : {'productname': productname},
			dataType : 'text',
			success : function(data){
				if(data='yes'){
					$('#tr'+productname).remove();
				}
			}
		});
	}
	</script>
</html>