package com.davisy.controller.chat;

import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.encrypt.AES;
import com.davisy.encrypt.DiffieHellman;
import com.davisy.entity.ChatParticipants;
import com.davisy.entity.ChatParticipants.Primary;
import com.davisy.entity.Chats;
import com.davisy.entity.User;
import com.davisy.model.chat.UserModel;
import com.davisy.model.chat.UserModel.MessageType;
import com.davisy.service.impl.ChatParticipantsServiceImpl;
import com.davisy.service.impl.ChatsServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.MessagesServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;
import com.davisy.storage.chat.UserChatStorage;
import com.davisy.storage.chat.UserFollowerStorage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@Component
public class UserChatController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	UserServiceImpl userService;
	@Autowired
	FollowServiceImpl followService;
	@Autowired
	PostImagesServiceImpl postImagesService;
	@Autowired
	PostServiceImpl postService;
	@Autowired
	ChatsServiceImpl chatsService;
	@Autowired
	ChatParticipantsServiceImpl chatParticipantsService;
	@Autowired
	MessagesServiceImpl messagesService;

	long millis = System.currentTimeMillis();
	java.sql.Date day = new java.sql.Date(millis);

	@GetMapping("/v1/user/registrationchat")
	public ResponseEntity<UserTemp> register(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			user.setOnline_last_date(null);
			userService.update(user);
			async(user, true);
			UserTemp temp = new UserTemp();
			temp.setUser_id(user.getUser_id());
			temp.setAvatar(user.getAvatar());
			return ResponseEntity.ok().body(temp);
		} catch (Exception e) {
			System.out.println("Error register in userchatcontroller: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@GetMapping("/v1/user/logout/chat/{id}")
	public ResponseEntity<Void> logout(@PathVariable int id) {
		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findById(id);
			user.setOnline_last_date(GregorianCalendar.getInstance());
			userService.update(user);
			async(user, false);
			UserChatStorage.getInstance().remove(id);
			UserFollowerStorage.getInstance().remove(id);
//			System.err.println("đăng xuất");
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			System.out.println("Error logout in userchatcontroller: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@Async
	public void async(User user, boolean checkRequest) {
		int from = user.getUser_id();
		try {
			if (checkRequest) {
				synchronized (UserChatStorage.getInstance()) {
					List<Object[]> listChatsRoom = chatsService.loadAllChatRoom(from);
					List<UserModel> listModel = new ArrayList<>();
					for (Object[] ob : listChatsRoom) {
						String content = ob[7] + "";
						int to = Integer.valueOf(ob[1].toString());
						UserModel model = new UserModel();
						model.setLastMessage(content);
						
						if(content != "") {
							if(content.startsWith("Bạn: ")) {
								content = content.substring(5);
							}
							
							
							// giải mã nội dung tin nhắn
							
							// Step1. Get SecretKey from u1, u2
					    	int key = DiffieHellman.genSecretKey(from, to);
					    	
					    	System.out.println("FROM: "+from+": "+to);
					    	
					    	// Step2. encode message
					    	String originMess = AES.decrypt(content, key);
							System.out.println(content+":"+originMess);
							

							model.setLastMessage(originMess);
						}
						
						
						if (ob[0].equals("JOIN")) {
							model.setType(MessageType.JOIN);
						} else {
							model.setType(MessageType.LEAVE);
						}
						model.setUser_id(to);
						model.setUsername(ob[2].toString());
						model.setFullname(ob[3].toString());
						model.setEmail(ob[4].toString());
						model.setAvatar(ob[5].toString());
						model.setMessageUnRead(Integer.valueOf(ob[6].toString()));
						model.setOnline(ob[8] + "");
						model.setFriend(Boolean.valueOf(ob[9].toString()));
						model.setTypeMessage(ob[10] + "");
						model.setRecall(Boolean.valueOf(ob[11].toString()));
						listModel.add(model);

					}
					UserChatStorage.getInstance().setUser(user.getUser_id(), listModel);
				}
			}

			Iterator<Integer> iterator = UserChatStorage.getInstance().getUsers().keySet().iterator();
			while (iterator.hasNext()) {
				Integer key = iterator.next();

				if (key != user.getUser_id()) {
					List<UserModel> originalList = UserChatStorage.getInstance().getUsers().get(key);
					List<UserModel> copyList = new ArrayList<>(originalList);

					for (UserModel v : copyList) {
						if (v.getUser_id() == user.getUser_id()) {
							if (user.getOnline_last_date() == null)
								v.setType(MessageType.JOIN);
							else
								v.setType(MessageType.LEAVE);
						}
					}
					UserChatStorage.getInstance().getUsers().put(key, copyList);
				}
			}

		} catch (Exception e) {
			System.out.println("Error Async: " + e);
		}
	}

	@MessageMapping("/reload/messages/{type}/{id}/{toid}")
	@SendTo("/topic/public")
	public HashMap<Integer, List<UserModel>> reload(@DestinationVariable boolean type, @DestinationVariable int id,
			@DestinationVariable int toid) {
		try {
//			System.err.println("type: " + type);
			User user = userService.findById(toid);
			if (type == true) {
				User toUser = userService.findById(id);
				Chats chats = chatsService.findChatNames(user.getUsername(), toUser.getUsername());
				if (chats != null)
					messagesService.updateStatusMessages(true, id, chats.getId());
			}
			async(user, true);
			return UserChatStorage.getInstance().getUsers();
		} catch (Exception e) {
			System.out.println("Error reload: " + e);
			return null;
		}
	}

	@MessageMapping("/fetchAllUsers")
	@SendTo("/topic/public")
	public HashMap<Integer, List<UserModel>> fetchAll() {
		return UserChatStorage.getInstance().getUsers();
	}

	@GetMapping("/v1/user/block/chat")
	public ResponseEntity<Void> loadMessages(HttpServletRequest request, @RequestParam("to") int to, @RequestParam("status") boolean statsus) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int chat_id = chatParticipantsService.chat_id(user.getUser_id(), to);
			chatParticipantsService.block(statsus,chat_id, user.getUser_id());
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			System.out.println("Error loadMessages in MessagesController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/inbox")
	public void createChatRoom(HttpServletRequest request, @RequestBody int id) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user1 = userService.findByEmail(email);
			User user2 = userService.findById(id);
			String fromUserId = user1.getUsername();
			String toUser = user2.getUsername();
			if (chatsService.findChatNames(fromUserId, toUser) == null) {
				Chats chats = new Chats();
				List<Integer> list = new ArrayList<>();
				list.add(user1.getUser_id());
				list.add(user2.getUser_id());
				chats.setName_chats(fromUserId + toUser);
				chats.setIsfriend(false);
				chatsService.create(chats);
				Chats newChat = chatsService.findChatNames(fromUserId, toUser);
				for (Integer ls : list) {
					ChatParticipants participants = new ChatParticipants();
					ChatParticipants.Primary primary = new Primary(newChat.getId(), ls, true);
					participants.setPrimary(primary);
					chatParticipantsService.create(participants);
				}
			}
			async(user1, true);
			simpMessagingTemplate.convertAndSend("/topic/public", UserChatStorage.getInstance().getUsers());
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UserTemp {
	int user_id;
	String avatar;
}
