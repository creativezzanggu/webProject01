package main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class indexController {
	
	
	@RequestMapping(value="/main/index.do", method = RequestMethod.GET)
	public String index(Model model) {
		//model에 넘어갈 값들 넘겨줌
		return "/main/index";
	}
}
