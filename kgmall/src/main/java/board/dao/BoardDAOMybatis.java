package board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import board.bean.QADTO;
import board.bean.QAreplyDTO;

@Transactional
@Component
public class BoardDAOMybatis implements BoardDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<QADTO> myQAList(Map<String, String> map) {
		return sqlSession.selectList("BoardSQL.myQAList", map);
	}
	
	@Override
	public List<QADTO> getQAList(Map<String, Integer> map) {
		return sqlSession.selectList("BoardSQL.getQAList",map);
	}

	@Override
	public List<QADTO> QASelectList(Map<String, String> map) {
		return sqlSession.selectList("BoardSQL.QASelectList",map);
	}

	@Override
	public int getTotal() {
		return sqlSession.selectOne("BoardSQL.getTotal");
	}

	@Override
	public int getSelectTotalA(String category) {
		return sqlSession.selectOne("BoardSQL.getSelectTotalA",category);
	}

	@Override
	public List<QADTO> QASearchList(Map<String, Object> map) {
		return sqlSession.selectList("BoardSQL.QASearchList",map);
	}

	@Override
	public QADTO getQA(String seq) {
		return sqlSession.selectOne("BoardSQL.getQA",seq);
	}

	@Override
	public void QAdelete(String seq) {
		int seqInt = Integer.parseInt(seq);
		sqlSession.delete("BoardSQL.QAdelete",seqInt);
	}

	@Override
	public void hitUp(String seq) {
		sqlSession.update("BoardSQL.hitUp",seq);
	}

	@Override
	public int getSearchTotalA(Map<String, String> map) {
		return sqlSession.selectOne("BoardSQL.getSearchTotalA",map);
	}

	@Override
	public void QAreplyInsert(Map<String, String> map) {
		sqlSession.insert("BoardSQL.QAreplyInsert",map);
	}

	@Override
	public List<QAreplyDTO> getReply(Map<String, String> map) {
		return sqlSession.selectList("BoardSQL.getReply",map);
	}

	@Override
	public void QAreplyDelete(Map<String, String> map) {
		sqlSession.delete("BoardSQL.QAreplyDelete",map);
	}

	@Override
	public QAreplyDTO QAreplyInsertCheck(Map<String, String> map) {
		return sqlSession.selectOne("BoardSQL.QAreplyInsertCheck",map);
		
	}


}
