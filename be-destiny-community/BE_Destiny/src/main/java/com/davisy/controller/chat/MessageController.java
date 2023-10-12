package com.davisy.controller.chat;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Chats;
import com.davisy.entity.Messages;
import com.davisy.entity.User;
import com.davisy.model.chat.MessageModel;
import com.davisy.model.chat.UserModel;
import com.davisy.model.chat.UserModel.MessageType;
import com.davisy.service.impl.ChatsServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.MessagesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;
import com.davisy.storage.chat.UserChatStorage;
import com.davisy.storage.chat.UserStorage;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
@Component
public class MessageController {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	UserServiceImpl userServiceImpl;
	@Autowired
	MessagesServiceImpl messagesServiceImpl;
	@Autowired
	ChatsServiceImpl chatsServiceImpl;
	@Autowired
	FollowServiceImpl followServiceImpl;

	@Async
	@MessageMapping("/chat/{to}")
	public void sendMessage(@DestinationVariable int to, MessageModel message) {
		System.out.println("handling send message: " + message + " to: " + to);
		boolean isExists = UserChatStorage.getInstance().getUsers().containsKey(to);
		if (isExists) {
			User user = userServiceImpl.findById(message.getFromLogin());
//				System.out.println("success");
			Chats chats = chatsServiceImpl.findChatNames(String.valueOf(user.getUser_id()), String.valueOf(to));
			Messages messages = new Messages();
			messages.setContent(message.getMessage());
			messages.setUser(user);
			messages.setChats(chats);
			messages.setSend_Status(false);
			messagesServiceImpl.create(messages);
			simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);

		}
	}

	@PostMapping("/v1/user/chat/load/messages")
	public ResponseEntity<List<Object[]>> loadMessages(HttpServletRequest request, @RequestBody String to) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			Chats chats = chatsServiceImpl.findChatNames(String.valueOf(user.getUser_id()), to);
			if (chats != null) {
				List<Object[]> list = messagesServiceImpl.findListMessage(chats.getName_chats());
				return ResponseEntity.ok().body(list);
			}
			return ResponseEntity.ok().body(null);
		} catch (Exception e) {
			System.out.println("Error loadMessages in MessagesController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/oauth/logout")
	@SendTo("/topic/public")
	public HashMap<Integer, List<UserModel>> logout(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			user.setOnline_last_date(GregorianCalendar.getInstance());
			userServiceImpl.update(user);
			List<UserModel> lisModel = new ArrayList<>();
			String type = "";
			for (User us : userServiceImpl.findAll()) {
//				UserModel userModel=new UserModel();
				if (followServiceImpl.checkFriend(user.getUser_id(), us.getUser_id())) {
					type = "LEAVE";
					if (us.getOnline_last_date() == null) {
						type = "JOIN";
					}
					lisModel.add(userModel(us, user.getUser_id(), type, true, false, true));
				}
			}
			UserChatStorage.getInstance().setUser(user.getUser_id(), lisModel);
//			simpMessagingTemplate.convertAndSend("/topic/public" + UserChatStorage.getInstance().getUsers());
			return UserChatStorage.getInstance().getUsers();
		} catch (Exception e) {
			System.out.println("Error logout: " + e);
			return null;
		}
	}

	public UserModel userModel(User us, int user_id, String type, boolean check, boolean hide, boolean status) {
		UserModel userModel = new UserModel();
		if (type.equalsIgnoreCase("LEAVE")) {
			userModel.setType(MessageType.LEAVE);
		} else {
			userModel.setType(MessageType.JOIN);
		}
		userModel.setUser_id(us.getUser_id());
		userModel.setUsername(us.getUsername());
		userModel.setFullname(us.getFullname());
		userModel.setEmail(us.getEmail());
		userModel.setAvatar(us.getAvatar());
		userModel.setMessageUnRead(messagesServiceImpl.countMessageUnread(us.getUser_id()));
//		userModel.setLastMessage(lastMeassage(String.valueOf(user_id), String.valueOf(us.getUser_id())));
		userModel.setLastMessage(null);
		userModel.setOnline(us.getOnline_last_date());
		userModel.setFriend(check);
		userModel.setHide(hide);
		userModel.setStatus(status);
		return userModel;
	}
}
