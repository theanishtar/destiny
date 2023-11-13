package com.davisy.dto;

import java.util.List;

import com.davisy.entity.PostImages;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPostTOP4 {
	int post_id;
	String content;
	String product;
	
	public List<PostImagesDetail> listPostImages;
	
	String user_email;
	String user_fullname;
	String user_avatar;
}
