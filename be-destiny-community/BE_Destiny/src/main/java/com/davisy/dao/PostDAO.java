package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Post;

public interface PostDAO extends JpaRepository<Post, Long> {

	@Query(value = "select  count(p.post_id) as CountPost  from post p where p.user_id =:id", nativeQuery = true)
	public int countPost(int id);

	// 22-9-2023 -Top 5 bài đăng có lượt yêu thích nhiều nhất
	@Query(value = "	SELECT p.post_id,u.fullname , p.content, COUNT(i.post_id) FROM post p INNER JOIN interested i\r\n"
			+ "			ON p.post_id = i.post_id INNER JOIN users u \r\n"
			+ "			ON p.user_id = u.user_id \r\n"
			+ "			GROUP BY p.post_id, u.fullname\r\n"
			+ "			ORDER BY COUNT(i.post_id) DESC\r\n"
			+ "			LIMIT 5;", nativeQuery = true)
	public List<Object[]> getTOP5Post();
}
