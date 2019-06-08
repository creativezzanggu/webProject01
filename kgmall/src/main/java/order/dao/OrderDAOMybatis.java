package order.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import order.bean.OrderDTO;

@Repository
public class OrderDAOMybatis implements OrderDAO {

	@Autowired
	private SqlSession sqlSession;
	@Override
	public int getSEQ() {
		return sqlSession.selectOne("orderSQL.getSEQ");
	}
	@Override
	public void insertOrderList(OrderDTO orderDTO) {
		sqlSession.insert("orderSQL.insertOrderList", orderDTO);
	}

}
