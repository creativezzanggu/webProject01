package order.dao;

import java.util.List;

import order.bean.OrderDTO;

public interface OrderDAO {

	public int getSEQ();

	public void insertOrderList(OrderDTO orderDTO);

}
