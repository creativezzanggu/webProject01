package admin.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class AdminDTO {
	private String majorCategory; //��遺꾨쪟
	private String subCategory; //�냼遺꾨쪟
	private String company; //�젣議곗궗
	private String name; //�긽�뭹紐�
	private String code; //�긽�뭹肄붾뱶 + �깋�긽 + �궗�씠利�
	private int price; //�긽�뭹媛�寃�
	private int thumbsup; //�닔�웾
	private String imageLink; //�긽�뭹留곹겕
	private String productImage1; //�긽�뭹 �씠誘몄�1
	private String productImage2; //�긽�뭹 �씠誘몄�2
	private String productImage3; //�긽�뭹 �씠誘몄�3
	private Date logtime;
}
