package main.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
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
	public List<ProductDTO> searchDetail(Map<String, String> map) {
		return sqlSession.selectList("mainSQL.searchDetail", map);
	}

	@Override
	public int countItems(Map<String, String> map) {
		return sqlSession.selectOne("mainSQL.countItems", map);
	}

	@Override
	public List<ProductDTO> getNewItemList() {
		return sqlSession.selectList("mainSQL.getNewItemList");
	}

	@Override
	public List<String> getColor(String productname) {
		return sqlSession.selectList("mainSQL.getColor", productname);
	}
}
