package main.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;

@Transactional
@Component
public class MainDAOMybatis implements MainDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ProductDTO> search(String keyword) {
		return sqlSession.selectList("mainSQL.search", keyword);
	}

	@Override
	public List<ProductDTO> searchDetail(Map<String, String> map) {
		return sqlSession.selectList("mainSQL.searchDetail", map);
	}
}
