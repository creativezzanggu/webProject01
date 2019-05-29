package main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import board.bean.BoardDTO;
import board.dao.BoardDAO;

@Controller
public class MainController {
	@Autowired
	private BoardDAO boardDAO;
	
	@RequestMapping(value="/main/index.do", method=RequestMethod.GET)
	public String index(Model model) {
		model.addAttribute("display", "../template/body.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/board/getNotice.do", method=RequestMethod.GET)
	public ModelAndView getNotice() {
		List<BoardDTO> list =  boardDAO.getTitleList();
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
}
