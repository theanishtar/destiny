package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Follower;

public interface FollowDAO extends JpaRepository<Follower, String>{

	@Query(value = "SELECT *FROM follower f WHERE f.follower_id=:id",nativeQuery = true)
	public List<Follower> findAllFollower(int id);
	
	@Query(value = "select count(f.follower_id) as FollowerCount from follower f inner join users u on f.user_id =u.user_id where u.user_id =:id",nativeQuery = true)
	public int countFollowers(int id);
	
	@Query(value = "select *from follower f where f.follower_id =:id1 and f.user_id =:id2",nativeQuery = true)
	public Follower unFollow(int id1,int id2);
	
	@Query(value = "SELECT *FROM follower WHERE (follower_id =:id1 AND user_id =:id2) OR (follower_id =:id2 AND user_id =:id1)",nativeQuery = true)
	public List<Follower>findAllSuggest(int id1,int id2);
}
