package product.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ProductDTO {
	private String majorCategory;
	private String subCategory;
	private String company;
	private String name;
	private String code;
	private int price;
	private int thumbsup; //thumbsup 컬럼 추가 필요!
	private String imageLink;
	private String productImage1;
	private String productImage2;
	private String productImage3;
	private String logtime;
}
