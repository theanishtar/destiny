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
public class AdminPostDetail {

	int post_id;
	String user_fullname;
	String user_avatar;
	String user_email;

	String content;
	String date_Post;
	String product;
	
	boolean ban;

	int totalInterested;
	int totalShare;
	int totalComment;

	List<PostImagesDetail> listPostImages;
	List<CommentDetail> listComments;
	List<UserSendReport> listUserSendReports;

}
