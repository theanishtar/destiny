package com.davisy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
	String username;
	String email;
	String fullname;
	String intro;
	String birthday;
	String day_create;
	String province_name;
	String district_name;
	String ward_name;
	String gender_name;
	String avatar;
	String thumb;
}