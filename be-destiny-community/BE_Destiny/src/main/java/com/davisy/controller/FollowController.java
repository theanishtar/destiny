package com.davisy.controller;

import java.util.ArrayList;
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
import com.davisy.service.JwtService;
import com.davisy.service.impl.ChatParticipantsServiceImpl;
import com.davisy.service.impl.ChatsServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class FollowController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserServiceImpl userServiceImpl;
	@Autowired
	FollowServiceImpl followServiceImpl;
	@Autowired
	PostServiceImpl postServiceImpl;
	@Autowired
	PostImagesServiceImpl postImagesServiceImpl;
	@Autowired
	ChatsServiceImpl chatsServiceImpl;
	@Autowired
	ChatParticipantsServiceImpl chatParticipantsServiceImpl;

	// Tải dữ liệu following
	@GetMapping("/v1/user/following/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFollowing(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		return ResponseEntity.status(200).body(reloadData(email));
	}

	// Tải dữ liệu follower
	@GetMapping("/v1/user/follower/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFollower(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		return ResponseEntity.status(200).body(reloadDataFollower(email));
	}

	// Tải dữ liệu friends
	@GetMapping("/v1/user/friends/load/data")
	public ResponseEntity<List<DataFollows>> loadDataFriends(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		return ResponseEntity.status(200).body(reloadDataFriends(email));
	}

	// Đề xuất
	@GetMapping("/v1/user/following/load/suggest")
	public ResponseEntity<List<DataFollows>> loadDataFollowSuggest(HttpServletRequest request) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		return ResponseEntity.status(200).body(loadSuggested(email));
	}

	// Hủy following
	@PostMapping("/v1/user/following/delete")
	public ResponseEntity<List<DataFollows>> deleteFollow(HttpServletRequest request, @RequestBody int id) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		followServiceImpl.delete(user.getUser_id(), id);
		return ResponseEntity.status(200).body(reloadData(email));
	}

	// thêm follow
	@PostMapping("/v1/user/following/addFollow")
	public ResponseEntity<List<DataFollows>> addFollows(HttpServletRequest request, @RequestBody int id) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		Follower follower = new Follower();
		Follower.Pk pk = new Follower.Pk();
		pk.setFollower_id(user.getUser_id());
		pk.setUser_id(id);
		follower.setPk(pk);
		followServiceImpl.create(follower);
		String fromUserId = String.valueOf(user.getUser_id());
		String toUserId = String.valueOf(id);
		if (followServiceImpl.checkFriend(user.getUser_id(), id)
				&& chatsServiceImpl.findChatNames(fromUserId, toUserId) == null) {
			createNewChat(fromUserId, toUserId);
		}
		return ResponseEntity.status(200).body(reloadData(email));
	}

	// Hủy follower
	@PostMapping("/v1/user/follower/delete")
	public ResponseEntity<List<DataFollows>> deleteFollower(HttpServletRequest request, @RequestBody int id) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		followServiceImpl.delete(id, user.getUser_id());
		String fromUserId = String.valueOf(user.getUser_id());
		String toUserId = String.valueOf(id);
		if (followServiceImpl.checkFriend(user.getUser_id(), id)
				&& chatsServiceImpl.findChatNames(fromUserId, toUserId) != null) {
			updateChatsUnfollow(fromUserId, toUserId);
		}
		return ResponseEntity.status(200).body(reloadData(email));
	}

	@PostMapping("/v1/user/inbox")
	public void createChatRoom(HttpServletRequest request, @RequestBody String toUserId) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userServiceImpl.findByEmail(email);
			String fromUserId = String.valueOf(user.getUser_id());
			if (chatsServiceImpl.findChatNames(fromUserId, toUserId) == null) {
				Chats chats = new Chats();
				List<String> list = new ArrayList<>();
				list.add(fromUserId);
				list.add(toUserId);
				chats.setName_chats(fromUserId + toUserId);
				chats.setIsfriend(false);	
				chatsServiceImpl.create(chats);
				Chats newChat = chatsServiceImpl.findChatNames(fromUserId, toUserId);
				for (String ls : list) {
					ChatParticipants participants = new ChatParticipants();
					ChatParticipants.Primary primary = new Primary(newChat.getId(), Integer.valueOf(ls));
					participants.setPrimary(primary);
					chatParticipantsServiceImpl.create(participants);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	@Async("asyncExecutor")
	synchronized public void createNewChat(String fromUserId, String toUserId) {
		if (chatsServiceImpl.findChatNames(fromUserId, toUserId) == null) {
			Chats chats = new Chats();
			List<String> list = new ArrayList<>();
			list.add(fromUserId);
			list.add(toUserId);
			chats.setName_chats(fromUserId + toUserId);
			chatsServiceImpl.create(chats);
			Chats newChat = chatsServiceImpl.findChatNames(fromUserId, toUserId);
			for (String ls : list) {
				ChatParticipants participants = new ChatParticipants();
				ChatParticipants.Primary primary = new Primary(newChat.getId(), Integer.valueOf(ls));
				participants.setPrimary(primary);
				chatParticipantsServiceImpl.create(participants);
			}
		}

	}
	

	@Async
	synchronized public void updateChatsUnfollow(String fromUserId, String toUserId) {
		Chats chats = chatsServiceImpl.findChatNames(fromUserId, toUserId);
		chats.setIsfriend(false);
		chatsServiceImpl.update(chats);
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

	public List<DataFollows> reloadData(String email) {
		User user = userServiceImpl.findByEmail(email);
		List<Follower> followers = followServiceImpl.findAllFollowers(user.getUser_id());
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower fl : followers) {
			Follower.Pk pk = fl.getPk();
			dataFollows.add(data(pk.getUser_id()));
		}
		return dataFollows;
	}

	public List<DataFollows> reloadDataFollower(String email) {
		User user = userServiceImpl.findByEmail(email);
		List<Follower> followers = followServiceImpl.findAll();
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
		User user = userServiceImpl.findByEmail(email);
		List<Follower> followers = followServiceImpl.findAll();
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

	public List<DataFollows> loadSuggested(String email) {
		User user = userServiceImpl.findByEmail(email);
		List<DataFollows> dataFollows = new ArrayList<>();
		List<Follower> listAll = followServiceImpl.findAll();
		List<Follower> followers = followServiceImpl.findAllFollowers(user.getUser_id());
		List<Integer> listUserAll = userServiceImpl.findAllUserProvinces(user.getProvinces().getCode(),
				user.getDistricts().getCode(), user.getWards().getCode());
		for (Follower all : listAll) {
			Follower.Pk pk1 = all.getPk();
			if (pk1.getUser_id() == user.getUser_id()) {
				if (!followServiceImpl.checkFriend(pk1.getFollower_id(), pk1.getUser_id())) {
					dataFollows.add(data(pk1.getFollower_id()));
				} else if (followServiceImpl.checkFriend(pk1.getFollower_id(), pk1.getUser_id())) {
					dataFollows.addAll(checkFriend(listAll, followers, pk1.getFollower_id(), user.getUser_id()));
				}
			}
		}
		if (listUserAll != null) {
			for (Integer us : listUserAll) {
				Follower fl = new Follower();
				Follower.Pk pk = new Follower.Pk();
				pk.setFollower_id(user.getUser_id());
				pk.setUser_id(us);
				fl.setPk(pk);
				if (user.getUser_id() != us && !dataFollows.contains(data(us)) && !followers.contains(fl)) {
					dataFollows.add(data(us));
				}
			}
		}
		return dataFollows;
	}

	public List<DataFollows> checkFriend(List<Follower> listAll, List<Follower> followers, int id, int user_id) {
		List<DataFollows> dataFollows = new ArrayList<>();
		for (Follower all : listAll) {
			Follower.Pk pk1 = all.getPk();
			if (pk1.getUser_id() == id && pk1.getFollower_id() != user_id
					&& checkFollow(followers, pk1.getFollower_id())
					&& followServiceImpl.checkFriend(pk1.getFollower_id(), pk1.getUser_id())) {
				dataFollows.add(data(pk1.getFollower_id()));
			}
		}
		return dataFollows;
	}

	public boolean checkFollow(List<Follower> followers, int id) {
		for (Follower fl : followers) {
			Follower.Pk pk = fl.getPk();
			if (pk.getUser_id() == id) {
				return false;
			}
		}
		return true;
	}

}
