package cart.dao;

import java.util.Map;
import java.util.List;
import cart.bean.CartDTO;

public interface CartDAO {
	public void insertCart(List<CartDTO> list);

	public List<CartDTO> getCartList(String id);

	public void deleteCart(String productName,String id);
}
