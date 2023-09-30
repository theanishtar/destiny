package com.davisy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Follower;
import com.davisy.entity.User;
import com.davisy.service.JwtService;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class FollowController {
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
	public DataFollows data(int id) {
		DataFollows data = new DataFollows();
		User us = userServiceImpl.findById(id);
		int countPost = postServiceImpl.countPost(id);
		int countFollower = followServiceImpl.countFollowers(id);
		int countImg = postImagesServiceImpl.countPostImages(id);
		data.setUser_id(id);
		data.setThumb(us.getThumb());
		data.setAvatar("../../assets/images/avatar/05.jpg");
		data.setMark(us.getMark());
		data.setFullname(us.getFullname());
		data.setIntro(us.getIntro());
		data.setCountPost(countPost);
		data.setCountFollower(countFollower);
		data.setCountImg(countImg);
		return data;
	}

	public List<DataFollows> reloadData(String email) {
//		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		List<Follower> followers = followServiceImpl.findAllFollowers(user.getUser_id());
		List<DataFollows> dataFollowsas = new ArrayList<>();
		for (Follower fl : followers) {
			Follower.Pk pk = fl.getPk();
			dataFollowsas.add(data(pk.getUser_id()));
		}
		return dataFollowsas;
	}
	
	public List<DataFollows>loadSuggested(String email){
	User user =userServiceImpl.findByEmail(email);
	List<DataFollows> dataFollowsas = new ArrayList<>();
	for(Follower all:followServiceImpl.findAll()) {
		for(Follower alfl:followServiceImpl.findAllFollowers(user.getUser_id())) {
			Follower.Pk pk1 = all.getPk();
			Follower.Pk pk2 = alfl.getPk();
			User us =new User();
			if(pk1.getFollower_id()==pk2.getUser_id()) {
				
			}
			
		}
	}
	return dataFollowsas;
}

	@GetMapping("/v1/user/following/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFollow(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		return ResponseEntity.status(200).body(reloadData(email));
	}

	@PostMapping("/v1/user/following/delete")
	public ResponseEntity<List<DataFollows>> deleteFollow(HttpServletRequest request,@RequestBody int id) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		followServiceImpl.delete(user.getUser_id(),id);
		return ResponseEntity.status(200).body(reloadData(email));
	}
	
	@PostMapping("/v1/user/following/addFollow")
	public ResponseEntity<List<DataFollows>>addFollows(HttpServletRequest request,@RequestBody int id){
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		Follower follower=new Follower();
		Follower.Pk pk =new Follower.Pk();
		pk.setFollower_id(user.getUser_id());
		pk.setUser_id(id);
		follower.setPk(pk);
		followServiceImpl.create(follower);
		return ResponseEntity.status(200).body(reloadData(email));
	}

}
