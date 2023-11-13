package com.davisy.dao;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.UserRole;
//@Cacheable("user_role")//Tạo bộ nhớ đệm
public interface UserRoleDAO extends JpaRepository<UserRole, Integer> {
	
	@Query(value = "SELECT role_id FROM user_role WHERE user_id =:user_id", nativeQuery = true)
	public int findRoleByUserID(int user_id);
}
