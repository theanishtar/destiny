package com.davisy.storage.chat;

import java.util.HashMap;

import com.davisy.model.chat.UserModel;

public class UserStorage {
	private static UserStorage instance;
	private HashMap<String, UserModel> users;

	private UserStorage() {
		users = new HashMap<String, UserModel>();
	}

	public static synchronized UserStorage getInstance() {
		if (instance == null) {
			instance = new UserStorage();
		}
		return instance;
	}

	public HashMap<String, UserModel> getUsers() {
		return users;
	}

	public void setUser(String userName, UserModel userModel) throws Exception {
		if (users.get(userName) != null) {
			users.remove(userName);
//			throw new Exception("User aready exists with userName: " + userName);
		}
		users.put(userName, userModel);
	}
}
