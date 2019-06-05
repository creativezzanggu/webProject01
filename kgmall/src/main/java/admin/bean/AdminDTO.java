package admin.bean;

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
	//private int count; //�닔�웾
	private String imageLink; //�긽�뭹留곹겕
	private String productImage1; //�긽�뭹 �씠誘몄�1
	private String productImage2; //�긽�뭹 �씠誘몄�2
	private String productImage3; //�긽�뭹 �씠誘몄�3
	
	public String getMajorCategory() {
		return majorCategory;
	}
	public void setMajorCategory(String majorCategory) {
		this.majorCategory = majorCategory;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getImageLink() {
		return imageLink;
	}
	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
	public String getProductImage1() {
		return productImage1;
	}
	public void setProductImage1(String productImage1) {
		this.productImage1 = productImage1;
	}
	public String getProductImage2() {
		return productImage2;
	}
	public void setProductImage2(String productImage2) {
		this.productImage2 = productImage2;
	}
	public String getProductImage3() {
		return productImage3;
	}
	public void setProductImage3(String productImage3) {
		this.productImage3 = productImage3;
	}
}
