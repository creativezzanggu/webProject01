package admin.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class AdminDTO {

	private String majorCategory; //占쏙옙�겫袁⑥첒
	private String subCategory; //占쎈꺖�겫袁⑥첒
	private String company; //占쎌젫鈺곌퀣沅�
	private String name; //占쎄맒占쎈�뱄쭗占�
	private String code; //占쎄맒占쎈�배굜遺얜굡 + 占쎄퉳占쎄맒 + 占쎄텢占쎌뵠筌앾옙
	private int price; //占쎄맒占쎈�밧첎占썲칰占�
	private int thumbsup;
	private String imageLink; //占쎄맒占쎈�뱄쭕怨밴쾿
	private String productImage1; //占쎄맒占쎈�� 占쎌뵠沃섎챷占�1
	private String productImage2; //占쎄맒占쎈�� 占쎌뵠沃섎챷占�2
	private String productImage3; //占쎄맒占쎈�� 占쎌뵠沃섎챷占�3

}
