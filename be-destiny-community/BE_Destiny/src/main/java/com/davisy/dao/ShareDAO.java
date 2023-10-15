package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Share;

public interface ShareDAO extends JpaRepository<Share, Integer> {
	
	//23-9-2023 tổng lượt chia sẻ của bài đăng
	@Query(value = "SELECT COUNT(share_id) FROM share WHERE post_id =:id", nativeQuery = true)
	public int totalShareByPost(int id);
	
	
	//23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	@Query(value = "SELECT COUNT(share_id) FROM share WHERE user_id =:id", nativeQuery = true)
	public int totalShareByUser(int id);
	
}
