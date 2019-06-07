package admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
		System.out.println("productInsert"+map);
		adminDAO.productInsert(map);
		model.addAttribute("display","/admin/productInsertForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/detailProductInsert.do", method=RequestMethod.POST)
	public void detailProductInsert(@RequestParam Map<String,String> map,Model model) {
		System.out.println("detailProductInsert"+map);
		adminDAO.detailProductInsert(map);
	}
	
	@RequestMapping(value="/productListForm.do", method=RequestMethod.GET)
	public String productListForm(Model model) {
		StringBuffer productList = new StringBuffer();
		List<AdminDTO> list = adminDAO.productList();
		List<DetailProductDTO> list2 = adminDAO.detailProductList();
		productList.append("<tr>");
		for(AdminDTO dto : list) {
			productList.append("<td>"+dto.getMajorCategory()+"</td>"
					+"<td>"+dto.getSubCategory()+"</td>"
					+"<td>"+dto.getCompany()+"</td>");
			for(DetailProductDTO dto2 :list2) {
				productList.append("<td>"+dto2.getNcs()+"</td>"
						+"<td>"+dto2.getCount()+"</td>");
			}productList.append("<td>"+dto.getCode()+"</td>"
					+"<td>"+dto.getPrice()+"</td>"
					+"<td>"+dto.getImageLink()+"</td>"
					+"<td>"+dto.getProductImage1()+"</td>"
					+"<td>"+dto.getProductImage2()+"</td>"
					+"<td>"+dto.getProductImage3()+"</td>");
		}productList.append("</tr>");
		model.addAttribute("productList",productList);
		model.addAttribute("display","/admin/productList.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/productList.do", method=RequestMethod.GET)
	public ModelAndView productList(Model model) {
		StringBuffer productList = new StringBuffer();
		List<AdminDTO> list = adminDAO.productList();
		List<DetailProductDTO> list2 = adminDAO.detailProductList();
		productList.append("<tr>");
		for(AdminDTO dto : list) {
			productList.append("<td>"+dto.getMajorCategory()+"</td>"
					+"<td>"+dto.getSubCategory()+"</td>"
					+"<td>"+dto.getCompany()+"</td>");
			for(DetailProductDTO dto2 :list2) {
				productList.append("<td>"+dto2.getNcs()+"</td>"
						+"<td>"+dto2.getCount()+"</td>");
			}productList.append("<td>"+dto.getCode()+"</td>"
					+"<td>"+dto.getPrice()+"</td>"
					+"<td>"+dto.getImageLink()+"</td>"
					+"<td>"+dto.getProductImage1()+"</td>"
					+"<td>"+dto.getProductImage2()+"</td>"
					+"<td>"+dto.getProductImage3()+"</td>");
		}productList.append("</tr>");
		ModelAndView mav = new ModelAndView();
		mav.addObject("productList",productList);
		mav.setViewName("jsonView");
		return mav;
	}
}
