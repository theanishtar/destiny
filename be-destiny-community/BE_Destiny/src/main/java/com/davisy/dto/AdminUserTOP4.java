package com.davisy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserTOP4 {
	String email;
	String fullname;
	String avatar;
	String location;
	int age;
	
	int totalPost;
	int totalComment;
	int totalFollower;
}
