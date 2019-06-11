package admin.controller;

import java.text.SimpleDateFormat;
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
import lombok.Data;
import order.bean.OrderDTO;

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
		map.put("name", map.get("name").toUpperCase());
		map.put("code", map.get("code").toUpperCase());
		map.put("company", map.get("company").toUpperCase());
		adminDAO.productInsert(map);
		model.addAttribute("display","/admin/productInsertForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/detailProductInsert.do", method=RequestMethod.POST)
	public void detailProductInsert(@RequestParam Map<String,String> map,Model model) {
		map.put("ncs", map.get("ncs").toUpperCase());
		

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
						+"<td><img width='50' height='50' src='../image/productImage/"+list.get(i).getImageLink()+"'></td>"
						+"<td><img width='50' height='50' src='../image/productImage/"+list.get(i).getProductImage1()+"'></td>"
						+"<td><img width='50' height='50' src='../image/productImage/"+list.get(i).getProductImage2()+"'></td>"
						+"<td><img width='50' height='50' src='../image/productImage/"+list.get(i).getProductImage3()+"'></td>"
						+"<td><input type='button' id='modify' onclick=countModify('"+list3.get(j).getProductname()+"') value='�닔�젙' size='5'>&nbsp;"
						+"<input type='button' id='delete' onclick=countDelete('"+list3.get(j).getProductname()+"') value='�궘�젣' size='5'></td></tr>");
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
		int check = adminDAO.checkProduct(productname);
		if(check==0) {
			adminDAO.productDelete(productname);
		}
		return "yes";
	}
	@RequestMapping(value="/orderListForm.do", method=RequestMethod.GET)
	public String orderListForm(Model model) {
		model.addAttribute("display","/admin/orderList.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/orderList.do", method=RequestMethod.GET)
	public ModelAndView orderList() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer orderlist = new StringBuffer();
		List<OrderDTO> list = adminDAO.orderList();
		for(OrderDTO dto : list) {
			orderlist.append("<tr><td>"+dto.getSeq()+"</td>"
					+"<td><img width='50' height='50' src='../image/productImage/"+dto.getImage()+"'></td>"
					+"<td>"+dto.getProductName()+"</td>"
					+"<td>"+dto.getSell()+"</td>"
					+"<td>"+dto.getQuantity()+"</td>"
					+"<td>"+dto.getTotal()+"</td>"
					+"<td id='order"+dto.getSeq()+"'>"+dto.getOrderState()+"</td>"
					+"<td>"+dto.getOrderId()+"</td>"
					+"<td>"+sdf.format(dto.getLogtime())+"</td>"
					+"<td><input type='button'  onclick=orderOK('"+dto.getSeq()+"') value='二쇰Ц�솗�씤' size='5'>&nbsp;</tr>");
		}
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("orderlist",orderlist);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/orderOK.do", method=RequestMethod.POST)
	public ModelAndView orderOK(@RequestParam Map<String,String> map) {

		int check = adminDAO.checkOrder(map);
		String check2 = null;
		if(check==0) {
			adminDAO.orderOK(map);
			check2="ok";
		}else {
			check2=null;
		}
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("check2",check2);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/checkName.do", method=RequestMethod.POST)
	@ResponseBody
	public String checkName(@RequestParam String name) {
		AdminDTO adminDTO = adminDAO.nameCheck(name.toUpperCase());
		
		if(adminDTO==null) 
			return "name_ok";
		else
			return "name_fail";
	}
}
