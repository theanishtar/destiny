package com.davisy.controller;

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

@RestController
@CrossOrigin
public class PostController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserServiceImpl userServiceImpl;

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

	@GetMapping("/v1/user/getTop5Post")
	public ResponseEntity<List<Object[]>> getTOP5Post() {
		List<Object[]> list = postServiceImpl.getTOP5Post();
		return ResponseEntity.ok(list);
	}

//	@RedisCheck 
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
			// asyncPost(user);
			return ResponseEntity.ok().body(entity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@SpamRrequestCheck
	@PostMapping("/v1/user/load/comment")
	public ResponseEntity<Object[]> loadCmment(HttpServletRequest request, @RequestBody int id) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			asyncComment(user, id);
			return ResponseEntity.ok().body(this.commObjects);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

//	@Async
//	public synchronized void asyncPost(User user) throws Exception {
//		List<Post> findAllPost = postServiceImpl.findAll();
//		List<PostEntity> postEntitieFriends = new ArrayList<>();
//		List<PostEntity> postEntitieFollows = new ArrayList<>();
//		List<PostEntity> postEntitieAddress = new ArrayList<>();
//		for (Post post : findAllPost) {
//			int id = post.getPost_id();
//			List<String> post_img = new ArrayList<>();
//			List<Object[]> interesteds = new ArrayList<>();
//			int count_interested = 0;
//			int count_comment = 0;
//			int count_share = 0;
//			post_img = postImagesServiceImpl.findAllImagesofPost(id);
//			interesteds = interestedServiceImpl.findByIdPost(id);
//			count_interested = interestedServiceImpl.totalInterestedByPost(id);
//			count_comment = commentServiceImpl.totalCommentByPost(id);
//			count_share = shareServiceImpl.totalShareByPost(id);
//
//			if (user.getUser_id() != post.getUser().getUser_id()
//					&& followServiceImpl.checkFriend(user.getUser_id(), post.getUser().getUser_id())) {
//				postEntitieFriends.add(postEntity(post.getUser().getUser_id(), post.getUser().getFullname(),
//						post.getUser().getAvatar(), post, post_img, interesteds, count_interested, count_comment,
//						count_share));
//			} else if (followServiceImpl.checkFollow(post.getUser().getUser_id(), user.getUser_id())) {
//				postEntitieFollows.add(postEntity(post.getUser().getUser_id(), post.getUser().getFullname(),
//						post.getUser().getAvatar(), post, post_img, interesteds, count_interested, count_comment,
//						count_share));
//			}
//		}
//		this.listPost.addAll(postEntitieFriends);
//		this.listPost.addAll(postEntitieFollows);
////		Cache cache = (Cache) cacheManager.getCache("interested");
////		System.out.println("cá chê: " + cache);
////		List<Follower> listFollow = followServiceImpl.findALlFriend(user.getUser_id(), user.getUser_id());
////		for (Follower fl : listFollow) {
////			Follower.Pk pk = fl.getPk();
////			if (followServiceImpl.checkFriend(user.getUser_id(), pk.getUser_id())) {
////				listPost.add(null);
////			}
////		}
//	}

	@Async
	public synchronized void asyncComment(User user, int postId) {
//		List<Object[]> interesteds = interestedServiceImpl.findByIdPost(postId);
		List<String> post_img = postImagesServiceImpl.findAllImagesofPost(postId);
		List<Comment> comments = postServiceImpl.findById(postId).getComments();
		List<Object[]> listCmtTemp = new ArrayList<>();
		Object[] ob;
		int dem = 0;
		for (Comment cm : comments) {
			if (cm.getCommentParent() == null) {
				dem = commentServiceImpl.findAllByIdComment(cm.getComment_id()).size();
			}
			listCmtTemp.add(new Object[] { cm.getUser().getUser_id(), cm.getUser().getUsername(),
					cm.getUser().getFullname(), cm.getUser().getAvatar(), cm.getComment_id(), cm.getCommentParent(),
					cm.getDate_comment(), cm.getContent(), cm.isComment_status(), dem });
			dem = 0;
		}
		ob = new Object[] { post_img, listCmtTemp };
		this.commObjects = ob;
	}

//	public PostEntity postEntity(int user_id, String user_fullname, String user_avatar, Post post,
//			List<String> post_img, List<Object[]> interesteds, int count_interested, int count_comment,
//			int count_share) {
//		try {
//			Calendar date = post.getDate_Post();
//
//			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//			String fommatted = format.format(date.getTime());
//
//			PostEntity postEntity = new PostEntity();
//
//			postEntity.setDate(fommatted);
//
//			postEntity.setUser_id(user_id);
//			postEntity.setUser_fullname(user_fullname);
//			postEntity.setUser_avatar(user_avatar);
//			postEntity.setPost(post);
//
//			postEntity.setPost_img(post_img);
//			postEntity.setInteresteds(interesteds);
//			postEntity.setCount_interested(count_interested);
//			postEntity.setCount_comment(count_comment);
//			postEntity.setCount_share(count_share);
//			return postEntity;
//		} catch (Exception e) {
//			System.out.println("error date: " + e);
//			return null;
//		}
//
//	}

	// cach sai
	public void time() {
		Calendar calendar = GregorianCalendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);
	}
}
