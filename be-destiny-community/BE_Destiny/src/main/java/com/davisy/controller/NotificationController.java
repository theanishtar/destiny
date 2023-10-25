package com.davisy.controller;

import java.awt.TrayIcon.MessageType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Comment;
import com.davisy.entity.Post;
import com.davisy.entity.User;
import com.davisy.model.NotificationModel;
import com.davisy.service.CommentService;
import com.davisy.service.PostService;
import com.davisy.service.UserService;

@RestController
@CrossOrigin
public class NotificationController {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	CommentService commentService;

	@Autowired
	UserService userService;

	@Autowired
	PostService postService;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@Async
	@MessageMapping("/notify/{to}")
	public void sendNotification(@DestinationVariable int to, NotificationModel model) {
		try {
			simpMessagingTemplate.convertAndSend("/topic/notification/" + to, model);
			if (model.getType().toString().equals("COMMENT")) {
				Comment comment = new Comment();
				User user = userService.findById(model.getFromUserId());
				Post post = postService.findById(model.getPostId());
				
				comment.setUser(user);
				comment.setPost(post);
				if (model.getReplyId() != 0) {
					Comment comment2 = commentService.findById(model.getReplyId());
					comment.setCommentParent(comment2);
				}
					
				comment.setContent(model.getContent());
				commentService.create(comment);
				simpMessagingTemplate.convertAndSend("/topic/success-notification" ,model.getPostId());
			}
		
			
		} catch (Exception e) {
			System.out.println("error sendNotification: " + e);
		}

	}

}
