package order.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class OrderDTO {
	private int seq;
	private String image;
	private String productName;
	private int sell;
	private int quantity;
	private int total;
	private String orderId;
	private String orderState;
	private Date logtime;
}
