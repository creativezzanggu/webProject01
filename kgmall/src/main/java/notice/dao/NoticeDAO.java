package notice.dao;

import java.util.List;
import java.util.Map;

import notice.bean.NoticeDTO;

public interface NoticeDAO {

	public List<NoticeDTO> getNoticeList(Map<String, Integer> map);

	public int getTotalA();

	public NoticeDTO noticeView(int seq);

	public void noticeModify(NoticeDTO noticeDTO);

	public void noticeWrite(Map<String, String> map);

	public void noticeHit(int seq);

	public void noticeDelete(int seq);

	public List<NoticeDTO> getNoticeSearch(Map<String, String> map);

	public int getSearchTotalA(Map<String, String> map);
	
	public List<NoticeDTO> getTitleList();

	public int getNoticeSeq(int num);

}
