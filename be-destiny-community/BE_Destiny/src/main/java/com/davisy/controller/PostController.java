package com.davisy.controller;

<<<<<<< HEAD
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.SpamRrequestCheck;
import com.davisy.config.JwtTokenUtil;
import com.davisy.constant.Cache;
import com.davisy.entity.Comment;
import com.davisy.entity.CommentEntity;
import com.davisy.entity.Follower;
import com.davisy.entity.Interested;
import com.davisy.entity.Post;
import com.davisy.entity.PostEntity;
import com.davisy.entity.User;
import com.davisy.service.impl.CommentServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.InterestedServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.ShareServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor 
class RepCommentModel {
	int idPost;
	int cmtId;
}

@RestController
@CrossOrigin
=======
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

@RestController
@CrossOrigin("*")
>>>>>>> status-online
public class PostController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserServiceImpl userServiceImpl;
<<<<<<< HEAD

	@Autowired
	PostServiceImpl postServiceImpl;

	@Autowired
	PostImagesServiceImpl postImagesServiceImpl;

	@Autowired
	InterestedServiceImpl interestedServiceImpl;

	@Autowired
	CommentServiceImpl commentServiceImpl;

	@Autowired
	ShareServiceImpl shareServiceImpl;

//	@Autowired
//	CacheManager cacheManager;

	@Autowired
	FollowServiceImpl followServiceImpl;

	List<PostEntity> listPost = new ArrayList<>();

	Object[] commObjects = new Object[] {};

=======
	
	@Autowired
	PostServiceImpl postServiceImpl;

>>>>>>> status-online
	@GetMapping("/v1/user/getTop5Post")
	public ResponseEntity<List<Object[]>> getTOP5Post() {
		List<Object[]> list = postServiceImpl.getTOP5Post();
		return ResponseEntity.ok(list);
	}
<<<<<<< HEAD

	@GetMapping("/v1/user/load/post")
	public ResponseEntity<PostEntity> loadPost(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			int id = user.getUser_id();
			int provinceId = Integer.valueOf(user.getIdProvince());
			List<Object[]> listUser = userServiceImpl.getUserofPost(id, provinceId);
			List<Post> listPosts = postServiceImpl.findAllPost(id, provinceId);
			List<Object[]> listCount = postServiceImpl.getCountPost(id, provinceId);
			PostEntity entity = new PostEntity();
			entity.setUser(listUser);
			entity.setPost(listPosts);
			entity.setCount(listCount);
			return ResponseEntity.ok().body(entity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}
	
//	@GetMapping("/v1/user/load/postprofile")
//	public ResponseEntity<PostEntity> loadPostProfile(HttpServletRequest request) {
//		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userServiceImpl.findByEmail(email);
//			int id = user.getUser_id();
//			int provinceId = Integer.valueOf(user.getIdProvince());
//			List<Object[]> listUser = userServiceImpl.getUserofPostProfile(id);
//			List<Post> listPosts = postServiceImpl.getListPostByUserID(id);
//			List<Object[]> listCount = postServiceImpl.getCountPostProfile(id);
//			PostEntity entity = new PostEntity();
//			entity.setUser(listUser);
//			entity.setPost(listPosts);
//			entity.setCount(listCount);
//			return ResponseEntity.ok().body(entity);
//		} catch (Exception e) {
//			System.out.println("error: " + e);
//			return ResponseEntity.badRequest().build();
//		}
//	}

	@SpamRrequestCheck
	@PostMapping("/v1/user/load/comment")
	public ResponseEntity<CommentEntity> loadCmment(HttpServletRequest request, @RequestBody int id) {
		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userServiceImpl.findByEmail(email);
			List<Object[]> commentEntities = commentServiceImpl.findAllComment(id, 0);
			List<String> list_post_images = postImagesServiceImpl.findAllImagesofPost(id);
			CommentEntity commentEntity = new CommentEntity(list_post_images, commentEntities);
			return ResponseEntity.ok().body(commentEntity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@SpamRrequestCheck
	@PostMapping("/v1/user/load/comment/reply")
	public ResponseEntity<CommentEntity> loadSeenMoreComment(HttpServletRequest request, @RequestBody RepCommentModel reModel) {
		System.out.println(reModel.idPost + "" + reModel.cmtId);
		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userServiceImpl.findByEmail(email);
			List<Object[]> commentEntities = commentServiceImpl.findAllComment(reModel.idPost, reModel.cmtId);
			List<String> list_post_images = null;
			CommentEntity commentEntity = new CommentEntity(list_post_images, commentEntities);
			return ResponseEntity.ok().body(commentEntity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	// cach sai
=======
	
	
	//cach sai
>>>>>>> status-online
	public void time() {
		Calendar calendar = GregorianCalendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);
	}
}
