package main.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import main.dao.MainDAO;


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
	public String search(@RequestParam Map map, Model model) {
		mainDAO.search();
		//DB 접근 해서 해당 키워드의 product 가져오기
		model.addAttribute("display", "../main/search.jsp");
		return "/main/index";
	}
	
}
