<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style type="text/css">
.tit-board {min-height: 30px; margin: 0 0 15px;}
.tit-board h2 {display: inline-block;*display: inline;*zoom: 1;font-size: 16px;line-height: 17px;color: #2e2e2e;font-weight: normal;}
.tit-board p.img {margin: 0 0 10px;text-align: center;}
.tit-board p.info {margin: 17px 0 0; color: #939393; font-size: 12px;}
.sec-sort {padding: 5px 0 11px;}
.boardSort select {height: 26px;padding: 2px;line-height: 120px;}
.boardSort select {font-family: "Roboto","Arial","돋움","Dotum","Apple SD Gothic Neo","Apple Gothic",sans-serif;height: 26px;border: 1px solid #e7e7e7;}
.thumb img {max-width: 54px;max-height: 54px;}
.category{font-size:11px; }
.category:before{content:""}
.category select{margin:0 4px 0 0;width:130px;height:26px;padding:2px;}
.category select#product_category_depth1{margin:0 5px 0 0;}
table {color:#353535;font-size:12px;line-height:140%;border-collapse: collapse;border-top:1px solid #e6e6e6; 
border-bottom:1px solid #e6e6e6;}
th{padding:14px 0; font-size:12px; border-top:1px solid #e6e6e6; border-bottom:1px solid #e6e6e6;}
td{padding:14px 0; border-top:1px solid #e6e6e6; border-bottom:1px solid #e6e6e6;}
.subject{word-break:break-all;text-align:left;padding-left:8px;}
.subject img{vertical-align:middle;margin:0 3px 0 0;}
.subject p.product-name{margin:0 0 4px;}
.subject p.product-name a{font-size:11px;color:#999;line-height:1.5;}
.subject p.product-name a:hover{color:#555;}
.subject a{color:black;text-decoration: none;}
.subject a:hover{color:gray;}
.comment-count{margin-left:0;color:#444;font-size:10px;font-weight:500;letter-spacing:1px;}
.btn.Wnormal {min-width: 80px;text-decoration: none;}
.btn.Normal {font-size: 11px;height: 31px;line-height: 31px;}
.btn.Dark {background: #272727;color: #ffffff;border: 1px solid #272727;}
.btn {font-family: "Roboto","Arial","Nanum Gothic","돋움","Dotum","Apple Gothic","Apple SD Gothic Neo",sans-serif;color: #7d7d7d;font-size: 12px;
height: 27px;line-height: 27px;cursor: pointer;outline: none;vertical-align: middle;text-align: center;padding: 0px 8px 0 9px;border: 1px solid #e0e0e0;
background: #fafafa;margin: 0;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;-webkit-border-radius: 6px;
-moz-border-radius: 6px;border-radius: 6px;-webkit-border-radius: 6px 6px 6px 6px;-moz-border-radius: 6px 6px 6px 6px;border-radius: 6px 6px 6px 6px;
-webkit-appearance: none;-moz-appearance: none;-o-transition: all 0.12s ease-in-out;-ms-transition: all 0.12s ease-in-out;-moz-transition: all 0.12s ease-in-out;
-webkit-transition: all 0.12s ease-in-out;transition: all 0.12s ease-in-out;
}
.xans-board-buttonlist {padding: 15px 0 10px 0;text-align: right;}
.df-base-paging {display: table;margin: 0 auto;padding: 25px 0 30px;text-align: center;font-size: 0;}
.df-base-paging p{float:left;display:inline-block;*display:inline;*zoom:1 }
.df-base-paging ol{float:left;display:inline-block;*display:inline;*zoom:1 }
.df-base-paging li{float:left;display:inline-block;*display:inline;*zoom:1;border:1px solid #e5e5e5;margin:0 0 0 -1px }
.df-base-paging li a{display:block;width:31px;height:30px;font-size:10px;line-height:31px;color:#404040;background:#fff;text-decoration:none; }
.df-base-paging li a:hover{background:#f3f3f3;text-decoration:underline }
.df-base-paging li a.this{background:#f2f2f2;color:#000 }
.df-base-paging a.nolink{cursor:default }
.xans-board-search {margin-top: 1px;padding: 10px 0 10px 0;color: #2e2e2e;font-size: 11px;}
.boardSearch{display:block;border: none;vertical-align: top;}
.boardSearch img{vertical-align:middle;}
.boardSearch a{text-decoration: none;}
</style>
<div style="margin-left:322px;margin-right:322px;">
<div class="tit-board">
	<p class="img"></p>
	<h2><font color="333333">Q &amp; A</font></h2>
	<p class="info">상품 Q&amp;A입니다.</p>
</div>
<div class="sec-sort">
	<div class="boardSort">
		<span class="xans-board xans-board-category">
			<select id="board_category" id="board_category" name="board_category" fw-filter="" fw-label="" fw-msg="">
				<option value="전체" selected="selected">전체</option>
				<option value="회원관련">회원관련</option>
				<option value="주문/결제">주문/결제</option>
				<option value="배송관련">배송관련</option>
				<option value="취소/반품/환불/교환">취소/반품/환불/교환</option>
				<option value="상품문의">상품문의</option>
			</select>
		</span>
		<span class="xans-board xans-board-replysort"></span>
	</div>
</div>

<input type="hidden" id="id" value="${id}">
<input type="hidden" id="pg" value="${pg}">
<input type="hidden" id="category" value="${category}">
<input type="hidden" id="totalA" value="${totalA}">
<input type="hidden" id="selectTotalA">
<div class="boardList">
<table id="qa_List" width="100%">
		<thead>
			<tr>
				<th width="70px">글번호</th>
				<th width="135px">카테고리</th>
				<th width="auto">제목</th>
				<th width="105px">작성자</th>
				<th width="80px">작성날짜</th>
				<th width="53px">조회수</th>
			</tr>
			<tbody id="qalist">
				${list}
			</tbody>
		</thead>
	</table>
</div>

<div class="xans-board xans-board-buttonlist">
	<c:if test="${id != null}">
		<a id="qawrite" href="/kgmall/board/QAwrite.do" class="btn Normal Wnormal Dark ">쓰기</a>
	</c:if>
</div>

<div class="xans-board xans-board-paging df-base-paging" id="pagingHTML">
</div>
<div id="re"></div>

<div class="xans-board xans-board-search">
	<fieldset class="boardSearch">
		<p>
			<select id="search_date" name="search_date" fw-filter="" fw-label="" fw-msg="">
				<option value="7">일주일</option>
				<option value="30">한달</option>
				<option value="all">전체</option>
			</select>
			<select id="search_key" name="search_key" fw-filter="" fw-label="" fw-msg="">
				<option value="subject">제목</option>
				<option value="content">내용</option>
				<option value="id">작성자</option>
			</select>
			<input id="search" name="search" fw-filter="" fw-label="" fw-msg="" class="inputTypeText" placeholder="" value="" type="text">
			<a href="#none" id="qaSearchBtn" class="btn Small Light mL5">
				검색
			</a>
		</p>
    </fieldset>
</div>
</div>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/board/QAList.do',
		data : 'pg='+$('#pg').val(),
		dataType : 'json',
		success : function(data){
			//alert(JSON.stringify(data));
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>',{
					align : 'center',
					text : items.seq,
					class : 'no'
				})).append($('<td/>',{
					align : 'center',
					text : items.category
				})).append($('<td/>',{
					align : 'center',
					class : 'subject'
					}).append($('<a/>',{
						href : '/kgmall/board/QAview.do?seq='+items.seq,
						text : items.subject
					}))
				).append($('<td/>',{
					align : 'center',
					class : 'writer',
					text : items.id
				})).append($('<td/>',{
					align : 'center',
					class : 'date thead txtLess',
					text : items.logtime
				})).append($('<td/>',{
					align : 'center',
					class : 'hit thead txtLess',
					text : items.hit
				})).appendTo($('#qalist'));
				
				
				$.ajax({
					type : 'GET',
					url : '/kgmall/board/QAPaging.do',
					data : {'currentPage':$('#pg').val(),
						'pageBlock':'3',
						'pageSize':'5',
						'totalA':$('#totalA').val()},
					dataType : 'json',
					success : function(data){
						$('#pagingHTML').html(data.pagingHTML);
					}
				});
			});
		}
	});
	
	
	
	$('#board_category').change(function(event,str){
		if(str!='trigger')$('#pg').val(1);
		
		$.ajax({
			type : 'POST',
			url : '/kgmall/board/QASelectList.do',
			data : {'category' : $("select[name=board_category]").val(),
					'pg' : $('#pg').val()},
			dataType : 'json',
			success : function(data){
				//alert(JSON.stringify(data));
				$('#selectTotalA').val($("select[name=board_category]").val());
				$("#qa_List > tbody").children("tr").remove();
				$.each(data.list, function(index, items){
					$('<tr/>').append($('<td/>',{
						align : 'center',
						text : items.seq,
						class : 'no'
					})).append($('<td/>',{
						align : 'center',
						class : 'thumb'
						}).append($('<img/>',{
							src : '../image/board_image/apple.png',
							border : '0'
						}))
					).append($('<td/>',{
						align : 'center',
						text : items.category
					})).append($('<td/>',{
						align : 'center',
						class : 'subject'
						}).append($('<a/>',{
							href : '/kgmall/board/QAview.do?seq='+items.seq,
							text : items.subject
						}))
					).append($('<td/>',{
						align : 'center',
						class : 'writer',
						text : items.id
					})).append($('<td/>',{
						align : 'center',
						class : 'date thead txtLess',
						text : items.logtime
					})).append($('<td/>',{
						align : 'center',
						class : 'hit thead txtLess',
						text : items.hit
					})).appendTo($('#qalist'));
					
				});
				
				$.ajax({
					type : 'GET',
					url : '/kgmall/board/QASelectPaging.do',
					data : {'currentPage':$('#pg').val(),
						'pageBlock':'3',
						'pageSize':'5',
						'totalA':$('#totalA').val(),
						'category':$('#selectTotalA').val()},
					dataType : 'json',
					success : function(data){
						$('#pagingHTML').html(data.pagingHTML);
					}
				});
			}
		});
	});
	
	$('#qaSearchBtn').click(function(event,str){
		if(str!='trigger')$('#pg').val(1);
		
		$("select[name=search_date]").val();
		$("select[name=search_key]").val();
		$.ajax({
			type : 'POST',
			url : '/kgmall/board/QASearch.do',
			data : 'pg=1'+'&date='+$("select[name=search_date]").val()+'&key='+$("select[name=search_key]").val()+'&search='+$('#search').val(),
			dataType : 'json',
			success : function(data){
				if($('#search').val()==''){
					alert("내용을 입력하세요");
				}else{
					//alert(JSON.stringify(data));
					$("#qa_List > tbody").children("tr").remove();
					$.each(data.searchList, function(index, items){
						$('<tr/>').append($('<td/>',{
							align : 'center',
							text : items.seq,
							class : 'no'
						})).append($('<td/>',{
							align : 'center',
							class : 'thumb'
							}).append($('<img/>',{
								src : '../image/board_image/apple.png',
								border : '0'
							}))
						).append($('<td/>',{
							align : 'center',
							text : items.category
						})).append($('<td/>',{
							align : 'center',
							class : 'subject'
							}).append($('<a/>',{
								href : '/kgmall/board/QAview.do?seq='+items.seq,
								text : items.subject
							}))
						).append($('<td/>',{
							align : 'center',
							class : 'writer',
							text : items.id
						})).append($('<td/>',{
							align : 'center',
							class : 'date thead txtLess',
							text : items.logtime
						})).append($('<td/>',{
							align : 'center',
							class : 'hit thead txtLess',
							text : items.hit
						})).appendTo($('#qalist'));
						
					});
					
					$.ajax({
						type : 'POST',
						url : '/kgmall/board/QASearchPaging.do',
						data : {'currentPage':$('#pg').val(),
							'pageBlock':'3',
							'pageSize':'5',
							'date' : $("select[name=search_date]").val(),
							'key' : $("select[name=search_key]").val(),
							'search' : '%'+$('#search').val()+'%'},
						dataType : 'json',
						success : function(data){
							$('#pagingHTML').html(data.pagingHTML);
						}
					});
					
				}
				
				
			}
		});
	});
	
});

function qaSelectPaging(pg){
	$('#pg').val(pg);
	$('#board_category').trigger('change','trigger');
}

function qaSearchPaging(pg){
	$('#pg').val(pg);
	$('#qaSearchBtn').trigger('click','trigger');
}
</script>