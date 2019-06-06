package list.dao;

import java.util.List;
import java.util.Map;

import list.bean.ListDTO;

public interface ListDAO {

	public int getTotal();

	public List<ListDTO> getProductList(Map<String, Integer> map);

}
