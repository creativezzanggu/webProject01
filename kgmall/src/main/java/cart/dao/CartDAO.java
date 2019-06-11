package cart.dao;

import java.util.Map;

import cart.bean.CartDTO;

import java.util.List;

public interface CartDAO {
	public void insertCart(List<CartDTO> list);

	public List<CartDTO> getCartList(String id);

	public void deleteCart(String productName,String id);

	public void deleteCartList(String id);
}
