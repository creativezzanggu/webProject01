<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>홈페이지</title>
<meta name="viewpoint" content="width=device-width,initial-scale=1.0,mininum-scale=1.0,maximum-scale=1.0,user-scalable:no">
<style>
	#indexDiv{
		background-image: url('../img/sea.jpg');
		background-size: cover;
	}
	#mainHeader{
		color:aqua;
	}
	//max-width를 사용하게 되면 max-width에 입력하는 사이즈보다 작을 경우 “적용시킬 CSS”가 실행
	
	//min-width를 쓰게되면 min-width에 입력되는 사이즈 이상일 경우 “적용시킬 CSS”가 실행
	@media screen and (min-width: 800px){
		#indexDiv{
			width:80%;
		}
		#mainSection{
			width:270px;
		}
		#mainAside{
			width:800px;
		}
	}
</style>
</head>
<body style="margin:0;">
<div id="indexDiv" align="center">
	<div id="mainHeader" align='center'>
		<jsp:include page="../template/top.jsp"/>
	</div>
	<div id="mainSection">
	<c:if test="${sessionScope.name != null}">
		<h2>${name}님 환영합니다.</h2>
		<input type="button" value="로그아웃" id="logout">
	</c:if>
	<c:if test="${sessionScope.name == null}">
		<jsp:include page="../template/left.jsp"/>
	</c:if>
	</div>
	<div id="mainAside">
		<jsp:include page='${display}'/>
	</div>
	<div id="mainFooter">
		<jsp:include page="../template/bottom.jsp"/>
	</div>
</div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script>
$('#logout').click(function(){
	alert("로그아웃 되었습니다.");
	location.href="../login/logout.do";
});
</script>
</html>