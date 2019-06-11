package admin.dao;

import java.util.List;
import java.util.Map;

import admin.bean.AdminDTO;
import admin.bean.DetailProductDTO;
import order.bean.OrderDTO;

public interface AdminDAO {

	public void productInsert(Map<String, String> map);

	public void detailProductInsert(Map<String, String> map);

	public List<AdminDTO> productList();

	public List<DetailProductDTO> detailProductList();

	public List<DetailProductDTO> detailProductListCount(String name);

	public void countUpdate(Map<String, String> map);

	public int checkProduct(String name);

	public void countDelete(Map<String, String> map);

	public void productDelete(String name);

	public List<OrderDTO> orderList();

	public void orderOK(Map<String, String> map);

	public int checkOrder(Map<String, String> map);

	public AdminDTO nameCheck(String name);
}