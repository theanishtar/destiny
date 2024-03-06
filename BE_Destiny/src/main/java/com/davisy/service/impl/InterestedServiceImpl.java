package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.InterestedDAO;
import com.davisy.entity.Interested;
import com.davisy.service.InterestedService;

@Service
public class InterestedServiceImpl implements InterestedService {
	@Autowired
	private InterestedDAO interestedDao;

	// 23-9-2023 tổng lượt thích theo bài đăng
	@Override
	public int totalInterestedByPost(int id) {
		return interestedDao.totalInterestedByPost(id);
	}

	// 23-9-2023 tổng lượt thích của người dùng đã thích
	@Override
	public int totalInterestedByUser(int id) {
		return interestedDao.totalInterestedByUser(id);
	}

	@Override
	public List<Object[]> findByIdPost(int id) {
		return interestedDao.findByIdPost(id);
	}

	// 24-10-2023 lịch sử quan tâm
	@Override
	public List<Object[]> findAllHistoryInterested(int id) {
		// TODO Auto-generated method stub
		return interestedDao.findAllHistoryInterested(id);
	}

	@Override
	public void create(Interested interested) {
		interestedDao.save(interested);
	}

	@Override
	public void update(Interested interested) {
		interestedDao.saveAndFlush(interested);
	}

	@Override
	public void delete(Interested interested) {
		interestedDao.delete(interested);
	}

	@Override
	public Interested findInterested(int user_id, int post_id) {
		return interestedDao.findInterested(user_id, post_id);
	}

}
