package com.davisy.service;

import java.util.List;

import com.davisy.entity.Roles;
import com.davisy.entity.User;

public interface UserService {
	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);
	
	List<User>findAll();

	public void create(User user);
	public void update(User user);
	public void delete(User user);
	
}
