package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.UserReported;

public interface UserReportedDAO extends JpaRepository<UserReported, Integer>{

	@Query(value = "SELECT * FROM user_reported WHERE user_reported.id=:id", nativeQuery = true)
	public UserReported findByID(int id);
	
}
