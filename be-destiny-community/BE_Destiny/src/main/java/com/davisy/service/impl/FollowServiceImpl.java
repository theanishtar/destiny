package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.FollowDAO;
import com.davisy.entity.Follower;
import com.davisy.service.FollowService;

@Service
public class FollowServiceImpl implements FollowService {
	@Autowired
	FollowDAO followDAO;

	@Override
	public List<Follower> findAllFollowers(int id) {
		List<Follower> list = followDAO.findAllFollower(id);
		if (list == null)
			return null;
		return list;
	}

	@Override
	public int countFollowers(int id) {
		return followDAO.countFollowers(id);
	}

	@Override
	public void delete(int id1, int id2) {
		followDAO.delete(followDAO.unFollow(id1, id2));
	}

	@Override
	public void create(Follower follower) {
		followDAO.save(follower);
	}

	@Override
	public List<Follower> findAll() {
		return followDAO.findAll();
	}

	@Override
	public boolean checkFriend(int id1, int id2) {
		List<Follower> list = followDAO.findAllSuggest(id1, id2);
		if (list.size()<2)
			return false;
		else
			return true;
	}

}
