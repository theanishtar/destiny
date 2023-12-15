package com.davisy.controller;

import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.SpamRrequestCheck;
import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.ChatParticipants;
import com.davisy.entity.ChatParticipants.Primary;
import com.davisy.entity.Chats;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Follower;
import com.davisy.entity.User;
import com.davisy.service.ChatParticipantsService;
import com.davisy.service.ChatsService;
import com.davisy.service.FollowService;
import com.davisy.service.JwtService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostService;
import com.davisy.service.UserService;
import com.davisy.storage.chat.UserFollowerStorage;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class FollowController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserService userService;
	@Autowired
	FollowService followService;
	@Autowired
	PostService postService;
	@Autowired
	PostImagesService postImagesService;
	@Autowired
	ChatsService chatsService;
	@Autowired
	ChatParticipantsService chatParticipantsService;

	// Tải dữ liệu following
	@GetMapping("/v1/user/following/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFollowing(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = followService.findAllFollowing(id);
			return ResponseEntity.status(200).body(data(list));
		} catch (Exception e) {
			System.out.println("Error loadDataFollowing in followController: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	// Tải dữ liệu follower
	@GetMapping("/v1/user/follower/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFollower(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> list = followService.findAllFollowerUser(id);
			setMapUser(id, list);
			return ResponseEntity.status(200).body(data(list));
		} catch (Exception e) {
			System.out.println("Error loadDataFollowing in followController: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	public void setMapUser(int id, List<Object[]> list) {
		try {
			List<Integer> listId = new ArrayList<>();
			for (Object[] o : list) {
				listId.add(Integer.valueOf(o[0].toString()));
			}
			UserFollowerStorage.getInstance().setUser(id, listId);
		} catch (Exception e) {
			System.out.println("Error storage follower: " + e);
		}

	}

	// Tải dữ liệu friends
	@GetMapping("/v1/user/friends/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFriends(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		int id = user.getUser_id();
		List<Object[]> list = followService.findAllFriend(id);
		return ResponseEntity.status(200).body(data(list));
	}

	public List<DataFollows> data(List<Object[]> list) {
		List<DataFollows> listData = new ArrayList<>();
		for (Object[] ob : list) {
			DataFollows data = new DataFollows();
			data.setUser_id(Integer.valueOf(ob[0].toString()));
			data.setThumb(ob[1] + "");
			data.setAvatar(ob[2] + "");
			data.setMark(Integer.valueOf(ob[3].toString()));
			data.setFullname(ob[4] + "");
			data.setIntro(ob[5] + "");
			data.setCountPost(Integer.valueOf(ob[6].toString()));
			data.setCountFollower(Integer.valueOf(ob[7].toString()));
			data.setCountImg(Integer.valueOf(ob[8].toString()));
			data.setUsername(ob[9] + "");
			listData.add(data);
		}
		return listData;
	}

	// Đề xuất
	@GetMapping("/v1/user/following/load/suggest")
	public ResponseEntity<List<DataFollows>> loadDataFollowSuggest(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		List<DataFollows> data = new ArrayList<>();
		List<Object[]> list = followService.loadDataSuggest(user.getUser_id());
		for (Object[] ob : list) {
			DataFollows follows = new DataFollows();
			follows.setUser_id(Integer.valueOf(ob[0].toString()));
			follows.setAvatar(ob[1] + "");
			follows.setFullname(ob[2] + "");
			follows.setUsername(ob[3] + "");
			data.add(follows);
		}
		return ResponseEntity.status(200).body(data);
	}

	@GetMapping("/v1/user/following/load/suggestregister")
	public ResponseEntity<List<DataFollows>> loadDataFollowSuggestRegister(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		List<DataFollows> data = new ArrayList<>();
		List<Object[]> list = followService.loadDataSuggestRegister(user.getUser_id());
		for (Object[] ob : list) {
			DataFollows follows = new DataFollows();
			follows.setUser_id(Integer.valueOf(ob[0].toString()));
			follows.setAvatar(ob[1] + "");
			follows.setFullname(ob[2] + "");
			follows.setUsername(ob[3] + "");
			data.add(follows);
		}
		return ResponseEntity.status(200).body(data);
	}

	// Hủy following
	@PostMapping("/v1/user/following/delete")
	public ResponseEntity<List<DataFollows>> deleteFollow(HttpServletRequest request, @RequestBody int id) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			followService.delete(id, user.getUser_id());
			User toUser = userService.findById(id);
			String fromUserId = user.getUsername();
			String toUserId = toUser.getUsername();
			if (chatsService.findChatNames(fromUserId, toUserId) != null) {
				updateChatsUnfollow(fromUserId, toUserId);
			}
			return ResponseEntity.status(200).body(reloadData(email));
		} catch (Exception e) {
			System.out.println("Error addfollowing: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	// thêm follow
//	@PostMapping("/v1/user/following/addFollow")
//	public ResponseEntity<List<DataFollows>> addFollows(HttpServletRequest request, @RequestBody int id) {
//		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userService.findByEmail(email);
//			User toUser = userService.findById(id);
//			Follower follower = new Follower();
//			Follower.Pk pk = new Follower.Pk();
//			pk.setFollower_id(id);
//			pk.setUser_id(user.getUser_id());
//			pk.setDate_follow( GregorianCalendar.getInstance());
//			follower.setPk(pk);
//			followService.create(follower);
//			if (followService.checkFriend(user.getUser_id(), id)
//					&& chatsService.findChatNames(user.getUsername(), toUser.getUsername()) == null) {
//				createNewChat(user.getUsername(),  toUser.getUsername(),user.getUser_id(),toUser.getUser_id());
//			}
//			return ResponseEntity.status(200).body(reloadData(email));
//		} catch (Exception e) {
//			System.out.println("Error addfollow: "+e);
//			return ResponseEntity.badRequest().build();
//		}
//		
//	}

	// Hủy follower
	@PostMapping("/v1/user/follower/delete")
	public ResponseEntity<List<DataFollows>> deleteFollower(HttpServletRequest request, @RequestBody int id) {

		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			User toUser = userService.findById(id);
			followService.delete(id, user.getUser_id());
			return ResponseEntity.status(200).body(reloadData(email));
		} catch (Exception e) {
			System.out.println("Error addfollow: " + e);
			return ResponseEntity.badRequest().build();
		}
//		String fromUserId = user.getUsername();
//		String toUserId = toUser.getUsername();
//		if (followService.checkFriend(user.getUser_id(), id)
//				&& chatsService.findChatNames(fromUserId, toUserId) != null) {
//			updateChatsUnfollow(fromUserId, toUserId);
//		}

	}

//	@PostMapping("/v1/user/inbox")
//	public void createChatRoom(HttpServletRequest request, @RequestBody int id) {
//		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user1 = userService.findByEmail(email);
//			User user2 = userService.findById(id);
//			String fromUserId =user1.getUsername();
//			String toUser =user2.getUsername();
//			if (chatsService.findChatNames(fromUserId, toUser) == null) {
//				Chats chats = new Chats();
//				List<Integer> list = new ArrayList<>();
//				list.add(user1.getUser_id());
//				list.add(user2.getUser_id());
//				chats.setName_chats(fromUserId + toUser);
//				chats.setIsfriend(false);
//				chatsService.create(chats);
//				Chats newChat = chatsService.findChatNames(fromUserId, toUser);
//				for (Integer ls : list) {
//					ChatParticipants participants = new ChatParticipants();
//					ChatParticipants.Primary primary = new Primary(newChat.getId(), ls);
//					participants.setPrimary(primary);
//					chatParticipantsService.create(participants);
//				}
//			}
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
//
//	}
//
//	@Async
//	synchronized public void createNewChat(String fromUserId, String toUserId,int user1,int user2) {
//		try {
//			if (chatsService.findChatNames(fromUserId, toUserId) == null) {
//			Chats chats = new Chats();
//			List<Integer> list = new ArrayList<>();
//			list.add(user1);
//			list.add(user1);
//			chats.setName_chats(fromUserId + toUserId);
//			chatsService.create(chats);
//			Chats newChat = chatsService.findChatNames(fromUserId, toUserId);
//			for (Integer ls : list) {
//				ChatParticipants participants = new ChatParticipants();
//				ChatParticipants.Primary primary = new Primary(newChat.getId(), ls);
//				participants.setPrimary(primary);
//				chatParticipantsService.create(participants);
//			}
//		}
//		} catch (Exception e) {
//			System.out.println("Lối: " + e);
//		}
//		
//
//	}

	@Async
	synchronized public void updateChatsUnfollow(String fromUserId, String toUserId) {
		Chats chats = chatsService.findChatNames(fromUserId, toUserId);
		chats.setIsfriend(false);
		chatsService.update(chats);
	}

	public DataFollows data(int id) {
		DataFollows data = new DataFollows();
		User us = userService.findById(id);
		int countPost = postService.countPost(id);
		int countFollower = followService.countFollowers(id);
		int countImg = postImagesService.countPostImages(id);
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

	public List<DataFollows> reloadData(String email) {
		User user = userService.findByEmail(email);
		List<Follower> followers = followService.findAllFollowers(user.getUser_id());
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower fl : followers) {
			Follower.Pk pk = fl.getPk();
			dataFollows.add(data(pk.getUser_id()));
		}
		return dataFollows;
	}

	public List<DataFollows> reloadDataFollower(String email) {
		User user = userService.findByEmail(email);
		List<Follower> followers = followService.findAll();
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower fl : followers) {
			Follower.Pk pk = fl.getPk();
			if (pk.getUser_id() == user.getUser_id()) {
				dataFollows.add(data(pk.getFollower_id()));
			}
		}
		return dataFollows;
	}

	public List<DataFollows> reloadDataFriends(String email) {
		User user = userService.findByEmail(email);
		List<Follower> followers = followService.findAll();
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower all : followers) {
			Follower.Pk pk1 = all.getPk();
			if (pk1.getUser_id() == user.getUser_id()
					&& followService.checkFriend(pk1.getFollower_id(), pk1.getUser_id())) {
				dataFollows.add(data(pk1.getFollower_id()));
			}
		}
		return dataFollows;
	}

}
