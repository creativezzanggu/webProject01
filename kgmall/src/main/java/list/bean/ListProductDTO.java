package list.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ListProductDTO {
	private String ncs;
	private int count;
	private Date logtiem;
}
