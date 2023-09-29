package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.davisy.entity.Follower;

public interface FollowDAO extends JpaRepository<Follower, String>{

}
