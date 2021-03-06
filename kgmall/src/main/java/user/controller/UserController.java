package user.controller;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Session;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import user.bean.UserDTO;
import user.dao.UserDAO;
import user.mail.FindUtil;
import user.mail.MailUtil;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(value="/loginForm.do", method=RequestMethod.GET)
	public String loginForm(Model model) {
		model.addAttribute("display", "/user/loginForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/writeForm.do", method=RequestMethod.GET)
	public String writeForm(Model model) {
		model.addAttribute("display", "../user/writeForm.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/checkEmail.do", method=RequestMethod.POST)
	public @ResponseBody String checkEmail(@RequestParam String email) {
		String checkEmail = userDAO.checkEmail(email);
		if(checkEmail!=null) 
			return "1";
		else
			return "0";
	}

	@RequestMapping(value="/write.do", method=RequestMethod.POST)
	public String write(@ModelAttribute UserDTO userDTO, Model model) {	
		//DB
		userDAO.write(userDTO);
		model.addAttribute("display", "../user/writeOk.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/infoUpdateForm.do", method=RequestMethod.GET)
	public String infoUpdateForm(Model model) {
		model.addAttribute("display", "../user/infoUpdate.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/infoUpdate.do", method=RequestMethod.GET)
	public String infoUpdate(@RequestParam Map<String,String> map, Model model, HttpSession session) {
		userDAO.infoUpdate(map);
		session.setAttribute("pwd", map.get("pwd"));
		session.setAttribute("email", map.get("email1")+"@"+map.get("email2"));
		session.setAttribute("phone", map.get("phone1")+"-"+map.get("phone2")+"-"+map.get("phone3"));
		model.addAttribute("display", "../user/myPage.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/searchId.do", method=RequestMethod.GET)
	public String searchId(Model model) {
		model.addAttribute("display", "../user/searchId.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/searchPwd.do", method=RequestMethod.GET)
	public String searchpwd(Model model) {
		model.addAttribute("display", "../user/searchPwd.jsp");
		return "/main/index";
	}

	@RequestMapping(value="/checkId.do", method=RequestMethod.POST)
	public @ResponseBody String checkId(@RequestParam String id) {
		UserDTO userDTO = userDAO.isExistId(id);
		
		if(userDTO==null)
			return "not_exist";
		else
			return "exist";		
	}
	
	
	@RequestMapping(value="/getUser.do", method=RequestMethod.POST)
	public ModelAndView getUser(@RequestParam Map<String,String> map, HttpSession session) {
		Map<String,String> map2 = userDAO.getUser(map);
		ModelAndView mav = new ModelAndView();
		
		if(map2==null) {
			mav.addObject("0", 0);
			mav.setViewName("jsonView");
			return mav;
		}else {
		session.setAttribute("id", map2.get("ID"));
		session.setAttribute("name", map2.get("NAME"));
		session.setAttribute("email", map2.get("EMAIL"));
		session.setAttribute("phone", map2.get("PHONE"));
		session.setAttribute("usergrade", map2.get("USERGRADE"));
		mav.addObject("map", map2);
		mav.setViewName("jsonView");
		
		return mav;
		}
	}
	
	@RequestMapping(value="/logout.do", method=RequestMethod.GET)
	public String logout(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("display", "../template/body.jsp");
		session.invalidate();
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(int i=0; i< cookies.length; i++){
				cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
				response.addCookie(cookies[i]); // 응답 헤더에 추가
			}
		}
		return "/main/index";
	}
	
	@RequestMapping(value="/emailCheck.do", method=RequestMethod.GET)
	public ModelAndView emailCheck(@RequestParam String email) {
		ModelAndView mav = new ModelAndView();
		String mail = userDAO.confirmEmail(email);
		mav.addObject("email", mail);
		mav.setViewName("jsonView");
		return mav;

	}
	@RequestMapping(value="/emailCheckNumSend.do", method=RequestMethod.GET)
	public String emailCheckNumSend(@RequestParam String email, HttpSession session, Model model) {
		String keyCode;
		try {
			keyCode = FindUtil.createKey();
			session.setAttribute("keyCode", keyCode);
			String subject = "비밀번호 찾기 인증코드 안내";
			
			String msg = "";
			msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
			msg += "<h3 style='color:blue;'>비밀번호 찾기 인증코드입니다.</h3>";
			msg += "<div style='font-size:130%'>";
			msg += "비밀번호 찾기 페이지로 돌아가 인증코드<strong>";
			msg += keyCode + "</strong>를 입력해주세요.</div><br/>";
			
			MailUtil.sendMail(email, subject, msg);
			model.addAttribute("display","../user/emailCheck.jsp");
			model.addAttribute("email", email);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "/main/index";
	}
	
	@RequestMapping(value="/emailCheckNumSend2.do", method=RequestMethod.GET)
	public String emailCheckNumSend2(@RequestParam String email, HttpSession session, Model model) {
		String keyCode;
		try {
			keyCode = FindUtil.createKey();
			session.setAttribute("keyCode", keyCode);
			String subject = "비밀번호 찾기 인증코드 안내";
			
			String msg = "";
			msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
			msg += "<h3 style='color:blue;'>비밀번호 찾기 인증코드입니다.</h3>";
			msg += "<div style='font-size:130%'>";
			msg += "비밀번호 찾기 페이지로 돌아가 인증코드<strong>";
			msg += keyCode + "</strong>를 입력해주세요.</div><br/>";
			
			MailUtil.sendMail(email, subject, msg);
			model.addAttribute("display","../user/emailCheck2.jsp");
			model.addAttribute("email", email);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "/main/index";
	}
	
	@RequestMapping(value="/getId.do", method=RequestMethod.GET)
	public String getId(@RequestParam String email, Model model, HttpSession session) {
		String id = userDAO.idCheck(email);
		model.addAttribute("display", "../user/getId.jsp");
		model.addAttribute("id", id);
		session.invalidate();
		return "/main/index";
	}
	
	@RequestMapping(value="/getPwd.do", method=RequestMethod.GET)
	public String getPwd(@RequestParam String email, Model model, HttpSession session) {
		model.addAttribute("display", "../user/updatePwd.jsp");
		model.addAttribute("email", email);
		return "/main/index";
	}
	
	@RequestMapping(value="/pwdEmailCheck.do", method=RequestMethod.GET)
	public @ResponseBody String pwdEmailCheck(@RequestParam Map<String,String> map) {
		Map<String,String> mail = userDAO.pwdCheck(map);
		if(mail == null) {
			return "0";
		}
		else {
			return mail.get("EMAIL");
		}
	}
	
	@RequestMapping(value="/updatePwd.do", method=RequestMethod.POST)
	public String updatePwd(@RequestParam Map<String,String> map, Model model, HttpSession session) {
		userDAO.pwdUpdate(map);
		model.addAttribute("display", "../user/loginForm.jsp");
		session.invalidate();
		return "/main/index";
	}
	
	@RequestMapping(value="/myPage.do", method=RequestMethod.GET)
	public String myPage(Map<String,String> map, Model model, HttpSession session) {
		model.addAttribute("display", "../user/myPage.jsp");
		return "/main/index";
	}
	
	@RequestMapping(value="/usergradeSilver.do",method=RequestMethod.POST)
	public void usergradeSilver(String id, HttpSession session) {
		userDAO.usergradeSilver(id);
		session.setAttribute("usergrade", "silver");
		
	}
	@RequestMapping(value="/usergradeGold.do",method=RequestMethod.POST)
	public void usergradeGold(String id, HttpSession session) {
		userDAO.usergradeGold(id);
		session.setAttribute("usergrade", "gold");
	}
	
}
