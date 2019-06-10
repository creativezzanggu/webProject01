package order.dao;

import java.util.List;
import java.util.Map;

import order.bean.OrderDTO;

public interface OrderDAO {

	public int getSEQ();

	public void insertOrderList(OrderDTO orderDTO);

	public List<OrderDTO> userGetOrderList(String id);

}
