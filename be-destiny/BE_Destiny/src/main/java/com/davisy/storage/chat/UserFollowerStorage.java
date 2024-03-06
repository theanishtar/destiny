package com.davisy.storage.chat;

import java.util.HashMap;
import java.util.List;

import com.davisy.model.chat.UserModel;

public class UserFollowerStorage {
	private static UserFollowerStorage instance;
	private HashMap<Integer, List<Integer>> users;

	private UserFollowerStorage() {
		users = new HashMap<Integer, List<Integer>>();
	}

	public static UserFollowerStorage getInstance() {
		if (instance == null) {
			instance = new UserFollowerStorage();
		}
		return instance;
	}

	public HashMap<Integer, List<Integer>> getUsers() {
		return users;
	}

	public void setUser(int userId, List<Integer> id) throws Exception {

		if (users.get(userId) != null) {
//			System.out.println("user: " + userId);
			users.remove(userId);
//			users.put(userId, id);
		}
		users.put(userId, id);
	}

	public void remove(int userId) {
		users.remove(userId);
	}

}
