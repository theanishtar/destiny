package com.davisy.service.impl;

import java.util.List;

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
	public User findById(int id) {
		User user = userDAO.findById(id).get();
		if (user == null)
			return null;
		return user;
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

	@Override
	public List<Integer> findAllUserProvinces(String idPr, String idDt, String idW) {
		List<Integer> list = userDAO.findAllUserProvinces(idPr, idDt, idW);
		if (list == null) {
			return null;
		}
		return list;
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userDAO.findAll();
	}

	@Override
	public List<Object[]> getTOP5User() {
		// TODO Auto-generated method stub
		return userDAO.getTOP5User();
	}
	
	@Override
	public User findByFbId(String fb_id) {
		User user = userDAO.findByFbId(fb_id);
		if (user == null)
			return null;
		return user;
	}
	@Override
	public User findByGgId(String gg_id) {
		User user = userDAO.findByGgId(gg_id);
		if (user == null)
			return null;
		return user;
	}

}
