package main.dao;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;

public interface MainDAO {
	public List<ProductDTO> search(String keyword);
	public List<ProductDTO> searchDetail(Map<String, String> map);
	
}
