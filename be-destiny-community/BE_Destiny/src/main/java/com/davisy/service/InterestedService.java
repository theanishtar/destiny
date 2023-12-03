package com.davisy.service;

import java.util.List;

import com.davisy.entity.Interested;

public interface InterestedService {

	// 23-9-2023 tổng lượt thích của bài đăng
	public int totalInterestedByPost(int id);

	// 23-9-2023 tổng lượt thích của người dùng đã thích
	public int totalInterestedByUser(int id);

	public List<Object[]> findByIdPost(int id);

	// 24-10-2023 lịch sử quan tâm
	public List<Object[]> findAllHistoryInterested(int id);

	public Interested findInterested(int user_id,int post_id);

	public void create(Interested interested);

	public void update(Interested interested);

	public void delete(Interested interested);
}
