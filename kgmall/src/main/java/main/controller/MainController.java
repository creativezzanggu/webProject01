package main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
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
		System.out.println("키워드 : "+keyword);
		
		model.addAttribute("keyword", keyword.trim());
		model.addAttribute("display", "../main/search.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/main/searchDetail.do", method=RequestMethod.POST)
	public ModelAndView searchDetail(@RequestParam Map<String, String> map) {
		System.out.println("상세검색 : "+map.get("keyword"));
		List<ProductDTO> list = mainDAO.searchDetail(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
}
