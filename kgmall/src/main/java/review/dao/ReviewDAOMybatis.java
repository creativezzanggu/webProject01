package review.dao;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Transactional
@Component
public class ReviewDAOMybatis implements ReviewDAO{
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping(value="/reviewForm.do", method=RequestMethod.GET)
	public String reviewForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/review/reviewForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/reviewWriteForm.do", method=RequestMethod.GET)
	public String reviewWriteForm(Model model) {
		model.addAttribute("display", "/review/reviewWriteForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/insertReveiw.do", method=RequestMethod.POST)
	public String QAwriteInsert(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		map.put("id",(String) session.getAttribute("id"));
		map.put("name",(String) session.getAttribute("name"));
		map.put("email",(String) session.getAttribute("email"));
		
		//reviewDAO.insert(map);
		
		return "redirect:/review/reviewForm.do";
	}
}
