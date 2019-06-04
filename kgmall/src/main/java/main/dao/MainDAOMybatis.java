package main.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class MainDAOMybatis implements MainDAO {
	@Autowired
	private SqlSession sqlSession;
	
	
}
