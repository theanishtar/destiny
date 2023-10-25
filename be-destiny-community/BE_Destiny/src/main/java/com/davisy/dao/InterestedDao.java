package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Interested;

public interface InterestedDao extends JpaRepository<Interested, Integer> {
	
	//23-9-2023 tổng lượt thích của bài đăng
	@Query(value = "SELECT COUNT(interested_id) FROM interested WHERE post_id =:id", nativeQuery = true)
	public int totalInterestedByPost(int id);
	
	
	//23-9-2023 tổng lượt thích của người dùng đã thích
	@Query(value = "SELECT COUNT(interested_id) FROM interested WHERE user_id =:id", nativeQuery = true)
	public int totalInterestedByUser(int id);
}
