<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="../css/myPageCss1.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/myPageCss2.css">
<link rel="stylesheet" type="text/css" href="../css/myPageCss3.css">
</head>
<body>
<form id="myQALIST" action="/kgmall/board/QAview.do">
<input type="hidden" name="seq" value=""/>
<div class="myShop">
<!-- 내 게시글 -->
<div class="xans-element- xans-myshop xans-myshop-boardpackage section myBoard ">
<div class="xans-element- xans-myshop xans-myshop-boardlist content">
<table id="myQA" width="100%" border="1">
<caption>게시물 관리 목록</caption>
<colgroup class="xans-element- xans-board xans-board-listheader-1002 xans-board-listheader xans-board-1002 ">
<col style="width:70px;">
<col style="width:140px;">
<col style="width:auto;">
<col style="width:120px;">
<col style="width:100px;">
<col style="width:80px;">
</colgroup>
<thead><tr class="txtLittle">
<th scope="col">번호</th>
<th scope="col">분류</th>
<th scope="col">제목</th>
<th scope="col">작성자</th>
<th scope="col">작성일</th>
<th scope="col">조회</th>
</tr></thead>
</table>
<p id="empty3" class="empty"></p>
</div>
</form>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript" src="../js/myPage2.js">
</script>
</html>