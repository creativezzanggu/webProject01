package main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.dao.MainDAO;
import product.bean.ProductDTO;


@Controller
public class MainController {
	@Autowired
	MainDAO mainDAO;
	
	@RequestMapping(value="/main/index.do", method=RequestMethod.GET)
	public String index(Model model) {
		model.addAttribute("display", "../template/body.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/main/search.do", method=RequestMethod.GET)
	public String search(@RequestParam String keyword, Model model) {		
		 List<ProductDTO> list = mainDAO.search(keyword);
		//DB 접근 해서 해당 키워드의 product 가져오기
		model.addAttribute("display", "../main/search.jsp");
		model.addAttribute("list", list);
		model.addAttribute("keyword", keyword);
		model.addAttribute("pageMoved", "yes");
		return "/main/index";
	}
	
	@RequestMapping(value="/main/searchDetail.do", method=RequestMethod.GET)
	public ModelAndView searchDetail(@RequestParam Map<String, String> map) {
		List<ProductDTO> list = mainDAO.searchDetail(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
}
