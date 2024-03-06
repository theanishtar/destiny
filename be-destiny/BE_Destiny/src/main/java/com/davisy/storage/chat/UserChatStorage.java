package com.davisy.storage.chat;

import java.util.HashMap;
import java.util.List;

import com.davisy.model.chat.UserModel;

public class UserChatStorage {
	private static UserChatStorage instance;
	private HashMap<Integer, List<UserModel>> users;
	private final Object lock = new Object();

	private UserChatStorage() {
		users = new HashMap<Integer, List<UserModel>>();
	}

	public static UserChatStorage getInstance() {
		if (instance == null) {
			synchronized (UserChatStorage.class) {
				if (instance == null) {
					instance = new UserChatStorage();
				}
			}
		}
		return instance;
	}

	public HashMap<Integer, List<UserModel>> getUsers() {
		synchronized (lock) {
			return users;
		}
	}

	public void setUser(int userId, List<UserModel> userModel) throws Exception {
		synchronized (lock) {
			if (users.get(userId) != null) {
				System.out.println("user: " + userId);
				users.remove(userId);
			}
			users.put(userId, userModel);
		}
	}

	public void remove(int userId) {
		synchronized (lock) {
			users.remove(userId);
		}
	}

}
