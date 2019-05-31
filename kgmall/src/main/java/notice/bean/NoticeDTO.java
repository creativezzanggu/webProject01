package notice.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class NoticeDTO {
	private int seq;
	private String subject;
	private String content;
	private String writer;
	private String logtime;
	private int hit;
}
