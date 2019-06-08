package list.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import list.bean.ListDTO;

@Transactional
@Component
public class ListDAOMybatis implements ListDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int getMajorCategoryTotal(String category) {
		return sqlSession.selectOne("listSQL.getMajorCategoryTotal",category);
	}
	
	@Override
	public int getSubcategoryTotal(String subcategory) {
		return sqlSession.selectOne("listSQL.getSubcategoryTotal",subcategory);
	}
	
	@Override
	public List<ListDTO> getProductList(Map<String, String> map) {
		return sqlSession.selectList("listSQL.getProductList",map);
	}

	@Override
	public List<String> getColor(String name) {
		name=name+"_%";
		List<String> colorList = new ArrayList<String>();
		List<String> list = sqlSession.selectList("listSQL.getColor", name);
		for(String c : list) {
			String str[] = c.split("_");
			colorList.add(str[1]);
		}
		List<String> resultList = new ArrayList<String>();
		for (int i = 0; i < colorList.size(); i++) {
		    if (!resultList.contains(colorList.get(i))) {
		        resultList.add(colorList.get(i));
		    }
		}
		return resultList;
	}


	@Override
	public List<ListDTO> getProductSelectList(Map<String, String> map) {
		return sqlSession.selectList("listSQL.getProductSelectList", map);
	}

	@Override
	public List<ListDTO> getProductSelectOptionList(Map<String, String> map) {
		return sqlSession.selectList("listSQL.getProductSelectOptionList", map);
	}

	

}
