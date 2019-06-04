package product.controller;

import java.util.HashMap;
import java.util.List;
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

import product.bean.ColorDTO;
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
	@RequestMapping(value="/createCookie.do", method=RequestMethod.POST)
	public void createCookie(@RequestParam String productName, String number, HttpServletResponse response,HttpServletRequest request) {
		Cookie setCookie = new Cookie(productName, number);
		setCookie.setMaxAge(60*60*24); 
		response.addCookie(setCookie);
	}
	@RequestMapping(value="/deleteCookie.do", method=RequestMethod.POST)
	public void deleteCookie(HttpServletResponse response,HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(int i=0; i< cookies.length; i++){
				cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
				response.addCookie(cookies[i]); // 응답 헤더에 추가
			}
		}
	}
	@RequestMapping(value="/order.do", method=RequestMethod.GET)
	public String order(@RequestParam String name, String total, Model model) {
		model.addAttribute("display", "../product/order.jsp");
		return "/main/index";
	}
	
}
