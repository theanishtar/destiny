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
public class AdminUserProfile {
	
	String fullname;
	String email;
	String intro;
	String birthday;

	String day_join;
	String month_join;
	String year_join;
	
	String city_name;
	String gender_name;
	String avartar;
	String thumb;
	int mark;
	
	int totalPost;
	int totalInterested;
	int totalFollower;
	int totalComment;
	int totalShare;
	
	List<AdminPostDetail> listAllPostOfUser;
	
}
