package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.ShareDAO;
import com.davisy.entity.Share;
import com.davisy.service.ShareService;

@Service
public class ShareServiceImpl implements ShareService {
	@Autowired
	private ShareDAO shareDao;

	// 23-9-2023 tổng lượt chia sẻ của bài đăng
	@Override
	public int totalShareByPost(int id) {
		return shareDao.totalShareByPost(id);
	}

	// 23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	@Override
	public int totalShareByUser(int id) {
		return shareDao.totalShareByUser(id);
	}

	// 24-10-2023 lịch sử lượt share
	@Override
	public List<Object[]> findAllHistoryShare(int id) {
		return shareDao.findAllHistoryShare(id);
	}

	@Override
	public void create(Share share) {
		shareDao.save(share);
	}

	@Override
	public void update(Share share) {
		shareDao.saveAndFlush(share);
	}

	@Override
	public void delete(Share share) {
		shareDao.delete(share);
	}

	@Override
	public Share findById(int id) {
		return shareDao.findById(id).get();
	}
}
