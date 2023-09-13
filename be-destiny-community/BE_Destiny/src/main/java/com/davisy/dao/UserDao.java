package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.User;

public interface UserDao extends JpaRepository<User, String>  {
	@Query(value = "SELECT *FROM user WHERE email:=email AND password:=password",nativeQuery = true)
	public User userLogin(String email,String password);
	
	@Query(value = "SELECT * FROM user WHERE email=:email ", nativeQuery = true)
	public User findEmailUser(String email);
}
