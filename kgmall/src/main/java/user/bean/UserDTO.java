package user.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class UserDTO {
	private String id;
	private String pwd;
	private String name;
	private String phone1;
	private String phone2;
	private String phone3;
	private String email1;
	private String email2;
	
}
