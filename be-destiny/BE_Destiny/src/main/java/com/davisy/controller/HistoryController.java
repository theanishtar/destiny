package com.davisy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Post;
import com.davisy.entity.User;
import com.davisy.service.CommentService;
import com.davisy.service.InterestedService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostService;
import com.davisy.service.SendRecieverService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class HistoryController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserService userService;
	@Autowired
	InterestedService interestedService;
	@Autowired
	ShareService shareService;
	@Autowired
	SendRecieverService sendRecieverService;
	@Autowired
	PostService postService;
	@Autowired
	PostImagesService postImagesService;
	@Autowired
	CommentService commentService;

	@GetMapping("/v1/user/load/history/interested")
	public ResponseEntity<List<Object[]>> loadAllHistoryInterested(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = interestedService.findAllHistoryInterested(id);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Error loadAllHistoryInterested in HistoryController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/load/history/share")
	public ResponseEntity<List<Object[]>> loadAllHistoryShare(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = shareService.findAllHistoryShare(id);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Error loadAllHistoryInterested in HistoryController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/load/history/sendreciever")
	public ResponseEntity<List<Object[]>> loadAllHistorySendReciever(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = sendRecieverService.findAllHistorySendReciever(id);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Error loadAllHistoryInterested in HistoryController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/v1/user/load/history/comment")
	public ResponseEntity<List<Object[]>> loadAllHistoryComment(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = commentService.loadHistoryComment(id);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Error loadAllHistoryComment in HistoryController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/load/post/history")
	public ResponseEntity<Object[]> loadPostHistory(HttpServletRequest request, @RequestBody int idPost) {
		try {
			Post post = postService.findById(idPost);
			Object[] count = postService.getCountPostHistory(idPost);
			List<Object[]> users = userService.getUserofPostHistory(idPost);
			List<Object[]> comments = commentService.findAllComment(idPost, 0);
			Object[] objects = new Object[] { post, count, users, comments };
			return ResponseEntity.ok().body(objects);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
