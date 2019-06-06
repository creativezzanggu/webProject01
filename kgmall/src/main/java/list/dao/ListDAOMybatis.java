package list.dao;

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
	public int getTotal() {
		return sqlSession.selectOne("listSQL.getTotal");
	}

	@Override
	public List<ListDTO> getProductList(Map<String, Integer> map) {
		return sqlSession.selectList("listSQL.getProductList",map);
	}

}
