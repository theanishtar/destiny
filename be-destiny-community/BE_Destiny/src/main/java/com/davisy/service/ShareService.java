package com.davisy.service;

import java.util.List;

import com.davisy.entity.Share;

public interface ShareService {

	// 23-9-2023 tổng lượt chia sẻ của bài đăng
	public int totalShareByPost(int id);

	// 23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	public int totalShareByUser(int id);

	// 24-10-2023 lịch sử lượt share
	public List<Object[]> findAllHistoryShare(int id);

	public Share findById(int id);

	public void create(Share share);

	public void update(Share share);

	public void delete(Share share);
}
