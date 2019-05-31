<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   

<style type="text/css">
*{
font-family: "Nanum Gothic","Malgun Gothic","맑은 고딕","돋움","Dotum","Apple Gothic","Apple SD Gothic Neo",sans-serif;
}
ul {
    list-style:none;
    margin:0;
    padding:0;
}

li {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    border : 0;
    float: left;
    margin-left:32px;
}
table {
color:#353535;
font-size:12px;
line-height:140%;
border-collapse: collapse;
border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;
}
td{
padding:14px 0; 
border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;
}
.btnArea {overflow: hidden;margin: 15px 0 50px;text-align: left;}
.btnAreaCustom {font-size: 0;}
.btn.Wnormal {min-width: 80px;text-decoration: none;}
.btn.Normal {font-size: 11px;height: 31px;line-height: 31px;}
.btn.Dark {background: #272727;color: #ffffff;border: 1px solid #272727;}
.btn {font-family: "Roboto","Arial","Nanum Gothic","돋움","Dotum","Apple Gothic","Apple SD Gothic Neo",sans-serif;color: white;font-size: 12px;
height: 27px;line-height: 27px;cursor: pointer;outline: none;vertical-align: middle;text-align: center;padding: 0px 8px 0 9px;border: 1px solid #e0e0e0;
background: gray;margin: 0;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;-webkit-border-radius: 6px;
-moz-border-radius: 6px;border-radius: 6px;-webkit-border-radius: 6px 6px 6px 6px;-moz-border-radius: 6px 6px 6px 6px;border-radius: 6px 6px 6px 6px;
-webkit-appearance: none;-moz-appearance: none;-o-transition: all 0.12s ease-in-out;-ms-transition: all 0.12s ease-in-out;-moz-transition: all 0.12s ease-in-out;
-webkit-transition: all 0.12s ease-in-out;transition: all 0.12s ease-in-out;}
</style>

<body>
<form name="noticeViewForm">
<div id="title" style="margin-left:322px;">
<br><br>
<h2 style="font-size:16px;">NOTICE</h2>
<p style="font-size:12px;">공지사항입니다.</p>
</div>
<div style="padding:5px 0 11px;" >
</div>
<input type="hidden" name="seq" value="${noticeDTO.seq }">
<input type="hidden" name="subject" value="${noticeDTO.subject }">
<input type="hidden" name="content" value="${noticeDTO.content }">
<div style="margin-left:322px;">
		<table style="width:100%">

	<tr>
		<td width="100px" align="center">제목</td>
		<td>${noticeDTO.getSubject() }</td>
	</tr>
	
	<tr>
		<td align="center">작성자</td>
		<td>${noticeDTO.getWriter() }</td>
	</tr>
	
	<tr>
		<td colspan="2">
			<ul>
				<li>작성일</li>
				<li>${noticeDTO.getLogtime() }</li>
				<li>조회</li>
				<li>${noticeDTO.getHit() }</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			
				<pre>${noticeDTO.getContent() }</pre>
		
		</td>
	</tr>
	
</table>
<br>
<div class="btnArea btnAreaCustom ">
	<span class="left">
		<a href="/kgmall/notice/noticeForm.do?pg=1" class="btn Normal Medium Wnormal">
			목록
		</a>
		<c:if test="${id=='admin' }">
			<input type="button" value="수정" onclick="mode(1)" class="btn Normal Medium Wnormal">
	
			<input type="button" value="삭제" onclick="mode(2)" class="btn Normal Medium Wnormal">
		</c:if>
	</span>
</div>
</div >

</form>
</body>

<script>
	function mode(num) {
		if(num==1) {
			document.noticeViewForm.method='post';
			document.noticeViewForm.action='/kgmall/notice/noticeModifyForm.do';
			document.noticeViewForm.submit();
		}else if(num==2) {
			var con_test = confirm('정말로 삭제하시겠습니까?');
			if(con_test == true){
				document.noticeViewForm.method='post';
				document.noticeViewForm.action='/kgmall/notice/noticeDelete.do';
				document.noticeViewForm.submit();
			}
		}
	}
</script>
</html>