package user.mail;

import org.apache.commons.mail.HtmlEmail;

public class MailUtil {
	public static void sendMail(String email, String subject, String msg) throws Exception {
		//Mail Server 설정
		String charSet = "utf-8";
		String hostSMTP = "smtp.naver.com";  // SMTP 서버명
		String hostSMTPid = "kty2235"; //아이디
		String hostSMTPpwd = "xodus3679$";
		
		//보내는 사람
		String fromEmail = "kty2235@naver.com";
		String fromName = "KG observer";
		
		//email 전송
		try {
			HtmlEmail mail = new HtmlEmail();
			mail.setDebug(true);
			mail.setCharset(charSet);
			mail.setSSLOnConnect(true);  //SSL 사용 (TLS가 없는경우)
			
			mail.setHostName(hostSMTP);
			mail.setSmtpPort(587); // 포트번호
			
			mail.setAuthentication(hostSMTPid, hostSMTPpwd);
			mail.setStartTLSEnabled(true); //TLS 사용
			mail.addTo(email);
			mail.setFrom(fromEmail, fromName, charSet);
			mail.setSubject(subject);
			mail.setHtmlMsg(msg);
			mail.send();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
