package com.davisy.controller;

import com.davisy.model.NotificationModel.MessageType;
import com.davisy.mongodb.documents.Notification;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;

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
import com.davisy.service.BadWordService;
import com.davisy.service.ChatParticipantsService;
import com.davisy.service.ChatsService;
import com.davisy.service.CommentService;
import com.davisy.service.FollowService;
import com.davisy.service.InterestedService;
import com.davisy.service.MessagesService;
import com.davisy.service.NotifyService;
import com.davisy.service.PostService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;
import com.davisy.service.impl.BadWordServiceImpl;

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

	@Autowired
	NotifyService notifyService;

	@Autowired
	BadWordService badWordService;

	@Async
	@MessageMapping("/notify/{to}")
	public void sendNotification(@DestinationVariable int to, NotificationModel model) {
		try {
			System.err.println("model.getContent(): "+ model.getContent());
			if (badWordService.checkBadword(model.getContent())) {
				System.out.println("badWordService.checkBadword(model.getContent()): " + badWordService.checkBadword(model.getContent()));
				simpMessagingTemplate.convertAndSend("/topic/error-notification/" + model.getFromUserId(), true);
				return;
			}
			System.err.println("badWordService.checkBadword(model.getContent()): " + badWordService.checkBadword(model.getContent()));
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
							model(notifyService.findAllByName("idUserReceive", to + "")));
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
			insert(model, to);
			simpMessagingTemplate.convertAndSend("/topic/notification/" + to,
					model(notifyService.findAllByName("idUserReceive", to + "")));
			if (model.getReplyId() != 0) {
				int id = commentService.findByIdtoUser(model.getReplyId());
				simpMessagingTemplate.convertAndSend("/topic/notification/" + id,
						model(notifyService.findAllByName("idUserReceive", to + "")));
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
			insert(model, arr[i]);
			simpMessagingTemplate.convertAndSend("/topic/notification/" + arr[i],
					model(notifyService.findAllByName("idUserReceive", arr[i] + "")));
		}
		System.out.println("model.getFromUserId(): " + model.getFromUserId());
		simpMessagingTemplate.convertAndSend("/topic/loaddata/suggest-post/" + model.getFromUserId(), "success");

	}

	public void insert(NotificationModel model, int to) {

		Notification notification = new Notification();
		notification.setIdUserSend(model.getFromUserId() + "");
		notification.setIdUserReceive(to + "");
		notification.setPostId(model.getPostId() + "");
		notification.setReplyId(model.getReplyId() + "");
		notification.setTypeNotification(model.getType().toString());
		notification.setContentNotification("");
		Calendar calendar = GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));
		String month = ((calendar.get(Calendar.MONTH) + 1) < 10) ? "0" + (calendar.get(Calendar.MONTH) + 1)
				: (calendar.get(Calendar.MONTH) + 1) + "";
		String day = (calendar.get(Calendar.DAY_OF_MONTH) < 10) ? "0" + (calendar.get(Calendar.DAY_OF_MONTH))
				: (calendar.get(Calendar.DAY_OF_MONTH)) + "";
		String hour = (calendar.get(Calendar.HOUR_OF_DAY) < 10) ? "0" + (calendar.get(Calendar.HOUR_OF_DAY))
				: (calendar.get(Calendar.HOUR_OF_DAY)) + "";
		String munite = (calendar.get(Calendar.MINUTE) < 10) ? "0" + (calendar.get(Calendar.MINUTE))
				: (calendar.get(Calendar.MINUTE)) + "";
		String second = (calendar.get(Calendar.SECOND) < 10) ? "0" + (calendar.get(Calendar.SECOND))
				: (calendar.get(Calendar.SECOND)) + "";
		String time = calendar.get(Calendar.YEAR) + "-" + month + "-" + day + " " + hour + ":" + munite + ":" + second
				+ "." + calendar.get(Calendar.MILLISECOND);
		notification.setDateNotification(time);
		notifyService.insert(notification);
	}

	@MessageMapping("/load/notification/{to}")
	public void loadNotidication(@DestinationVariable int to) {
		try {
//			List<Object[]> noti = messagesService.loadNotification(to);
			List<Notification> noti = notifyService.findAllByName("idUserReceive", to + "");
			simpMessagingTemplate.convertAndSend("/topic/loaddata/notification/" + to, model(noti));
		} catch (Exception e) {
			System.out.println("error loadNotidication: " + e);
		}
	}

	public List<NotificationModel> model(List<Notification> noti) {
		List<NotificationModel> lisModels = new ArrayList<>();
		for (Notification n : noti) {
			NotificationModel model = new NotificationModel();
			User user = userService.findById(Integer.valueOf(n.getIdUserSend()));
			model.setAvatar(user.getAvatar());
			model.setFullname(user.getFullname());
			model.setFromUserId(Integer.valueOf(n.getIdUserSend()));
			model.setContent(n.getContentNotification());
			if (!"".equals(n.getPostId()))
				model.setPostId(Integer.valueOf(n.getPostId()));
			model.setTime(n.getDateNotification());

			if ((n.getTypeNotification()).equalsIgnoreCase("COMMENT")) {
				model.setType(MessageType.COMMENT);
			} else if (n.getTypeNotification().equalsIgnoreCase("REPCOMMENT")) {
				model.setType(MessageType.REPCOMMENT);
			} else if (n.getTypeNotification().equalsIgnoreCase("INTERESTED")) {
				model.setType(MessageType.INTERESTED);
			} else if (n.getTypeNotification().equalsIgnoreCase("FOLLOW")) {
				model.setType(MessageType.FOLLOW);
			} else {
				model.setType(MessageType.SHARE);
			}
			boolean checkFriend = followService.checkFriend(Integer.valueOf(n.getIdUserSend()),
					Integer.valueOf(n.getIdUserReceive()));
			model.setFollowing_status(checkFriend);
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
