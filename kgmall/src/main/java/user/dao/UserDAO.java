package user.dao;

import java.util.List;
import java.util.Map;

import user.bean.UserDTO;

public interface UserDAO {
	public void write(UserDTO userDTO);
	public UserDTO isExistId(String id);
	public Map<String,String> getUser(Map<String,String> map);
	public String confirmEmail(String email);
	public String idCheck(String email);
	public Map<String,String> pwdCheck(Map<String,String> map);
	public void pwdUpdate(Map<String,String> map);
	public String checkEmail(String email);
	
}
