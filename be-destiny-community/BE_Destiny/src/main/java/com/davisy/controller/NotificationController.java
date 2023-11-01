package com.davisy.controller;

import com.davisy.model.NotificationModel.MessageType;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Comment;
import com.davisy.entity.Interested;
import com.davisy.entity.Post;
import com.davisy.entity.Share;
import com.davisy.entity.User;
import com.davisy.model.NotificationModel;
import com.davisy.service.CommentService;
import com.davisy.service.InterestedService;
import com.davisy.service.MessagesService;
import com.davisy.service.PostService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

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
	ShareService shareService;

	@Autowired
	InterestedService interestedService;

	@Autowired
	MessagesService messagesService;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@Async
	@MessageMapping("/notify/{to}")
	public void sendNotification(@DestinationVariable int to, NotificationModel model) {
		try {
			System.out.println("type: " + model.getType());
			simpMessagingTemplate.convertAndSend("/topic/notification/" + to, model);
			User user = userService.findById(model.getFromUserId());
			Post post = postService.findById(model.getPostId());
			if (model.getType().toString().equalsIgnoreCase("COMMENT")) {
				Comment comment = new Comment();
				comment.setUser(user);
				comment.setPost(post);
				if (model.getReplyId() != 0) {
					Comment comment2 = commentService.findById(model.getReplyId());
					comment.setCommentParent(comment2);
				}

				comment.setContent(model.getContent());
				commentService.create(comment);
				simpMessagingTemplate.convertAndSend("/topic/success-notification", model.getPostId());
			}
			if (model.getType().toString().equalsIgnoreCase("SHARE")) {
				Share share = new Share();
				share.setUser(user);
				share.setPost(post);
				shareService.create(share);
				Post post2 = new Post();
				post2.setUser(user);
				post2.setPostParent(post);
				post2.setProvinces(user.getProvinces());
				post2.setDistricts(user.getDistricts());
				post2.setWards(user.getWards());
				postService.create(post2);
			}
			if (model.getType().toString().equalsIgnoreCase("INTERESTED")) {
				Interested interested = new Interested();
				interested.setUser(user);
				interested.setPost(post);
				interestedService.create(interested);
			}

		} catch (Exception e) {
			System.out.println("error sendNotification: " + e);
		}
	}

	@MessageMapping("/load/notification/{to}")
	public void loadNotidication(@DestinationVariable int to) {
		try {
			User user = userService.findById(to);
			List<NotificationModel> lisModels = new ArrayList<>();
			List<Object[]> noti = messagesService.loadNotification(user.getUser_id());
			for (Object[] ob : noti) {
				NotificationModel model = new NotificationModel();
				model.setAvatar(ob[0] + "");
				model.setFullname(ob[1] + "");
				model.setFromUserId(Integer.valueOf(ob[2].toString()));
				model.setContent(ob[3] + "");
				if (ob[4] != null)
					model.setPostId(Integer.valueOf(ob[4].toString()));
				model.setTime(ob[5] + "");
				if ((ob[6] + "").equalsIgnoreCase("COMMENT")) {
					model.setType(MessageType.COMMENT);
				} else if ((ob[6] + "").equalsIgnoreCase("INTERESTED")) {
					model.setType(MessageType.INTERESTED);
				} else if ((ob[6] + "").equalsIgnoreCase("FOLLOW")) {
					model.setType(MessageType.FOLLOW);
				} else {
					model.setType(MessageType.SHARE);
				}
				lisModels.add(model);
			}
			simpMessagingTemplate.convertAndSend("/topic/loaddata/notification/" + to, lisModels);
		} catch (Exception e) {
			System.out.println("error loadNotidication: "+e);
		}
	}

}
