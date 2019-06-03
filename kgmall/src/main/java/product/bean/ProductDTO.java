package product.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ProductDTO {
	private String majorCategory;
	private String subCategory;
	private String name;
	private int price;
	private String code;
	private String company;
	private int count;
	private String imageLink;
	private String productImage1;
	private String productImage2;
	private String productImage3;
}
