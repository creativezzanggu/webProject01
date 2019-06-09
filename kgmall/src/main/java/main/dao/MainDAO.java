package main.dao;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;

public interface MainDAO {
	public List<ProductDTO> searchDetail(Map<String, String> map);
	public int countItems(Map<String, String> map);
	public List<ProductDTO> getNewItemList();
	
}
