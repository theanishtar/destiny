package com.davisy.dao;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Roles;
//@Cacheable("roles")//Tạo bộ nhớ đệm
public interface RolesDAO extends JpaRepository<Roles, Integer>{
	@Query(value = "SELECT * FROM roles WHERE role_id := id",nativeQuery = true)
	public Roles findByEmailAndPassword(int id);
}