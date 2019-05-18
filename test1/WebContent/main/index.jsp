<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>홈페이지</title>
<style>
	table#indexTable{
		background-image: url('../img/sea.jpg');
		background-size: cover;
	}
	#mainHeader{
		color:aqua;
	}
</style>
</head>
<body>
<table border="1" width="80%" id="indexTable">
<tr>
	<td id="mainHeader" align='center' colspan="2">
		<jsp:include page="../template/top.jsp"/>
	</td>
</tr>
<tr>
	<td id="mainSection" width="270" height="600">
	<c:if test="${sessionScope.name != null}">
		<h2>${name}님 환영합니다.</h2>
		<input type="button" value="로그아웃" id="logout">
	</c:if>
	<c:if test="${sessionScope.name == null}">
		<jsp:include page="../template/left.jsp"/>
	</c:if>
	</td>
	<td id="mainAside">
		<jsp:include page='${display}'/>
	</td>
</tr>
<tr>
	<td id="mainFooter" colspan="2">
		<jsp:include page="../template/bottom.jsp"/>
	</td>
</tr>
</table>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script>
$('#logout').click(function(){
	alert("로그아웃 되었습니다.");
	location.href="../login/logout.do";
});
</script>
</html>