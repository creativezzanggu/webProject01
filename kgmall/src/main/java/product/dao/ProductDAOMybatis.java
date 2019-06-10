package product.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.print.attribute.HashAttributeSet;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
		name=name+"_%";
		List<String> colorList = new ArrayList<String>();
		List<String> list = sqlSession.selectList("productSQL.getColor", name);
		for(String c : list) {
			String str[] = c.split("_");
			colorList.add(str[1]);
		}//색 가져오기
		List<String> resultList = new ArrayList<String>();
		for (int i = 0; i < colorList.size(); i++) {
		    if (!resultList.contains(colorList.get(i))) {
		        resultList.add(colorList.get(i));
		    }
		}//중복된 색 제거
		return resultList;
	}

	@Override
	public int getCount(String name) {
		int count =0;
			if(sqlSession.selectOne("productSQL.getCount", name)!=null) {
				count=sqlSession.selectOne("productSQL.getCount", name);
			}
		return count;
	}
	@Override
	public List<ProductDTO> thumb() {
		return sqlSession.selectList("productSQL.getThumb");
	}

	@Override
	public void orderCountDown(String name, int count) {
		Map <String,String> map = new HashMap<String, String>();
		map.put("name",name.toUpperCase());
		map.put("count", Integer.toString(count));
		sqlSession.update("productSQL.orderCountDown",map);
	}

	@Override
	public void likeUp(String name) {
		String str[]=name.split("_");
		sqlSession.update("productSQL.likeUp",str[0]);
	}
}

