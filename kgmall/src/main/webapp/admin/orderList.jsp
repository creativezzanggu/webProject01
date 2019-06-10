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
		<div class="page-wrapper">
			<div class="container-fluid">
				<div class="col-lg-12"><!--게시판 넓이 -->
					<div class="col-lg-12">
						<h1 class="page-header">주문 관리</h1>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">주문 리스트 </div>
						<div class="panel-body">
							<table class="table table-hover">
								<thead>
									<tr>
										<th>주문번호</th>
										<th>상품이미지</th>
										<th>상품이름</th>
										<th>상품가격</th>
										<th>갯수</th>
										<th>합계</th>
										<th>주문상태</th>
										<th>주문아이디</th>
										<th>주문날짜</th>
										<th>주문확인</th>
									</tr>
								</thead>
								<tbody id="orderlist">
								
								</tbody>
							</table>
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
			url : '/kgmall/admin/orderList.do',
			dataType : 'json',
			success : function(data){
				$('#orderlist').html(data.orderlist);
			}
		});
	});
	function orderOK(seq){
		$.ajax({
			type : 'POST',
			url : '/kgmall/admin/orderOK.do',
			data : {'seq': seq},
			dataType : 'json',
			success : function(data){
				if(data.check2=='ok'){
					obj = document.getElementById('order'+seq);
					obj.innerHTML = "상품 주문 완료";
				}
			}
		});
	}
	function countDelete(seq){
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