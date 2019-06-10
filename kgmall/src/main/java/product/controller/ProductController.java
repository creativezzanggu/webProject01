package product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import cart.bean.CartDTO;
import cart.dao.CartDAO;
import order.bean.OrderDTO;
import order.dao.OrderDAO;
import product.bean.ProductDTO;
import product.dao.ProductDAO;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductDAO productDAO;
	@Autowired
	private CartDAO cartDAO;
	@Autowired
	private OrderDAO orderDAO;
	
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
		name = name.toUpperCase();
		System.out.println(name);
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
	
	@RequestMapping(value="/selectCookie.do",method=RequestMethod.POST)
	public ModelAndView selectCookie(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mav = new ModelAndView();
		Map<String,String> map= new HashMap<String, String>();
		
		Cookie[] getCookie = request.getCookies();
		if(getCookie != null){	
			for(int i=0; i<getCookie.length-3; i++){
				Cookie c = getCookie[i];
				String name1 = c.getName(); // 쿠키 이름 가져오기
				String value = c.getValue(); // 쿠키 값 가져오기
				map.put(name1, value);
				
			}
			for( String key : map.keySet() ){
	        }

		}		
		mav.addObject("map", map);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/selectDeleteCookie.do", method=RequestMethod.POST)
	public void selectDeleteCookie(@RequestParam String productName, String id, HttpServletResponse response,HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(int i=0; i< cookies.length; i++){
				if(cookies[i].getName().equals(productName)) {
					cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
					response.addCookie(cookies[i]); // 응답 헤더에 추가
				}
			}
		}
		if(!id.equals("null")) {
			cartDAO.deleteCart(productName,id);
		}
	}
	@RequestMapping(value="/insertCookie.do",method=RequestMethod.POST)
	public ModelAndView insertCookie(@RequestParam String id,HttpServletResponse response,HttpServletRequest request){
		ModelAndView mav = new ModelAndView();
		List<CartDTO> list= new ArrayList<CartDTO>();
		Cookie[] getCookie = request.getCookies();
		if(getCookie != null){	
			for(int i=0; i<getCookie.length-3; i++){
				CartDTO cartDTO = new CartDTO();
				Cookie c = getCookie[i];
				cartDTO.setProduct(c.getName()); // 쿠키 이름 가져오기
				if(c.getValue().length()<10) {
					cartDTO.setProductCount(Integer.parseInt(c.getValue())); // 쿠키 값 가져오기
				}
				cartDTO.setSellId(id);
				list.add(cartDTO);
			}
		}
		cartDAO.insertCart(list);
		List<CartDTO> list2 = cartDAO.getCartList(id);
		mav.addObject("list2", list2);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/insertOrderCookie.do",method=RequestMethod.POST)
	public void insertOrderCookie(@RequestParam String id, HttpServletResponse response,HttpServletRequest request){
		Cookie[] getCookie = request.getCookies();
		if(getCookie != null){	
			for(int i=0; i<getCookie.length-3; i++){
				Cookie c = getCookie[i];

				String[] str = c.getName().split("_");
				OrderDTO orderDTO = new OrderDTO();
				orderDTO.setSeq(orderDAO.getSEQ());
				orderDTO.setProductName(str[0]+"_"+str[1]+"_"+str[2]); // 쿠키 이름 가져오기
				if(c.getValue().length()<10) {
					orderDTO.setQuantity(Integer.parseInt(c.getValue())); // 쿠키 값 가져오기
				}
				ProductDTO productDTO = productDAO.getDTO(str[0]);

				orderDTO.setOrderId(id);
				orderDTO.setImage(productDTO.getImageLink());
				orderDTO.setOrderState("상품 준비 중");
				orderDTO.setTotal(Integer.parseInt(c.getValue())*productDTO.getPrice());
				orderDTO.setSell(productDTO.getPrice());
				productDAO.orderCountDown(str[0]+"_"+str[1]+"_"+str[2], Integer.parseInt(c.getValue()));
				orderDAO.insertOrderList(orderDTO);
			}
		}
	}
	@RequestMapping(value="/getCount.do", method=RequestMethod.POST)
	public ModelAndView getCount(@RequestParam String name) {
		ModelAndView mav = new ModelAndView();
		name = name.toUpperCase();
		System.out.println(name);
		int count = productDAO.getCount(name);
		mav.addObject("count", count);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/best.do",method=RequestMethod.GET)
	public ModelAndView best6() {
		ModelAndView mav = new ModelAndView();
		List<ProductDTO> list= productDAO.thumb();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
}
