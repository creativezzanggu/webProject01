package cart.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
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

import cart.bean.CartDTO;
import cart.dao.CartDAO;
import order.bean.OrderDTO;
import order.dao.OrderDAO;
import product.bean.ProductDTO;
import product.dao.ProductDAO;

@Controller
public class CartController {
	@Autowired
	private ProductDAO productDAO;
	@Autowired
	private CartDAO cartDAO;
	@Autowired
	private OrderDAO orderDAO;
	
	@RequestMapping(value="/cart/cart.do", method=RequestMethod.GET)
	public String cart(Model model) {
		model.addAttribute("display", "../cart/cart.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/cart/createCookie.do", method=RequestMethod.POST)
	public void createCookie(@RequestParam String productName, String number, HttpServletResponse response,HttpServletRequest request) {
		try {
			String productname = URLEncoder.encode(productName,"UTF-8");
			Cookie setCookie = new Cookie(productname, number);
			setCookie.setMaxAge(60*60*24); 
			response.addCookie(setCookie);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
	}
	@RequestMapping(value="/cart/deleteCookie.do", method=RequestMethod.POST)
	public void deleteCookie(HttpServletResponse response,HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(int i=0; i< cookies.length; i++){
				cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
				response.addCookie(cookies[i]); // 응답 헤더에 추가
			}
		}
	}
	
	@RequestMapping(value="/cart/selectCookie.do",method=RequestMethod.POST)
	public ModelAndView selectCookie(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mav = new ModelAndView();
		Map<String,String> map= new HashMap<String, String>();
		String str[];
		Cookie[] getCookie = request.getCookies();
		if(getCookie != null){	
			for(int i=0; i<getCookie.length; i++){
				Cookie c = getCookie[i];
				str = c.getName().split("_");
				try {
					if(str[2]!=""){
						String name1 = c.getName(); // 쿠키 이름 가져오기
						try {
							String productname = URLDecoder.decode(name1,"UTF-8");
							String value = c.getValue(); // 쿠키 값 가져오기
							map.put(productname, value);
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					}
				}catch(ArrayIndexOutOfBoundsException e) {
					//e.printStackTrace();
				}
			}

		}		
		mav.addObject("map", map);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/cart/selectDeleteCookie.do", method=RequestMethod.POST)
	public void selectDeleteCookie(@RequestParam String productName, String id, HttpServletResponse response,HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		
		if(cookies != null){
			for(int i=0; i< cookies.length; i++){
				try {
					if(URLDecoder.decode(cookies[i].getName(),"UTF-8").equals(productName)) {
						cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
						response.addCookie(cookies[i]); // 응답 헤더에 추가
					}
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			}
		}
		if(!id.equals("null")) {
			cartDAO.deleteCart(productName,id);
		}
	}
	@RequestMapping(value="/cart/insertCookie.do",method=RequestMethod.POST)
	public ModelAndView insertCookie(@RequestParam String id,HttpServletResponse response,HttpServletRequest request){
		ModelAndView mav = new ModelAndView();
		String str[];
		List<CartDTO> list= new ArrayList<CartDTO>();
		Cookie[] getCookie = request.getCookies();
		if(getCookie != null){	
			for(int i=0; i<getCookie.length; i++){
				CartDTO cartDTO = new CartDTO();
				Cookie c = getCookie[i];
				str = c.getName().split("_");
				try {
					if(str[2]!=""){
						try {
							cartDTO.setProduct(URLDecoder.decode(c.getName(),"UTF-8"));
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						} // 쿠키 이름 가져오기
						cartDTO.setProductCount(Integer.parseInt(c.getValue())); // 쿠키 값 가져오기
						cartDTO.setSellId(id);
						list.add(cartDTO);
					}
				}catch(ArrayIndexOutOfBoundsException e) {
					//e.printStackTrace();
				}
			}
		}
		cartDAO.insertCart(list);
		List<CartDTO> list2 = cartDAO.getCartList(id);
		mav.addObject("list2", list2);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/cart/selectCart.do",method=RequestMethod.POST)
	public ModelAndView selectCart(@RequestParam String id){
		ModelAndView mav = new ModelAndView();

		List<CartDTO> list = cartDAO.getCartList(id);
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/cart/insertCartOrder.do",method=RequestMethod.POST)
	public void insertCartOrder(@RequestParam String id){
		List<CartDTO> list = cartDAO.getCartList(id);
		for(CartDTO cartDTO : list) {
			String[] str = cartDTO.getProduct().split("_");
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setSeq(orderDAO.getSEQ());
			orderDTO.setProductName(str[0]+"_"+str[1]+"_"+str[2]); 
			orderDTO.setQuantity(cartDTO.getProductCount()); 
			ProductDTO productDTO = productDAO.getDTO(str[0]);

			orderDTO.setOrderId(id);
			orderDTO.setImage(productDTO.getImageLink());
			orderDTO.setOrderState("상품 준비 중");
			orderDTO.setTotal(cartDTO.getProductCount()*productDTO.getPrice());
			orderDTO.setSell(productDTO.getPrice());
			orderDAO.insertOrderList(orderDTO);
			productDAO.orderCountDown(str[0]+"_"+str[1]+"_"+str[2], cartDTO.getProductCount());
			productDAO.likeUp(str[0]+"_"+str[1]+"_"+str[2]);
		}
		cartDAO.deleteCartList(id);
		
	}
}
