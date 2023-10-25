package com.davisy.controller.chat;

<<<<<<< HEAD
import java.lang.management.MemoryType;
=======
>>>>>>> status-online
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.ChatParticipants;
import com.davisy.entity.Chats;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Follower;
import com.davisy.entity.User;
import com.davisy.model.chat.UserModel;
import com.davisy.model.chat.UserModel.MessageType;
import com.davisy.service.ChatParticipantsService;
import com.davisy.service.impl.ChatParticipantsServiceImpl;
import com.davisy.service.impl.ChatsServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.MessagesServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;
import com.davisy.storage.chat.UserChatStorage;
import com.davisy.storage.chat.UserStorage;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class UserChatController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserServiceImpl userServiceImpl;
	@Autowired
	FollowServiceImpl followServiceImpl;
	@Autowired
	PostImagesServiceImpl postImagesServiceImpl;
	@Autowired
	PostServiceImpl postServiceImpl;
	@Autowired
	ChatsServiceImpl chatsServiceImpl;
	@Autowired
	ChatParticipantsServiceImpl chatParticipantsServiceImpl;
	@Autowired
	MessagesServiceImpl messagesServiceImpl;

	long millis = System.currentTimeMillis();
	java.sql.Date day = new java.sql.Date(millis);

	@GetMapping("/v1/user/registrationchat")
	public ResponseEntity<User> register(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			async(user, true);
			return ResponseEntity.ok().body(user);
		} catch (Exception e) {
			System.out.println("Error register in userchatcontroller: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@GetMapping("/v1/user/logoutchat")
	public ResponseEntity<Void> logout(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			async(user, false);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			System.out.println("Error logout in userchatcontroller: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@Async
	public void async(User user, boolean checkRequest) {
		try {
<<<<<<< HEAD
//			List<UserModel> lisModel = new ArrayList<>();
=======
			List<UserModel> lisModel = new ArrayList<>();
>>>>>>> status-online
			if (checkRequest == true) {
				user.setOnline_last_date(null);

			} else {
				user.setOnline_last_date(GregorianCalendar.getInstance());
			}
			userServiceImpl.update(user);
			String type = "";
			if (checkRequest == true) {
				synchronized (this) {
<<<<<<< HEAD
					List<Object[]> listChatsRoom = chatsServiceImpl.loadAllChatRoom(user.getUser_id());
					List<UserModel> listModel = new ArrayList<>();
					for (Object[] ob : listChatsRoom) {
						UserModel model = new UserModel();
						if (ob[0].equals("JOIN")) {
							model.setType(MessageType.JOIN);
						} else {
							model.setType(MessageType.LEAVE);
						}
						model.setUser_id(Integer.valueOf(ob[1].toString()));
						model.setUsername(ob[2].toString());
						model.setFullname(ob[3].toString());
						model.setEmail(ob[4].toString());
						model.setAvatar(ob[5].toString());
						model.setMessageUnRead(Integer.valueOf(ob[6].toString()));
						model.setLastMessage(ob[7]+"");
						model.setOnline(ob[8]+"");
						model.setFriend(Boolean.valueOf(ob[9].toString()));
						model.setHide(Boolean.valueOf(ob[10].toString()));
						model.setStatus(Boolean.valueOf(ob[11].toString()));
						listModel.add(model);
						
					}
					UserChatStorage.getInstance().setUser(user.getUser_id(), listModel);
=======
					List<Follower> listFollow = followServiceImpl.findALlFriend(user.getUser_id(), user.getUser_id());
					List<Chats> listChats = chatsServiceImpl.findAllChatsUser(String.valueOf(user.getUser_id()));
					List<Integer> checkContains = new ArrayList<>();

					for (Follower fl : listFollow) {
						Follower.Pk pk = fl.getPk();
						if (followServiceImpl.checkFriend(user.getUser_id(), pk.getUser_id())) {
							User us = userServiceImpl.findById(pk.getUser_id());
							if (us.getOnline_last_date() == null) {
								type = "JOIN";
							} else {
								type = "LEAVE";
							}
							checkContains.add(us.getUser_id());
							lisModel.add(userModel(us, user.getUser_id(), type, true, false, true));
						}
					}
					for (Chats chats : listChats) {
						List<ChatParticipants> listChatParticipants = chatParticipantsServiceImpl
								.findAllId(chats.getId());
						for (ChatParticipants participants : listChatParticipants) {
							ChatParticipants.Primary primary = participants.getPrimary();
							if (primary.getUser_id() != user.getUser_id()
									&& !checkContains.contains(primary.getUser_id())) {
								User us = userServiceImpl.findById(primary.getUser_id());
								if (us.getOnline_last_date() == null) {
									type = "JOIN";
								} else {
									type = "LEAVE";
								}
								lisModel.add(userModel(us, user.getUser_id(), type, chats.isIsfriend(), chats.isHide(),
										chats.isStatus()));
							}
						}
					}

					UserChatStorage.getInstance().setUser(user.getUser_id(), lisModel);
>>>>>>> status-online
				}
			}
			synchronized (this) {
				List<UserModel> userModels = new ArrayList<>();
				for (Integer key : UserChatStorage.getInstance().getUsers().keySet()) {
					if (key != user.getUser_id()) {
						for (UserModel v : UserChatStorage.getInstance().getUsers().get(key)) {
							if (v.getUser_id() == user.getUser_id()) {
								if (checkRequest == true)
									v.setType(MessageType.JOIN);
								else
									v.setType(MessageType.LEAVE);
								userModels.add(v);
							}
						}
						UserChatStorage.getInstance().setUser(key, userModels);
					}

				}
			}

		} catch (Exception e) {
<<<<<<< HEAD
			System.out.println("Error Async: " + e);
=======
//			System.out.println("Error Async: " + e);
>>>>>>> status-online
		}
	}

	@MessageMapping("/fetchAllUsers")
	@SendTo("/topic/public")
	public HashMap<Integer, List<UserModel>> fetchAll() {
		return UserChatStorage.getInstance().getUsers();
	}

<<<<<<< HEAD
=======
	public UserModel userModel(User us, int user_id, String type, boolean check, boolean hide, boolean status) {
		UserModel userModel = new UserModel();
		String[] temp = lastMeassage(String.valueOf(user_id), String.valueOf(us.getUser_id()));
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
		userModel.setLastMessage(temp[0]);
		userModel.setOnline(temp[1]);
		userModel.setFriend(check);
		userModel.setHide(hide);
		userModel.setStatus(status);
		return userModel;
	}

	public String[] lastMeassage(String fromLogin, String toUser) {
		try {
			String[] temp = new String[2];
			String message = "";
			String time = "";
			Chats chats = chatsServiceImpl.findChatNames(fromLogin, toUser);
			if (chats != null) {
				List<Object[]> listMessage = messagesServiceImpl.findListMessage(chats.getName_chats());
				if (listMessage.size() > 0) {
					message = String.valueOf(listMessage.get(listMessage.size() - 1)[1]);
					time = String.valueOf(listMessage.get(listMessage.size() - 1)[2]);
					if (listMessage.get(listMessage.size() - 1)[3] == Integer.valueOf(fromLogin)) {
						message = "Bạn: " + message;
					}
				}
			}
			temp[0] = message;
			temp[1] = time;
			return temp;
		} catch (Exception e) {
			System.out.println("Error lastMeassage: " + e);
			throw e;
		}
	}

	public List<DataFollows> reloadDataFriends(List<Follower> followers, User user) {
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower all : followers) {
			Follower.Pk pk1 = all.getPk();
			if (pk1.getUser_id() == user.getUser_id()
					&& followServiceImpl.checkFriend(pk1.getFollower_id(), pk1.getUser_id())) {
				dataFollows.add(data(pk1.getFollower_id()));
			}
		}
		return dataFollows;
	}

	public DataFollows data(int id) {
		DataFollows data = new DataFollows();
		User us = userServiceImpl.findById(id);
		int countPost = postServiceImpl.countPost(id);
		int countFollower = followServiceImpl.countFollowers(id);
		int countImg = postImagesServiceImpl.countPostImages(id);
		data.setUser_id(id);
		data.setThumb(us.getThumb());
		data.setAvatar(us.getAvatar());
		data.setMark(us.getMark());
		data.setFullname(us.getFullname());
		data.setIntro(us.getIntro());
		data.setCountPost(countPost);
		data.setCountFollower(countFollower);
		data.setCountImg(countImg);
		return data;
	}
>>>>>>> status-online

}
