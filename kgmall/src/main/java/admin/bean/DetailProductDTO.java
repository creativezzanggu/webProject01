package admin.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class DetailProductDTO {
	private String productname;
	private int productcount;
	private Date logtime;
}
