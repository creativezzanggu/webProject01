package product.dao;

import java.util.List;

import product.bean.ProductDTO;

public interface ProductDAO {

	public ProductDTO getDTO(String name);

	public List<String> getColor(String name);

	public int getCount(String name);
	
	public List<ProductDTO> thumb();

	public void orderCountDown(String name, int count);

	public void likeUp(String name);

}
