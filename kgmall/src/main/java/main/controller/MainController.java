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

import list.bean.ListDTO;
import list.dao.ListDAO;

import main.bean.Search_paging;
import main.dao.MainDAO;
import product.bean.ProductDTO;


@Controller
public class MainController {
	@Autowired
	MainDAO mainDAO;
	@Autowired
	ListDAO listDAO;
	
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
	
	
	@RequestMapping(value="/main/newListForm.do", method=RequestMethod.POST)
	public ModelAndView ListForm(@RequestParam(required=false,defaultValue="1") int pg,@RequestParam Map<String,String> map) {
		int endNum = pg*6;
		int startNum = endNum-5;
		StringBuffer pruductList = new StringBuffer();
		StringBuffer colorForm = new StringBuffer();
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		List<ListDTO> list = listDAO.getProductList(map);
		for(ListDTO dto : list) {
			String name = dto.getName();
			List<String> colorList = listDAO.getColor(name);
			String color =null;
			for(String col : colorList) {
				if(col.equals("Black"))color="#000000";
				else if(col.equals("Blue"))color="#0000FF";
				else if(col.equals("Green"))color="#00FF00";
				else if(col.equals("Pink"))color="#FFC0CB";
				else if(col.equals("White"))color="#FFFFFF";
				else if(col.equals("Yellow"))color="#FFFF00";
				colorForm.append("<span style='background-color:"+color+"' displaygroup='1' class='chips xans-record-'></span>");
			}
			pruductList.append("<li id='"+dto.getCode()+"' class='item xans-record-'>"
					+"<div class='box'><div class='thumbnail'>"
					+"<a href='/kgmall/product/select.do?name="+dto.getName()+"'><img src='../image/"+dto.getImageLink()+"' class='thumb'></a>"
					+"</div><div class='description'><div class='fadearea'>"
					+"<div class='xans-element- xans-product colorList color'>"+colorForm+"</div>"
					+"<p class='name'>"
					+"<a href=''>"
					+"<span style='font-size:12px;color:#555555;'>"+dto.getName()+"</span></a></p>"
					+"<ul class='xans-element- xans-product'>"
					+"<li class='xans-record-'><span style='font-size:11px;color:#555555;'>"+dto.getCompany()+"</span></li>" 
					+"<li class='xans-record-'><span style='font-size:12px;color:#333333;'>"+dto.getPrice()+"</span></li></ul>"
					+"</div></div></div>");
			colorForm.setLength(0);
		}
		String category = "BOTTOM";

		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pruductList",pruductList);
		mav.setViewName("jsonView");
		return mav;
	}
}
