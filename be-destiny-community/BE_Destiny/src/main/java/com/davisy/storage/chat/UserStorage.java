package com.davisy.storage.chat;

import java.util.HashMap;

import com.davisy.model.chat.UserModel;

public class UserStorage {
	private static UserStorage instance;
	private HashMap<Integer, UserModel> users;

	private UserStorage() {
		users = new HashMap<Integer, UserModel>();
	}

	public static synchronized UserStorage getInstance() {
		if (instance == null) {
			instance = new UserStorage();
		}
		return instance;
	}

	public HashMap<Integer, UserModel> getUsers() {
		return users;
	}

	public void setUser(int userId, UserModel userModel) throws Exception {
		if (users.get(userId) != null) {
			users.remove(userId);
//			throw new Exception("User aready exists with userName: " + userId);
		}
		users.put(userId, userModel);
	}
}
