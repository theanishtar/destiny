package com.davisy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
	
	String username;
	String authorities;
	String fullname;
	String email;
	String intro;
	String birthday;
	String birthdayFormat;
	String province_name;
	String district_name;
	String ward_name;
	String gender_name;
	String avatar;
	String thumb;
}
