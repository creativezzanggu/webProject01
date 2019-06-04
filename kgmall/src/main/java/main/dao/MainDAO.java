package main.dao;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;

public interface MainDAO {

	public List<ProductDTO> search(Map map);
	public List<ProductDTO> keywordSearch(Map map);
	
}
