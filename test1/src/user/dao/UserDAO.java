package user.dao;

import java.util.Map;

import user.bean.UserDTO;

public interface UserDAO {
	public void write(UserDTO userDTO);

	public String login(Map<String, String> map);
}
