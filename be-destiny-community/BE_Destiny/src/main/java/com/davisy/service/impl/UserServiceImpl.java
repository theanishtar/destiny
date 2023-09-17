package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.UserDao;
import com.davisy.entity.User;
import com.davisy.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDAO;

	@Override
	public User findByEmailAndPassword(String email, String password) {
		User user = userDAO.findByEmailAndPassword(email, password);
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	@Override
	public User findByEmail(String email) {
		User user = userDAO.findByEmail(email);
		if (user != null) {
			return user;
		} else {
			return null;
		}

	}

	@Override
	public void create(User user) {
		userDAO.save(user);
	}


	@Override
	public void update(User user) {
		userDAO.saveAndFlush(user);
	}

	@Override
	public void delete(User user) {
		userDAO.delete(user);		
	}

}
