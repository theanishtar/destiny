package com.davisy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetail {
	String content;
	String user_fullname;
	String user_avatar;
	String user_email;
	String time_comment;
	
	List<CommentDetail> listCommentReply;
}
