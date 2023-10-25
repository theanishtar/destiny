package com.davisy.dao;

<<<<<<< HEAD
import org.springframework.cache.annotation.Cacheable;
=======
>>>>>>> status-online
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Roles;
<<<<<<< HEAD
//@Cacheable("roles")//Tạo bộ nhớ đệm
=======

>>>>>>> status-online
public interface RolesDAO extends JpaRepository<Roles, Integer>{
	@Query(value = "SELECT * FROM roles WHERE role_id := id",nativeQuery = true)
	public Roles findByEmailAndPassword(int id);
}