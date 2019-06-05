package admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import admin.dao.AdminDAO;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminDAO adminDAO;
	
	@RequestMapping(value="/productInsertForm.do", method=RequestMethod.GET)
	public String productInsertForm() {
		
		return "/admin/productInsertForm";
	}
	
	@RequestMapping(value="/productInsert.do", method=RequestMethod.POST)
	public String productInsert(@RequestParam Map<String,String> map,Model model) {	
		model.addAttribute("display","/admin/productInsertForm.jsp");
		adminDAO.productInsert(map);
		
		return "/main/index";
	}
	
	@RequestMapping(value="/detailProductInsert.do", method=RequestMethod.POST)
	public void detailProductInsert(@RequestParam Map<String,String> map,Model model) {
		adminDAO.detailProductInsert(map);
	}
}
