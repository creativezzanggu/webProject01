package admin.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class DetailProductDTO {
	private String ncs;
	private int count;
	
	public String getNcs() {
		return ncs;
	}
	public void setNcs(String ncs) {
		this.ncs = ncs;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
