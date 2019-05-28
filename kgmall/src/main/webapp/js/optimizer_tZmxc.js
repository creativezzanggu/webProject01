/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2018-12-12
*/

(function($){

	var set=[],cate=[],catenum=[],catedom=[],cateimg=[],imglist=[],imgchk=!1,$imglist=$("#categoryimg").find("li"),cateSelected=[];$.dfcategory=function(e,r){var s,c={responsive:!0,maxDepth:4,selectedUse:!1,selectedClass:"active",depth:{},initBefore:function(){return!0},initAfter:function(){return!0}},o=this,f=$(e);o.init=function(){if(s=o.settings=$.extend({},c,r),"undefined"!=typeof setSize){s.initBefore.call(o,f),s.depth[0]={};for(var e=1;e<=s.maxDepth;e++){var i=e;if(null==s.depth[i]&&(s.depth[i]={}),1==s.depth[i].colsAutoMaring){o.colsAutoMaring(i);var t=i;1==s.responsive&&$(window).on("resize",function(){o.colsAutoMaring(t)})}f.find(".m"+i).find(".d"+i).each(function(){var e=$(this),t=e.attr("df-cate-no");if(thistext=e.text(),null!=catedom[t]&&s.maxDepth>i&&(0<s.depth[i].childMark.length?e.append(catedom[t].join("")).find("div").addClass("m"+(i+1)).siblings("a").append(s.depth[i].childMark).siblings("div").find("li").addClass("d"+(i+1)):e.append(catedom[t].join("")).find("div").addClass("m"+(i+1)).find("li").addClass("d"+(i+1))),1==s.depth[i].childPopupImg&&imgchk){var n=$.inArray(encodeURI(thistext),imglist);0<=n&&(0<e.children("div").length?e.children("div").append('<div class="menuImg">'+$imglist.eq(n)[0].innerHTML+"</div>").addClass("m"+(i+1)).css({"margin-left":($imglist.eq(n).find("img")[0].naturalWidth+parseInt(e.find(".menuImg").css("margin-right")))/2}).find(".menuImg a").attr("href",function(){return""==$(this).attr("href")?"#none":$(this).attr("href")}):e.append('<div><div class="menuImg">'+$imglist.eq(n)[0].innerHTML+"</div></div>").children("div").addClass("m"+(i+1)).find(".menuImg a").attr("href",function(){return""==$(this).attr("href")?"#none":$(this).attr("href")}))}e.attr("df-cate-depth",i)})}if(s.selectedUse){var n=parseInt(df_getValue(window.location.href,"cate_no"));if(!n){var a=window.location.pathname.split("/");(n=parseInt(a[a.indexOf("category")+1]))||(n=parseInt(a[a.indexOf("category")+2]))}if(n&&null!=catenum[n]){f.find('[df-cate-no="'+n+'"]').addClass(s.selectedClass);for(var d=catenum[n].parent_cate_no;null!=catenum[d];)f.find('[df-cate-no="'+d+'"]').addClass(s.selectedClass),d=catenum[d].parent_cate_no}}f.find("li").on({mouseenter:function(){var e=$(this),t=parseInt(e.attr("df-cate-depth"));t&&"popup"==s.depth[t].childType?e.addClass("on").find(".m"+(t+1)).fadeIn(s.depth[t].childPopupSpeed):e.addClass("on")},mouseleave:function(){var e=$(this),t=parseInt(e.attr("df-cate-depth"));t&&"popup"==s.depth[t].childType?e.removeClass("on").find(".m"+(t+1)).fadeOut(s.depth[t].childPopupSpeed):e.removeClass("on")}}),1==s.responsive&&o.responsive(),s.initAfter.call(o,f)}},o.responsive=function(){$(window).on("resize",function(){})},o.colsAutoMaring=function(e){var t=0,n=f.find(".m"+e),i=n.find(".d"+e),a=i.length;i.each(function(){var e=$(this);t+=e.width()}),margin=(n.width()-t)/a/2,n.width()<=t+2*margin*a&&margin--,i.css({"margin-left":parseInt(margin),"margin-right":parseInt(margin)})},o.init()},$.fn.dfcategory=function(n){return this.each(function(){if("undefined"!=typeof setSize){var e=$(this),t=e.data("dfcategory");return t?t.methods[n]?t.methods[n].apply(this,Array.prototype.slice.call(arguments,1)):void 0:(t=new $.dfcategory(this,n),e.data("dfcategory",t),t)}})};var dfcategoryajax=function(){$.ajax({url:"/exec/front/Product/SubCategory",dataType:"json",success:function(e){if(e)for(var t=0;t<e.length;t++)catenum[e[t].cate_no]=e[t],cate[e[t].parent_cate_no]||(cate[e[t].parent_cate_no]=[]),cate[e[t].parent_cate_no].push(e[t]);for(var n in cate)if(0!=$.isNumeric(n)){catedom[n]=[],catedom[n].push("<div><ul>");for(t=0;t<cate[n].length;t++)catedom[n].push('<li df-cate-no="'+cate[n][t].cate_no+'"><a href="/'+cate[n][t].design_page_url+cate[n][t].param+'">'+cate[n][t].name+"</a></li>");catedom[n].push("</ul></div>")}}}).done(function(){for(var e=0;e<$imglist.length;e++)imglist[e]=encodeURI($imglist.eq(e).attr("df-data-id"));for(k in imglist.join("").length&&(imgchk=!0),set)$("#"+k).dfcategory(set[k])})};

	if(DF['set-allmenu']=='on'){
		set['anb'] = {
			'maxDepth':4,
			'depth':{
				1:{
					'colsAutoMaring':false,
					'childType':'default',
					'childPopupSpeed':70,
					'childPopupImg':false,
					'childMark':'',
				},
				2:{
					'colsAutoMaring':false,
					'childType':'popup',
					'childPopupSpeed':70,
					'childPopupImg':false,
					'childMark':'<i class="fa fa-angle-right"></i>',
				},
				3:{
					'colsAutoMaring':false,
					'childType':'popup',
					'childPopupSpeed':70,
					'childPopupImg':false,
					'childMark':'<i class="fa fa-angle-right"></i>',
				}
			},
			'initAfter':function(el){
				if(parseInt(DF['set-allmenu-cols'])>=4 && parseInt(DF['set-allmenu-cols'])<=8){
					el.find('.left').find('.d1').css({'width':Math.floor(100/parseInt(DF['set-allmenu-cols'])*10)/10+'%'});
				}
				el.css({'opacity':1, 'visibility':'visible'});
			}
		};
	}else{
		$('#anb').hide();
	}
	set['cnb'] = {
		'responsive':true,
		'maxDepth':4,
		'selectedUse':true,
		'selectedClass':'active',
		'depth':{
			1:{
				'colsAutoMaring':true,
				'childType':'popup',
				'childPopupSpeed':70,
				'childPopupImg':true,
				'childMark':'',
			},
			2:{
				'colsAutoMaring':false,
				'childType':'popup',
				'childPopupSpeed':70,
				'childPopupImg':false,
				'childMark':'<i class="fa fa-angle-right"></i>',
			},
			3:{
				'colsAutoMaring':false,
				'childType':'popup',
				'childPopupSpeed':70,
				'childPopupImg':false,
				'childMark':'<i class="fa fa-angle-right"></i>',
			}
		},
		'initAfter':function(el){
			el.css({'opacity':1, 'visibility':'visible'});
		}
	};
	dfcategoryajax();

})($DF);

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

/*
마지막 업데이트 : 2018-11-30
*/

!function(V){var Z={},B={df_inrows:null,df_descript:!1,mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};V.fn.bxSlider=function(e){if(0==this.length)return this;if(1<this.length)return this.each(function(){V(this).bxSlider(e)}),this;var d={},c=this;Z.el=this;var n,s=V(window).width(),o=V(window).height(),r=function(){if(d.settings=V.extend({},B,e),1<d.settings.df_inrows){d.children=c.children(d.settings.slideSelector);var s=d.settings.maxSlides*d.settings.df_inrows,t=Math.ceil(d.children.length/s),n=d.children.children("").detach();d.children.eq(t-1).nextAll("").remove(),d.children.each(function(t){var e=V(this);for(i=t*s;i<t*s+s;i++)0<n.eq(i).length&&e.append(n.eq(i)[0].outerHTML)}),d.children=c.children(d.settings.slideSelector).css("text-align","left"),d.children.children().css({width:(100/d.settings.maxSlides).toFixed(3)-1+"%","margin-top":"1%","margin-right":"1%"}).css({width:"calc("+(100/d.settings.maxSlides).toFixed(3)+"% - "+d.settings.slideMargin*(d.settings.maxSlides-1)/d.settings.maxSlides+"px)",display:"inline-block","margin-top":"calc("+d.settings.slideMargin+"px)","margin-right":"calc("+d.settings.slideMargin+"px)","text-align":"center"}),d.children.each(function(t){var e=V(this);$child=e.children(),$child.each(function(t){var e=V(this);t%d.settings.maxSlides==d.settings.maxSlides-1&&e.css({"margin-right":"0"}),t<d.settings.maxSlides&&e.css({"margin-top":"0"})})}),d.settings.slideWidth=d.settings.slideWidth*d.settings.maxSlides+(d.settings.maxSlides-1)*d.settings.slideMargin,d.settings.minSlides=1,d.settings.maxSlides=1,d.settings.moveSlides=1}c.settings=d.settings,d.settings.slideWidth=parseInt(d.settings.slideWidth),d.children=c.children(d.settings.slideSelector),d.children.length<d.settings.minSlides&&(d.settings.minSlides=d.children.length),d.children.length<d.settings.maxSlides&&(d.settings.maxSlides=d.children.length),d.settings.randomStart&&(d.settings.startSlide=Math.floor(Math.random()*d.children.length)),d.active={index:d.settings.startSlide},d.carousel=1<d.settings.minSlides||1<d.settings.maxSlides,d.carousel&&(d.settings.preloadImages="all"),d.minThreshold=d.settings.minSlides*d.settings.slideWidth+(d.settings.minSlides-1)*d.settings.slideMargin,d.maxThreshold=d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin,d.working=!1,d.controls={},d.interval=null,d.animProp="vertical"==d.settings.mode?"top":"left",d.usingCSS=d.settings.useCSS&&"fade"!=d.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return d.cssPrefix=e[i].replace("Perspective","").toLowerCase(),d.animProp="-"+d.cssPrefix+"-transform",!0;return!1}(),"vertical"==d.settings.mode&&(d.settings.maxSlides=d.settings.minSlides),c.data("origStyle",c.attr("style")),c.children(d.settings.slideSelector).each(function(){V(this).data("origStyle",V(this).attr("style"))}),a()},a=function(){c.wrap('<div class="'+d.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),d.viewport=c.parent(),d.loader=V('<div class="bx-loading" />'),d.viewport.prepend(d.loader),c.css({width:"horizontal"==d.settings.mode?100*d.children.length+215+"%":"auto",position:"relative"}),d.usingCSS&&d.settings.easing?c.css("-"+d.cssPrefix+"-transition-timing-function",d.settings.easing):d.settings.easing||(d.settings.easing="swing");x();d.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),d.viewport.parent().css({maxWidth:u()}),d.settings.pager||d.viewport.parent().css({margin:"0 auto 0px"}),d.children.css({float:"horizontal"==d.settings.mode?"left":"none",listStyle:"none",position:"relative"}),d.children.css("width",f()),"horizontal"==d.settings.mode&&0<d.settings.slideMargin&&d.children.css("marginRight",d.settings.slideMargin),"vertical"==d.settings.mode&&0<d.settings.slideMargin&&d.children.css("marginBottom",d.settings.slideMargin),"fade"==d.settings.mode&&(d.children.css({position:"absolute",zIndex:0,display:"none"}),d.children.eq(d.settings.startSlide).css({zIndex:d.settings.slideZIndex,display:"block"})),d.controls.el=V('<div class="bx-controls" />'),d.settings.captions&&M(),d.active.last=d.settings.startSlide==m()-1,d.settings.video&&c.fitVids();var t=d.children.eq(d.settings.startSlide);"all"==d.settings.preloadImages&&(t=d.children),d.settings.ticker?d.settings.pager=!1:(d.settings.pager&&T(),d.settings.controls&&C(),d.settings.auto&&d.settings.autoControls&&E(),(d.settings.controls||d.settings.autoControls||d.settings.pager)&&d.viewport.after(d.controls.el)),h(t,p),1<d.settings.df_inrows&&1==d.settings.df_descript&&(c.children("*").each(function(t){V(this).children("div").eq(d.settings.df_inrows-1).children("*:last-child").css({"margin-bottom":"0"})}),g())},l=!1,g=function(){var e=[],s=1,t=0;for(0==l&&(n=parseInt(c.children("*").children("div").children("*:last-child").css("margin-bottom")),l=!0),i=0;i<d.settings.df_inrows-1;i++)e[i]=[],c.children("*").each(function(t){e[i][t]=parseInt(V(this).children("div").eq(i).outerHeight())}),s=Math.max.apply(null,e[i]),t=Math.min.apply(null,e[i]),s!=t&&c.children("*").each(function(t){V(this).children("div").eq(i).children("*:last-child").css({"margin-bottom":n+s-parseInt(V(this).children("div").eq(i).outerHeight())+parseInt(c.children("*").children(".ex-sort").css("margin-top"))})})},h=function(t,e){var i=t.find("img, iframe").length;if(0!=i){var s=0;t.find("img, iframe").each(function(){V(this).one("load",function(){++s==i&&e()}).each(function(){this.complete&&V(this).trigger("load")})})}else e()},p=function(){if(d.settings.infiniteLoop&&"fade"!=d.settings.mode&&!d.settings.ticker){var t="vertical"==d.settings.mode?d.settings.minSlides:d.settings.maxSlides,e=d.children.slice(0,t).clone().addClass("bx-clone"),i=d.children.slice(-t).clone().addClass("bx-clone");c.append(e).prepend(i)}d.loader.remove(),w(),"vertical"==d.settings.mode&&(d.settings.adaptiveHeight=!0),d.viewport.height(v()),c.redrawSlider(),d.settings.onSliderLoad(d.active.index),d.initialized=!0,d.settings.responsive&&V(window).bind("resize",Y),d.settings.auto&&d.settings.autoStart&&(1<m()||d.settings.autoSlideForOnePage)&&A(),d.settings.ticker&&L(),d.settings.pager&&q(d.settings.startSlide),d.settings.controls&&H(),d.settings.touchEnabled&&!d.settings.ticker&&_()},v=function(){var e=0,t=V();if("vertical"==d.settings.mode||d.settings.adaptiveHeight)if(d.carousel){var s=1==d.settings.moveSlides?d.active.index:d.active.index*S();for(t=d.children.eq(s),i=1;i<=d.settings.maxSlides-1;i++)t=s+i>=d.children.length?t.add(d.children.eq(i-1)):t.add(d.children.eq(s+i))}else t=d.children.eq(d.active.index);else t=d.children;return"vertical"==d.settings.mode?(t.each(function(t){e+=V(this).outerHeight()}),0<d.settings.slideMargin&&(e+=d.settings.slideMargin*(d.settings.minSlides-1))):e=Math.max.apply(Math,t.map(function(){return V(this).outerHeight(!1)}).get()),"border-box"==d.viewport.css("box-sizing")?e+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))+parseFloat(d.viewport.css("border-top-width"))+parseFloat(d.viewport.css("border-bottom-width")):"padding-box"==d.viewport.css("box-sizing")&&(e+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))),e},u=function(){var t="100%";return 0<d.settings.slideWidth&&(t="horizontal"==d.settings.mode?d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin+2*parseInt(d.viewport.css("padding-left")):d.settings.slideWidth),t},f=function(){var t=d.settings.slideWidth,e=d.viewport.width();return 0==d.settings.slideWidth||d.settings.slideWidth>e&&!d.carousel||"vertical"==d.settings.mode?t=e:1<d.settings.maxSlides&&"horizontal"==d.settings.mode&&(e>d.maxThreshold||e<d.minThreshold&&(t=(e-d.settings.slideMargin*(d.settings.minSlides-1))/d.settings.minSlides)),t},x=function(){var t=1;if("horizontal"==d.settings.mode&&0<d.settings.slideWidth)if(d.viewport.width()<d.minThreshold)t=d.settings.minSlides;else if(d.viewport.width()>d.maxThreshold)t=d.settings.maxSlides;else{var e=d.children.first().width()+d.settings.slideMargin;t=Math.floor((d.viewport.width()+d.settings.slideMargin)/e)}else"vertical"==d.settings.mode&&(t=d.settings.minSlides);return t},m=function(){var t=0;if(0<d.settings.moveSlides)if(d.settings.infiniteLoop)t=Math.ceil(d.children.length/S());else for(var e=0,i=0;e<d.children.length;)++t,e=i+x(),i+=d.settings.moveSlides<=x()?d.settings.moveSlides:x();else t=Math.ceil(d.children.length/x());return t},S=function(){return 0<d.settings.moveSlides&&d.settings.moveSlides<=x()?d.settings.moveSlides:x()},w=function(){if(d.children.length>d.settings.maxSlides&&d.active.last&&!d.settings.infiniteLoop){if("horizontal"==d.settings.mode){var t=d.children.last(),e=t.position();b(-(e.left-(d.viewport.width()-t.outerWidth())),"reset",0)}else if("vertical"==d.settings.mode){var i=d.children.length-d.settings.minSlides;e=d.children.eq(i).position();b(-e.top,"reset",0)}}else{e=d.children.eq(d.active.index*S()).position();d.active.index==m()-1&&(d.active.last=!0),null!=e&&("horizontal"==d.settings.mode?b(-e.left,"reset",0):"vertical"==d.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(d.usingCSS){var n="vertical"==d.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";c.css("-"+d.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(c.css(d.animProp,n),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?c.css(d.animProp,n):"ticker"==e&&(c.css("-"+d.cssPrefix+"-transition-timing-function","linear"),c.css(d.animProp,n),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),F()}))}else{var o={};o[d.animProp]=t,"slide"==e?c.animate(o,i,d.settings.easing,function(){D()}):"reset"==e?c.css(d.animProp,t):"ticker"==e&&c.animate(o,speed,"linear",function(){b(s.resetValue,"reset",0),F()})}},t=function(){for(var t="",e=m(),i=0;i<e;i++){var s="";d.settings.buildPager&&V.isFunction(d.settings.buildPager)?(s=d.settings.buildPager(i),d.pagerEl.addClass("bx-custom-pager")):(s=i+1,d.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+i+'" class="bx-pager-link">'+s+"</a></div>"}d.pagerEl.html(t)},T=function(){d.settings.pagerCustom?d.pagerEl=V(d.settings.pagerCustom):(d.pagerEl=V('<div class="bx-pager" />'),d.settings.pagerSelector?V(d.settings.pagerSelector).html(d.pagerEl):d.controls.el.addClass("bx-has-pager").append(d.pagerEl),t()),d.pagerEl.on("click","a",k)},C=function(){d.controls.next=V('<a class="bx-next" href="">'+d.settings.nextText+"</a>"),d.controls.prev=V('<a class="bx-prev" href="">'+d.settings.prevText+"</a>"),d.controls.next.bind("click",P),d.controls.prev.bind("click",y),d.settings.nextSelector&&V(d.settings.nextSelector).append(d.controls.next),d.settings.prevSelector&&V(d.settings.prevSelector).append(d.controls.prev),d.settings.nextSelector||d.settings.prevSelector||(d.controls.directionEl=V('<div class="bx-controls-direction" />'),d.controls.directionEl.append(d.controls.prev).append(d.controls.next),d.controls.el.addClass("bx-has-controls-direction").append(d.controls.directionEl))},E=function(){d.controls.start=V('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+d.settings.startText+"</a></div>"),d.controls.stop=V('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+d.settings.stopText+"</a></div>"),d.controls.autoEl=V('<div class="bx-controls-auto" />'),d.controls.autoEl.on("click",".bx-start",z),d.controls.autoEl.on("click",".bx-stop",I),d.settings.autoControlsCombine?d.controls.autoEl.append(d.controls.start):d.controls.autoEl.append(d.controls.start).append(d.controls.stop),d.settings.autoControlsSelector?V(d.settings.autoControlsSelector).html(d.controls.autoEl):d.controls.el.addClass("bx-has-controls-auto").append(d.controls.autoEl),W(d.settings.autoStart?"stop":"start")},M=function(){d.children.each(function(t){var e=V(this).find("img:first").attr("title");null!=e&&(""+e).length&&V(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},P=function(t){c.goToNextSlide(),t.preventDefault()},y=function(t){c.goToPrevSlide(),t.preventDefault()},z=function(t){c.startAuto(),t.preventDefault()},I=function(t){c.stopAuto(),t.preventDefault()},k=function(t){var e=V(t.currentTarget);if(void 0!==e.attr("data-slide-index")){var i=parseInt(e.attr("data-slide-index"));i!=d.active.index&&c.goToSlide(i),t.preventDefault()}},q=function(i){var t=d.children.length;if("short"==d.settings.pagerType)return 1<d.settings.maxSlides&&(t=Math.ceil(d.children.length/d.settings.maxSlides)),void d.pagerEl.html(i+1+d.settings.pagerShortSeparator+t);d.pagerEl.find("a").removeClass("active"),d.pagerEl.each(function(t,e){V(e).find("a").eq(i).addClass("active")})},D=function(){if(d.settings.infiniteLoop){var t="";0==d.active.index?t=d.children.eq(0).position():d.active.index==m()-1&&d.carousel?t=d.children.eq((m()-1)*S()).position():d.active.index==d.children.length-1&&(t=d.children.eq(d.children.length-1).position()),t&&("horizontal"==d.settings.mode?b(-t.left,"reset",0):"vertical"==d.settings.mode&&b(-t.top,"reset",0))}d.working=!1,d.settings.onSlideAfter(d.children.eq(d.active.index),d.oldIndex,d.active.index)},W=function(t){d.settings.autoControlsCombine?d.controls.autoEl.html(d.controls[t]):(d.controls.autoEl.find("a").removeClass("active"),d.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},H=function(){1==m()?(d.controls.prev.addClass("disabled"),d.controls.next.addClass("disabled")):!d.settings.infiniteLoop&&d.settings.hideControlOnEnd&&(0==d.active.index?(d.controls.prev.addClass("disabled"),d.controls.next.removeClass("disabled")):d.active.index==m()-1?(d.controls.next.addClass("disabled"),d.controls.prev.removeClass("disabled")):(d.controls.prev.removeClass("disabled"),d.controls.next.removeClass("disabled")))},A=function(){if(0<d.settings.autoDelay)setTimeout(c.startAuto,d.settings.autoDelay);else c.startAuto();d.settings.autoHover&&c.hover(function(){d.interval&&(c.stopAuto(!0),d.autoPaused=!0)},function(){d.autoPaused&&(c.startAuto(!0),d.autoPaused=null)})},L=function(){var t=0;if("next"==d.settings.autoDirection)c.append(d.children.clone().addClass("bx-clone"));else{c.prepend(d.children.clone().addClass("bx-clone"));var e=d.children.first().position();t="horizontal"==d.settings.mode?-e.left:-e.top}b(t,"reset",0),d.settings.pager=!1,d.settings.controls=!1,d.settings.autoControls=!1,d.settings.tickerHover&&!d.usingCSS&&d.viewport.hover(function(){c.stop()},function(){var e=0;d.children.each(function(t){e+="horizontal"==d.settings.mode?V(this).outerWidth(!0):V(this).outerHeight(!0)});var t=d.settings.speed/e,i="horizontal"==d.settings.mode?"left":"top",s=t*(e-Math.abs(parseInt(c.css(i))));F(s)}),F()},F=function(t){speed=t||d.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==d.settings.autoDirection?e=c.find(".bx-clone").first().position():i=d.children.first().position();var s="horizontal"==d.settings.mode?-e.left:-e.top,n="horizontal"==d.settings.mode?-i.left:-i.top;b(s,"ticker",speed,{resetValue:n})},_=function(){d.touch={start:{x:0,y:0},end:{x:0,y:0}},d.viewport.bind("touchstart",N)},N=function(t){if(d.working)t.preventDefault();else{d.touch.originalPos=c.position();var e=t.originalEvent;d.touch.start.x=e.changedTouches[0].pageX,d.touch.start.y=e.changedTouches[0].pageY,d.viewport.bind("touchmove",O),d.viewport.bind("touchend",X)}},O=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-d.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-d.touch.start.y);if(s<3*i&&d.settings.preventDefaultSwipeX?t.preventDefault():i<3*s&&d.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=d.settings.mode&&d.settings.oneToOneTouch){var n=0;if("horizontal"==d.settings.mode){var o=e.changedTouches[0].pageX-d.touch.start.x;n=d.touch.originalPos.left+o}else{o=e.changedTouches[0].pageY-d.touch.start.y;n=d.touch.originalPos.top+o}b(n,"reset",0)}},X=function(t){d.viewport.unbind("touchmove",O);var e=t.originalEvent,i=0;if(d.touch.end.x=e.changedTouches[0].pageX,d.touch.end.y=e.changedTouches[0].pageY,"fade"==d.settings.mode){(s=Math.abs(d.touch.start.x-d.touch.end.x))>=d.settings.swipeThreshold&&(d.touch.start.x>d.touch.end.x?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto())}else{var s=0;"horizontal"==d.settings.mode?(s=d.touch.end.x-d.touch.start.x,i=d.touch.originalPos.left):(s=d.touch.end.y-d.touch.start.y,i=d.touch.originalPos.top),!d.settings.infiniteLoop&&(0==d.active.index&&0<s||d.active.last&&s<0)?b(i,"reset",200):Math.abs(s)>=d.settings.swipeThreshold?(s<0?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto()):b(i,"reset",200)}d.viewport.unbind("touchend",X)},Y=function(t){if(d.initialized){d.working=!1;var e=V(window).width(),i=V(window).height();s==e&&o==i||(s=e,o=i,c.redrawSlider(),d.settings.onSliderResize.call(c,d.active.index),1<d.settings.df_inrows&&1==d.settings.df_descript&&g())}};return c.goToSlide=function(t,e){if(!d.working&&d.active.index!=t)if(d.working=!0,d.oldIndex=d.active.index,t<0?d.active.index=m()-1:t>=m()?d.active.index=0:d.active.index=t,d.settings.onSlideBefore(d.children.eq(d.active.index),d.oldIndex,d.active.index),"next"==e?d.settings.onSlideNext(d.children.eq(d.active.index),d.oldIndex,d.active.index):"prev"==e&&d.settings.onSlidePrev(d.children.eq(d.active.index),d.oldIndex,d.active.index),d.active.last=d.active.index>=m()-1,d.settings.pager&&q(d.active.index),d.settings.controls&&H(),"fade"==d.settings.mode)d.settings.adaptiveHeight&&d.viewport.height()!=v()&&d.viewport.animate({height:v()},d.settings.adaptiveHeightSpeed),d.children.filter(":visible").fadeOut(d.settings.speed).css({zIndex:0}),d.children.eq(d.active.index).css("zIndex",d.settings.slideZIndex+1).fadeIn(d.settings.speed,function(){V(this).css("zIndex",d.settings.slideZIndex),D()});else{d.settings.adaptiveHeight&&d.viewport.height()!=v()&&d.viewport.animate({height:v()},d.settings.adaptiveHeightSpeed);var i=0,s={left:0,top:0};if(!d.settings.infiniteLoop&&d.carousel&&d.active.last)if("horizontal"==d.settings.mode){s=(o=d.children.eq(d.children.length-1)).position(),i=d.viewport.width()-o.outerWidth()}else{var n=d.children.length-d.settings.minSlides;s=d.children.eq(n).position()}else if(d.carousel&&d.active.last&&"prev"==e){var o,r=1==d.settings.moveSlides?d.settings.maxSlides-S():(m()-1)*S()-(d.children.length-d.settings.maxSlides);s=(o=c.children(".bx-clone").eq(r)).position()}else if("next"==e&&0==d.active.index)s=c.find("> .bx-clone").eq(d.settings.maxSlides).position(),d.active.last=!1;else if(0<=t){var a=t*S();s=d.children.eq(a).position()}if(void 0!==s){var l="horizontal"==d.settings.mode?-(s.left-i):-s.top;b(l,"slide",d.settings.speed)}}},c.goToNextSlide=function(){if(d.settings.infiniteLoop||!d.active.last){var t=parseInt(d.active.index)+1;c.goToSlide(t,"next")}},c.goToPrevSlide=function(){if(d.settings.infiniteLoop||0!=d.active.index){var t=parseInt(d.active.index)-1;c.goToSlide(t,"prev")}},c.startAuto=function(t){d.interval||(d.interval=setInterval(function(){"next"==d.settings.autoDirection?c.goToNextSlide():c.goToPrevSlide()},d.settings.pause),d.settings.autoControls&&1!=t&&W("stop"))},c.stopAuto=function(t){d.interval&&(clearInterval(d.interval),d.interval=null,d.settings.autoControls&&1!=t&&W("start"))},c.getCurrentSlide=function(){return d.active.index},c.getCurrentSlideElement=function(){return d.children.eq(d.active.index)},c.getSlideCount=function(){return d.children.length},c.redrawSlider=function(){d.children.add(c.find(".bx-clone")).width(f()),d.viewport.css("height",v()),d.settings.ticker||w(),d.active.last&&(d.active.index=m()-1),d.active.index>=m()&&(d.active.last=!0),d.settings.pager&&!d.settings.pagerCustom&&(t(),q(d.active.index))},c.destroySlider=function(){d.initialized&&(d.initialized=!1,V(".bx-clone",this).remove(),d.children.each(function(){null!=V(this).data("origStyle")?V(this).attr("style",V(this).data("origStyle")):V(this).removeAttr("style")}),null!=V(this).data("origStyle")?this.attr("style",V(this).data("origStyle")):V(this).removeAttr("style"),V(this).unwrap().unwrap(),d.controls.el&&d.controls.el.remove(),d.controls.next&&d.controls.next.remove(),d.controls.prev&&d.controls.prev.remove(),d.pagerEl&&d.settings.controls&&d.pagerEl.remove(),V(".bx-caption",this).remove(),d.controls.autoEl&&d.controls.autoEl.remove(),clearInterval(d.interval),d.settings.responsive&&V(window).unbind("resize",Y))},c.reloadSlider=function(t){null!=t&&(e=t),c.destroySlider(),r()},r(),this}}($DF);
/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2015, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * Compressed by http://jscompress.com/
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.10
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */
/*
마지막 업데이트 : 2018-12-12
*/

!function(m){"use strict";var d={data:{index:0,name:"scrollbar"},macosx:/mac/i.test(navigator.platform),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};d.scrolls.add=function(l){this.remove(l).push(l)};var o={autoScrollSize:!0,autoUpdate:!0,debug:!(d.scrolls.remove=function(l){for(;0<=m.inArray(l,this);)this.splice(m.inArray(l,this),1);return this}),disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null},l=function(l){var e;d.scroll||(d.overlay=!((e=t(!0)).height||e.width),d.scroll=t(),a(),m(window).resize(function(){var l=!1;if(d.scroll&&(d.scroll.height||d.scroll.width)){var e=t();e.height===d.scroll.height&&e.width===d.scroll.width||(d.scroll=e,l=!0)}a(l)})),this.container=l,this.namespace=".scrollbar_"+d.data.index++,this.options=m.extend({},o,window.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(d.data.name,this),d.scrolls.add(this)};l.prototype={destroy:function(){if(this.wrapper){this.container.removeData(d.data.name),d.scrolls.remove(this);var l=this.container.scrollLeft(),e=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),this.wrapper.remove(),m(document).add("body").off(this.namespace),m.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(l){var p=this,u=this.container,r=this.containerWrapper||u,f=this.namespace,v=m.extend(this.options,l||{}),b={x:this.scrollx,y:this.scrolly},o=this.wrapper,e={scrollLeft:u.scrollLeft(),scrollTop:u.scrollTop()};if(d.mobile&&v.ignoreMobile||d.overlay&&v.ignoreOverlay||d.macosx&&!d.webkit)return!1;if(o)r.css({height:"auto","margin-bottom":-1*d.scroll.height+"px","margin-right":-1*d.scroll.width+"px","max-height":""});else{if(this.wrapper=o=m("<div>").addClass("scroll-wrapper").addClass(u.attr("class")).css("position","absolute"==u.css("position")?"absolute":"relative").insertBefore(u).append(u),u.is("textarea")&&(this.containerWrapper=r=m("<div>").insertBefore(u).append(u),o.addClass("scroll-textarea")),r.addClass("scroll-content").css({height:"auto","margin-bottom":-1*d.scroll.height+"px","margin-right":-1*d.scroll.width+"px","max-height":""}),u.on("scroll"+f,function(l){m.isFunction(v.onScroll)&&v.onScroll.call(p,{maxScroll:b.y.maxScrollOffset,scroll:u.scrollTop(),size:b.y.size,visible:b.y.visible},{maxScroll:b.x.maxScrollOffset,scroll:u.scrollLeft(),size:b.x.size,visible:b.x.visible}),b.x.isVisible&&b.x.scroll.bar.css("left",u.scrollLeft()*b.x.kx+"px"),b.y.isVisible&&b.y.scroll.bar.css("top",u.scrollTop()*b.y.kx+"px")}),o.on("scroll"+f,function(){o.scrollTop(0).scrollLeft(0)}),v.disableBodyScroll){var s=function(l){g(l)?b.y.isVisible&&b.y.mousewheel(l):b.x.isVisible&&b.x.mousewheel(l)};o.on("MozMousePixelScroll"+f,s),o.on("mousewheel"+f,s),d.mobile&&o.on("touchstart"+f,function(l){var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o=e.pageX,s=e.pageY,r=u.scrollLeft(),t=u.scrollTop();m(document).on("touchmove"+f,function(l){var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;u.scrollLeft(r+o-e.pageX),u.scrollTop(t+s-e.pageY),l.preventDefault()}),m(document).on("touchend"+f,function(){m(document).off(f)})})}m.isFunction(v.onInit)&&v.onInit.apply(this,[u])}m.each(b,function(r,t){var i=null,n=1,c="x"===r?"scrollLeft":"scrollTop",a=v.scrollStep,d=function(){var l=u[c]();u[c](l+a),1==n&&h<=l+a&&(l=u[c]()),-1==n&&l+a<=h&&(l=u[c]()),u[c]()==l&&i&&i()},h=0;t.scroll||(t.scroll=p._getScroll(v["scroll"+r]).addClass("scroll-"+r),v.showArrows&&t.scroll.addClass("scroll-element_arrows_visible"),t.mousewheel=function(l){if(!t.isVisible||"x"===r&&g(l))return!0;if("y"===r&&!g(l))return b.x.mousewheel(l),!0;var e=-1*l.originalEvent.wheelDelta||l.originalEvent.detail,o=t.size-t.visible-t.offset;return(0<e&&h<o||e<0&&0<h)&&((h+=e)<0&&(h=0),o<h&&(h=o),p.scrollTo=p.scrollTo||{},p.scrollTo[c]=h,setTimeout(function(){p.scrollTo&&(u.stop().animate(p.scrollTo,240,"linear",function(){h=u[c]()}),p.scrollTo=null)},1)),l.preventDefault(),!1},t.scroll.on("MozMousePixelScroll"+f,t.mousewheel).on("mousewheel"+f,t.mousewheel).on("mouseenter"+f,function(){h=u[c]()}),t.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+f,function(l){if(1!=l.which)return!0;n=1;var e={eventOffset:l["x"===r?"pageX":"pageY"],maxScrollValue:t.size-t.visible-t.offset,scrollbarOffset:t.scroll.bar.offset()["x"===r?"left":"top"],scrollbarSize:t.scroll.bar["x"===r?"outerWidth":"outerHeight"]()},o=0,s=0;return m(this).hasClass("scroll-arrow")?(n=m(this).hasClass("scroll-arrow_more")?1:-1,a=v.scrollStep*n,h=0<n?e.maxScrollValue:0):(n=e.scrollbarOffset+e.scrollbarSize<e.eventOffset?1:e.eventOffset<e.scrollbarOffset?-1:0,a=Math.round(.75*t.visible)*n,h=e.eventOffset-e.scrollbarOffset-(v.stepScrolling?1==n?e.scrollbarSize:0:Math.round(e.scrollbarSize/2)),h=u[c]()+h/t.kx),p.scrollTo=p.scrollTo||{},p.scrollTo[c]=v.stepScrolling?u[c]()+a:h,v.stepScrolling&&(i=function(){h=u[c](),clearInterval(s),clearTimeout(o),s=o=0},o=setTimeout(function(){s=setInterval(d,40)},v.duration+100)),setTimeout(function(){p.scrollTo&&(u.animate(p.scrollTo,v.duration),p.scrollTo=null)},1),p._handleMouseDown(i,l)}),t.scroll.bar.on("mousedown"+f,function(l){if(1!=l.which)return!0;var o=l["x"===r?"pageX":"pageY"],s=u[c]();return t.scroll.addClass("scroll-draggable"),m(document).on("mousemove"+f,function(l){var e=parseInt((l["x"===r?"pageX":"pageY"]-o)/t.kx,10);u[c](s+e)}),p._handleMouseDown(function(){t.scroll.removeClass("scroll-draggable"),h=u[c]()},l)}))}),m.each(b,function(l,e){var o="scroll-scroll"+l+"_visible",s="x"==l?b.y:b.x;e.scroll.removeClass(o),s.scroll.removeClass(o),r.removeClass(o)}),m.each(b,function(l,e){m.extend(e,"x"==l?{offset:parseInt(u.css("left"),10)||0,size:u.prop("scrollWidth"),visible:o.width()}:{offset:parseInt(u.css("top"),10)||0,size:u.prop("scrollHeight"),visible:o.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),m.isFunction(v.onUpdate)&&v.onUpdate.apply(this,[u]),m.each(b,function(l,e){var o="x"===l?"left":"top",s="x"===l?"outerWidth":"outerHeight",r="x"===l?"width":"height",t=parseInt(u.css(o),10)||0,i=e.size,n=e.visible+t,c=e.scroll.size[s]()+(parseInt(e.scroll.size.css(o),10)||0);v.autoScrollSize&&(e.scrollbarSize=parseInt(c*n/i,10),e.scroll.bar.css(r,e.scrollbarSize+"px")),e.scrollbarSize=e.scroll.bar[s](),e.kx=(c-e.scrollbarSize)/(i-n)||1,e.maxScrollOffset=i-n}),u.scrollLeft(e.scrollLeft).scrollTop(e.scrollTop).trigger("scroll")},_getScroll:function(l){var e={advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")};return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?m(l).appendTo(this.wrapper):m(l),m.extend(l,{bar:l.find(".scroll-bar"),size:l.find(".scroll-element_size"),track:l.find(".scroll-element_track")}),l},_handleMouseDown:function(l,e){var o=this.namespace;return m(document).on("blur"+o,function(){m(document).add("body").off(o),l&&l()}),m(document).on("dragstart"+o,function(l){return l.preventDefault(),!1}),m(document).on("mouseup"+o,function(){m(document).add("body").off(o),l&&l()}),m("body").on("selectstart"+o,function(l){return l.preventDefault(),!1}),e&&e.preventDefault(),!1},_updateScroll:function(l,e){var o=this.container,s=this.containerWrapper||o,r="scroll-scroll"+l+"_visible",t="x"===l?this.scrolly:this.scrollx,i=parseInt(this.container.css("x"===l?"left":"top"),10)||0,n=this.wrapper,c=e.size,a=e.visible+i;e.isVisible=1<c-a,e.isVisible?(e.scroll.addClass(r),t.scroll.addClass(r),s.addClass(r)):(e.scroll.removeClass(r),t.scroll.removeClass(r),s.removeClass(r)),"y"===l&&0<c&&(o.is("textarea")||c<a?s.css({height:a+d.scroll.height+"px","max-height":"none"}):s.css({"max-height":a+d.scroll.height+"px"})),e.size==o.prop("scrollWidth")&&t.size==o.prop("scrollHeight")&&e.visible==n.width()&&t.visible==n.height()&&e.offset==(parseInt(o.css("left"),10)||0)&&t.offset==(parseInt(o.css("top"),10)||0)||(m.extend(this.scrollx,{offset:parseInt(o.css("left"),10)||0,size:o.prop("scrollWidth"),visible:n.width()}),m.extend(this.scrolly,{offset:parseInt(o.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:n.height()}),this._updateScroll("x"===l?"y":"x",t))}};var r=l;m.fn.scrollbar=function(o,s){return"string"!=typeof o&&(s=o,o="init"),void 0===s&&(s=[]),m.isArray(s)||(s=[s]),this.not("body, .scroll-wrapper").each(function(){var l=m(this),e=l.data(d.data.name);(e||"init"===o)&&(e||(e=new r(l)),e[o]&&e[o].apply(e,s))}),this},m.fn.scrollbar.options=o;var c,s,a=(c=0,function(l){var e,o,s,r,t,i,n;for(e=0;e<d.scrolls.length;e++)o=(r=d.scrolls[e]).container,s=r.options,t=r.wrapper,i=r.scrollx,n=r.scrolly,(l||s.autoUpdate&&t&&t.is(":visible")&&(o.prop("scrollWidth")!=i.size||o.prop("scrollHeight")!=n.size||t.width()!=i.visible||t.height()!=n.visible))&&(r.init(),s.debug&&window.console&&console.log({scrollHeight:o.prop("scrollHeight")+":"+r.scrolly.size,scrollWidth:o.prop("scrollWidth")+":"+r.scrollx.size,visibleHeight:t.height()+":"+r.scrolly.visible,visibleWidth:t.width()+":"+r.scrollx.visible},!0));clearTimeout(c),c=setTimeout(a,300)});function t(l){if(d.webkit&&!l)return{height:0,width:0};if(!d.data.outer){var e={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};d.data.inner=m("<div>").css(m.extend({},e)),d.data.outer=m("<div>").css(m.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},e)).append(d.data.inner).appendTo("body")}return d.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(d.data.outer.offset().top-d.data.inner.offset().top||0),width:Math.ceil(d.data.outer.offset().left-d.data.inner.offset().left||0)}}function g(l){var e=l.originalEvent;return(!e.axis||e.axis!==e.HORIZONTAL_AXIS)&&!e.wheelDeltaX}window.angular&&(s=window.angular).module("jQueryScrollbar",[]).provider("jQueryScrollbar",function(){var e=o;return{setOptions:function(l){s.extend(e,l)},$get:function(){return{options:s.copy(e)}}}}).directive("jqueryScrollbar",["jQueryScrollbar","$parse",function(r,t){return{restrict:"AC",link:function(l,e,o){var s=t(o.jqueryScrollbar)(l);e.scrollbar(s||r.options).on("$destroy",function(){e.scrollbar("destroy")})}}}])}($DF);
/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2018-03-19
*/

(function($){
	$(document).ready(function(){

		var $list=$(".df-list-product").find(".box");$list.length>0&&("off"!=DF["set-discountrate"]&&($discountratelist=$list.find(".discountrate"),$discountratelist.each(function(){var t=$(this),e=t.children(".rate"),a=t.children(".df-data-sale");a.children("").length>0&&a.children("").remove();var i=parseInt(t.attr("df-data-custom").replace(/[^-\.0-9]/g,"")),s=parseInt(t.attr("df-data-price").replace(/[^-\.0-9]/g,"")),r=parseInt(a.text().split(" ")[0].replace(/[^-\.0-9]/g,""));a.text().length>0&&!r&&(r=parseInt(a.text().split(" ")[1].replace(/[^-\.0-9]/g,"")));var n=0,o=0;i>0&&r>0?(n=i,o=r):s>0&&r>0?(n=s,o=r):i>0&&s>0&&(n=i,o=s),rate=parseInt(100-o/n*100),rate>0?(e.text(rate),"fix"==DF["set-discountrate"]&&t.css({opacity:"1",top:"-2px"})):t.addClass("displaynone").hide()})),$list.on({mouseenter:function(){var t=$(this);(t.addClass("on"),"on"==DF["set-discountrate"])&&t.find(".discountrate").stop().animate({opacity:"1",top:"-2"},250,"easeOutCirc");if("on"==DF["set-prdrollover"]){var e=t.find(".thumbnail").children("a"),a=e.attr("df-data-rolloverimg1"),i=e.attr("df-data-rolloverimg2");if(a.length>0&&i.length>0){var s=e.children(".thumb");1==s.length&&(s.clone().prependTo(e).addClass("overimg").attr("src",i),s=e.children(".thumb")),s.eq(0).stop().fadeIn(130,"easeOutCirc"),s.eq(1).stop().animate({opacity:0},130,"easeOutCirc")}}var r=t.find(".likeButton");r.length>0&&0==r.hasClass("selected")&&r.stop().animate({opacity:"1",bottom:"9"},250,"easeOutCirc");var n=t.find(".status").children(".button");n.length>0&&n.children().each(function(t){$(this).stop(!0,!1).delay(30*t).animate({opacity:"1"},250,"easeOutCirc")})},mouseleave:function(){var t=$(this);if(t.removeClass("on"),"on"==DF["set-discountrate"]){var e=t.find(".discountrate");0==e.hasClass("displaynone")&&e.stop().animate({opacity:"0",top:"-10"},250,"easeInCirc")}if("on"==DF["set-prdrollover"]){var a=t.find(".thumb");a.length>1&&(a.eq(0).stop().fadeOut(130,"easeInCirc"),a.eq(1).stop().animate({opacity:1},130,"easeOutCirc"))}var i=t.find(".likeButton");i.length>0&&0==i.hasClass("selected")&&i.stop().animate({opacity:"0",bottom:"-10"},250,"easeInCirc");var s=t.find(".status").children(".button");s.length>0&&(s.children().each(function(t){$(this).stop(!0,!1).delay(30*t).animate({opacity:"0"},250,"easeInCirc")}),t.find(".option .prdOption").hide())}}));var $detail=$("#df-product-detail");if($detail.length>0&&"off"!=DF["set-discountrate"]){var custom=parseInt($detail.attr("df-data-custom").replace(/[^-\.0-9]/g,"")),price=parseInt($detail.attr("df-data-price").replace(/[^-\.0-9]/g,"")),sale=parseInt($detail.attr("df-data-sale").split(" ")[0].replace(/[^-\.0-9]/g,"")),a=0,b=0;custom>0&&sale>0?(a=custom,b=sale):price>0&&sale>0?(a=price,b=sale):custom>0&&price>0&&(a=custom,b=price),rate=parseInt(100-b/a*100),rate>0&&$('<div class="discountrate"><span class="rate">'+rate+"</span>% OFF</div>").prependTo($detail.find(".infoArea-wrap .infoArea .product_price_css .df-custom-add"))}

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

마지막 업데이트 : 2018-02-14
*/


(function($){

	$.dfdivbanner=function(n,e){var t,i,a,r,s,f={object:null,classname:"df-divbanner",start:1,position:"after",initBefore:function(){return!0},initAfter:function(){return!0}},o=this,d=$(n);o.init=function(){if(t=o.settings=$.extend({},f,e),"undefined"!=typeof setSize){if(t.initBefore.call(o,d),null==t.object)return!1;if(i=t.object,(a=i.length)<=0)return d.addClass(t.classname).show(),!1;if(r=d.find("li").detach(),(s=r.length)<=0)return!1;var n=parseInt(t.start)<=0?1:parseInt(t.start);n>a&&(n=a);var l=a-n;"before"==t.position&&(l=a-n+1);var u=s-l;u<0&&(l=s,u=0);var c=0;if(l>0)for(var b=0;b<l;b++)"before"==t.position?i.eq(b+(n-1)).before('<ul class="'+t.classname+'">'+r.eq(c)[0].outerHTML+"</ul>"):i.eq(b+(n-1)).after('<ul class="'+t.classname+'">'+r.eq(c)[0].outerHTML+"</ul>"),c++;if(u>0){html='<ul class="'+t.classname+'">';for(b=0;b<u;b++)html+=r.eq(c)[0].outerHTML,c++;html+="</ul>",i.eq(a-1).after(html)}t.initAfter.call(o,d)}},o.init()},$.fn.dfdivbanner=function(n){return this.each(function(){if("undefined"!=typeof setSize){var e=$(this),t=e.data("dfdivbanner");return t?t.methods[n]?t.methods[n].apply(this,Array.prototype.slice.call(arguments,1)):void 0:(t=new $.dfdivbanner(this,n),e.data("dfdivbanner",t),t)}})},$divbanner=$("#df-divbanner"),$(document).ready(function(){$divbanner.find(".banner_image").length>0&&$divbanner.dfdivbanner({object:$(".xans-product-listmain"),classname:"df-divbanner",start:1,position:DF["set-divbanner-position"]})});

})($DF);

(function($){
	$(document).ready(function(){


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

마지막 업데이트 : 2018-01-05
*/

(function($){
	$(document).ready(function(){
		$("#wrap.main").each(function(){var e=$(this).find(".df-topbanner");1!=$.cookie("topbanner")?e.find(".banner_image").length<=0?e.remove():(e.css("height",0).show(),e.find(".topbanner").bxSlider({responsive:!1,adaptiveHeight:!0,mode:"vertical",easing:"easeinout",auto:!0,autoHover:!0,speed:350,pause:4500,prevText:'<img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_topbanner_prev.png" style="width:20px; height:30px">',nextText:'<img src="http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_topbanner_next.png" style="width:20px; height:30px">',onSliderLoad:function(){1==e.find(".bx-pager-item").length&&e.find(".bx-controls").hide();var t=e.find(".bx-viewport").height();e.animate({"margin-top":-t,height:t},0,"easeinout",function(){$(this).css({opacity:"1",visibility:"visible"}).animate({"margin-top":0},350,"easeinout")}),e.find(".topbannerbtn .check").on("click",function(){$(this).toggleClass("selected"),1==$(this).hasClass("selected")?$(this).find(".checkbox img").stop(!0,!1).fadeIn(200):$(this).find(".checkbox img").stop(!0,!1).fadeOut(200)}),e.find(".topbannerbtn .check").on({mouseenter:function(){$(this).find(".msg").stop(!0,!1).animate({width:120},250,"easeInCubic",function(){$(this).find("i").stop(!0,!1).fadeIn(100)})},mouseleave:function(){$(this).find(".msg i").stop(!0,!1).fadeOut(100,function(){$(this).parent(".msg").stop(!0,!1).animate({width:0},250,"easeOutCubic")})}}),e.find(".topbannerbtn .close").on("click",function(){if(1==e.find(".topbannerbtn .check").hasClass("selected")){var t=new Date;t.setDate(t.getDate()+1),$.cookie("topbanner",1,{expires:t,path:"/"})}e.animate({"margin-top":-e.height()},350,"easeinout",function(){e.remove()})})}})):e.remove()});
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
$(document).ready(function(){
    if (typeof(EC_SHOP_MULTISHOP_SHIPPING) != "undefined") {
        var sShippingCountryCode4Cookie = 'shippingCountryCode';
        var bShippingCountryProc = false;
          
        // 배송국가 선택 설정이 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false) {
            $('.xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist').hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptioncountry').hide();
        } else {
            $('.globalThumb .xans-layout-multishoplistitem').hide();
            var aShippingCountryCode = document.cookie.match('(^|;) ?'+sShippingCountryCode4Cookie+'=([^;]*)(;|$)');
            if (typeof(aShippingCountryCode) != 'undefined' && aShippingCountryCode != null && aShippingCountryCode.length > 2) {
                var sShippingCountryValue = aShippingCountryCode[2];
            }
          
            // query string으로 넘어 온 배송국가 값이 있다면, 그 값을 적용함
            var aHrefCountryValue = decodeURIComponent(location.href).split("/?country=");
          
            if (aHrefCountryValue.length == 2) {
                var sShippingCountryValue = aHrefCountryValue[1];
            }
      
            if (typeof(sShippingCountryValue) != "undefined" && sShippingCountryValue != "" && sShippingCountryValue != null) {
                sShippingCountryValue = sShippingCountryValue.split("#")[0];
                var bShippingCountryProc = true;
              
                $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
                $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(" : "+$(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected").text().split("SHIPPING TO : ").join(""));
                var expires = new Date();
                expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30일간 쿠키 유지
                document.cookie = sShippingCountryCode4Cookie+'=' + $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +';path=/'+ ';expires=' + expires.toUTCString();
                if ($("#f_country").length > 0 && location.href.indexOf("orderform.html") > -1) {
                $("#f_country").val(sShippingCountryValue);
                }
            }
        }
        // 언어선택 설정이 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingLanguageSelection === false) {
            $('.xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist').hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptionlanguage').hide();
        } else {
            $('.globalThumb .xans-layout-multishoplistitem').hide();
        }
       
        // 배송국가 및 언어 설정이 둘 다 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShipping === false) {
            $(".xans-layout-multishopshipping").hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption').hide();
        } else if (bShippingCountryProc === false && location.href.split("/").length == 4) { // 배송국가 값을 처리한 적이 없고, 메인화면일 때만 선택 레이어를 띄움
            var sShippingCountryValue = $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val();
            $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
            $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(" : "+$(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected").text().split("SHIPPING TO : ").join(""));
            // 배송국가 선택을 사용해야 레이어를 보이게 함
            if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === true) {
                $(".xans-layout-multishopshipping").show();
            }
        }
            
        $(".xans-layout-multishopshipping .btnClose").bind("click", function() {
            $(".xans-layout-multishopshipping").hide();
        });
            
        $(".xans-layout-multishopshipping .btnArea a").bind("click", function() {
            var expires = new Date();
            expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30일간 쿠키 유지
            document.cookie = sShippingCountryCode4Cookie+'=' + $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +';path=/'+ ';expires=' + expires.toUTCString();
            
            // 도메인 문제로 쿠키로 배송국가 설정이 안 되는 경우를 위해 query string으로 배송국가 값을 넘김
            var sQuerySting = (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false) ? "" : "/?country="+encodeURIComponent($(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val());
          
            location.href = 'http://'+$(".xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist").val()+sQuerySting;
        });
        $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a").bind("click", function() {
            $(".xans-layout-multishopshipping").show();
        });
    }
});
/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2018-11-30
*/



// 슬라이드 시작 순서
DF['set-mainslider-startSlide'] = "0";

// 슬라이드 이전버튼
DF['set-mainslider-prev'] = "<img src='/web/upload/dfloor_base/web/button/btn_wideslider_prev.png' style='width:20px; height:30px'>";
// 슬라이드 다음버튼
DF['set-mainslider-next'] = "<img src='/web/upload/dfloor_base/web/button/btn_wideslider_next.png' style='width:20px; height:30px'>";
// 슬라이드 활성화시 자동재생 설정 (on, off)
DF['set-mainsliderYt-autoplay'] = "on";
// 자동재생 버튼 사용여부 (on, off)
DF['set-mainsliderYt-autoplay-icon'] = "on";

// 볼륨 버튼 사용여부 (on, off)
DF['set-mainsliderYt-volume-icon'] = "on";
// 볼륨 최대값 (0 ~ 100)
DF['set-mainsliderYt-volume-max'] = "30";

//슬라이드 표시 위치
//입력값: top    (슬라이드배너가 사이트의 최상단에서 부터 시작됩니다.)
//입력값: normal (슬라이드배너가 상품분류메뉴 아래에서 시작됩니다.)
//DF['set-mainslider-position'] = "top";

//슬라이드 페이징 버튼 디자인설정하기
//입력값: circle (페이징 버튼이 둥근모양으로 표시됩니다.)
//입력값: stick  (페이징 버튼이 막대모양으로 표시됩니다.)
//입력값: timer  (페이징 버튼이 막대모양+타이머로 표시됩니다.)
//입력값: text   (페이징 버튼에 텍스트가 표시되고 타이머가 작동됩니다.)
//DF['set-mainslider-pager'] = "text";

//슬라이드 동영상사용시 볼륨 최초 설정, 사용시 볼륨 최대값으로 설정 (on, off)
//입력값: on  (영상재생시 소리가 출력됩니다.)
//입력값: off (영상재생시 음소거가 됩니다.)
//DF['set-mainsliderYt-volume'] = "off";



var $mainslider=$DF("#visual-main").find(".df-wideslider");if(0<$mainslider.length){var mainslider,$mainsliderUl=$mainslider.children(".wideslider"),$ytIframe=[],ytChk=!1,ytLoadCnt=0,ytCnt=0,ytAutoPlay="on"===DF["set-mainsliderYt-autoplay"],ytAutoPlayIcon="on"===DF["set-mainsliderYt-autoplay-icon"],ytVolume="on"===DF["set-mainsliderYt-volume"],ytVolumeIcon="on"===DF["set-mainsliderYt-volume-icon"],ytVolumeMax=parseInt(DF["set-mainsliderYt-volume-max"]?DF["set-mainsliderYt-volume-max"]:0),player=[],startIndex=parseInt(DF["set-mainslider-startSlide"]?DF["set-mainslider-startSlide"]:0),currentIndex=0,beforeIndex=0,pagerType=DF["set-mainslider-pager"]?DF["set-mainslider-pager"]:"stick",timerChk="timer"===pagerType||"text"===pagerType,$mainsliderImg=$mainsliderUl.find(".banner_image"),len=$mainsliderImg.length;if("top"==DF["set-mainslider-position"]){var $header=$("#header").addClass("visual-top");if(0<len){var headerHeight=$header.height();$mainslider.css({"margin-top":"-"+headerHeight+"px"}),$mainslider.find(".bx-prev").css("margin-top",headerHeight/2+"px")}}if($mainsliderImg.each(function(e){var a=this.alt;if(0<=a.indexOf(".youtube")){var t=$(this).parent(),r=$(a);$ytIframe[e]=r.filter("iframe");var n=r.filter("span");t.attr("alt",n.text()).empty().append('<div id="yt'+e+'" style="width:160%;margin-left:-30%;height:'+$ytIframe[e].attr("height")+'px"></div>').parent().append('<div class="ytl"></div>'),ytCnt++}}),0<$ytIframe.length){var s=document.createElement("script");s.src="//www.youtube.com/iframe_api";var before=document.getElementsByTagName("script")[0];function onYouTubeIframeAPIReady(){for(var e in $ytIframe){var a=parseInt(df_getParam($ytIframe[e].attr("src")).start);0<a&&$pagerLi.eq(e).attr("data-yt-seek",a),player[e]=new YT.Player("yt"+e,{videoId:$ytIframe[e].attr("src").split("/").slice(-1)[0].split("?")[0],height:$ytIframe[e].attr("height"),playerVars:{cc_load_policy:0,controls:0,modestbranding:0,rel:0,showinfo:0,autoplay:0,start:a},events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}})}}function onPlayerReady(e){e.target.a.title="",e.target.setVolume(ytVolume?ytVolumeMax:0),ytAutoPlay&&startIndex==currentIndex&&void 0!==player[currentIndex]&&e.target.a.id==player[currentIndex].a.id&&player[currentIndex].playVideo(),++ytLoadCnt==ytCnt&&ytChk&&1<len&&bxPager.act("start")}function onPlayerStateChange(e){switch(e.data){case YT.PlayerState.BUFFERING:1<len&&bxPager.act("BUFFERING");break;case YT.PlayerState.PLAYING:1<len&&bxPager.act("PLAYING");break;case YT.PlayerState.ENDED:1<len&&bxPager.act("ENDED");break;case YT.PlayerState.PAUSED:1<len&&bxPager.act("PAUSED");break;case YT.PlayerState.CUED:1<len&&bxPager.act("CUED");break;case YT.PlayerState.UNSTARTED:}}before.parentNode.insertBefore(s,before)}if(pagerType)var $pager,$pagerLi,bxPager={init:function(){if($pager.children().length<=1)$pager.hide();else{for(var e in $ytIframe)$pagerLi.eq(e).addClass("yt"+(ytAutoPlay?" ytAutoPlay":"")+(ytVolume?" ytVolume":""));if($pager.addClass(pagerType),"stick"==pagerType||"circle"==pagerType)$pagerLi.children("a").append('<span class="bar"></span>');else if("timer"==pagerType)$pagerLi.children("a").append('<span class="bar"></span><span class="timer"></span>');else if("text"==pagerType){for(var a=$mainslider.find(".bx-viewport").find("li").not(".bx-clone").children("a"),t=0,r=a.length;t<r;t++){var n=$pagerLi.eq(t);n.hasClass("yt")?n.prepend((ytAutoPlayIcon?'<span class="btn-play"><i class="fa '+(ytAutoPlay?"fa-pause-circle":"fa-play-circle")+'" aria-hidden="true"></i></span>':"")+(ytVolumeIcon?'<span class="btn-volume"><i class="fa '+(ytVolume?"fa-volume-up":"fa-volume-off")+'" aria-hidden="true"></i></span>':"")).children("a").text("").append('<span class="bar"></span><span class="timer"></span><span class="text"></span>').children(".text").text(a.eq(t).attr("alt")):n.children("a").text("").append('<span class="bar"></span><span class="timer"></span><span class="text"></span>').children(".text").text(a.eq(t).children("").attr("alt"))}0<ytCnt&&(ytAutoPlayIcon&&$pagerLi.find(".btn-play").on("click",function(e){var a=$(this).parents(".bx-pager-item");bxPager.playIcon(a,"click"),e.preventDefault()}),ytVolumeIcon&&$pagerLi.find(".btn-volume").on("click",function(e){var a=$(this).parents(".bx-pager-item");bxPager.volumeIcon(a,"click"),e.preventDefault()}))}0<ytCnt&&$mainsliderUl.find(".ytl").on("click",function(e){bxPager.setYtl()}),$mainslider.find(".bx-wrapper").on({mouseenter:function(){bxPager.act("mouseenter")},mouseleave:function(){bxPager.act("mouseleave")}})}},act:function(e){var a=$pagerLi.eq(currentIndex),t=a.hasClass("yt");if(void 0!==mainslider){if(ytLoadCnt!=ytCnt&&t)return bxPager.stopAuto(),void(ytChk=!0);var r,n,i,s,l=$pagerLi.eq(beforeIndex),o=l.hasClass("yt"),d=parseInt(DF["set-mainslider-pause"]);t&&(n=(r=player[currentIndex]).getPlayerState(),d=1e3*parseInt(player[currentIndex].getDuration()-player[currentIndex].getCurrentTime())),o&&(s=(i=player[beforeIndex]).getPlayerState()),"start"==e?(t?a.hasClass("ytAutoPlay")?n==YT.PlayerState.PAUSED?"text"==pagerType?r.playVideo():a.hasClass("autoPause")&&r.playVideo():(r.seekTo(parseInt(a.attr("data-yt-seek"))),r.playVideo()):bxPager.startAuto():(timerChk&&bxPager.startPager(a.find(".timer"),d),bxPager.startAuto()),0==a.children().hasClass("active")&&(timerChk&&bxPager.stopPager(a.siblings().not(".yt").find(".timer")),a.children().addClass("active").parent().siblings().children().removeClass("active"))):"stop"==e?(o&&(s==YT.PlayerState.PLAYING?(i.pauseVideo(),l.addClass("autoPause"),timerChk&&bxPager.pausePager(l.find(".timer"))):l.removeClass("autoPause")),bxPager.stopAuto(),timerChk&&bxPager.stopPager($pagerLi.not(".yt").find(".timer"))):"mouseenter"==e?(t||timerChk&&bxPager.stopPager(a.find(".timer")),bxPager.stopAuto()):"mouseleave"==e?t?n!=YT.PlayerState.PLAYING&&bxPager.startAuto():(timerChk&&bxPager.startPager(a.find(".timer"),d),bxPager.startAuto()):"BUFFERING"==e?bxPager.stopAuto():"PLAYING"==e?(timerChk&&bxPager.startPager(a.find(".timer"),d),bxPager.stopAuto(),ytAutoPlayIcon&&bxPager.playIcon(a,"PLAYING")):"ENDED"==e?(timerChk&&bxPager.stopPager(a.find(".timer")),mainslider.goToNextSlide()):"PAUSED"==e?(bxPager.startAuto(),timerChk&&bxPager.pausePager(a.find(".timer")),ytAutoPlayIcon&&bxPager.playIcon(a,"PAUSED")):"CUED"==e&&a.hasClass("ytAutoPlay")&&(r.seekTo(parseInt(a.attr("data-yt-seek"))),r.playVideo())}},startAuto:function(){mainslider.startAuto()},stopAuto:function(){mainslider.stopAuto()},startPager:function(e,a){e.stop().animate({width:"100%"},a,"linear")},stopPager:function(e){e.stop().css("width",0)},pausePager:function(e){e.clearQueue().stop()},playIcon:function(e,a){var t=e.index(),r=e.hasClass("ytAutoPlay");"click"==a?(e.toggleClass("ytAutoPlay"),r?(e.find(".btn-play").children().removeClass("fa-pause-circle").addClass("fa-play-circle"),t==currentIndex&&player[t].pauseVideo()):(e.find(".btn-play").children().removeClass("fa-play-circle").addClass("fa-pause-circle"),t==currentIndex&&player[t].playVideo())):"setYtl"==a&&(e.removeClass("autoPause"),e.toggleClass("ytAutoPlay"),r?e.find(".btn-play").children().removeClass("fa-pause-circle").addClass("fa-play-circle"):e.find(".btn-play").children().removeClass("fa-play-circle").addClass("fa-pause-circle"))},volumeIcon:function(e){var a=e.index();e.toggleClass("ytVolume"),e.hasClass("ytVolume")?(e.find(".btn-volume").children().removeClass("fa-volume-off").addClass("fa-volume-up"),player[a].setVolume(ytVolumeMax)):(e.find(".btn-volume").children().removeClass("fa-volume-up").addClass("fa-volume-off"),player[a].setVolume(0))},setYtl:function(){null!=player[currentIndex]&&ytLoadCnt==ytCnt&&(ytAutoPlayIcon&&bxPager.playIcon($pagerLi.eq(currentIndex),"setYtl"),player[currentIndex].getPlayerState()==YT.PlayerState.PLAYING?player[currentIndex].pauseVideo():(player[currentIndex].getPlayerState()!=YT.PlayerState.PAUSED&&player[currentIndex].seekTo(parseInt($pagerLi.eq(currentIndex).attr("data-yt-seek"))),player[currentIndex].playVideo()))}};if(1<len){function onSliderLoad(e){beforeIndex=currentIndex=e,pagerType&&($pager=$mainslider.find(".bx-pager"),$pagerLi=$pager.children(),bxPager.init(),bxPager.act("start")),"top"==DF["set-mainslider-position"]&&$mainslider.find(".bx-controls-direction").children("a").css("margin-top","+="+headerHeight/2+"px"),$mainslider.css({opacity:"1",visibility:"visible"})}function onSlideBefore(e,a,t){currentIndex=t,beforeIndex=a,pagerType&&bxPager.act("stop")}function onSlideAfter(e,a,t){currentIndex=t,beforeIndex=a,pagerType&&bxPager.act("start")}mainslider=$mainsliderUl.bxSlider({mode:"fade",responsive:!1,adaptiveHeight:!0,easing:"easeinout",auto:!0,autoHover:!0,startSlide:startIndex,speed:parseInt(DF["set-mainslider-speed"]),pause:parseInt(DF["set-mainslider-pause"]),prevText:DF["set-mainslider-prev"],nextText:DF["set-mainslider-next"],onSliderLoad:onSliderLoad,onSlideBefore:onSlideBefore,onSlideAfter:onSlideAfter}),pagerType&&(null!=$pager||($pager=$mainslider.find(".bx-pager"),$pagerLi=$pager.children(),bxPager.init()),bxPager.act("start"))}else $mainslider.css({opacity:"1",visibility:"visible"})}
/*
디자인플로어 라이선스 안내
대표전화: 1544-4941
홈페이지: http://www.dfloor.co.kr
특허청등록(출원)번호: 제 41-0349937호(41-2015-0030498호)

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

본 소스는 디자인플로어가 생산한 결과물로 무단 변경,도용,복제,재배포등 저작권 침해시 민형사상 처벌을 받게 되고 합의는 없습니다.

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

마지막 업데이트 : 2017-10-28
*/

(function($){

	$.dfmainlist=function(e,i){var t,o,n,s,a,d={responsive:!0,axis:"y",classes:{findList:".xans-product-listmain",moveList:"#df-movelist"},scrollSpeed:600,scrollEase:"easeInOutQuart",scrollMarginTop:120,autoHide:!0,autoHideType:"fade",autoHideDelay:3e3,autoHideSpeed:200,moveBox:{use:!0,marginLeft:4,marginTop:0,speed:200,ease:"easeInOutQuart"},initBefore:function(){return!0},initAfter:function(){return!0}},u=this,l=$(e),f=0,c=[],r=[],m=0,p=0,v=0,h=[],x=!1,H=null;u.init=function(){t=u.settings=$.extend({},d,i),"undefined"!=typeof setSize&&(t.initBefore.call(u,l),o=l.find(t.classes.findList),(n=l.find(t.classes.moveList)).addClass("axis-"+t.axis),h.push("<ul>"),o.each(function(){var e=$(this),i='<a href="#none">'+e.find("h2").html()+"</a>";""==e.find("h2").text()&&(i=e.find(".imgtitle")[0].outerHTML),h.push("<li>"+i+"</li>")}),h.push("</ul>"),1==t.moveBox.use&&h.push('<div class="movebox"></div>'),n.find("div").append(h.join("")),s=n.find("li"),v=s.length,u.getPosition(),1==t.responsive&&$(window).on("resize",function(){u.getPosition()}),1==t.autoHide?u.autoHide():n.show(),$(document).on("scroll",function(){u.scrollAct()}),n.find("li").on("click",function(){var e=$(this);u.getPosition(),$("html, body").stop().animate({scrollTop:c[e.index()]-t.scrollMarginTop},t.scrollSpeed,t.scrollEase)}),n.find("a").click(function(e){e.preventDefault()}),t.initAfter.call(u,l))},u.getPosition=function(){f=$(window).height(),o.each(function(e){var i=$(this);c[e]=i.offset().top,r[e]=c[e]+i.outerHeight()}),m=c[0]-f,p=r[v-1]-t.scrollMarginTop},u.scrollAct=function(){var e=$(document).scrollTop();1==t.autoHide?m<=e&&p>e?(u.autoHideFadeIn(),u.scrollActs(e)):u.autoHideFadeOut():u.scrollActs(e)},u.scrollActs=function(e){for(var i=0;i<v;i++)if(c[i]-f/2<=e&&r[i]-f/2>e&&(H!=i||null==H))return H=i,s.eq(i).addClass("on").siblings().removeClass("on"),1==t.moveBox.use&&("y"==t.axis?n.find(".movebox").stop().fadeIn(t.moveBox.speed).animate({top:s.eq(i).offset().top-s.eq(0).offset().top+(0!=i?t.moveBox.marginTop:0)},t.moveBox.speed):"x"==t.axis&&n.find(".movebox").stop().fadeIn(t.moveBox.speed).animate({left:s.eq(i).offset().left-s.eq(0).offset().left+(0!=i?t.moveBox.marginLeft:0),width:s.eq(i).find("a").outerWidth()},t.moveBox.speed,t.moveBox.ease)),!1},u.autoHide=function(){n.on({mouseenter:function(){clearTimeout(a),n.fadeIn(t.autoHideSpeed,function(){x=!0})},mouseleave:function(){x=!1,u.autoHideFadeIn()}})},u.autoHideFadeIn=function(){n.fadeIn(t.autoHideSpeed,function(){clearTimeout(a),0==x&&(a=setTimeout(u.autoHideFadeOut,t.autoHideDelay))})},u.autoHideFadeOut=function(){n.fadeOut(t.autoHideSpeed,function(){clearTimeout(a)})},u.init()},$.fn.dfmainlist=function(e){return this.each(function(){if("undefined"!=typeof setSize){var i=$(this),t=i.data("dfmainlist");return t?t.methods[e]?t.methods[e].apply(this,Array.prototype.slice.call(arguments,1)):void 0:(t=new $.dfmainlist(this,e),i.data("dfmainlist",t),t)}})};

	$(document).ready(function(){
		if($('#wrap.main').find('.xans-product-listmain').length>1 && DF['set-movelist']=='on'){
			$('#wrap.main').dfmainlist({
				'responsive':true,
				'axis':'y',
				'classes':{
					'findList':'.xans-product-listmain'+(DF['set-review-mainuse']=='on'?', .df-review-main':''),
					'moveList':'#df-movelist'
				},
				'scrollSpeed':600,
				'scrollEase':'easeInOutQuart',
				'scrollMarginTop':120,
				'autoHide':true,
				'autoHideType':'fade',
				'autoHideDelay':3000,
				'autoHideSpeed':200,
				'moveBox':{
					'use':true,
					'marginLeft':4,
					'marginTop':0,
					'speed':200,
					'ease':'easeInOutQuart'
				}
			});
		}
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

// Generated by CoffeeScript 1.9.3
/*
마지막 업데이트 : 2018-12-14
*/

if(DF['set-insta-use']=='on'){

	(function(){var t,e,o;t=function(){function i(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return i.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&0<this.context.nextUrl.length},i.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},i.prototype.run=function(t){var e,o;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&((o=document.createElement("script")).id="instafeed-fetcher",o.src=t||this._buildUrl(),document.getElementsByTagName("head")[0].appendChild(o),e="instafeedCache"+this.unique,window[e]=new i(this.options,this),window[e].unique=this.unique),!0},i.prototype.parse=function(t){var e,o,i,n,r,s,a,p,l,c,h,u,d,f,m,g,y,w,k,b,_,E,I,v,x,N,B,j;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(x="least"===(N="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"))[0],N[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",x);break;case"liked":t.data=this._sortBy(t.data,"likes.count",x);break;case"commented":t.data=this._sortBy(t.data,"comments.count",x);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(u=t.data,v=parseInt(this.options.limit,10),null!=this.options.limit&&u.length>v&&(u=u.slice(0,v)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(u=this._filter(u,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(a="",j=document.createElement("div"),p=0,b=u.length;p<b;p++){if("object"!=typeof(c=(l=u[p]).images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);g=c.width,m="square",(f=c.height)<g&&(m="landscape"),g<f&&(m="portrait"),h=c.url,0<=window.location.protocol.indexOf("http")&&!this.options.useHttp&&(h=h.replace(/https?:\/\//,"//")),a+=this._makeTemplate(this.options.template,{model:l,id:l.id,link:l.link,type:l.type,image:h,width:g,height:f,orientation:m,caption:this._getObjectProperty(l,"caption.text"),likes:l.likes.count,comments:l.comments.count,location:this._getObjectProperty(l,"location.name")})}for(j.innerHTML=a,n=[],i=0,o=j.childNodes.length;i<o;)n.push(j.childNodes[i]),i+=1;for(w=0,_=n.length;w<_;w++)I=n[w],s.appendChild(I)}else for(k=0,E=u.length;k<E;k++){if(l=u[k],d=document.createElement("img"),"object"!=typeof(c=l.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);h=c.url,0<=window.location.protocol.indexOf("http")&&!this.options.useHttp&&(h=h.replace(/https?:\/\//,"//")),d.src=h,!0===this.options.links?((e=document.createElement("a")).href=l.link,e.appendChild(d),s.appendChild(e)):s.appendChild(d)}if("string"==typeof(B=this.options.target)&&(B=document.getElementById(B)),null==B)throw r='No element with id="'+this.options.target+'" on page.',new Error(r);B.appendChild(s),document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")),y="instafeedCache"+this.unique,window[y]=void 0;try{delete window[y]}catch(t){t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},i.prototype._buildUrl=function(){var t,e;switch("https://api.instagram.com/v1",this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return e="https://api.instagram.com/v1/"+t,null!=this.options.accessToken?e+="?access_token="+this.options.accessToken:e+="?client_id="+this.options.clientId,null!=this.options.limit&&(e+="&count="+this.options.limit),e+="&callback=instafeedCache"+this.unique+".parse"},i.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},i.prototype._makeTemplate=function(t,e){var o,i,n,r,s;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)r=o.match(i)[1],s=null!=(n=this._getObjectProperty(e,r))?n:"",o=o.replace(i,function(){return""+s});return o},i.prototype._getObjectProperty=function(t,e){var o,i;for(i=(e=e.replace(/\[(\w+)\]/g,".$1")).split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},i.prototype._sortBy=function(t,n,r){var e;return e=function(t,e){var o,i;return o=this._getObjectProperty(t,n),i=this._getObjectProperty(e,n),r?i<o?1:-1:o<i?1:-1},t.sort(e.bind(this)),t},i.prototype._filter=function(t,e){var o,i,n,r;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,r=t.length;n<r;n++)i(t[n]);return o},i}(),e=this,o=function(){return t},"function"==typeof define&&define.amd?define([],o):"object"==typeof module&&module.exports?module.exports=o():e.Instafeed=o()}).call(this);

	var feed = new Instafeed({
		get:'user',
		userId:DF['set-insta-accesstoken'].trim().split('.')[0],
		accessToken:DF['set-insta-accesstoken'].trim(),
		target:'instaFeedList',
		template:'<li df-data-username="{{model.user.username}}"><a href="{{link}}" target="_blank"><span style="background-image:url({{image}})"></span></a></li>',
		resolution:'standard_resolution',
		limit:DF['set-insta-listcount'],
		after:function(){
			var $insta = $('#instaFeed');
			var $instaList = $insta.find('#instaFeedList');
			var username = $instaList.children('li').eq(0).attr('df-data-username');
			$instaList.addClass('grid'+DF['set-insta-grid']).addClass('gridspace'+DF['set-insta-gridspace']);
			$insta.find('.followon').children('a').text(username).attr('href', '//www.instagram.com/'+username);
			$insta.show();
		}
	});
	feed.run();

}
