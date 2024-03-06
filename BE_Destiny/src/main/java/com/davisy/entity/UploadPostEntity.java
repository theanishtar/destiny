package com.davisy.entity;

import java.util.Calendar;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadPostEntity {
	String content;
	String hash_tag;
	String province_name;
	String district_name;
	String ward_name;
	boolean post_status;
	String product;
	List<String> post_images;
	int post_id;
	boolean send_status;

}
