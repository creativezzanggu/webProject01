package order.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import board.bean.QADTO;
import order.bean.OrderDTO;
import order.dao.OrderDAO;
import product.bean.ProductDTO;

@Controller
public class OrderController {
	@Autowired
	private OrderDAO orderDAO;
	
	@RequestMapping(value="/order/order.do", method=RequestMethod.GET)
	public String order(@RequestParam String name, Model model) {
		model.addAttribute("display", "../order/order.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/order/getSEQ.do", method=RequestMethod.POST)
	public ModelAndView getSEQ() {
		ModelAndView mav = new ModelAndView();
		int seq = orderDAO.getSEQ();
		mav.addObject("seq", seq);
		mav.setViewName("jsonView");
		return mav;	
	}
	
	@RequestMapping(value="/order/userGetOrderList.do",method=RequestMethod.GET)
	public ModelAndView userGetOrderList(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		List<OrderDTO> list = orderDAO.userGetOrderList(session.getAttribute("id").toString());
		if(list==null) {
			mav.addObject("0", 0);
			mav.setViewName("jsonView");
			return mav;
		}else {
			mav.addObject("list",list);
			mav.setViewName("jsonView");
			return mav;
		}
		
	}
	
}
