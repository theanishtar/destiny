package com.davisy.service;

import com.davisy.entity.Roles;
import com.davisy.entity.User;

public interface UserService {
	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);

	public void create(User user);
	public void update(User user);
	public void delete(User user);
	
}
