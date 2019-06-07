<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
	<div class="page-wrapper">
		<div class="container-fluid">
			<div class="col-lg-12">
				<!--게시판 넓이 -->
				<div class="col-lg-12">
					<h1 class="page-header">상품 등록 리스트</h1>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">공지사항</div>
					<div class="panel-body">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>대분류</th>
									<th>소분류</th>
									<th>제조사</th>
									<th>상품명</th>
									<th>상품코드</th>
									<th>상품가격</th>
									<th>색상</th>
									<th>사이즈</th>
									<th>메인이미지</th>
									<th>상품이미지1</th>
									<th>상품이미지2</th>
									<th>상품이미지3</th>
									<th>수정버튼</th>
								</tr>
							</thead>
							<tbody>
								<%-- <c:forEach items="${list}" var="adminDTO" var="detailProductDTO">
									<tr>
										<td>${boardVO.nno}</td>
										<td>${boardVO.ntitle}</td>
										<td>${boardVO.nwriter}</td>
										<td><fmt:formatDate pattern="yyyy-MM-dd HH:mm"
												value="${boardVO.nrdate}" /></td>
										<td>${boardVO.nviewcnt}</td>
									</tr>
								</c:forEach> --%>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>