package com.davisy.storage.chat;

import java.util.HashMap;
import java.util.List;

import com.davisy.model.chat.UserModel;

public class UserChatStorage {
	private static UserChatStorage instance;
	private HashMap<Integer, List<UserModel>> users;

	private UserChatStorage() {
		users = new HashMap<Integer, List<UserModel>>();
	}

	public static synchronized UserChatStorage getInstance() {
		if (instance == null) {
			instance = new UserChatStorage();
		}
		return instance;
	}

	public HashMap<Integer, List<UserModel>> getUsers() {
		return users;
	}

	public void setUser(int userId, List<UserModel> userModel) throws Exception {
		if (users.get(userId) != null) {
			users.remove(userId);
//		throw new Exception("User aready exists with userName: " + userName);
		}
		users.put(userId, userModel);
	}
}
