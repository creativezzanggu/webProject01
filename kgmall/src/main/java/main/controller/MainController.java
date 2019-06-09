package main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import main.bean.Search_paging;
import main.dao.MainDAO;
import product.bean.ProductDTO;


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
	public String search(@RequestParam Map<String, String> map,@RequestParam(required=false, defaultValue="1") String pg, Model model) {
		System.out.println("1.pg : "+pg);
		Search_paging search_paging = new Search_paging();
		if(map.get("majorcategory")==null) {
			search_paging.setMajorcategory("");
		}else {
			search_paging.setMajorcategory(map.get("majorcategory"));
		}if(map.get("search_type")==null) {
			search_paging.setSearch_type("name");
		}else {
			search_paging.setSearch_type(map.get("search_type"));
		}
		search_paging.setKeyword(map.get("keyword").trim());
		if(map.get("product_price1")==null) {
			search_paging.setProduct_price1("");
		}else {
			search_paging.setProduct_price1(map.get("product_price1"));
		}
		if(map.get("product_price2")==null) {
			search_paging.setProduct_price2("");
		}else {
			search_paging.setProduct_price2(map.get("product_price1"));
		}
		if(map.get("order")==null) {
			search_paging.setOrder("");
		}else {
			search_paging.setOrder(map.get("order"));
		}
		if(map.get("order_by")==null) {
			search_paging.setOrder_by("asc");
		}else {
			search_paging.setOrder_by(map.get("order_by"));
		}
		model.addAttribute("keyword", map.get("keyword"));
		model.addAttribute("search_paging", search_paging);
		model.addAttribute("display", "../main/search.jsp");
		model.addAttribute("pg", pg);
		return "/main/index";
	}
	
	@RequestMapping(value="/main/searchDetail.do", method=RequestMethod.GET)
	public ModelAndView searchDetail(@RequestParam Map<String, String> map){
		map.put("startP",String.valueOf(Integer.parseInt(map.get("currentPage"))*9-8));
		map.put("endP", String.valueOf(Integer.parseInt(map.get("currentPage"))*9));
		System.out.println("startP, endP : "+map.get("startP")+", "+map.get("endP"));
		System.out.println(map.get("keyword"));
		List<ProductDTO> list = mainDAO.searchDetail(map); //상품 가져오기
		if(list.size()==0) list=null;
		
		int cnt = mainDAO.countItems(map);
		Search_paging search_paging = new Search_paging();
		search_paging.setCurrentPage(Integer.parseInt(map.get("currentPage")));
		search_paging.setTotalA(cnt);
		search_paging.setMajorcategory(map.get("majorcategory"));
		search_paging.setSearch_type(map.get("search_type"));
		search_paging.setKeyword(map.get("keyword").trim());
		search_paging.setProduct_price1(map.get("product_price1"));
		search_paging.setProduct_price2(map.get("product_price2"));
		search_paging.setOrder(map.get("order"));
		search_paging.setOrder_by(map.get("order_by"));
		search_paging.makePagingHTML();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("search_paging", search_paging);
		mav.addObject("list", list);
		mav.addObject("cnt", cnt);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	@RequestMapping(value="/main/getNewItemList.do", method=RequestMethod.POST)
	public ModelAndView getNewItemList() {
		List<ProductDTO> list = mainDAO.getNewItemList();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
}
