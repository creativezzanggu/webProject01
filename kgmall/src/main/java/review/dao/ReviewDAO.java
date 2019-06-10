package review.dao;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;
import review.bean.ReviewDTO;
import review.bean.ReviewReplyDTO;

public interface ReviewDAO {

	public ProductDTO getProduct(String productname);

	public void insertReview(Map<String, String> map);

	public ProductDTO getProductCheck(Map<String, String> map);

	public List<ReviewDTO> getReviewList(Map<String, String> map);

	public int getReviewTotal();

	public ReviewDTO getReview(int seq);

	public void hitUp(int seq);

	public void reviewDelete(String seq);

	public ReviewReplyDTO reviewReplyInsertCheck(Map<String, String> map);

	public void reviewReplyInsert(Map<String, String> map);

	public List<ReviewReplyDTO> getReply(int seq);

	public void reviewReplyDelete(int replyseq);

	public String reviewReplyGetContent(Map<String, String> map);

	public void reviewReplyUpdate(Map<String, String> map);

	public void updateReview(Map<String, String> map);

}
