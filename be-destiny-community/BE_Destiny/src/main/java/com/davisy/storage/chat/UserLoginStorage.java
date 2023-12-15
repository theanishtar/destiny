package com.davisy.storage.chat;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

public class UserLoginStorage {
	private static UserLoginStorage instance;
	private HashMap<Integer, Calendar> users;

	private UserLoginStorage() {
		users = new HashMap<Integer, Calendar>();
	}

	public static UserLoginStorage getInstance() {
		if (instance == null) {
			instance = new UserLoginStorage();
		}
		return instance;
	}

	public HashMap<Integer, Calendar> getUsers() {
		return users;
	}

	public void setUser(int userId, Calendar time) throws Exception {

		if (users.get(userId) != null) {
//		System.out.println("user: " + userId);
			users.remove(userId);
//		users.put(userId, id);
		}
		users.put(userId, time);
	}

	public void remove(int userId) {
		users.remove(userId);
	}
}
