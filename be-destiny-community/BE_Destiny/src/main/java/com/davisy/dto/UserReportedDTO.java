package com.davisy.dto;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReportedDTO {
	private ObjectId id;
	String fullname;
	String avatar;
	String content_report;
	String date_report;
	String email;
	String id_user_send;
	
	int totalPost;
}
