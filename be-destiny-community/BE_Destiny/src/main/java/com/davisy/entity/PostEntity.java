package com.davisy.entity;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.davisy.controller.PostController;
import com.davisy.controller.admin.AdminControl;
import com.davisy.service.PostImagesService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
	int post_id;
	int user_id;
//	int parent_post_id;
	String content;
	@JsonIgnore
	Calendar date_post;
//	@JsonIgnore
	String hash_tag;
	boolean send_status;
	boolean post_status;
	String product;
	boolean ban;
	int countInterested;
	int countCommnet;
	int countShare;
	List<String> images;
	@JsonIgnore
	List<Object[]> user;
	PostEntity postEntityProfile;
	String fullname;
	String avatar;
	String province_fullname;
	String district_fullname;
	String ward_fullname;
	String province_fullname_en;
	String district_fullname_en;
	String ward_fullname_en;

	public List<String> getList_Hash_Tag() {
		if (hash_tag != null) {
			List<String> list = new ArrayList<>();
			for (String h : hash_tag.split(",")) {
				list.add(h);
			}
			return list;
		}
		return null;
	}

	public List<UserInterested> getUserInterested() {
		List<UserInterested> list = new ArrayList<>();
		if (user != null) {
			for (Object[] u : user) {
				UserInterested interested = new UserInterested();
				interested.setUser_id(Integer.valueOf(u[0].toString()));
				interested.setFullname(u[1] + "");
				list.add(interested);
			}
			return list;
		}
		return null;
	}

	public String getDate() {
		String date = AdminControl.timeCaculate(date_post);
		if (date.equalsIgnoreCase("0 ngày trước")) {
			return PostController.getTime(date_post);
		}
		return date;
	}
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UserInterested {
	int user_id;
	String fullname;
}
