package review.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import board.bean.QAreplyDTO;
import lombok.Data;

@Component
@Data
public class ReviewReplyDTO {
	private int seq;
	private int replyseq;
	private String id;
	private String content;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date logtime;
}
