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
public class UserReportedDetail {
	String email;
	String fullname;
	String intro;
	String avatar;
	String location;
	String date_join;
	String birthday;
	String gender_name;
	
	int total_post;
	int total_report;
	
}
