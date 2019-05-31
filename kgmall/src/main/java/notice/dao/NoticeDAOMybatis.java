package notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import notice.bean.NoticeDTO;

@Component
@Transactional
public class NoticeDAOMybatis implements NoticeDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<NoticeDTO> getNoticeList(Map<String, Integer> map) {
		return sqlSession.selectList("noticeSQL.getNoticeList", map);
	}

	@Override
	public int getTotalA() {
		return sqlSession.selectOne("noticeSQL.getTotalA");
	}

	@Override
	public NoticeDTO noticeView(int seq) {
		return sqlSession.selectOne("noticeSQL.noticeView", seq);
	}
	@Override
	public void noticeHit(int seq) {
		sqlSession.update("noticeSQL.noticeHit", seq);
	}

	@Override
	public void noticeModify(NoticeDTO noticeDTO) {
		sqlSession.update("noticeSQL.noticeModify", noticeDTO);
	}

	@Override
	public void noticeWrite(Map<String, String> map) {
		sqlSession.insert("noticeSQL.noticeWrite", map);
	}

	@Override
	public void noticeDelete(int seq) {
		sqlSession.delete("noticeSQL.noticeDelete", seq);
	}

	@Override
	public List<NoticeDTO> getNoticeSearch(Map<String, String> map) {
		return sqlSession.selectList("noticeSQL.getNoticeSearch", map);
	}

	@Override
	public int getSearchTotalA(Map<String, String> map) {
		return sqlSession.selectOne("noticeSQL.getSearchTotalA",map);
	}
	
	@Override
	public List<NoticeDTO> getTitleList() {
		List<NoticeDTO> list = sqlSession.selectList("noticeSQL.getTitleList");
		return list;
	}

	@Override
	public int getNoticeSeq(int num) {
		return sqlSession.selectOne("noticeSQL.getNoticeSeq", num);
	}



}
