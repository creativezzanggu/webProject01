package review.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.bean.QADTO;
import board.bean.QAreplyDTO;
import list.bean.ListDTO;
import list.dao.ListDAO;
import product.bean.ProductDTO;
import review.bean.ReviewDTO;
import review.bean.ReviewReplyDTO;
import review.dao.ReviewDAO;

@Controller
@RequestMapping("/review")
public class ReviewController {
	@Autowired
	private ReviewDAO reviewDAO;
	@Autowired
	private ListDAO listDAO;
	
	@RequestMapping(value="/reviewForm.do", method=RequestMethod.GET)
	public String reviewForm(@RequestParam(required=false,defaultValue="1") String pg,Model model) {
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/review/reviewForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/reviewViewForm.do", method=RequestMethod.GET)
	public String reviewViewForm(@RequestParam int seq,Model model,HttpServletRequest req, HttpServletResponse resp,HttpSession session) {
		boolean today = false;
		Cookie[] ar = req.getCookies();
		if(ar != null) {
			for(int i=0; i<ar.length; i++) {
				if(ar[i].getName().equals(session.getAttribute("id")+Integer.toString(seq))) {
					today=true;
				}
			}//for
			if(!today) {
				reviewDAO.hitUp(seq);
				
				Cookie cookie = new Cookie(session.getAttribute("id")+Integer.toString(seq), seq+"");
				cookie.setMaxAge(30);
				resp.addCookie(cookie);
			}
		}//if
		ReviewDTO review = reviewDAO.getReview(seq);
		model.addAttribute("id",session.getAttribute("id"));
		model.addAttribute("review", review);
		model.addAttribute("display", "/review/reviewViewForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/reviewWriteForm.do", method=RequestMethod.GET)
	public String reviewWriteForm(Model model) {
		model.addAttribute("display", "/review/reviewWriteForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/reviewModify.do", method=RequestMethod.POST)
	public String reviewModify(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		ReviewDTO reviewDTO= reviewDAO.getReview(Integer.parseInt(map.get("seq")));
		model.addAttribute("review", reviewDTO);
		model.addAttribute("display", "/review/reviewModifyForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/insertReveiw.do", method=RequestMethod.POST)
	public String QAwriteInsert(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		map.put("id",(String) session.getAttribute("id"));
		map.put("name",(String) session.getAttribute("name"));
		map.put("email",(String) session.getAttribute("email"));
		
		ProductDTO productDTO = reviewDAO.getProduct(map.get("productname"));
		map.put("productname",productDTO.getName());
		map.put("productsrc",productDTO.getImageLink());
		reviewDAO.insertReview(map);
		
		return "redirect:/review/reviewForm.do";
	}
	
	@RequestMapping(value="/updateReveiw.do", method=RequestMethod.POST)
	public String updateReview(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		reviewDAO.updateReview(map);
		
		return "redirect:/review/reviewViewForm.do?seq"+map.get("seq");
	}
	
	@RequestMapping(value="/getProduct.do", method=RequestMethod.POST)
	@ResponseBody
	public String getProduct(@RequestParam String productname,@RequestParam String product_category) {
		Map<String,String> map = new HashMap<String, String>();
		map.put("productname", productname);
		map.put("product_category", product_category);
		
		ProductDTO checkProduct = reviewDAO.getProductCheck(map);
		String check = null;
		if(checkProduct == null) {
			check ="no";
		}else {
			check ="yes";
		}
		
		
		

		return check;
	}
	
	@RequestMapping(value="/reviewListForm.do", method=RequestMethod.POST)
	public ModelAndView reviewListForm(@RequestParam(required=false,defaultValue="1") int pg) {
		int endNum = pg*9;
		int startNum = endNum-8;
		StringBuffer reviewList = new StringBuffer();
		
		Map<String,String> map = new HashMap<String, String>();
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		List<ReviewDTO> list = reviewDAO.getReviewList(map);
		for(ReviewDTO dto : list) {
			reviewList.append("<li id='"+dto.getSeq()+"' class='item xans-record-'>"
					+"<div class='box'><div class='thumbnail'>"
					+"<a href='/kgmall/product/select.do?name="+dto.getImgName()+"'><img src='../image/productImage/"+dto.getImgSrc()+"' class='thumb'></a>"
					+"</div><div class='description'><div class='fadearea'>"
					+"<p class='name'>"
					+"<a href='/kgmall/review/reviewViewForm.do?seq="+dto.getSeq()+"'><span style='font-size:12px;color:#555555;'>"+dto.getSubject()+"</span></a></p>"
					+"<ul class='xans-element- xans-product'>"
					+"<li class='xans-record-'><span style='font-size:11px;color:#555555;'>"+dto.getId()+"</span></li>" 
					+"<li class='xans-record-'><span style='font-size:12px;color:#333333;'>"+dto.getHit()+"</span></li></ul>"
					+"</div></div></div>");
		}
		int totalA = reviewDAO.getReviewTotal();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("reviewList",reviewList);
		mav.addObject("totalA",totalA);
		mav.addObject("listPaging","");
		mav.addObject("pg",pg);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/reviewDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public String reviewDelete(@RequestParam String seq) {
		reviewDAO.reviewDelete(seq);
		return "ok";
	}
	
	@RequestMapping(value="/reviewReplyInsert.do", method=RequestMethod.POST)
	@ResponseBody
	public String reviewReplyInsert(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		ReviewReplyDTO dto = reviewDAO.reviewReplyInsertCheck(map);//중복글체크
		ReviewDTO reviewDTO= reviewDAO.getReview(Integer.parseInt(map.get("seq")));
		if(dto==null)reviewDAO.reviewReplyInsert(map);
		else if(dto != null) {
			return "no";
		}
		
		model.addAttribute("review",reviewDTO);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		return "insert";	
	}
	
	@RequestMapping(value="/reviewReplyList.do", method=RequestMethod.POST)
	public ModelAndView reviewReplyList(@RequestParam Map<String,String> map) {
		List<ReviewReplyDTO> list= reviewDAO.getReply(Integer.parseInt(map.get("seq")));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer reviewReply = new StringBuffer();
		reviewReply.append("<ul class='boardComment'>");
		for(ReviewReplyDTO dto : list) {
			reviewReply.append(
					"<li id='replyseq"+dto.getReplyseq()+"' class='xans-record-'>"+ 
					"<div id='commentTop' class='commentTop'>"+
					"<strong class='name txtLittle'>"+
					"<span class='cmtBy'>Comment by</span>"+
					"<span class='cmtName'>"+dto.getId()+"</span></strong>" + 
					"<span class='date'>"+sdf.format(dto.getLogtime())+"</span>"+ 
					"<span class='button btnAreaCustom'>"+ 
					"<input type='button' value='수정' onclick=reviewReplyModify('"+dto.getReplyseq()+"','"
					+dto.getId()+"','"+dto.getSeq()+"') class='btn Tiny Light'>"+ 
					"<input type='button' value='삭제' onclick=reviewReplydelete('"+dto.getReplyseq()+"') class='btn Tiny Light mL4'>"+ 
					"</span>"+ 
					"</div>"+ 
					"<div class='comment txtLittle'>" + 
					"<span>"+dto.getContent()+"</span></div></li>");
		}reviewReply.append("</ul>");
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("reviewReply",reviewReply);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/reviewReplydelete.do", method=RequestMethod.POST)
	public void reviewReplydelete(@RequestParam int replyseq) {
		reviewDAO.reviewReplyDelete(replyseq);
	}
	
	@RequestMapping(value="/reviewReplyGetContent.do",method=RequestMethod.POST)
	public ModelAndView reviewReplyGetContent(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		String content = reviewDAO.reviewReplyGetContent(map);
		ReviewDTO reviewDTO = reviewDAO.getReview(Integer.parseInt(map.get("seq")));
		
		model.addAttribute("review",reviewDTO);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		ModelAndView mav = new ModelAndView();
		mav.addObject("content",content);
		mav.setViewName("jsonView");
		return mav;
		
	}
	
	@RequestMapping(value="/reviewReplyUpdate.do", method=RequestMethod.POST)
	@ResponseBody
	public String reviewReplyUpdate(@RequestParam Map<String,String> map,Model model,HttpSession session) {
		ReviewDTO reviewDTO = reviewDAO.getReview(Integer.parseInt(map.get("seq")));
		reviewDAO.reviewReplyUpdate(map);
		
		model.addAttribute("review",reviewDTO);
		model.addAttribute("seq",map.get("seq"));
		model.addAttribute("id",session.getAttribute("id"));
		return "ok";
	}
}
