<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   



<style type="text/css">
#paging{
	color: black;
	text-decoration: none;
	cursor: pointer;
}
#currentPaging{
	color: red;
	text-decoration: underline;
	cursor: pointer;
}
a:hover {
	color:gray;
}
a{
color:black;
text-decoration: none;
}

*{
font-family: "Nanum Gothic","Malgun Gothic","맑은 고딕","돋움","Dotum","Apple Gothic","Apple SD Gothic Neo",sans-serif;
}
#title {
font-famliy: 'Nanum Gothic';
}
td{
padding:14px 0; 
border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;
}
table {
color:#353535;
font-size:12px;
line-height:140%;
border-collapse: collapse;
border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;
}
th{
padding:14px 0; 
font-size:12px; 
border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;
}
#searchBtn{
backgournd:#fff; 
color:#7d7d7d; 
border:1px solid #ccc; 
font-size:11px; 
width:40px;
heigth:40px; 
line-height:20px; 
margin-left:5px; 
cursor:pointer;
outline:none;
vertical-align:middle;
text-align:center;

box-sizing:border-box;
display:inline-block;
border-radius:6px 6px 6px 6px;
text-decoration:none;
webkit-appearance: none;
}
#search_date,#search_key{
font-size:12px;
color:#353535;
vertical-align:middle;
outline:none;
border-radius:0px;
border:1px solid #e7e7e7;
background-color: white;
cursor: default;
}
#search{
border:1px solid #e7e7e7;
}
#noticeWriteBtn{
width:100px;
background-color: #f8585b;
border: none;
color:#fff;
padding: 10px 0;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 15px;
margin: 4px;
cursor: pointer;
border-radius:10px;
}
</style>
<div style="margin-left:322px;">
<br><br>
<div id="title">
<h2 style="font-size:16px;">NOTICE</h2>
<p style="font-size:12px;">공지사항입니다.</p>
</div>
<div style="padding:5px 0 11px;">
</div>
<input type="hidden" name="pg" id="pg" value="1">
<div id="boardList">
	<table id='noticeTable' width="100%">
		<thead>
			<tr>
				<th width="100px">번호</th>
				<th width="550px">제목</th>
				<th width="100px">작성자</th>
				<th width="100px">작성일</th>
				<th width="100px">조회</th>
			</tr>
		</thead>
	</table>
	<div id="paging" style="float: left; text-align: center; width:100%;"></div>
	<br>
	<div id="searching">
		<p>
			<select id="search_date" name="search_date" >
			<option value="week">일주일</option>
			<option value="month">한달</option>
			<option value="month3">세달</option>
			<option value="all">전체</option>
			</select>
			<select id="search_key" name="search_key">
			<option value="subject">제목</option>
			<option value="content">내용</option>
			<option value="writer">작성자</option>
			</select>
			<input id="search" name="search" placeholder="" value="" type="text">
			<a href="#none" id="searchBtn" onclick="">검색</a>
			
		</p>
		<c:if test="${id=='admin' }">
			<p align="right"><input type="button" id="noticeWriteBtn" value="글쓰기"></p>
			<input type="hidden" id="name" value="${name }">
		</c:if>
	</div>
</div>
</div>
<script>
	$(document).ready(function(){
		$.ajax({
			type : 'post',
			url : '/kgmall/notice/getNoticeList.do',
			data : 'pg=${pg}',
			dataType : 'json',
			success : function(data) {
				//alert(JSON.stringify(data));
				
				//$('table tr:gt(0)').remove();
				$.each(data.list, function(index, items){
					
					$('<tr/>').append($('<td/>',{
						align : 'center',
						text : items.seq
					})).append($('<td/>',{

					}).append($('<a/>',{
						href : '/kgmall/notice/noticeView.do?seq='+items.seq,
						text : items.subject
					}))).append($('<td/>',{

						align : 'center',
						text : items.writer
					})).append($('<td/>',{

						align : 'center',
						text : items.logtime
					})).append($('<td/>',{

						align : 'center',
						text : items.hit
					})).appendTo('#noticeTable');
					
				});
				
				$('#paging').html(data.noticePaging.pagingHTML);
				
			}
		});
	});
	
	$('#noticeWriteBtn').click(function(){
		var name = $('#name').val();
		location.href = '/kgmall/notice/noticeWriteForm.do?name='+name;
	})
	
	$('#searchBtn').click(function(event, str){
		if(str!='trigger') $('#pg').val(1); //맨처음에 검색버튼 눌렀을 때
		if($('#search').val()=='') alert('검색어를 입력하세요');
		
		else {
			var date1 = $('#search_date option:selected').val();
			var key = $('#search_key option:selected').val();
			var search = $('#search').val();
			
			if($('#search_date option:selected').val()=='week') {
				date = "sysdate-7";
			}
			else if($('#search_date option:selected').val()=='month') {
				date = "sysdate-30";
			}
			else if($('#search_date option:selected').val()=='month3') {
				date = "sysdate-90";
			}
			else if($('#search_date option:selected').val()=='all') {
				date = "to_date(sysdate, 'YYYY-MM-DD')";
			}
			
			//alert(date+" " + key + " " + search);
			
			$.ajax({
				type : 'post',
				url : '/kgmall/notice/getNoticeSearch.do',
				data : {'date' : date,
						'key' : key,
						'search' : search,
						'pg' : $('#pg').val()},
				dataType : 'json',
				success : function(data){
					
					
					$('table tr:gt(0)').remove();
					$.each(data.list, function(index, items){
						
						$('<tr/>').append($('<td/>',{
		
							align : 'center',
							text : items.seq
						})).append($('<td/>',{

						}).append($('<a/>',{
							href : '/kgmall/notice/noticeView.do?seq='+items.seq,
							text : items.subject
						}))).append($('<td/>',{

							align : 'center',
							text : items.writer
						})).append($('<td/>',{

							align : 'center',
							text : items.logtime
						})).append($('<td/>',{

							align : 'center',
							text : items.hit
						})).appendTo('#noticeTable');
					});
					$('#paging').html(data.noticePaging.pagingHTML);
				
				}//success
			});//ajax
		}//else
		
		
		
		
	});
</script>
<script>
function noticeSearch(pg){
	$('#pg').val(pg);
	$('#searchBtn').trigger('click','trigger');
}
</script>

