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
import com.davisy.service.ChatsService;
import com.davisy.service.FollowService;
import com.davisy.service.MessagesService;
import com.davisy.service.UserService;
import com.davisy.storage.chat.UserChatStorage;

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
	UserService userService;
	@Autowired
	MessagesService messagesService;
	@Autowired
	ChatsService chatsService;
	@Autowired
	FollowService followService;

	@Async
	@MessageMapping("/chat/{to}")
	public void sendMessage(@DestinationVariable int to, MessageModel message) {
		User user = userService.findById(message.getFromLogin());
		User toUser = userService.findById(to);
		Chats chats = chatsService.findChatNames(user.getUsername(), toUser.getUsername());
		Messages messages = new Messages();
		messages.setContent(message.getMessage());
		messages.setUser(user);
		messages.setChats(chats);
		messages.setSend_Status(false);
		messagesService.create(messages);
		boolean isExists = UserChatStorage.getInstance().getUsers().containsKey(to);
		if (isExists) {
			simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);

		}
		simpMessagingTemplate.convertAndSend("/topic/statusmessages/" + message.getFromLogin(), true);
	}

	@PostMapping("/v1/user/chat/load/messages")
	public ResponseEntity<List<Object[]>> loadMessages(HttpServletRequest request, @RequestBody int to) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			List<Object[]> list = messagesService.findListMessage(user.getUser_id(),to);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Error loadMessages in MessagesController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

//	@PostMapping("/v1/user/chat/load/messages")
//	public ResponseEntity<List<Object[]>> loadMessages(HttpServletRequest request, @RequestBody int to) {
//		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userService.findByEmail(email);
//			User toUser = userService.findById(to);
//			Chats chats = chatsService.findChatNames(user.getUsername(), toUser.getUsername());
//			if (chats != null) {
//				messagesService.updateStatusMessages(true, Integer.valueOf(to), chats.getId());
//				List<Object[]> list = messagesService.findListMessage(chats.getName_chats());
//				return ResponseEntity.ok().body(list);
//			}
//			return ResponseEntity.ok().body(null);
//		} catch (Exception e) {
//			System.out.println("Error loadMessages in MessagesController: " + e);
//			return ResponseEntity.badRequest().build();
//		}
//	}

}