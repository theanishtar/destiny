package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.ShareDAO;
import com.davisy.service.ShareService;

@Service
public class ShareServiceImpl implements ShareService{
	@Autowired
	private ShareDAO shareDao;

	//23-9-2023 tổng lượt chia sẻ của bài đăng
	@Override
	public int totalShareByPost(int id) {
		return shareDao.totalShareByPost(id);
	}
	
	//23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	@Override
	public int totalShareByUser(int id) {
		return shareDao.totalShareByUser(id);
	}
}
