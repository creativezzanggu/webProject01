package notice.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import notice.bean.NoticeDTO;
import notice.bean.NoticePaging;
import notice.dao.NoticeDAO;

@Controller
public class NoticeController {
	@Autowired
	private NoticeDAO noticeDAO;
	@Autowired
	private NoticePaging noticePaging;
	@RequestMapping(value="/notice/noticeForm.do", method=RequestMethod.GET)
	public String noticeForm(@RequestParam int pg, Model model) {
		

	
		model.addAttribute("pg", pg); 
		model.addAttribute("display","/notice/noticeForm.jsp");
		return "/main/index";
	
	}
	@RequestMapping(value="/notice/getNoticeList.do", method=RequestMethod.POST)
	public ModelAndView getNoticeList(@RequestParam String pg) {
		
		int endNum = Integer.parseInt(pg)*10;
		int startNum = endNum-9;
		Map<String,Integer> map = new HashMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		List<NoticeDTO> list = noticeDAO.getNoticeList(map);
		
		int totalA = noticeDAO.getTotalA();//총글수
		
		
		noticePaging.setCurrentPage(Integer.parseInt(pg));
		noticePaging.setPageBlock(5);
		noticePaging.setPageSize(10);
		noticePaging.setTotalA(totalA);
		noticePaging.makePagingHTML();
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("noticePaging", noticePaging);
		mav.setViewName("jsonView");
		return mav;
		
	}
	@RequestMapping(value="/notice/getNoticeSearch.do", method=RequestMethod.POST)
	public ModelAndView getNoticeSearch(@RequestParam(required=false,defaultValue="1") Map<String, String> map) {
		int pg = Integer.parseInt(map.get("pg"));
		
		int endNum = pg*10;
		int startNum = endNum-9;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		List<NoticeDTO> list =noticeDAO.getNoticeSearch(map);
		
		int totalA = noticeDAO.getSearchTotalA(map);
		
		noticePaging.setCurrentPage(pg);
		noticePaging.setPageBlock(5);
		noticePaging.setPageSize(10);
		noticePaging.setTotalA(totalA);
		noticePaging.makeSearchPagingHTML();
		
	
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("noticePaging", noticePaging);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	@RequestMapping(value="/notice/noticeView.do", method=RequestMethod.GET)
	public String noticeView(@RequestParam int seq, Model model) {
		
		NoticeDTO noticeDTO = noticeDAO.noticeView(seq);
		noticeDAO.noticeHit(seq);
		ModelAndView mav = new ModelAndView();
		model.addAttribute("noticeDTO", noticeDTO);
		model.addAttribute("display","/notice/noticeView.jsp");
		return "/main/index";
	}
	@RequestMapping(value="/notice/noticeModifyForm.do", method=RequestMethod.POST)
	public String noticeModifyForm(@RequestParam String subject, @RequestParam String content, @RequestParam String seq, Model model) {
		
		ModelAndView mav = new ModelAndView();
		model.addAttribute("subject", subject);
		model.addAttribute("content", content);
		model.addAttribute("seq", seq);
		model.addAttribute("display","/notice/noticeModifyForm.jsp");
		return "/main/index";
	}
	@RequestMapping(value="/notice/noticeModify.do", method=RequestMethod.POST)
	public String noticeModify(@ModelAttribute NoticeDTO noticeDTO) {
		noticeDAO.noticeModify(noticeDTO);
		return "/notice/noticeModify";
	}
	@RequestMapping(value="/notice/noticeWriteForm.do", method=RequestMethod.GET)
	public String noticeWriteForm(@RequestParam String name, Model model) {
		model.addAttribute("name", name);
		model.addAttribute("display", "/notice/noticeWriteForm.jsp");
		return "/main/index";
	}	
	@RequestMapping(value="/notice/noticeWrite.do", method=RequestMethod.POST)
	public String noticeWrite(@RequestParam Map<String, String> map) {
		noticeDAO.noticeWrite(map);
		return "/notice/noticeWrite";
	}
	@RequestMapping(value="/notice/noticeDelete.do", method=RequestMethod.POST)
	public String noticeDelete(@RequestParam String seq) {
		noticeDAO.noticeDelete(Integer.parseInt(seq));
		
		//ModelAndView mav = new ModelAndView();
		//mav.setViewName("/notice/noticeForm");
		return "/notice/noticeDelete";
	}
	
	@RequestMapping(value="/notice/getNotice.do", method=RequestMethod.GET)
	public ModelAndView getNotice() {
		List<NoticeDTO> list =  noticeDAO.getTitleList();
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	@RequestMapping(value="/notice/getNoticeSeq.do", method=RequestMethod.GET)
	public @ResponseBody int getNoticeSeq(@RequestParam int num) {
		System.out.println(num);
		int seq = noticeDAO.getNoticeSeq(num);
		System.out.println(seq);
		return seq;
	}
}
