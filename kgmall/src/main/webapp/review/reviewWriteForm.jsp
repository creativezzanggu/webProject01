<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="canonical" href="http://fittingbooth.co.kr/board/product/write.html" />
<link rel="alternate" href="http://m.fittingbooth.co.kr/board/product/write.html" />
<link rel="shortcut icon" href="/web/upload/favicon_20170826105621.ico" />
<link rel="stylesheet" type="text/css" href="http://skin-skin7.jewvis.cafe24.com/ind-script/optimizer.php?filename=rc1BcsIwDAXQPWHbcwi66SW4hKMIrGJZxpKT4fZNJ3SmbMErfX3NPEFUISAcmlE1-KZlZoPSxsQ4RJcENtEwkfElg105f8F0TqoVQikGZ80eFrJfBG3bd49iL5z3a_kBL__4Iw1yyE0u6pGxm1l1VNcOHKqI5rXZVbKi2Ximriw2c5UOpOjUEkEKd20O0pKzRS0nNn9T345rA0ahYnyMw2c3txJS9plp-RcPx27-rTFex-auT3n78AM&type=css&k=f99b639bf6e570d59115fd9fba228b416088e912&t=1492753981" />
<link rel="stylesheet" type="text/css" href="http://skin-skin7.jewvis.cafe24.com/ind-script/optimizer.php?filename=tdTBTsMwDADQe8uV7zAgIe5IHBAXNL4gTdw2WxKH2Bnb35NQkIYmENrCoVLr1M9WFAdm8gjXNwlioikpDwmZctIImhnGREFAk_cULkrgEv7yP-qOyWWxFLqBdicmZpFTizq1x3RaqqjB4Q-pKka4J5UMrA6RX7en5jwYK5S-J22of1qBEneQh7rPjIlhjW9byxDz4KzuZ_EO2GBvkO0UgDc23IEZHRW0Wp5MdgjDR2sJlXlWeqMmbE3HZB7DSK3Zun8Y5J-a9rTFyrd2nWXhKVGOreUxB13PYju3zANlAZ-dWJ4pvsw2Rhum5hU0hW1BSvNRN8CXySqR7mjGzieXls8kGSXHXivBidK-aX_ZtuUYm3qDYuzEivsH9ujub-SWS9lkLV2d3TP1ZbFEgAPX5-r2TDG6PNnlsH8ep8P3NjjuumHHzhpMsH7NWNyv71rgHQ&type=css&k=c103ba2bf47bcb9445b628b1b904d2103cb09ca6&t=1530036797" />
<title>write</title>
<script src="https://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="../resources/editor/js/HuskyEZCreator.js" charset="utf-8"></script>
</head>
<script type="text/javascript">
    $(function(){
        //전역변수
        var obj = [];              
        //스마트에디터 프레임생성
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: obj,
            elPlaceHolder: "editor",
            sSkinURI: "../resources/editor/SmartEditor2Skin.html",
            htParams : {
                // 툴바 사용 여부
                bUseToolbar : true,            
                // 입력창 크기 조절바 사용 여부
                bUseVerticalResizer : true,    
                // 모드 탭(Editor | HTML | TEXT) 사용 여부
                bUseModeChanger : true,
            }
        });
        //전송버튼
        $("#insertReveiwBtn").click(function(){
        	
        	
            //id가 smarteditor인 textarea에 에디터에서 대입
            obj.getById["editor"].exec("UPDATE_CONTENTS_FIELD", []);
            //폼 submit
            $("#insertReveiwForm").submit();
        });
    });
    $('#insertReveiw').hide();
</script>

<body>
<div id="wrap">
	<div id="container">
		<div id="contents">
			<div class="xans-board xans-board-writepackage">
				<div class="xans-board xans-board-title location-board ">
					<div class="path-board">
						<h2>현재 위치</h2>
						<ol>
							<li><a href="/">Home</a></li>
							<li>Board</li>
							<li title="현재 위치"><strong>Q & A</strong></li>
						</ol>
					</div>
					
					<div id="title" style="margin-bottom: 20px;">
						<h2>PHOTO REVIEW</h2>
						<p>상품 사용후기입니다.</p>
					</div>
					
					
					
				</div>
				
				<style>
				.board-nav-style1 { font-size:0; margin:30px auto 30px }
				.board-nav-style1 li { display:inline-block; *display:inline; *zoom:1; margin:0 8px; font-family:Roboto, 'Nanum Gothic', Dotum, '돋움', AppleGothic, sans-serif; font-weight:400; font-size:11px }
				.board-nav-style1 li a { display:inline-block; *display:inline; *zoom:1; border:1px solid #e7e7e7; padding:16px 31px; letter-spacing:1px }
				.board-nav-style1 li a:hover { border:1px solid #434343; background:#434343; color:#fff }
				</style>
				
				<form id="insertReveiwForm" name="insertReveiwForm" action="/kgmall/review/insertReveiw.do" method="post" enctype="multipart/form-data" >
					<div class="xans-board xans-board-write">
						<div class="boardWrite">
							<table width="100%" border="1" summary="">
								<caption>글쓰기 폼</caption>
								<tbody>
									<tr class="first">
										<th scope="row" class="thead txtLess">SUBJECT</th>
										<td>
											<input id="subject" name="subject" id="subject" class="inputTypeText" placeholder="" maxLength="125" type="text"/>	
										</td>
									</tr>
									<tr>
										<td colspan="2" class="write">
									    	<textarea name="editor" id="editor" style="width: 700px; height: 400px;"></textarea>
										</td>
									</tr>
							</table>
						</div>
						
						<div style="margin-top: 10px;">
							<input type="text"  name="productname" id="productname" placeholder="상품명을 입력하세요" style="padding:8px 20px;">
						</div>
						
						<div class="btnArea btnAreaCustom " style="margin-top: 10px;">
							<span class="left"><a href="/kgmall/review/reviewForm.do" class="btn Normal Medium Wnormal">목록</a></span>
							<input type="button" value="등록" name="insertReveiwBtn" id="insertReveiwBtn" class="btn Normal Dark Wnormal mL5">
							<a href="#" class="btn Normal Medium Wnormal mL5">취소</a>
						</div>
						
					</div>
				</form>
			</div>
		</div>
</div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
});
</script>
</html>
    