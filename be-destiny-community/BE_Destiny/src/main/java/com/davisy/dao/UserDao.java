package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.User;

public interface UserDao extends JpaRepository<User, Integer>  {
	@Query(value = "SELECT *FROM users WHERE email:=email AND password:=password",nativeQuery = true)
	public User findByEmailAndPassword(String email,String password);
	
	@Query(value = "SELECT * FROM users WHERE email=:email ", nativeQuery = true)
	public User findByEmail(String email);
	
	@Query(value = "SELECT * FROM users WHERE fb_id=:fb_id ", nativeQuery = true)
	public User findByFbId(String fb_id);
	
	@Query(value = "SELECT * FROM users WHERE gg_id=:gg_id ", nativeQuery = true)
	public User findByGgId(String gg_id);
	
	@Query(value = "select u.user_id from users u  inner join user_role ur on u.user_id =ur.user_id inner join roles r on ur.role_id=r.role_id where  r.role_id=3",nativeQuery = true)
	public List<Integer>findAllUserProvinces(String idPr,String idDt,String idW);
}
