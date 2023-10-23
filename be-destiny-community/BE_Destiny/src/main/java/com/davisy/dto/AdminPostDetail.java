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
public class AdminPostDetail{
	
	int post_id;
	String user_fullname;
	String user_avartar;
	String user_email;
	
	String content;
	String date_Post;
	String product;
	
	int totalInterested;
	int totalShare;
	int totalComment;
	
	public List<PostImagesDetail> listPostImages;
	public List<CommentDetail> listComments;

}
