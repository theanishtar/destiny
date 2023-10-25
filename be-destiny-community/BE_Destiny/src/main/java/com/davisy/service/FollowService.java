package com.davisy.service;

import java.util.List;

import com.davisy.entity.Follower;

public interface FollowService {

	List<Follower>findAllFollowers(int id);
	List<Follower>findAll();
	public int countFollowers(int id);
	public void delete(int id1,int id2);
	public void create(Follower follower);
	public boolean checkFriend(int id1,int id2);
}
