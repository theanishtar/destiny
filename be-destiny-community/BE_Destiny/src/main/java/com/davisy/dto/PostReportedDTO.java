package com.davisy.dto;

import java.util.List;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReportedDTO {
	private ObjectId id;
	String post_id;
	String content_post;
	String product;
	String date_post;
	String postImage;
	String content_report;
	String date_report;
	String id_user_send;

}
