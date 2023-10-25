package com.davisy.dao;

<<<<<<< HEAD
import org.springframework.cache.annotation.Cacheable;
=======
>>>>>>> status-online
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.UserRole;
<<<<<<< HEAD
//@Cacheable("user_role")//Tạo bộ nhớ đệm
=======

>>>>>>> status-online
public interface UserRoleDAO extends JpaRepository<UserRole, Integer> {
	
	@Query(value = "SELECT role_id FROM user_role WHERE user_id =:user_id", nativeQuery = true)
	public int findRoleByUserID(int user_id);
}
