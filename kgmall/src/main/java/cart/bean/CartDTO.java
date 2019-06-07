package cart.bean;

import org.springframework.stereotype.Component;

import lombok.Data;
@Component
@Data
public class CartDTO {
	String product;
	int productCount;
	String sellId;
}
