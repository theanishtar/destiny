package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.PostReported;

public interface PostReportedDAO extends JpaRepository<PostReported, Integer>{
	
	@Query(value = "SELECT * FROM post_reported WHERE post_reported.id=:id", nativeQuery = true)
	public PostReported findByID(int id);
	
}
