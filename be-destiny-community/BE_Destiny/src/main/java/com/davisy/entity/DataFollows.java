package com.davisy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataFollows {
	int user_id;
	String thumb;
	String avatar;
	int mark;
	String fullname;
	String intro;
	int countPost;
	int countFollower;
	int countImg;

}
