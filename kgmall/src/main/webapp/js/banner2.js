/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2018-01-14
*/

(function($){

	$.dffixbanner=function(e,a){var s,n,t,i,l,d,o={use:!0,slide:{use:!0,useBtn:!0,useCookie:!0,firstState:!0,classes:{useCheckLength:".banner_image",slideBtn:".onoff",setSlideOn:"on"}},ajax:{useCount:!0,classes:{area:".ajaxarea",count:".count",content:".content",close:".close",loaded:"loaded",selected:"selected"},areaHtml:'<div class="ajaxarea"><div class="loading"><i class=" fa fa-spinner fa-pulse fa-3x fa-fw"></i></div></div>',url:"/dfloor/plugin/df-fixbanner/",fileNameAttr:"df-data-ajaxname",fileQueryAttr:"df-data-query",areaFadeInSpeed:50,contentFadeInSpeed:120,areaFadeOutSpeed:50},scroll:{use:!0,classes:{area:".updown",up:".up",down:".down"},speed:1e3,ease:"easeInOutCubic"},initBefore:function(){return!0},initAfter:function(){return!0}},c=this,r=$(e);c.init=function(){if(s=c.settings=$.extend(!0,o,a),"undefined"!=typeof setSize){if(s.initBefore.call(c,r),!1===s.use)return!1;if(!0===s.scroll.use&&(i=r.find(s.scroll.classes.area),l=i.find(s.scroll.classes.up),d=i.find(s.scroll.classes.down),i.show(),l.on("click",function(){return $("html, body").stop().animate({scrollTop:0},s.scroll.speed,s.scroll.ease),!1}),d.on("click",function(){return $("html, body").stop().animate({scrollTop:$(document).height()-$(window).height()},s.scroll.speed,s.scroll.ease),!1})),!0===s.slide.use&&r.find(s.slide.classes.useCheckLength).length>0){if(!0===s.slide.useCookie){var e=$.cookie("dffixbanner");1==e?r.addClass(s.slide.classes.setSlideOn):void 0===e&&!0===s.slide.firstState&&r.addClass(s.slide.classes.setSlideOn)}else!0===s.slide.firstState&&r.addClass(s.slide.classes.setSlideOn);!0===s.slide.useBtn&&((n=r.find(s.slide.classes.slideBtn)).show(),n.on("click",function(){r.toggleClass(s.slide.classes.setSlideOn),!0===s.slide.useCookie&&(!0===r.hasClass(s.slide.classes.setSlideOn)?$.cookie("dffixbanner",1,{expires:1,path:"/",secure:!1}):$.cookie("dffixbanner",0,{expires:1,path:"/",secure:!1}))}))}t=r.find(".ajax"),!0===s.ajax.useCount&&t.find(".count").each(function(){var e=$(this);"0"==e.text()&&e.hide(),e.on("DOMSubtreeModified propertychange",function(){parseInt(e.text())>0&&(e.show(),e.off("DOMSubtreeModified propertychange"))})}),t.children("a").on("click",function(){var e=$(this).parent();if(e.toggleClass(s.ajax.classes.selected).siblings().removeClass(s.ajax.classes.selected),!0===e.hasClass(s.ajax.classes.selected)){var a=e.append(s.ajax.areaHtml).find(s.ajax.classes.area).fadeIn(s.ajax.areaFadeInSpeed);$.ajax({url:s.ajax.url+"ajax."+e.attr(s.ajax.fileNameAttr)+".html"+(void 0!=e.attr(s.ajax.fileQueryAttr)?e.attr(s.ajax.fileQueryAttr):""),dataType:"html",success:function(e){a.append($(e).filter(s.ajax.classes.content)[0].outerHTML).addClass(s.ajax.classes.loaded),a.find(s.ajax.classes.content).fadeIn(s.ajax.contentFadeInSpeed,function(){$(this).find(".scrollbar-macosx").scrollbar()}),a.find(s.ajax.classes.close).one("click",function(){a.fadeOut(s.ajax.areaFadeOutSpeed,function(){t.removeClass(s.ajax.classes.selected)})})}}).done(function(){}),e.siblings().find(s.ajax.classes.area).fadeOut(s.ajax.areaFadeOutSpeed,function(){$(this).remove()})}else t.find(s.ajax.classes.area).fadeOut(s.ajax.areaFadeOutSpeed,function(){$(this).remove()})}),s.initAfter.call(c,r),r.show()}},c.init()},$.fn.dffixbanner=function(e){return this.each(function(){if("undefined"!=typeof setSize){var a=$(this),s=a.data("dffixbanner");return s?s.methods[e]?s.methods[e].apply(this,Array.prototype.slice.call(arguments,1)):void 0:(s=new $.dffixbanner(this,e),a.data("dffixbanner",s),s)}})};

	$(document).ready(function(){

		$('#df-fixbanner').dffixbanner({
			use:true,
			slide:{
				use:true,
				useBtn:true,
				useCookie:true,
				firstState:true,
				classes:{
					useCheckLength:'.banner_image',
					slideBtn:'.onoff',
					setSlideOn:'on'
				},
			},
			ajax:{
				useCount:true,
				classes:{
					area:'.ajaxarea',
					count:'.count',
					content:'.content',
					close:'.close',
					loaded:'loaded',
					selected:'selected'
				},
				areaHtml:'<div class="ajaxarea"><div class="loading"><i class=" fa fa-spinner fa-pulse fa-3x fa-fw"></i></div></div>',
				url:'/dfloor/plugin/df-fixbanner/',
				fileNameAttr:'df-data-ajaxname',
				fileQueryAttr:'df-data-query',
				areaFadeInSpeed:50,
				contentFadeInSpeed:120,
				areaFadeOutSpeed:50
			},
			scroll:{
				use:true,
				classes:{
					area:'.updown',
					up:'.up',
					down:'.down'
				},
				speed:1000,
				ease:'easeInOutCubic'
			},
			initAfter:function(el){
				el.show();
			}
		});

		//SNS아이콘 사용시 섹션 표시하기
		$('.sns-wrap').each(function(){
			var chk = false;
			$(this).find('li').each(function(){
				if($(this).css('display')!='none'){
					chk = true;
				}
			});
			if(chk==true)
				$(this).show();
		});

	});

})($DF);
/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2018-12-04
*/


(function($){

	$.dfreview=function(container,options){var defaults={list:{typeAll:"list gallery",typeBtn:"on",type:"gallery",galleryTypeCols:4},read:{minWidth:800,minHeight:600,rightWidth:400,marginWidth:100,marginHeight:100},write:{minWidth:800,minHeight:635},modify:{minWidth:800,minHeight:600},secret:{minWidth:600,minHeight:430},commentdel:{minWidth:800,minHeight:600},detail:{typeBtn:"on",type:"list",galleryTypeCols:5},main:{typeBtn:"on",type:"gallery",galleryTypeCols:5},initBefore:function(){return!0},initAfter:function(){return!0}},settings,review={init:function(){settings=review.settings=$.extend(!0,defaults,options),"undefined"!=typeof setSize&&(review.el=container,review.$el=$(review.el),settings.initBefore.call(review),review.act=review.$el.attr("df-review-act"),"list"==review.act?review.setList():"read"==review.act?review.setRead():"write"==review.act?(review.$el.parents("body#layer").addClass("df-review "+review.act),review.setWrite()):"modify"==review.act?(review.$el.parents("body#layer").addClass("df-review "+review.act),review.setWrite()):"reply"==review.act?review.setReply():"secret"==review.act?(review.$el.parents("body#layer").addClass("df-review "+review.act),review.setSecret()):"commentdel"==review.act?(review.$el.parents("body#layer").addClass("df-review "+review.act),review.setCommentdel()):"detail"==review.act?review.setList():"main"==review.act?review.setList():"login"==review.act&&review.setLogin(),settings.initAfter.call(review))},setList:function(){"main"==review.act?(settings.list.typeBtn=settings.main.typeBtn,settings.list.type=settings.main.type,settings.list.galleryTypeCols=settings.main.galleryTypeCols):"detail"==review.act&&(settings.list.typeBtn=settings.detail.typeBtn,settings.list.type=settings.detail.type,settings.list.galleryTypeCols=settings.detail.galleryTypeCols),settings.list.galleryTypeCols=parseInt(settings.list.galleryTypeCols),review.$listAll=review.$el.find(".list-normal").add(".list-notice"),review.$boxAll=review.$listAll.find(".box"),"detail"==review.act&&(review.$listNotice=review.$el.find(".list-notice"),review.$boxAll.each(function(){var e=$(this);parseInt(e.find(".chk").text())||(review.$listNotice.append(e),e.find(".subject").append(e.find(".comment")))})),review.$list=review.$el.find(".list-normal").addClass(settings.list.type),review.$box=review.$list.find(".box"),review.boxLen=review.$box.length,review.$search=review.$el.find(".search"),review.$listTypeBtn=review.$el.find(".listType-btn"),"list"!=review.act&&"main"!=review.act&&"detail"!=review.act||"on"!=settings.list.typeBtn?review.$listTypeBtn.addClass("displaynone"):(review.$listTypeBtn.children(".type-"+settings.list.type).addClass("selected"),review.$listTypeBtn.children("a").on("click",function(){var e=$(this),i=e.attr("df-review-listType");i!=settings.list.type&&review.$list.hasClass("loaded")&&(e.addClass("selected").siblings().removeClass("selected"),fadeOut(review.$list,function(){review.$list.removeClass(settings.list.typeAll).addClass(settings.list.type=i),review.setListType()}))})),review.boxLen&&(review.boardNo=df_getValue(review.$box.eq(0).attr("df-data-href"),"board_no"),review.boardNo||(review.boardNo=$this.attr("df-data-href").split("/")[3])),"list"==review.act&&(review.$search.find("#product_category_depth1").on("change",function(){BOARD.form_submit("boardSearchForm")}),review.$search.find("#search_key").val("product").hide()),review.$list.on("click",".btn-vote",function(e){var $this=$(this),$li=$this.parents(".box"),aData={board_no:review.boardNo,no:$li.attr("no")};$this.hasClass("selected")||$.get("/exec/front/Board/vote/",aData,function(req){var $req=$(req);$req[0].innerHTML.indexOf("back()")<=0&&$li.find(".vote-num").text(parseInt($li.find(".vote-num").text())+1),$this.addClass("selected"),eval($req[0].innerHTML.split(";")[0])},"html"),e.preventDefault()}),review.$list.on("click",".more",function(){var e=$(this),i=e.siblings(".c1"),t=e.siblings(".c2"),n=e.parent();if(n.hasClass("on"))n.fadeOut(300,function(){n.removeClass("on").fadeIn(300)}),i.animate({height:0},300,function(){i.fadeOut(0,function(){i.height(""),t.fadeIn(300)})});else{var r=i.height();n.fadeOut(300,function(){n.addClass("on").fadeIn(300),t.hide(),i.css({display:"block"}).animate({height:r},300)})}}),review.$list.find(".comment").text(function(){var e=this.textContent.replace(/[^0-9]/g,"");return e||(e=0),e}),review.$el.on("click",".open-read",function(e){var i,t=$(this),n=t.parents(".box"),r="/board/review/read.html?board_no="+review.boardNo+"&no="+n.attr("no"),a=n.find(".content-thumb");if(n.hasClass("secret")&&(r="/board/review/secret.html?board_no="+review.boardNo+"&no="+n.attr("no")+"&return_url=/board/review/read.html"),a.length){var s=0;t.parents(".content-thumb").length&&(s=t.parent().index()),i={"df-image-index":s}}review.openPopup(r,i),e.preventDefault(),e.stopPropagation()}),review.$el.find(".review-write").on("click",function(e){$(this);var i=$(this).attr("df-data-href");review.openPopup(i),e.preventDefault(),e.stopPropagation()}),review.$boxAll.each(function(e){var i=$(this),t=df_getValue(i.attr("df-data-href"),"no");t||(t=i.attr("df-data-href").split("/")[4]),i.attr({board_no:review.boardNo,no:t})}),review.$box.find(".subject").find(".file").children("img").removeAttr("onmouseover onmouseout").siblings("span").remove();var count=0;review.$box.each(function(e){var r=$(this);r.find(".product-thumb").find("img").length||r.addClass("no-product");var i={board_no:review.boardNo,no:r.attr("no")};$.get("/exec/front/board/Get/",i,function(e){if(0==e.failed){var i=e.data,t=$(i.content_image).filter("img");if(t.length){var n="";n+='<div class="content-thumb"><ul>',t.each(function(e){n+='<li><a href="#none" class="open-read" style="background-image:url('+this.src.replace("http://","//").replace("https://","//")+')">'+this.outerHTML+"</a></li>"}),n+="</ul></div>",r.append(n)}r.find(".c1").html(e.data.content),"detail"==review.act&&r.find(".vote-num").html(e.data.vote_count)}else"S"==e.data&&r.addClass("secret").find(".content").find(".c1").text("")},"json").done(function(){count++,review.boxLen==count&&(review.$list_backup=review.$list.clone(),review.setListType(),review.$list.addClass("loaded"),review.widthOld=review.$el.width(),$(window).on("resize",function(){if("gallery"==settings.list.type&&(review.width=review.$el.width(),review.widthOld!=review.width)){var i=0,t=0;review.$box.css({"min-height":""}).each(function(){var e=$(this);t=e.outerHeight(),i<t&&(i=t)}),review.$box.css({"min-height":i}),review.widthOld=review.width}}))})}),review.$box.length||(fadeIn(review.$el),fadeIn(review.$list))},setListType:function(){if(review.$list.hasClass("loaded")&&(review.$list.empty().append(review.$list_backup[0].innerHTML),review.$box=review.$list.find(".box")),"list"==settings.list.type)review.$box.css({"min-height":""}).each(function(){var e=$(this),i=e.children(".chk").detach(),t=e.children(".product-thumb").detach(),n=e.children(".product-name").detach(),r=e.children(".subject").detach(),a=e.children(".content").detach(),s=e.children(".vote").detach(),o=e.children(".comment").detach(),l=e.children(".point").detach(),d=e.children(".writer").detach(),v=e.children(".date").detach(),c=e.children(".content-thumb").detach(),w=a.children().children().attr("style","").length,p=a.text();if(1<w||40<p.length||c.length?a.append('<a href="#none" class="open-read c2">'+p.substring(0,40)+'···</a><a href="#none" class="more"></a>'):a.append('<a href="#none" class="open-read c2">'+p+"</a>"),c.length){var f=c.find("img"),h="";f.each(function(e){h+='<span><span class="open-read" style="background-image:url('+this.src.replace("http://","//").replace("https://","//")+')">'+this.outerHTML+"</span></span>"}),a.find(".c1").append('<span class="content-thumb">'+h+"</span>")}t.children("a").hasClass("displaynone")&&t.addClass("displaynone");var u=(i.length&&t.not(".displaynone").length?i[0].outerHTML:"")+(t.not(".displaynone").length?t.not(".displaynone")[0].outerHTML:""),g=(i.length&&!t.not(".displaynone").length?i[0].outerHTML:"")+(n.length?n[0].outerHTML:"")+(r.length?r[0].outerHTML:"")+(a.length?a[0].outerHTML:"")+(o.length?o[0].outerHTML:"")+(s.length?s[0].outerHTML:""),m=(l.length?l[0].outerHTML:"")+(d.length?d[0].outerHTML:"")+(v.length?v[0].outerHTML:"")+(c.length?c[0].outerHTML:"");e.append('<div class="div1">'+u+'</div><div class="div2">'+g+'</div><div class="div3">'+m+"</div>")});else if("gallery"==settings.list.type){var r=0;review.$el.show(),review.$list.addClass("gallery"+settings.list.galleryTypeCols).show(),review.$box.each(function(){var e=$(this),i=e.children(".content"),t=i.text();e.children(".product-thumb").append(e.children(".content-thumb")),i.children().text(t.substring(0,40));var n=e.outerHeight();r<n&&(r=n)}),review.$box.css({"min-height":r})}fadeIn(review.$el),fadeIn(review.$list)},setRead:function(){review.$el.parents("body#layer").addClass("df-review "+review.act),review.$parentWin=$(parent.window),review.$parentDoc=$(parent.document),review.$popup=review.$parentDoc.find("#df-review-popup"),review.$loading=review.$popup.find(".loading"),review.$inner=review.$popup.find(".inner"),review.$left=review.$el.find(".left"),review.$leftInner=review.$left.children(".inner"),review.$right=review.$el.find(".right"),review.$rightInner=review.$right.children(".inner");var e=review.$el.find(".content-img").children().filter("img");if(review.contentThumbLen=e.length,review.contentThumbLen){var i="";if(i+='<div class="content-thumb"><ul>',e.each(function(e){i+='<li><a href="#none" class="open-read zoom">'+this.outerHTML+"</a></li>"}),i+="</ul></div>",review.$leftInner.append(i),review.$contentThumb=review.$leftInner.find(".content-thumb"),review.$contentThumbList=review.$contentThumb.find("li"),review.$contentThumbImg=review.$contentThumbList.find("img"),review.contentThumbIndex=review.$popup.attr("df-image-index")?review.$popup.attr("df-image-index"):0,review.$contentThumbList.eq(review.contentThumbIndex).addClass("selected"),1<review.contentThumbLen){for(var t="",n=0;n<review.contentThumbLen;n++)t+='<a href="#none"></a>';review.$contentThumb.append('<div class="prev"><a href="#none"><i class="fa fa-angle-left"></i></a></div><div class="next"><a href="#none"><i class="fa fa-angle-right"></i></a></div><div class="pager">'+t+"</div>"),review.thumbChange(review.$contentThumb,review.contentThumbIndex)}review.$leftInner.on("click",".zoom",function(){var e=$(this).parents(".content-thumb");review.$inner.after('<div class="image-zoom">'+e[0].outerHTML+"</div>"),review.$imgZoom=review.$popup.css("overflow","auto").find(".image-zoom"),fadeOut(review.$inner,function(){fadeIn(review.$imgZoom),review.thumbChange(review.$imgZoom.find(".content-thumb"),review.contentThumbIndex),review.$popup.one("click",".image-zoom",function(e){fadeOut(review.$imgZoom,function(){fadeIn(review.$inner),review.$popup.css("overflow",""),review.$imgZoom.remove()}),e.preventDefault(),e.stopPropagation()})})}),review.$right.css({width:settings.read.rightWidth})}else review.$left.remove(),review.$right.width("100%");review.$el.find(".review-delete").on("click",function(){review.$el.find("#list_url").val("javascript:parent.location.reload()")}),window.onload=function(){review.setPopupSize(),review.$parentWin.on("resize",function(){review.setPopupSize("resize")}),fadeOut(review.$loading,function(){review.$loading.remove()}),fadeIn(review.$el);new IScroll(review.$rightInner[0],{scrollbars:!0,mouseWheel:!0,interactiveScrollbars:!0,shrinkScrollbars:"scale",fadeScrollbars:!0});fadeIn(review.$inner)}},setWrite:function(){review.$parentWin=$(parent.window),review.$parentDoc=$(parent.document),review.$popup=review.$parentDoc.find("#df-review-popup"),review.$loading=review.$popup.find(".loading"),review.$inner=review.$popup.find(".inner"),"write"==review.act&&review.$el.find(".review-cancel").on("click",function(){review.closePopup()}),review.$el.find("#move_write_after").val("javascript:parent.location.reload()"),review.$form=review.$el.find(".form"),review.$form.find("#content_IFRAME").height(150),review.getPointFunc(review.$form.find(".point")),"write"==review.act&&(review.$fileList=review.$el.find(".imgfile"),review.$fileInput=review.$fileList.find('[name="attach_file[]"]'),review.$fileInput.attr("accept",".jpg,.jpeg,.png,.gif").change(function(){setInputFileImage(this)}),setInputFileImageClose("click")),window.onload=function(){review.setPopupSize(),fadeOut(review.$loading,function(){review.$loading.remove()}),fadeIn(review.$el),fadeIn(review.$inner)}},setReply:function(){fadeIn(review.$el)},setSecret:function(){review.$parentWin=$(parent.window),review.$parentDoc=$(parent.document),review.$popup=review.$parentDoc.find("#df-review-popup"),review.$loading=review.$popup.find(".loading"),review.$inner=review.$popup.find(".inner"),review.$el.find(".review-cancel").on("click",function(){review.closePopup()}),window.onload=function(){review.setPopupSize(),fadeOut(review.$loading,function(){review.$loading.remove()}),fadeIn(review.$el),fadeIn(review.$inner)}},setCommentdel:function(){review.$parentWin=$(parent.window),review.$parentDoc=$(parent.document),review.$popup=review.$parentDoc.find("#df-review-popup"),review.$loading=review.$popup.find(".loading"),review.$inner=review.$popup.find(".inner"),review.$el.find(".review-cancel").attr("href",review.$el.find(".review-cancel").attr("href")+"?"+getQueryString(["board_no","no"])),window.onload=function(){review.setPopupSize(),fadeIn(review.$el)},fadeIn(review.$el)},setLogin:function(){review.$parentWin=$(parent.window),review.$parentDoc=$(parent.document),review.$popup=review.$parentDoc.find("#df-review-popup"),review.$loading=review.$popup.find(".loading"),review.$inner=review.$popup.find(".inner"),review.closePopup(),parent.window.location.href="/member/login.html?returnUrl="+parent.window.location},openPopup:function(e,i){for(var t in review.$win=$(window),review.$body=$("body"),review.$body.append('<div id="df-review-popup"><div class="loading"><i class="fa fa-spinner fa-pulse"></i></div><div class="inner"><iframe id="df-review-iframe" src="'+e+'"></iframe><a href="#none" class="close-btn"><i class="fa fa-times-circle"></i></a></div><span class="maker">'+review.$el.find(".companyname").text()+" with DFLOOR</span></div>").css({height:"auto",overflow:"hidden"}),review.$popup=review.$body.find("#df-review-popup"),review.$close=review.$popup.find(".close-btn"),i)review.$popup.attr(t,i[t]);var n=function(e){if(!$(e.target).is(review.$popup)&&!$(e.target).parent().is(review.$close))return!1;review.$close.add(review.$popup).off("click",n),review.closePopup()};review.$close.add(review.$popup).on("click",n),review.$win.one("keyup",function(e){27==e.keyCode&&review.closePopup()}),fadeIn(review.$popup)},closePopup:function(){fadeOut(review.$popup,function(){review.$popup.remove()}),null!=review.$body&&review.$body.css({height:"",overflow:""}),null!=review.$parentDoc&&review.$parentDoc.find("body").css({height:"",overflow:""})},setPopupSize:function(e){var i,t,n=review.$parentDoc.find("#df-review").width()-parseInt(settings.read.marginWidth),r=review.$parentWin.height()-parseInt(settings.read.marginHeight);if("read"==review.act)if(review.contentThumbLen){var a,s=review.$contentThumbImg.eq(review.contentThumbIndex),o=s[0].naturalWidth,l=s[0].naturalHeight,d=s[0].naturalHeight/s[0].naturalWidth,v=parseInt(settings.read.rightWidth);n-v<o?t=(a=(i=n)-v)*d:(i=(a=o)+v,t=l),r<t&&(i=(a=(t=r)/d)+v),i<settings.read.minWidth&&(i=settings.read.minWidth,a=settings.read.minWidth-v),t<settings.read.minHeight&&(t=settings.read.minHeight),review.$left.css({width:parseInt(a)})}else i=settings.read.minWidth,t=settings.read.minHeight;else"write"==review.act?(i=settings.write.minWidth,t=settings.write.minHeight):"modify"==review.act?(i=settings.modify.minWidth,t=settings.modify.minHeight):"secret"==review.act?(i=settings.secret.minWidth,t=settings.secret.minHeight):"commentdel"==review.act&&(i=settings.commentdel.minWidth,t=settings.commentdel.minHeight);review.$inner.css({width:i,height:t,"max-height":t,"margin-left":-i/2,"margin-top":-t/2})},getPointFunc:function(e){var t,i=e,n=i.find(".input"),r=n.find("input").attr("fw-filter",""),a=i.find(".view"),s=a.find("a");s.on({mouseenter:function(){var e=$(this);e.nextAll().removeClass("hover"),e.addClass("hover").prevAll().addClass("hover")},mouseleave:function(){s.removeClass("hover")},click:function(){var e=$(this),i=e.index();n.find("#point"+(4-i)).prop("checked",!0).siblings().prop("checked",!1),e.addClass("selected").siblings().removeClass("selected"),a.addClass("selected"),e.nextAll().removeClass("on"),e.addClass("on").prevAll().addClass("on")}}),r.each(function(e){var i=$(this);i.attr("checked")&&(t=parseInt(i.attr("value"))-1,s.eq(t).addClass("selected"),a.addClass("selected"),s.eq(t).nextAll().removeClass("on"),s.eq(t).addClass("on").prevAll().addClass("on"))})},thumbChange:function(e,t){var n=e.find("li"),i=e.find(".prev").children("a"),r=e.find(".next").children("a"),a=e.find(".pager").children("a");a.eq(t).addClass("selected"),i.add(r).add(a).on("click",function(e){var i=$(this);i.parent().hasClass("prev")?--t<0&&(t=review.contentThumbLen-1):i.parent().hasClass("next")?(t++,review.contentThumbLen<=t&&(t=0)):i.parent().hasClass("pager")&&(t=i.index()),review.contentThumbIndex=t,a.eq(t).addClass("selected").siblings().removeClass("selected"),n.eq(t).addClass("selected").siblings().removeClass("selected"),review.setPopupSize(),e.preventDefault(),e.stopPropagation()})}},setInputFileImage=function(e){var i=$(e),t=i.parent("span");t.index();if(e.files&&e.files[0]){var n=new FileReader;n.onload=function(e){t.find("img").remove(),i.before('<img src="'+e.target.result+'">'),setInputFileImageClose("close")},n.readAsDataURL(e.files[0])}},setInputFileImageClose=function(e){if("click"==e)review.$fileList.on("click",".close",function(){var e=$(this).parent(".imgfile");e.find("img").remove(),e.find(".close").remove(),e.find('[name="attach_file[]"]').val(""),setInputFileImageClose("close")});else if("close"==e){var i;review.$fileInput.each(function(e){$(this).val()&&(i=e)}),review.$fileList.eq(i).siblings().find(".close").remove(),review.$fileInput.eq(i).after('<a href="#none" class="close"><i class="fa fa-times" aria-hidden="true"></i></i></a>')}},getQueryString=function(e){var i={};for(k in e)i[e[k]]=df_getValue(location.search,e[k]);return df_getString(i)},fadeIn=function(e,i){e.css({display:"block",visibility:"visible"}).animate({opacity:1},200,null!=i?i():"")},fadeOut=function(e,i){e.animate({opacity:0},200,function(){e.css({display:"none",visibility:"hidden"}),null!=i&&i()})};review.init()},$.fn.dfreview=function(t){return this.each(function(){if("undefined"!=typeof setSize){var e=$(this),i=e.data("dfreview");return i?i.methods[t]?i.methods[t].apply(this,Array.prototype.slice.call(arguments,1)):void 0:(i=new $.dfreview(this,t),e.data("dfreview",i),i)}})};

	$(document).ready(function(){
		var $review = $('#df-review');
		if($review.hasClass('main') && DF['set-review-mainuse']!='on'){
			$review.remove();
		}else{
			$review.dfreview({
				list:{
					typeBtn:DF['set-review-listtypebtn'],
					type:DF['set-review-listtype'],
					galleryTypeCols:DF['set-review-listgallerycols']
				},
				read:{
					minWidth:800,
					minHeight:600,
					rightWidth:400,
					marginWidth:60,
					marginHeight:160
				},
				write:{
					minWidth:800,
					minHeight:635
				},
				modify:{
					minWidth:800,
					minHeight:600
				},
				secret:{
					minWidth:600,
					minHeight:430
				},
				commentdel:{
					minWidth:800,
					minHeight:600
				},
				detail:{
					typeBtn:DF['set-review-detailtypebtn'],
					type:DF['set-review-detailtype'],
					galleryTypeCols:DF['set-review-detailgallerycols']
				},
				main:{
					typeBtn:DF['set-review-maintypebtn'],
					type:DF['set-review-maintype'],
					galleryTypeCols:DF['set-review-maingallerycols']
				}
			});
		}
	});

})($DF);

