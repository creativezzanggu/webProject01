<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style type="text/css">
.tit-board {min-height: 30px; margin: 0 0 15px;}
.tit-board h2 {display: inline-block;*display: inline;*zoom: 1;font-size: 16px;line-height: 17px;color: #2e2e2e;font-weight: normal;}
.tit-board p.img {margin: 0 0 10px;text-align: center;}
.tit-board p.info {margin: 17px 0 0; color: #939393; font-size: 12px;}
.displaynone{display:none;}
.boardWrite table { table-layout:fixed; border-top:1px solid #e7e7e7; border-bottom:1px solid #e7e7e7; line-height:180% }
.boardWrite table th { width:110px; font-size:11px; padding:10px 0 8px 20px; border-top:1px solid #e7e7e7; text-align:left; 
font-weight:normal; vertical-align:middle; border:0; }
.boardWrite table td { width:auto; font-size:11px; padding:10px 0 8px 10px; border-top:1px solid #e7e7e7 }
.boardWrite table td img { vertical-align:middle }
.boardWrite table a { text-decoration:none }
.boardWrite table input,
.boardWrite table textarea { padding:2px 2px 2px 4px; border:1px solid #e7e7e7; color:#202020 }
.boardWrite table td.write { width:100%; padding:0; border-top:none; border-left:1px solid #e7e7e7; border-right:1px solid #e7e7e7 }
.boardWrite table td.write table { border:0; table-layout:auto }
.boardWrite table tr.first th,
.boardWrite table tr.first td { border-top:none }
.boardWrite table tr.captcha td { font-size:11px; color:#757575; vertical-align:middle }
.boardWrite table tr.agree th,
.boardWrite table tr.agree td { vertical-align:top }
.boardWrite table tr.agree td textarea { width:560px; height:140px; margin:0 0 10px }
.boardWrite table #subject { width:390px; height:18px; padding:3px }
.boardWrite table input { height:18px; padding:3px }
.boardWrite table .formEmail select { margin-left:5px }
.boardWrite table td select { height:26px; padding:2px; border:1px solid #e7e7e7 }
.boardWrite table input[type=radio], .boardWrite table input[type=checkbox], .boardWrite table #notice0, .boardWrite table #secure0, .boardWrite table #secure1, .boardWrite table #privacy_agreement_radio0, .boardWrite table #privacy_agreement_radio1, .boardWrite table #cons_re0, .boardWrite table #cons_re1 { border:0; width:13px; height:13px; margin:0 3px 0 0; background:none; vertical-align:middle }
.boardWrite table .info { display:block; margin:5px 0 0 }
.boardWrite table .formFile input { height:26px; padding:3px }

.btnArea { overflow:hidden; margin:15px 0 50px; text-align:right}
.btnArea.miniType { float:left }
.btnArea.center { text-align:center }
.btnArea img { cursor:pointer; margin:0 1px 0 0 }
.btnArea span.left { float:left; margin:0 0 0 0 }

.btnArea {overflow: hidden;margin: 15px 0 50px;text-align: right;}
.btnAreaCustom {font-size: 0;}
.btn.Wnormal {min-width: 80px;text-decoration: none;}
.btn.Normal {font-size: 11px;height: 31px;line-height: 31px;}
.btn.Dark {background: #272727;color: #ffffff;border: 1px solid #272727;}
.btn {font-family: "Roboto","Arial","Nanum Gothic","돋움","Dotum","Apple Gothic","Apple SD Gothic Neo",sans-serif;color: #7d7d7d;font-size: 12px;
height: 27px;line-height: 27px;cursor: pointer;outline: none;vertical-align: middle;text-align: center;padding: 0px 8px 0 9px;border: 1px solid #e0e0e0;
background: #fafafa;margin: 0;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;-webkit-border-radius: 6px;
-moz-border-radius: 6px;border-radius: 6px;-webkit-border-radius: 6px 6px 6px 6px;-moz-border-radius: 6px 6px 6px 6px;border-radius: 6px 6px 6px 6px;
-webkit-appearance: none;-moz-appearance: none;-o-transition: all 0.12s ease-in-out;-ms-transition: all 0.12s ease-in-out;-moz-transition: all 0.12s ease-in-out;
-webkit-transition: all 0.12s ease-in-out;transition: all 0.12s ease-in-out;}
</style>

<!-- 수정 -->
<div style="margin-left:322px;margin-right:322px;">
<div class="tit-board">
	<p class="img"></p>
	<h2><font color="333333">NOTICE</font></h2>
	<p class="info">공지사항입니다.</p>
</div>
<form name="noticeWriteForm" method="post" action="/kgmall/notice/noticeWrite.do">
<input type="hidden" name="writer" value="${name }">
<div class="boardWrite">
	<table width="100%" border="1" summary="">
	<tbody>
		<tr class="first">
			<th scope="row" class="thead txtLess">
				SUBJECT
			</th>
			<td>
				<input id="subject" name="subject" fw-filter="isFill" fw-label="제목" fw-msg="" class="inputTypeText" placeholder="" maxlength="125" value="" type="text">
				<input id="notice0" name="notice[]" fw-filter="" fw-label="공지사항" fw-msg="" value="T" type="checkbox">
				<label for="notice0">공지사항</label>
				<input id="is_post0" name="is_post[]" fw-filter="" fw-label="게시안함" fw-msg="" value="B" type="checkbox">
				<label for="is_post0">게시안함</label>
			</td>
		</tr>

	<tr>
	<td colspan="2" class="write">           
	<textArea id="content" name="content" style="width:100%; height:500px;"></textArea>	
	
</td>
</tr>
<tr>
<td colspan="2">
<div class="btnArea btnAreaCustom ">
	<span class="left">
		<a href="/kgmall/notice/noticeForm.do?pg=1" class="btn Normal Medium Wnormal">
			목록
		</a>
	</span>
	<input type="submit" value="등록" id="writeBtn" class="btn Normal Dark Wnormal mL5">
	<a href="/kgmall/notice/noticeForm.do?pg=1" class="btn Normal Medium Wnormal mL5">취소</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</form>
</div>

<script>
	$('#writeBtn').click(function(){
		document.noticeWriteForm.submit();
	});
</script>