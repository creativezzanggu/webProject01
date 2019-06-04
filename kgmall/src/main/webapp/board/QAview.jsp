<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<link rel="canonical" href="http://fittingbooth.co.kr/article/q-a/6/17/">
		<link rel="alternate" href="http://m.fittingbooth.co.kr/article/q-a/6/17/">
		<link rel="shortcut icon" href="/web/upload/favicon_20170826105621.ico">
		<link rel="stylesheet" type="text/css" href="http://skin-skin7.jewvis.cafe24.com/ind-script/optimizer.php?filename=rc1BcsIwDAXQPWHbcwi66SW4hKMIrGJZxpKT4fZNJ3SmbMErfX3NPEFUISAcmlE1-KZlZoPSxsQ4RJcENtEwkfElg105f8F0TqoVQikGZ80eFrJfBG3bd49iL5z3a_kBL__4Iw1yyE0u6pGxm1l1VNcOHKqI5rXZVbKi2Ximriw2c5UOpOjUEkEKd20O0pKzRS0nNn9T345rA0ahYnyMw2c3txJS9plp-RcPx27-rTFex-auT3n78AM&type=css&k=f99b639bf6e570d59115fd9fba228b416088e912&t=1492753981">
		<link rel="stylesheet" type="text/css" href="http://skin-skin7.jewvis.cafe24.com/ind-script/optimizer.php?filename=tdTBTsMwDADQe8uV7zAgIe5IHBAXNL4gTdw2WxKH2Bnb35NQkIYmENrCoVLr1M9WFAdm8gjXNwlioikpDwmZctIImhnGREFAk_cULkrgEv7yP-qOyWWxFLqBdicmZpFTizq1x3RaqqjB4Q-pKka4J5UMrA6RX7en5jwYK5S-J22of1qBEneQh7rPjIlhjW9byxDz4KzuZ_EO2GBvkO0UgDc23IEZHRW0Wp5MdgjDR2sJlXlWeqMmbE3HZB7DSK3Zun8Y5J-a9rTFyrd2nWXhKVGOreUxB13PYju3zANlAZ-dWJ4pvsw2Rhum5hU0hW1BSvNRN8CXySqR7mjGzieXls8kGSXHXivBidK-aX_ZtuUYm3qDYuzEivsH9ujub-SWS9lkLV2d3TP1ZbFEgAPX5-r2TDG6PNnlsH8ep8P3NjjuumHHzhpMsH7NWNyv71rgHQ&type=css&k=c103ba2bf47bcb9445b628b1b904d2103cb09ca6&t=1530036797">
		<style type="text/css">
		.xans-board-read table td .adminAnswer span { margin:0 6px 0 0; }
		.xans-board-reply table td .adminAnswer { margin:0 0 8px; }
		.xans-board-reply table td .adminAnswer span { margin:0 6px 0 0; }
		</style>
		<title>kgmall</title>
	</head>
<body>
	<div id="wrap">
		<div id="container">
			<div id="contents">
						
				<div class=" xans-board  xans-board-readpackage">
					<div class=" xans-board  xans-board-title location-board ">
						<div class="path-board">
							<h2>현재 위치</h2>
							<ol>
								<li><a href="/">Home</a></li>
								<li>Board</li>
								<li title="현재 위치"><strong>Q &amp; A</strong></li>
							</ol>
						</div>
					
						<div class="tit-board">
						<h2><font color="333333">Q &amp; A</font> </h2>
						<p class="info">상품 Q&amp;A입니다.</p>
						</div>
					</div>

					<style>
					.board-nav-style1 { font-size:0; margin:30px auto 30px }
					.board-nav-style1 li { display:inline-block; *display:inline; *zoom:1; margin:0 8px; font-family:Roboto, 'Nanum Gothic', Dotum, '돋움', AppleGothic, sans-serif; font-weight:400; font-size:11px }
					.board-nav-style1 li a { display:inline-block; *display:inline; *zoom:1; border:1px solid #e7e7e7; padding:16px 31px; letter-spacing:1px }
					.board-nav-style1 li a:hover { border:1px solid #434343; background:#434343; color:#fff }
					</style>
					<form action="/kgmall/board/QAmodify.do" method="POST" name="qaModify" id="qaModify">
					<div class="xans-board  xans-board-read">
						<div class="boardView ">
							<table width="100%" border="1" summary="">
								<tbody>
									<tr>
										<th scope="row" class="thead txtLess">제목</th>
										<td>${qa.subject}</td>
									</tr>
								<tr>
									<th scope="row" class="thead txtLess">작성자</th>
									<td class="writer txtLittle">${qa.id}</td>
								</tr>
								<tr class="etcArea">
									<td colspan="2">
										<ul>
											<li class="date thead ">
												<strong class="th txtLess">작성날짜</strong>
												<span class="tdDate txtLess"><fmt:formatDate value="${qa.logtime}" pattern="yyyy-MM-dd"/></span>
											</li>
											<li class="hit thead ">
												<strong class="th txtLess">조회수</strong>
												<span class="td txtLess">${qa.hit}</span>
											</li>
										</ul>
									</td>
								</tr>
								<tr class="view">
									<td colspan="2">
									<div class="detail">${qa.content}</div>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
						<div class="btnArea btnAreaCustom ">
							<span class="left">
								<a href="/kgmall/board/QA.do" class="btn Normal Medium Wnormal">목록</a>
							</span>
							<c:if test="${id==qa.id || id=='admin'}">
								<input type="hidden" value="${qa.seq}" name="seq">
								<input type="button" value="삭제" id="QAdelete" class="btn Normal Wnormal Light ">
								<input type="submit" value="수정" id="QAmodify" class="btn Normal Wnormal Medium mL5 ">
							</c:if>
						</div>
					</div>
					</form>
				</div>
			
			<div class="xans-board  xans-board-commentpackage">
				<div class="xans-board xans-board-commentlist">
					<table id="QAreplyList">
					</table>
				</div>
				<!-- 댓글쓰기 -->
				<div id="QAreply">
					<div class="xans-board  xans-board-commentwrite">
						<fieldset>
							<div class="view">
								<textarea id="comment" name="comment"></textarea>
							</div>
							<div class="btnAreaWrap">
								<input type="hidden" name="id" id="id" value="${id}">
								<input type="hidden" name="seq" id="seq" value="${qa.seq}">
								<input type="button" value="등록" class="btn Normal Wnormal Dark" onclick="QAreplyInsertBtn(${id})" id="QAreplyInsertBtn"/>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<input type="hidden" name="content" id="content">
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	//댓글쓰기
	$('#QAreplyInsertBtn').click(function(){
		if($('#id').val()==''){
			alert("회원만 댓글 작성 가능합니다.");
		}else if(+$('#comment').val()==''){
			alert("댓글 내용 입력하세요.");
		}else{
			$.ajax({
				type : 'POST',
				url : '/kgmall/board/QAreplyInsert.do',
				data : {'seq' : $('#seq').val(),
						'id' : $('#id').val(),
						'content' : $('#comment').val()},
				dataType : 'text',
				success : function(data){
					if(data=='insert')location.reload(true); 
				}//success
			});
		}//else
	});
	
	//댓글 가져오기
	$.ajax({
		type : 'POST',
		url : '/kgmall/board/QAreplyList.do',
		data : {'seq' : $('#seq').val()},
		dataType : 'json',
		success : function(data){
			//alert(JSON.stringify(data));
			$('#QAreplyList').html(data.qareply);
		}
	});
	
	//글삭제하기
	$('#QAdelete').click(function(){
		$.ajax({
			type : 'POST',
			url : '/kgmall/board/QAdelete.do',
			data : {'seq' : $('#seq').val()},
			dataType : 'text',
			success : function(data){
				if(data=='ok')location.href='/kgmall/board/QA.do?pg=1';
			}//success
		});
	});
});

function qaReplydelete(replyseq) {
	if('admin' == $('#id').val() || ${qa.id} == $('#id').val()){
		$('#replyseq'+replyseq).remove();
		$.ajax({
			type : 'POST',
			url : '/kgmall/board/QAreplyDelete.do',
			data : {'replyseq' : replyseq},
			success : function(data){
			}
		});
	}//if
}//qaReplydelete

function qaReplyModify(replyseq,id,seq) {
	if(id == $('#id').val()){
		$('#replyseq'+replyseq).click(function(){
			$('#replyseq'+replyseq).children().remove();
			$('#replyseq'+replyseq).append($('<div/>',{
				class : 'xans-board  xans-board-commentwrite'
				}).append($('<fieldset/>')
						.append($('<div>',{
							class : "view"
							}).append($('<textarea id="comment_modify" name="comment_modify">'))
						).append($('<div/>',{
							class : "btnAreaWrap"
							}).append($('<input/>',{
								type : 'hidden',
								name : 'id',
								id : 'id',
								value : id
							}))
							.append($('<input/>',{
								type : 'hidden',
								name : 'seq',
								id : 'seq',
								value : seq
							}))
							.append($('<input type="button" class="btn Normal Wnormal Dark" id="qaReplyUpdate'+replyseq+'" value="등록">'))
							.append($('<input type="button" class="btn Normal Wnormal Dark mL4" id="qaReplyCansle'+replyseq+'" value="취소" onclick="qaReplyCansle('+replyseq+')">'))
						)
				));	//$('#replyseq'+replyseq).append
			$.ajax({
				type : 'POST',
				url : '/kgmall/board/QAreplyGetContent.do',
				data : {'replyseq' : replyseq,
						'seq' : seq},
				success : function(data){
					$('#comment_modify').val(data);
				}
			});//ajax QAreplyGetContent
			$('#comment_modify').focus();
			$('#qaReplyUpdate'+replyseq).click(function(){
				$.ajax({
					type : 'POST',
					url : '/kgmall/board/QAreplyUpdate.do',
					data : {'replyseq' : replyseq,
							'seq' : seq,
							'content' : $('#comment_modify').val()},
					dataType : 'text',
					success : function(data){
						if(data=='ok')location.reload(true); 
					}
				});//ajax QAreplyUpdate
			});//$('#qaReplyUpdate').click(function()
			$('#qaReplyCansle'+replyseq).click(function(){
				location.reload(true); 
			});
			
		});
	}//if
}
//qaReplyModify

</script>
</html>

