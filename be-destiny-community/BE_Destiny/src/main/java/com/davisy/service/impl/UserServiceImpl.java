package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.UserDao;
import com.davisy.entity.User;
import com.davisy.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao userDAO;

	
	@Override
	public User userLogin(String email, String password) {
		return userDAO.userLogin(email, password);
	}
	
	public User getUser(String email) {
		return userDAO.findEmailUser(email);
	}

}
