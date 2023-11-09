package com.davisy.controller;

import com.davisy.model.NotificationModel.MessageType;

import java.util.ArrayList;
import java.util.GregorianCalendar;
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
import com.davisy.entity.ChatParticipants;
import com.davisy.entity.Chats;
import com.davisy.entity.Comment;
import com.davisy.entity.Follower;
import com.davisy.entity.Interested;
import com.davisy.entity.Post;
import com.davisy.entity.Share;
import com.davisy.entity.User;
import com.davisy.entity.ChatParticipants.Primary;
import com.davisy.model.NotificationModel;
import com.davisy.service.ChatParticipantsService;
import com.davisy.service.ChatsService;
import com.davisy.service.CommentService;
import com.davisy.service.FollowService;
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
	FollowService followService;

	@Autowired
	ChatsService chatsService;

	@Autowired
	ChatParticipantsService chatParticipantsService;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@Async
	@MessageMapping("/notify/{to}")
	public void sendNotification(@DestinationVariable int to, NotificationModel model) {
		try {
			User user = userService.findById(model.getFromUserId());
			Post post = new Post();
			if (model.getPostId() > 0)
				post = postService.findById(model.getPostId());
			if (model.getType().toString().equalsIgnoreCase("COMMENT")
					|| model.getType().toString().equalsIgnoreCase("REPCOMMENT")) {
				Comment comment = new Comment();
				comment.setUser(user);
				comment.setPost(post);
				if (model.getReplyId() != 0) {
					Comment comment2 = commentService.findById(model.getReplyId());
					comment.setCommentParent(comment2);
					int id = commentService.findByIdtoUser(model.getReplyId());
					simpMessagingTemplate.convertAndSend("/topic/notification/" + id,
							model(messagesService.loadNotification(id)));
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
				if (interestedService.findInterested(user.getUser_id(), post.getPost_id()) == null) {
					Interested interested = new Interested();
					interested.setUser(user);
					interested.setPost(post);
					interestedService.create(interested);
				}
			}
			if (model.getType().toString().equalsIgnoreCase("FOLLOW")) {
				User toUser = userService.findById(to);
				Follower follower = new Follower();
				Follower.Pk pk = new Follower.Pk();
				pk.setFollower_id(to);
				pk.setUser_id(user.getUser_id());
				follower.setPk(pk);
				followService.create(follower);
				if (followService.checkFriend(user.getUser_id(), to)
						&& chatsService.findChatNames(user.getUsername(), toUser.getUsername()) == null) {
					createNewChat(user.getUsername(), toUser.getUsername(), user.getUser_id(), toUser.getUser_id());
				} else if (followService.checkFriend(user.getUser_id(), to)
						&& chatsService.findChatNames(user.getUsername(), toUser.getUsername()) != null) {
					Chats chats = chatsService.findChatNames(user.getUsername(), toUser.getUsername());
					chats.setIsfriend(true);
					chatsService.update(chats);
				}
			}
			simpMessagingTemplate.convertAndSend("/topic/notification/" + to,
					model(messagesService.loadNotification(to)));
			if (model.getReplyId() != 0) {
				int id = commentService.findByIdtoUser(model.getReplyId());
				simpMessagingTemplate.convertAndSend("/topic/notification/" + id,
						model(messagesService.loadNotification(id)));
			}

		} catch (Exception e) {
			System.out.println("error sendNotification: " + e);
		}
	}

	@Async
	@MessageMapping("/notifyfollowregister")
	public void sendNotificationFollow(NotificationModel model) {
		System.out.println("array: " + model.getFollow_id().length);
		System.out.println("array1: " + model.getFollow_id()[1]);
		User user = userService.findById(model.getFromUserId());
		int[] arr = model.getFollow_id();
		for (int i = 0; i < arr.length; i++) {
			Follower follower = new Follower();
			Follower.Pk pk = new Follower.Pk();
			pk.setFollower_id(arr[i]);
			pk.setUser_id(user.getUser_id());
			follower.setPk(pk);
			followService.create(follower);
			simpMessagingTemplate.convertAndSend("/topic/notification/" + arr[i],
					model(messagesService.loadNotification(arr[i])));
		}
		System.out.println("model.getFromUserId(): " + model.getFromUserId());
		simpMessagingTemplate.convertAndSend("/topic/loaddata/suggest-post/"+model.getFromUserId(), "success");
		
	}

	@MessageMapping("/load/notification/{to}")
	public void loadNotidication(@DestinationVariable int to) {
		try {
			List<Object[]> noti = messagesService.loadNotification(to);
			simpMessagingTemplate.convertAndSend("/topic/loaddata/notification/" + to, model(noti));
		} catch (Exception e) {
			System.out.println("error loadNotidication: " + e);
		}
	}

	public List<NotificationModel> model(List<Object[]> noti) {
		List<NotificationModel> lisModels = new ArrayList<>();
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
			} else if ((ob[6] + "").equalsIgnoreCase("REPCOMMENT")) {
				model.setType(MessageType.REPCOMMENT);
			} else if ((ob[6] + "").equalsIgnoreCase("INTERESTED")) {
				model.setType(MessageType.INTERESTED);
			} else if ((ob[6] + "").equalsIgnoreCase("FOLLOW")) {
				model.setType(MessageType.FOLLOW);
			} else {
				model.setType(MessageType.SHARE);
			}
			model.setFollowing_status(Boolean.valueOf(ob[7].toString()));
			lisModels.add(model);
		}
		return lisModels;
	}

	@Async
	synchronized public void createNewChat(String fromUserId, String toUserId, int user1, int user2) {
		if (chatsService.findChatNames(fromUserId, toUserId) == null) {
			Chats chats = new Chats();
			List<Integer> list = new ArrayList<>();
			list.add(user1);
			list.add(user2);
			chats.setName_chats(fromUserId + toUserId);
			chatsService.create(chats);
			Chats newChat = chatsService.findChatNames(fromUserId, toUserId);
			for (Integer ls : list) {
				ChatParticipants participants = new ChatParticipants();
				ChatParticipants.Primary primary = new Primary();
				primary.setChat_id(newChat.getId());
				primary.setUser_id(ls);
				participants.setPrimary(primary);
				chatParticipantsService.create(participants);
			}
		}

	}

}
