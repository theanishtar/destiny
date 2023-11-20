package com.davisy.entity;

import java.util.ArrayList;
import java.util.List;

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
	String username;
//	List<Integer>listFollowing=new ArrayList<>();
	boolean checkFollow=false;

}
