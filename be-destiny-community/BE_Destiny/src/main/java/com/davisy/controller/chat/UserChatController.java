package com.davisy.controller.chat;

import java.util.ArrayList;
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
	ChatParticipantsService chatParticipantsService;
	@Autowired
	MessagesServiceImpl messagesServiceImpl;
	public static User staticUser = new User();

	long millis = System.currentTimeMillis();
	java.sql.Date day = new java.sql.Date(millis);

	@GetMapping("/v1/user/registrationchat")
	public ResponseEntity<User> register(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			this.staticUser = user;
			async(user);
			return ResponseEntity.ok().body(user);
		} catch (Exception e) {
			System.out.println("Error register in userchatcontroller: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@Async
	public void async(User user) {
		try {
			List<User> listUser = userServiceImpl.findAll();
			List<UserModel> lisModel = new ArrayList<>();

			List<Follower> followers = followServiceImpl.findAll();
			List<ChatParticipants> listChatParticipants = chatParticipantsService.findAllId(user.getUser_id());
			List<DataFollows> dataFollows = new ArrayList<>();
			List<Integer> checkContains = new ArrayList<>();
			dataFollows.addAll(reloadDataFriends(followers, user));
			user.setOnline_last_date(null);
			userServiceImpl.update(user);
			String type = "";

			for (User us : listUser) {
//				UserModel userModel=new UserModel();
				if (followServiceImpl.checkFriend(user.getUser_id(), us.getUser_id())) {
					type = "LEAVE";
					if (us.getOnline_last_date() == null) {
						type = "JOIN";
					}
					lisModel.add(userModel(us, user.getUser_id(), type, true, false, true));
				}
			}
//			if(UserChatStorage.getInstance().getUsers().size()==0) {
			UserChatStorage.getInstance().setUser(user.getUser_id(), lisModel);
//			}else {
			List<UserModel> userModels = new ArrayList<>();
			int i = 0;
			for (Integer key : UserChatStorage.getInstance().getUsers().keySet()) {
				System.out.println("key: " + key);
				if (key != user.getUser_id()) {
					for (UserModel v : UserChatStorage.getInstance().getUsers().get(key)) {
						if (v.getUser_id() == user.getUser_id()) {
							v.setType(MessageType.JOIN);
							userModels.add(v);
						}
					}
					UserChatStorage.getInstance().setUser(key, userModels);
				}

			}

		} catch (Exception e) {
//			System.out.println("Error Async: " + e);
		}
	}

	@MessageMapping("/fetchAllUsers")
	@SendTo("/topic/public")
	public HashMap<Integer, List<UserModel>> fetchAll() {
		System.out.println("userstorage: " + UserChatStorage.getInstance().getUsers());
		return UserChatStorage.getInstance().getUsers();
	}

	public UserModel userModel(User us, int user_id, String type, boolean check, boolean hide, boolean status) {
		UserModel userModel = new UserModel();
		String [] temp = lastMeassage(String.valueOf(user_id), String.valueOf(us.getUser_id()));
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
			String []temp = new String[2];
			String message = "";
			String time = "";
			Chats chats = chatsServiceImpl.findChatNames(fromLogin, toUser);
			if (chats != null) {
				List<Object[]> listMessage = messagesServiceImpl.findListMessage(chats.getName_chats());
				if (listMessage.size() > 0) {
					message = String.valueOf(listMessage.get(listMessage.size() - 1)[1]);
					time =String.valueOf(listMessage.get(listMessage.size() - 1)[2]);
					System.out.println("time: " + time);
				}
				if (listMessage.get(listMessage.size() - 1)[3]==Integer.valueOf(fromLogin)) {
					message = "Bạn: " + message;
				}
			}
			temp[0]=message;
			temp[1]=time;
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

}
