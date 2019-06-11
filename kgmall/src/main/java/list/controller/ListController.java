package list.controller;

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
import list.bean.ListPaging;
import list.dao.ListDAO;

@Controller
@RequestMapping("/list")
public class ListController {
	@Autowired
	ListDAO listDAO;
	@Autowired
	ListPaging listPaging;
	
	@RequestMapping(value="/bestListForm.do", method=RequestMethod.GET)
	public String bestListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/bottomListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/bottomListForm.do", method=RequestMethod.GET)
	public String bottomListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/bottomListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/outerListForm.do", method=RequestMethod.GET)
	public String outerListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/outerListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/topListForm.do", method=RequestMethod.GET)
	public String topListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/topListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/shoseBagListForm.do", method=RequestMethod.GET)
	public String shoseBagListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/shoseBagListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/ListForm.do", method=RequestMethod.POST)
	public ModelAndView ListForm(@RequestParam(required=false,defaultValue="1") int pg,@RequestParam Map<String,String> map) {
		int endNum = pg*9;
		int startNum = endNum-8;
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
				if(col.equals("BLACK"))color="#000000";
				else if(col.equals("BLUE"))color="#0000FF";
				else if(col.equals("GREEN"))color="#00FF00";
				else if(col.equals("PINK"))color="#FFC0CB";
				else if(col.equals("WHITE"))color="#FFFFFF";
				else if(col.equals("YELLOW"))color="#FFFF00";
				colorForm.append("<span style='background-color:"+color+"' displaygroup='1' class='chips xans-record-'></span>");
			}
			pruductList.append("<li id='"+dto.getCode()+"' class='item xans-record-'>"
					+"<div class='box'><div class='thumbnail'>"
					+"<a href='/kgmall/product/select.do?name="+dto.getName()+"'><img src='../image/productImage/"+dto.getImageLink()+"' class='thumb'></a>"
					+"</div><div class='description'><div class='fadearea'>"
					+"<div class='xans-element- xans-product colorList color'>"+colorForm+"</div>"
					+"<p class='name'>"
					+"<a href='/kgmall/product/select.do?name="+dto.getName()+"'>"
					+"<span style='font-size:12px;color:#555555;'>"+dto.getName()+"</span></a></p>"
					+"<ul class='xans-element- xans-product'>"
					+"<li class='xans-record-'><span style='font-size:11px;color:#555555;'>"+dto.getCompany()+"</span></li>" 
					+"<li class='xans-record-'><span style='font-size:12px;color:#333333;'>"+dto.getPrice()+"</span></li></ul>"
					+"</div></div></div>");
			colorForm.setLength(0);
		}
		int totalA = listDAO.getMajorCategoryTotal(map.get("majorcategory"));
		listPaging.setCurrentPage(pg);
		listPaging.setPageBlock(5);
		listPaging.setPageSize(9);
		listPaging.setCategory(map.get("majorcategory"));
		listPaging.setTotalA(totalA);
		listPaging.makePagingHTML();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pruductList",pruductList);
		mav.addObject("totalA",totalA);
		mav.addObject("listPaging",listPaging);
		mav.addObject("pg",pg);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/SelectOptionForm.do", method=RequestMethod.POST)
	public ModelAndView SelectOptionForm(@RequestParam(required=false,defaultValue="1") int pg,@RequestParam Map<String,String>map) {
		listPaging.setCategory(map.get("sub"));
		listPaging.setCategory(map.get("category"));
		if(map.get("category").equals("MAJORCATEGORY")) {
			map.put("majorcategory",map.get("sub"));
		}else {
			map.put("subcategory", map.get("category"));
			map.put("category", "SUBCATEGORY");
		}
		int endNum = pg*9;
		int startNum = endNum-8;
		StringBuffer pruductList = new StringBuffer();
		StringBuffer colorForm = new StringBuffer();
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		System.out.println(map);
		
		List<ListDTO> list = listDAO.getProductSelectOptionList(map);
		for(ListDTO dto : list) {
			String name = dto.getName();
			List<String> colorList = listDAO.getColor(name);
			String color =null;
			for(String col : colorList) {
				if(col.equals("BLACK"))color="#000000";
				else if(col.equals("BLUE"))color="#0000FF";
				else if(col.equals("GREEN"))color="#00FF00";
				else if(col.equals("PINK"))color="#FFC0CB";
				else if(col.equals("WHITE"))color="#FFFFFF";
				else if(col.equals("YELLOW"))color="#FFFF00";
				colorForm.append("<span style='background-color:"+color+"' displaygroup='1' class='chips xans-record-'></span>");
			}
			pruductList.append("<li id='"+dto.getCode()+"' class='item xans-record-'>"
					+"<div class='box'><div class='thumbnail'>"
					+"<a href='/kgmall/product/select.do?name="+dto.getName()+"'><img src='../image/productImage/"+dto.getImageLink()+"' class='thumb'></a>"
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
		int totalA = 0;
		if(map.get("category").equals("SUBCATEGORY")) {
			totalA = listDAO.getSubcategoryTotal(map.get("subcategory"));
		}else {
			totalA = listDAO.getMajorCategoryTotal(map.get("majorcategory"));
		}
		listPaging.setCurrentPage(pg);
		listPaging.setPageBlock(5);
		listPaging.setPageSize(9);
		listPaging.setTotalA(totalA);
		listPaging.makeSelectPagingHTML();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pruductList",pruductList);
		mav.addObject("totalA",totalA);
		mav.addObject("listPaging",listPaging);
		mav.addObject("pg",pg);
		mav.setViewName("jsonView");
		return mav;
		
	}
	
	@RequestMapping(value="/SelectListForm.do", method=RequestMethod.POST)
	public ModelAndView SelectListForm(@RequestParam(required=false,defaultValue="1") int pg,@RequestParam Map<String,String>map) {
		listPaging.setCategory(map.get("majorcategory"));
		listPaging.setCategory(map.get("subcategory"));
		int endNum = pg*9;
		int startNum = endNum-8;
		StringBuffer pruductList = new StringBuffer();
		StringBuffer colorForm = new StringBuffer();
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		List<ListDTO> list = listDAO.getProductSelectList(map);
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
					+"<a href='/kgmall/product/select.do?name="+dto.getName()+"'><img src='../image/productImage/"+dto.getImageLink()+"' class='thumb'></a>"
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
		
		int totalA = listDAO.getSubcategoryTotal(map.get("subcategory"));
		listPaging.setCurrentPage(pg);
		listPaging.setPageBlock(5);
		listPaging.setPageSize(9);
		listPaging.setTotalA(totalA);
		listPaging.makeSelectPagingHTML();
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pruductList",pruductList);
		mav.addObject("totalA",totalA);
		mav.addObject("pg",pg);
		mav.addObject("listPaging",listPaging);
		mav.setViewName("jsonView");
		return mav;
	}
}
