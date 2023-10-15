package com.davisy.service;

public interface InterestedService {

	//23-9-2023 tổng lượt thích của bài đăng
	public int totalInterestedByPost(int id);
	
	//23-9-2023 tổng lượt thích của người dùng đã thích
	public int totalInterestedByUser(int id);
}
