package cart.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import cart.dao.CartDAO;

@Controller
public class CartController {
	@Autowired
	private CartDAO cartDAO;
	
	@RequestMapping(value="/cart/cart.do", method=RequestMethod.GET)
	public String cart(Model model) {
		model.addAttribute("display", "../cart/cart.jsp");
		return "/main/index";
	}
	
}
