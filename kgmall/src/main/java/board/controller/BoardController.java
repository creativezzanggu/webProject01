package board.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.bean.QADTO;
import board.bean.QAreplyDTO;
import board.dao.BoardDAO;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardDAO boardDAO;
	
	
	@RequestMapping(value="/board.do", method=RequestMethod.GET)
	public String board(Model model) {
		model.addAttribute("display", "/board/board.jsp");
		return "/main/index";
	}

	@RequestMapping(value="/QA.do", method=RequestMethod.GET)
	public String QA(Model model,@RequestParam(required=false,defaultValue="1") String pg,HttpServletRequest req,HttpServletResponse resp,HttpSession session) {
		int totalA = boardDAO.getTotal();
		Cookie[] ar = req.getCookies();
		for(int i=0;i<ar.length;i++) {
			if(!ar[i].getName().equals("0")) {
				Cookie cookie2 = new Cookie("memHit","0");
				cookie2.setMaxAge(60*60);
				resp.addCookie(cookie2);
			}
		}
		
		model.addAttribute("pg", pg);
		model.addAttribute("totalA", totalA);
		model.addAttribute("display", "/board/QA.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/QAwrite.do", method=RequestMethod.GET)
	public String QAwrite(@RequestParam Map<String,String> map,Model model) {
		model.addAttribute("display", "/board/QAwrite.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/insertBoard.do", method=RequestMethod.POST)
	public String QAwriteInsert(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		map.put("id",(String) session.getAttribute("id"));
		map.put("name",(String) session.getAttribute("name"));
		map.put("email",(String) session.getAttribute("email"));
		System.out.println(map);
		boardDAO.QAinsert(map);
		
		return "redirect:/board/QA.do";
	}
	
	@RequestMapping(value="/QAdelete.do", method=RequestMethod.GET)
	public String QAdelete(@RequestParam String seq,Model model) {
		boardDAO.QAdelete(seq);
		int totalA = boardDAO.getTotal();
		model.addAttribute("pg", '1');
		model.addAttribute("totalA", totalA);
		model.addAttribute("display", "/board/QA.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/QAview.do", method=RequestMethod.GET)
	public String QAview(@RequestParam String seq,Model model,HttpServletRequest req, HttpServletResponse resp,HttpSession session) {
		boolean today = false;
		Cookie[] ar = req.getCookies();
		if(ar != null) {
			for(int i=0; i<ar.length; i++) {
				if(ar[i].getName().equals(session.getAttribute("id")+seq)) {
					today=true;
				}
			}//for
			if(!today) {
				boardDAO.hitUp(seq);
				
				Cookie cookie = new Cookie(session.getAttribute("id")+seq, seq);
				cookie.setMaxAge(30);
				resp.addCookie(cookie);
			}
		}//if
		QADTO qa= boardDAO.getQA(seq);
		
		
		model.addAttribute("id",session.getAttribute("id"));
		model.addAttribute("qa",qa);
		model.addAttribute("display", "/board/QAview.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/QAList.do", method=RequestMethod.GET)
	public ModelAndView QAList(@RequestParam String pg) {
		int endNum = Integer.parseInt(pg)*5;
		int startNum =  endNum-4;
		Map<String,Integer> map = new HashMap<String,Integer>();
		map.put("endNum",endNum);
		map.put("startNum",startNum);
		
		List<QADTO> list = boardDAO.getQAList(map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list",list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/myQAList.do", method=RequestMethod.GET)
	public ModelAndView myQAList(HttpSession session) {
		Map<String,String> map = new HashMap<String,String>();
		map.put("id", session.getAttribute("id").toString());
		List<QADTO> list = boardDAO.myQAList(map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list",list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/QAPaging.do", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView QAPaging(@RequestParam Map<String,String> map) {
		StringBuffer pagingHTML = new StringBuffer();
		int currentPage = Integer.parseInt(map.get("currentPage"));
		int pageBlock = Integer.parseInt(map.get("pageBlock"));
		int totalA = Integer.parseInt(map.get("totalA"));
		int pageSize = Integer.parseInt(map.get("pageSize"));
		
		int totalP = (totalA+pageSize)/pageSize;
		
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("<p><a href='/kgmall/board/QA.do?pg="+(startPage-1)+"'><img src='../image/board_image/btn_pagingPrev_on.png' class='img_on' alt='prev'></a></p>");
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage)
				pagingHTML.append("<li><a href='/kgmall/board/QA.do?pg="+i+"' class='this'>"+i+"</a></li>");
			else if(i<=endPage)
				pagingHTML.append("<li><a href='/kgmall/board/QA.do?pg="+i+"' class='this'>"+i+"</a></li></ol>");
		}
		if(totalP > endPage)
			pagingHTML.append("<p><a href='/kgmall/board/QA.do?pg="+(endPage+1)+"'><img src='../image/board_image/btn_pagingNext_on.png' class='img_on' alt='prev'></a></p>");
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pagingHTML",pagingHTML);
		mav.setViewName("jsonView");
		return mav;		
	}
	
	@RequestMapping(value="/QASelectList.do", method=RequestMethod.GET)
	public ModelAndView QASelectList(@RequestParam(required=false,defaultValue="1") String pg,@RequestParam String category) {
		int endNum = Integer.parseInt(pg)*5;
		int startNum =  endNum-4;
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("endNum",Integer.toString(endNum));
		map.put("startNum",Integer.toString(startNum));
		map.put("category",category);
		
		List<QADTO> list = boardDAO.QASelectList(map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list",list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	@RequestMapping(value="/QASelectPaging.do", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView QASelectPaging(@RequestParam Map<String,String> map) {
		StringBuffer pagingHTML = new StringBuffer();
		int currentPage = Integer.parseInt(map.get("currentPage"));
		int pageBlock = Integer.parseInt(map.get("pageBlock"));
		int totalA=0;
		if(map.get("category").equals("전체")) {
			totalA = boardDAO.getTotal();
		}else {
			totalA = boardDAO.getSelectTotalA(map.get("category"));
		}
		
		int pageSize = Integer.parseInt(map.get("pageSize"));
		
		int totalP = (totalA+pageSize)/pageSize;
		
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("<p><a href='/kgmall/board/QASelectList.do?pg="+(startPage-1)+"&category="+map.get("category")+"'><img src='../image/board_image/btn_pagingPrev_on.png' class='img_on' alt='prev'></a></p>");
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage)
				pagingHTML.append("<li><a id='change' href='/kgmall/board/QASelectList.do?pg="+i+"&category="+map.get("category")+"' class='this'>"+i+"</a></li>");
			else if(i<=endPage)
				pagingHTML.append("<li><a id='change' href='/kgmall/board/QASelectList.do?pg="+i+"&category="+map.get("category")+"' class='this'>"+i+"</a></li></ol>");
		}
		if(totalP > endPage)
			pagingHTML.append("<p><a href='/kgmall/board/QASelectList.do?pg="+(endPage+1)+"&category="+map.get("category")+"'><img src='../image/board_image/btn_pagingNext_on.png' class='img_on' alt='prev'></a></p>");
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pagingHTML",pagingHTML);
		mav.setViewName("jsonView");
		return mav;		
	}
	
	@RequestMapping(value="/QASearch.do", method=RequestMethod.POST)
	public ModelAndView QASearch(@RequestParam Map<String,Object> map) {
		int endNum = Integer.parseInt((String) map.get("pg"))*5;
		int startNum =  endNum-4;
		map.put("endNum",Integer.toString(endNum));
		map.put("startNum",Integer.toString(startNum));
		map.put("search","%"+map.get("search")+"%");
		
		List<QADTO> list = boardDAO.QASearchList(map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("searchList",list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/QASearchPaging.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView QASearchPaging(@RequestParam Map<String,String> map) {
		StringBuffer pagingHTML = new StringBuffer();
		int currentPage = Integer.parseInt(map.get("currentPage"));
		int pageBlock = Integer.parseInt(map.get("pageBlock"));
		int totalA=0;

		totalA = boardDAO.getSearchTotalA(map);
		
		int pageSize = Integer.parseInt(map.get("pageSize"));
		
		int totalP = (totalA+pageSize)/pageSize;
		
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("<p><a href='/kgmall/board/QASearchPaging.do?pg="+(startPage-1)+"&category="+map.get("category")+"'><img src='../image/board_image/btn_pagingPrev_on.png' class='img_on' alt='prev'></a></p>");
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage)
				pagingHTML.append("<li><a href='/kgmall/board/QASearchPaging.do?pg="+i+"&category="+map.get("category")+"' class='this'>"+i+"</a></li>");
			else if(i<=endPage)
				pagingHTML.append("<li><a href='/kgmall/board/QASearchPaging.do?pg="+i+"&category="+map.get("category")+"' class='this'>"+i+"</a></li></ol>");
		}
		if(totalP > endPage)
			pagingHTML.append("<p><a href='/kgmall/board/QASearchPaging.do?pg="+(endPage+1)+"&category="+map.get("category")+"'><img src='../image/board_image/btn_pagingNext_on.png' class='img_on' alt='prev'></a></p>");
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pagingHTML",pagingHTML);
		mav.setViewName("jsonView");
		return mav;		
	}
	
	@RequestMapping(value="/QAreplyInsert.do", method=RequestMethod.POST)
	@ResponseBody
	public String QAreplyInsert(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		System.out.println("insert="+map);
		QAreplyDTO dto = boardDAO.QAreplyInsertCheck(map);//중복글체크
		QADTO qa= boardDAO.getQA(map.get("seq"));
		if(dto==null) {
			boardDAO.QAreplyInsert(map);
		}else if(dto != null) {
			return "no";
		}
		
		model.addAttribute("qa",qa);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		return "insert";
		
	}
	
	@RequestMapping(value="/QAreplyList.do", method=RequestMethod.POST)
	public ModelAndView QAreplyList(@RequestParam Map<String,String> map) {
		List<QAreplyDTO> list= boardDAO.getReply(map);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer qareply = new StringBuffer();
		qareply.append("<ul class='boardComment'>");
		for(QAreplyDTO dto : list) {
			qareply.append(
					"<li id='replyseq"+dto.getReplyseq()+"' class='xans-record-'>"+ 
					"<div id='commentTop' class='commentTop'>"+
					"<strong class='name txtLittle'>"+
					"<span class='cmtBy'>Comment by</span>"+
					"<span class='cmtName'>"+dto.getId()+"</span></strong>" + 
					"<span class='date'>"+sdf.format(dto.getLogtime())+"</span>"+ 
					"<span class='button btnAreaCustom'>"+ 
					"<input type='button' value='수정' onclick=qaReplyModify('"+dto.getReplyseq()+"','"
					+dto.getId()+"','"+dto.getSeq()+"') class='btn Tiny Light'>"+ 
					"<input type='button' value='삭제' onclick=qaReplydelete('"+dto.getReplyseq()+"') class='btn Tiny Light mL4'>"+ 
					"</span>"+ 
					"</div>"+ 
					"<div class='comment txtLittle'>" + 
					"<span>"+dto.getContent()+"</span></div></li>");
		}qareply.append("</ul>");
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("qareply",qareply);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/QAreplyDelete.do", method=RequestMethod.POST)
	public void QAreplyDelete(@RequestParam Map<String,String> map) {
		System.out.println(map);
		boardDAO.QAreplyDelete(map);
	}
	
	@RequestMapping(value="/QAreplyModify.do", method=RequestMethod.GET)
	public String QAreplyModify(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		QADTO qa= boardDAO.getQA(map.get("seq"));
		boardDAO.QAreplyDelete(map);
		
		model.addAttribute("qa",qa);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		model.addAttribute("display", "/board/QAview.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/QAreplyGetContent.do", method=RequestMethod.POST)
	@ResponseBody
	public String QAreplyGetContent(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		String content = boardDAO.QAreplyGetContent(map);
		QADTO qa= boardDAO.getQA(map.get("seq"));

		model.addAttribute("qa",qa);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		return content;
	}
	
}














