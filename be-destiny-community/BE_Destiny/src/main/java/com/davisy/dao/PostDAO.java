package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Post;

public interface PostDAO extends JpaRepository<Post,Long>{

	@Query(value = "select  count(p.post_id) as CountPost  from post p where p.user_id =:id",nativeQuery = true)
	public int countPost(int id);
}
