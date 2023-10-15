package com.davisy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.DataFollows;
import com.davisy.entity.User;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class ProfileContronller {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserServiceImpl userServiceImpl;
	@Autowired
	FollowServiceImpl followServiceImpl;
	@Autowired
	PostServiceImpl postServiceImpl;
	@Autowired
	PostImagesServiceImpl postImagesServiceImpl;

	@PostMapping("/v1/user/profile/data/header")
	public ResponseEntity<DataFollows> loadProfile(HttpServletRequest request, @RequestBody int toProfileUser) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			return ResponseEntity.ok().body(loadProfile(email, toProfileUser));
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	public DataFollows loadProfile(String email, int profileId) {
		User user1 = userServiceImpl.findByEmail(email);
		User user = new User();
//		int id = 0;
		boolean check = false;
		if (user1.getUser_id() == profileId) {
			user = user1;

		} else {
			user = userServiceImpl.findById(profileId);
			check = true;
		}
		int id = user.getUser_id();
		System.out.println("id: ========================================== " + id);
		DataFollows dataFollows = new DataFollows();
		int countPost = postServiceImpl.countPost(id);
		int countFollower = followServiceImpl.countFollowers(id);
		int countImg = postImagesServiceImpl.countPostImages(id);
		dataFollows.setUser_id(user.getUser_id());
		dataFollows.setThumb(user.getThumb());
		dataFollows.setAvatar(user.getAvatar());
		dataFollows.setMark(user.getMark());
		dataFollows.setFullname(user.getFullname());
		dataFollows.setIntro(user.getIntro());
		dataFollows.setCountPost(countPost);
		dataFollows.setCountFollower(countFollower);
		dataFollows.setCountImg(countImg);
		dataFollows.setUsername(user.getUsername());
		if (check) {
			List<Integer> list = followServiceImpl.findAllFollowingUser(user1.getUser_id());
			if (list.contains(profileId)) {
				dataFollows.setCheckFollow(true);
			}
		} else if (user1.getUser_id() == profileId) {
			dataFollows.setCheckFollow(true);
		}
		return dataFollows;
	}
}
