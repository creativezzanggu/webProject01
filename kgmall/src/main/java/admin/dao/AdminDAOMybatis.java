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
		sqlSession.insert("adminSQL.productInsert", map);
	}

	@Override
	public void detailProductInsert(Map<String, String> map) {
		sqlSession.insert("adminSQL.detailProductInsert", map);
	}

	@Override
	public List<AdminDTO> productList() {
		return sqlSession.selectList("adminSQL.productList");
	}

	@Override
	public List<DetailProductDTO> detailProductList() {
		return sqlSession.selectList("adminSQL.detailProductList");
	}

	@Override
	public List<DetailProductDTO> detailProductListCount(String name) {
		name = name+"_%";
		return sqlSession.selectList("adminSQL.detailProductListCount", name);
	}

	@Override
	public void countUpdate(Map<String, String> map) {
		sqlSession.update("adminSQL.countUpdate", map);
	}

	@Override
	public int checkProduct(String name) {
		name=name+"_%";
		return sqlSession.selectOne("adminSQL.checkProduct", name);
	}

	@Override
	public void countDelete(Map<String, String> map) {
		sqlSession.delete("adminSQL.countDelete", map);
	}

	@Override
	public void productDelete(String name) {
		sqlSession.delete("adminSQL.productDelete", name);
	}



}