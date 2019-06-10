package review.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;
import review.bean.ReviewDTO;
import review.bean.ReviewReplyDTO;

@Transactional
@Component
public class ReviewDAOMybatis implements ReviewDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public ProductDTO getProduct(String productname) {
		return sqlSession.selectOne("reviewSQL.getProduct",productname);
	}

	@Override
	public void insertReview(Map<String, String> map) {
		sqlSession.insert("reviewSQL.insertReview",map);
	}

	@Override
	public ProductDTO getProductCheck(Map<String, String> map) {
		return sqlSession.selectOne("reviewSQL.getProductCheck",map);
	}

	@Override
	public List<ReviewDTO> getReviewList(Map<String, String> map) {
		return sqlSession.selectList("reviewSQL.getReviewList",map);
	}

	@Override
	public int getReviewTotal() {
		return sqlSession.selectOne("reviewSQL.getReviewTotal");
	}

	@Override
	public ReviewDTO getReview(int seq) {
		return sqlSession.selectOne("reviewSQL.getReview",seq);
	}

	@Override
	public void hitUp(int seq) {
		sqlSession.update("reviewSQL.hitUp",seq);
		
	}

	@Override
	public void reviewDelete(String seq) {
		sqlSession.delete("reviewSQL.reviewDelete",seq);
	}

	@Override
	public ReviewReplyDTO reviewReplyInsertCheck(Map<String, String> map) {
		return sqlSession.selectOne("reviewSQL.reviewReplyInsertCheck",map);
	}

	@Override
	public void reviewReplyInsert(Map<String, String> map) {
		sqlSession.insert("reviewSQL.reviewReplyInsert",map);
	}

	@Override
	public List<ReviewReplyDTO> getReply(int seq) {
		return sqlSession.selectList("reviewSQL.getReply",seq);
	}

	@Override
	public void reviewReplyDelete(int replyseq) {
		sqlSession.delete("reviewSQL.reviewReplyDelete",replyseq);
		
	}

	@Override
	public String reviewReplyGetContent(Map<String, String> map) {
		return sqlSession.selectOne("reviewSQL.reviewReplyGetContent",map);
	}

	@Override
	public void reviewReplyUpdate(Map<String, String> map) {
		sqlSession.update("reviewSQL.reviewReplyUpdate",map);
	}

	@Override
	public void updateReview(Map<String, String> map) {
		sqlSession.update("reviewSQL.updateReview",map);
	}

	@Override
	public List<ReviewDTO> getReviewSelectList(Map<String, String> map) {
		return sqlSession.selectList("reviewSQL.getReviewSelectList",map);
	}

	@Override
	public int getReviewSelectTotal(String majorcategory) {
		return sqlSession.selectOne("reviewSQL.getReviewSelectTotal",majorcategory);
	}

}
