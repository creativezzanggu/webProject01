package board.dao;

import java.util.List;
import java.util.Map;

import board.bean.QADTO;
import board.bean.QAreplyDTO;

public interface BoardDAO {

	public List<QADTO> getQAList(Map<String, Integer> map);

	public List<QADTO> QASelectList(Map<String, String> map);

	public int getTotal();

	public int getSelectTotalA(String string);

	public List<QADTO> QASearchList(Map<String, Object> map);

	public QADTO getQA(String seq);

	public void QAdelete(String seq);

	public void hitUp(String seq);

	public int getSearchTotalA(Map<String, String> map);

	public void QAreplyInsert(Map<String, String> map);

	public List<QAreplyDTO> getReply(Map<String, String> map);

	public void QAreplyDelete(Map<String, String> map);

	public QAreplyDTO QAreplyInsertCheck(Map<String, String> map);

	public List<QADTO> myQAList(Map<String, String> map);

	public String QAreplyGetContent(Map<String, String> map);

	public void QAinsert(Map<String, String> map);

	public void QAreplyUpdate(Map<String, String> map);

	public void QAupdate(Map<String, String> map);



}
