package cart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CartController {
	
	@RequestMapping(value="/cart/cart.do", method=RequestMethod.GET)
	public String cart(Model model) {
		model.addAttribute("display", "../cart/cart.jsp");
		return "/main/index";
	}
}
