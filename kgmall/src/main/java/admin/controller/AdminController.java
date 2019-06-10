package admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import admin.bean.AdminDTO;
import admin.bean.DetailProductDTO;
import admin.dao.AdminDAO;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminDAO adminDAO;
	
	@RequestMapping(value="/productInsertForm.do", method=RequestMethod.GET)
	public String productInsertForm(Model model) {
		model.addAttribute("display","/admin/productInsertForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/productInsert.do", method=RequestMethod.POST)
	public String productInsert(@RequestParam Map<String,String> map,Model model) {	
		adminDAO.productInsert(map);
		model.addAttribute("display","/admin/productInsertForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/detailProductInsert.do", method=RequestMethod.POST)
	public void detailProductInsert(@RequestParam Map<String,String> map,Model model) {
		map.put("ncs", map.get("ncs").toUpperCase());
		System.out.println("detailProductInsert"+map);

		adminDAO.detailProductInsert(map);
	}
	
	@RequestMapping(value="/productListForm.do", method=RequestMethod.GET)
	public String productListForm(Model model) {
		model.addAttribute("display","/admin/productList.jsp");
		
		return "/main/index";
	}
	
	@RequestMapping(value="/productList.do", method=RequestMethod.GET)
	public ModelAndView productList() {
		StringBuffer productList = new StringBuffer();
		StringBuffer detailList = new StringBuffer();
		List<AdminDTO> list = adminDAO.productList();
		
		for(int i=0;i<list.size();i++) {
			List<DetailProductDTO> list3 = adminDAO.detailProductListCount(list.get(i).getName());
			for(int j=0;j<list3.size();j++) {
				
				productList.append("<tr id='tr"+list3.get(j).getProductname()+"'><td>"+list.get(i).getMajorCategory()+"</td>"
						+"<td>"+list.get(i).getSubCategory()+"</td>"
						+"<td>"+list.get(i).getCompany()+"</td>");
				productList.append("<td>"+list3.get(j).getProductname()+"</td>"
						+"<td><input type='text' size='1' value='"+list3.get(j).getProductcount()+"' id='input"+list3.get(j).getProductname()+"'></td>");
				productList.append("<td>"+list.get(i).getCode()+"</td>"
						+"<td>"+list.get(i).getPrice()+"</td>"
						+"<td><img src='"+list.get(i).getImageLink()+"'</td>"
						+"<td><img src='"+list.get(i).getProductImage1()+"'</td>"
						+"<td><img src='"+list.get(i).getProductImage2()+"'</td>"
						+"<td><img src='"+list.get(i).getProductImage3()+"'</td>"
						+"<td><input type='button' id='modify' onclick=countModify('"+list3.get(j).getProductname()+"') value='����' size='5'>&nbsp;"
						+"<input type='button' id='delete' onclick=countDelete('"+list3.get(j).getProductname()+"') value='����' size='5'></td></tr>");
				detailList.setLength(0);
			}
		}
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("productList",productList);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/countUpdate.do", method=RequestMethod.POST)
	public void countUpdate(@RequestParam Map<String,String>map) {
		adminDAO.countUpdate(map);
	}
	
	@RequestMapping(value="/countDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public String countDelete(@RequestParam Map<String,String>map,

							@RequestParam String productname) {
		adminDAO.countDelete(map);
		int check =adminDAO.checkProduct(productname);
		if(check==0) {
			adminDAO.productDelete(productname);
		}
		return "yes";
	}
}



