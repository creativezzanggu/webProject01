package product.dao;

import java.util.List;

import product.bean.ColorDTO;
import product.bean.ProductDTO;

public interface ProductDAO {

	ProductDTO getDTO(String name);

	List<String> getColor(String name);

}
