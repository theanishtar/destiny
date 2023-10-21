package com.davisy.service;

public interface ShareService {

	//23-9-2023 tổng lượt chia sẻ của bài đăng
	public int totalShareByPost(int id);
	
	
	//23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	public int totalShareByUser(int id);
}
