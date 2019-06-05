package product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import product.bean.ProductDTO;
import product.dao.ProductDAO;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductDAO productDAO;
	
	@RequestMapping(value="/select.do", method=RequestMethod.GET)
	public String select(@RequestParam String name, Model model) {		
		model.addAttribute("display", "../product/product.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/getDTO.do", method=RequestMethod.POST)
	public ModelAndView getDTO(@RequestParam String name) {
		ModelAndView mav = new ModelAndView();

		ProductDTO productDTO = productDAO.getDTO(name);
		mav.addObject("productDTO", productDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/getColor.do", method=RequestMethod.POST)
	public ModelAndView getColor(@RequestParam String name) {
		ModelAndView mav = new ModelAndView();
		
		List<String> list = productDAO.getColor(name);
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
}
