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
</head>
<body>
	<div id="wrap">
		<div id="container">
			<div id="contents">
						
				<div class=" xans-board  xans-board-readpackage">
					<div class="xans-element- xans-product xans-product-menupackage" style="margin-bottom: 30px;">
						<div class="location-product">
							<div id="title">
								<h2>PHOTO REVIEW</h2>
								<p>상품 사용후기입니다.</p>
							</div>
						</div>
					</div>

					<style>
					.board-nav-style1 { font-size:0; margin:30px auto 30px }
					.board-nav-style1 li { display:inline-block; *display:inline; *zoom:1; margin:0 8px; font-family:Roboto, 'Nanum Gothic', Dotum, '돋움', AppleGothic, sans-serif; font-weight:400; font-size:11px }
					.board-nav-style1 li a { display:inline-block; *display:inline; *zoom:1; border:1px solid #e7e7e7; padding:16px 31px; letter-spacing:1px }
					.board-nav-style1 li a:hover { border:1px solid #434343; background:#434343; color:#fff }
					</style>
					<form action="/kgmall/review/reviewModify.do" method="POST" name="reviewModifyForm" id="reviewModifyForm">
					<div class="xans-board  xans-board-read">
						<div class="boardView ">
							<table width="100%" border="1" summary="">
								<tbody>
									<tr>
										<th scope="row" class="thead txtLess">제목</th>
										<td>${review.subject}</td>
									</tr>
									<tr>
										<th scope="row" class="thead txtLess">상품이미지</th>
										<td><img src="../image/productImage/${review.imgSrc}" width="60" height="60"></td>
									</tr>
									<tr>
										<th scope="row" class="thead txtLess">작성자</th>
										<td class="writer txtLittle">${review.id}</td>
									</tr>
									<tr class="etcArea">
										<td colspan="2">
											<ul>
												<li class="date thead ">
													<strong class="th txtLess">작성날짜</strong>
													<span class="tdDate txtLess"><fmt:formatDate value="${review.logtime}" pattern="yyyy-MM-dd"/></span>
												</li>
												<li class="hit thead ">
													<strong class="th txtLess">조회수</strong>
													<span class="td txtLess">${review.hit}</span>
												</li>
											</ul>
										</td>
									</tr>
									<tr class="view">
										<td colspan="2">
										<div class="detail">${review.content}</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btnArea btnAreaCustom ">
							<span class="left">
								<a href="/kgmall/board/QA.do" class="btn Normal Medium Wnormal">목록</a>
							</span>
							<c:if test="${id==review.id || id=='admin'}">
								<input type="hidden" value="${review.seq}" name="seq" />
								<input type="button" value="삭제" id="reviewDelete" class="btn Normal Wnormal Light" />
								<input type="submit" value="수정" id="reviewModify" class="btn Normal Wnormal Medium mL5" />
							</c:if>
						</div>
					</div>
					</form>
				</div>
			
			<div class="xans-board  xans-board-commentpackage">
				<div class="xans-board xans-board-commentlist">
					<table id="reviewReplyList">
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
								<input type="hidden" name="id" id="id" value="${id}" />
								<input type="hidden" name="seq" id="seq" value="${review.seq}" />
								<input type="button" value="등록" class="btn Normal Wnormal Dark" onclick="reviewReplyInsertBtn(${id})" id="reviewReplyInsertBtn"/>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<input type="hidden" name="content1" id="content1">
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	//댓글 가져오기
	$.ajax({
		type : 'POST',
		url : '/kgmall/review/reviewReplyList.do',
		data : {'seq' : $('#seq').val()},
		dataType : 'json',
		success : function(data){
			//alert(JSON.stringify(data));
			$('#reviewReplyList').html(data.reviewReply);
		}
	});
	
	//댓글쓰기
	$('#reviewReplyInsertBtn').click(function(){
		if($('#id').val()==''){
			alert("회원만 댓글 작성 가능합니다.");
		}else if(+$('#comment').val()==''){
			alert("댓글 내용 입력하세요.");
		}else{
			$.ajax({
				type : 'POST',
				url : '/kgmall/review/reviewReplyInsert.do',
				data : {'seq' : $('#seq').val(),
						'id' : $('#id').val(),
						'content' : $('#content1').val()},
				dataType : 'text',
				success : function(data){
					if(data=='insert')location.reload(true); 
				}//success
			});
		}//else
	});
	
	
	
	//글삭제하기
	$('#reviewDelete').click(function(){
		$.ajax({
			type : 'POST',
			url : '/kgmall/review/reviewDelete.do',
			data : {'seq' : $('#seq').val()},
			dataType : 'text',
			success : function(data){
				if(data=='ok')location.href='/kgmall/review/reviewForm.do?pg=1';
			}//success
		});
	});
});

//댓글 지우기
function reviewReplydelete(replyseq) {
	if('admin' == $('#id').val() || ${review.id} == $('#id').val()){
		$('#replyseq'+replyseq).remove();
		$.ajax({
			type : 'POST',
			url : '/kgmall/review/reviewReplydelete.do',
			data : {'replyseq' : replyseq},
			success : function(data){
			}
		});
	}//if
}

//댓글수정
function reviewReplyModify(replyseq,id,seq) {
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
							.append($('<input type="button" class="btn Normal Wnormal Dark" id="reviewReplyUpdate'+replyseq+'" value="등록">'))
							.append($('<input type="button" class="btn Normal Wnormal Dark mL4" id="reviewReplyCansle'+replyseq+'" value="취소" onclick="qaReplyCansle('+replyseq+')">'))
						)
				));	//$('#replyseq'+replyseq).append
				
			//댓글내용가져오기
			$.ajax({
				type : 'POST',
				url : '/kgmall/review/reviewReplyGetContent.do',
				data : {'replyseq' : replyseq,
						'seq' : seq},
				dataType : 'json',
				success : function(data){
					$('#comment_modify').text(data.content);
				}
			});//ajax reviewReplyGetContent
			
			//댓글내용 포커스
			$('#comment_modify').focus();
			
			//댓글내용 업데이트
			$('#reviewReplyUpdate'+replyseq).click(function(){
				$.ajax({
					type : 'POST',
					url : '/kgmall/review/reviewReplyUpdate.do',
					data : {'replyseq' : replyseq,
							'seq' : seq,
							'content' : $('#comment_modify').val()},
					dataType : 'text',
					success : function(data){
						if(data=='ok')location.reload(true); 
					}
				});//ajax reviewReplyUpdate
			});//$('#reviewReplyUpdate').click(function()
			$('#reviewReplyCansle'+replyseq).click(function(){
				location.reload(true); 
			});
			
		});
	}//if
}
</script>
</html>

