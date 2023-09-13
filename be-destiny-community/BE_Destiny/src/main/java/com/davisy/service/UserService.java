package com.davisy.service;

import com.davisy.entity.Roles;
import com.davisy.entity.User;

public interface UserService {
	User userLogin(String email,String password);
}
