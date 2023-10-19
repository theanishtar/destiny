package com.davisy.entity;

import java.text.SimpleDateFormat;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
	int user_id;
	String user_fullname;
	String user_avatar;
	Post post;
	List<String>post_img;
	List<Object[]>interesteds;
	int count_interested;
	int count_comment;
	int count_share;
	String date;
	
	
}
