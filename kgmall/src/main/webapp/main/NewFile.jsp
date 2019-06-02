<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<input type="number" id="number1" value="1">
</body>
<script>
$("#number1").keyup.function () {
    alert("changed");            
});
</script>
</html>