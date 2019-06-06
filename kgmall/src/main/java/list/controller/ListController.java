package list.controller;

import java.util.HashMap;
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
	
	
	@RequestMapping(value="/bottomListForm.do", method=RequestMethod.GET)
	public String bottomListForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/list/bottomListForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/BottomList.do", method=RequestMethod.POST)
	public ModelAndView BottomList(@RequestParam(required=false,defaultValue="1") int pg,Model model) {
		int endNum = pg*9;
		int startNum = endNum-8;
		StringBuffer pruductList = new StringBuffer();
		StringBuffer colorForm = new StringBuffer();
		Map<String,Integer> map = new HashMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		
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
					+"<a><img src='../image/bottom.jpg' id='eListPrdImage111_1' class='thumb'></a>"
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
		int totalA = listDAO.getTotal();
		listPaging.setCurrentPage(pg);
		listPaging.setPageBlock(5);
		listPaging.setPageSize(9);
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

}
