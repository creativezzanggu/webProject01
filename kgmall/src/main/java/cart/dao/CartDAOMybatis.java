package cart.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cart.bean.CartDTO;
import product.bean.ProductDTO;


@Repository
public class CartDAOMybatis implements CartDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void insertCart(List<CartDTO> list) {
		for(CartDTO cartDTO : list) {

			sqlSession.insert("cartSQL.insertCart", cartDTO);
		}
	}

	@Override
	public List<CartDTO> getCartList(String id) {
		List<CartDTO> list2=sqlSession.selectList("cartSQL.getCartList", id);
		return list2;
	}

	@Override
	public void deleteCart(String productName,String id) {
		Map <String,String> map = new HashMap<String,String>();
		map.put("product", productName);
		map.put("sellid",id);
		sqlSession.delete("cartSQL.deleteCart", map);
	}

	@Override
	public void deleteCartList(String id) {
		sqlSession.delete("cartSQL.deleteCartList", id);
	}
	
}
