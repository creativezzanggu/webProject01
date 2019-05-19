<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>kgmall</title>
<style>
.a{
	display: inline-block;
	width:200px;
	height:200px;
	background-color: red;
}
.b{
	display: inline-block;
	width:200px;
	height:200px;
	background-color: blue;
}
.c{
	display: inline-block;
	width:200px;
	height:200px;
	background-color: black;
}
@media screen and (max-width: 700px){
	.a,.b,.c{
		width:100%
	}
} 
</style>
</head>
<body>
출력
<div class="a"></div>
<div class="b"></div>
<div class="c"></div>
</body>
</html>