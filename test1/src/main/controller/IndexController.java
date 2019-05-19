package main.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import user.bean.UserDTO;
import user.dao.UserDAO;

@Controller
public class IndexController {
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(value="/main/index.do",  method = RequestMethod.GET)
	public String index(Model model) {
		model.addAttribute("display", "/template/body.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/login/login.do", method=RequestMethod.POST)
	public String login(@RequestParam Map<String, String> map, Model model, HttpSession session) {
		System.out.println("로그인.do진입");
		String name = userDAO.login(map);
		if(name!="") {
			session.setAttribute("name", name);
			model.addAttribute("display", "/login/login.jsp");
		}else {
			model.addAttribute("display", "/login/loginFail.jsp");
		}
		return "/main/index";
	}
	
	@RequestMapping(value="/join/joinForm.do", method=RequestMethod.GET)
	public String joinForm(Model model){
		model.addAttribute("display", "/join/joinForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/join/join.do", method=RequestMethod.POST)
	public String join(@ModelAttribute UserDTO userDTO, Model model) {
		userDAO.write(userDTO);
		model.addAttribute("display", "/join/join.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/login/logout.do", method=RequestMethod.GET)
	public String logoff(HttpSession session,Model model) {
		session.invalidate();
		model.addAttribute("display", "/template/body.jsp");
		return "/main/index";
	}
}
