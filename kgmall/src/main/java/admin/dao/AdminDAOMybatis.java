package admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import admin.bean.AdminDTO;
import admin.bean.DetailProductDTO;

@Transactional
@Repository
public class AdminDAOMybatis implements AdminDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void productInsert(Map<String, String> map) {
		sqlSession.insert("adminSQL.productInsert",map);
	}

	@Override
	public void detailProductInsert(Map<String, String> map) {
		sqlSession.insert("adminSQL.detailProductInsert",map);
	}

	@Override
	public List<AdminDTO> productList() {
		return sqlSession.selectList("adminSQL.productList");
	}

	@Override
	public List<DetailProductDTO> detailProductList() {
		return sqlSession.selectList("adminSQL.detailProductList");
	}

}