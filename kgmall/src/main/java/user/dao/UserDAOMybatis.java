package user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import kr.co.hucloud.utilities.ShaPasswordEncoderTest;
import user.bean.UserDTO;

@Transactional
//@Component
@Repository
public class UserDAOMybatis implements UserDAO {
	@Autowired
	private SqlSession sqlSession;
	
	private ShaPasswordEncoderTest shaPasswordEncoderTest;

	@Override
	public void write(UserDTO userDTO) {
		shaPasswordEncoderTest = new ShaPasswordEncoderTest();
		String passwd = shaPasswordEncoderTest.PasswordEncoder(userDTO.getPwd());
		userDTO.setPwd(passwd);
		sqlSession.insert("userSQL.write", userDTO);
		
	}


	@Override
	public Map<String, String> getUser(Map<String,String> map) {
		shaPasswordEncoderTest = new ShaPasswordEncoderTest();
		String passwd = shaPasswordEncoderTest.PasswordEncoder(map.get("pwd"));
		map.put("pwd", passwd);
		return sqlSession.selectOne("userSQL.getUser", map);
	}
	
	@Override
	public UserDTO isExistId(String id) {
		return sqlSession.selectOne("userSQL.isExistId", id);
	}


	@Override
	public String confirmEmail(String email) {
		return sqlSession.selectOne("userSQL.confirmEmail",email);
	}

	@Override
	public String idCheck(String email) {
		return sqlSession.selectOne("userSQL.getId", email);
	}


	@Override
	public Map<String,String> pwdCheck(Map<String,String> map) {
		return sqlSession.selectOne("userSQL.getPwd", map);
	}


	@Override
	public void pwdUpdate(Map<String,String> map) {
		shaPasswordEncoderTest = new ShaPasswordEncoderTest();
		String passwd = shaPasswordEncoderTest.PasswordEncoder(map.get("pwd"));
		map.put("pwd",passwd);
		sqlSession.update("userSQL.updatePwd", map);
		
	}
	
	
}
