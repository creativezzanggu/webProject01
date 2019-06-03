package product.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import product.bean.ColorDTO;
import product.bean.ProductDTO;

@Repository
public class ProductDAOMybatis implements ProductDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public ProductDTO getDTO(String name) {
		ProductDTO productDTO = sqlSession.selectOne("productSQL.getDTO", name);
		return productDTO;
	}

	@Override
	public List<String> getColor(String name) {
		List<String> list = sqlSession.selectList("productSQL.getColor", name);
		return list;
	}

}
