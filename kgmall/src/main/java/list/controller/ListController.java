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
import list.dao.ListDAO;

@Controller
@RequestMapping("/list")
public class ListController {
	@Autowired
	ListDAO listDAO;
	
	
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
		
		Map<String,Integer> map = new HashMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		
		List<ListDTO> list = listDAO.getProductList(map);
		System.out.println(list);
		for(ListDTO dto : list) {
			String name = dto.getName();
		}
		int totalA = listDAO.getTotal();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("totalA",totalA);
		mav.addObject("pg",pg);
		mav.setViewName("jsonView");
		return mav;
	}

}
