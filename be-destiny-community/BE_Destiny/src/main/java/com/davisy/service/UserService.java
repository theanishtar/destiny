package com.davisy.service;

import java.util.List;

import com.davisy.entity.Roles;
import com.davisy.entity.User;

public interface UserService {
	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);

	List<Integer> findAllUserProvinces(String idPr, String idDt, String idW);

	User findById(int id);

	List<User> findAll();

	User findByFbId(String fb_id);
	User findByGgId(String gg_id);
	public void create(User user);

	public void update(User user);

	public void delete(User user);

}
