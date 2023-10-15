package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Comment;

public interface CommentDAO extends JpaRepository<Comment, Integer> {

	//23-9-2023 -lấy tất cả bình luận của bài đăng
	@Query(value = "SELECT * FROM comment WHERE post_id =:id", nativeQuery = true)
	public List<Comment> getListCommentByPostID(int id);
	
	//23-9-2023 -lấy tổng bình luận của bài đăng
	@Query(value = "SELECT COUNT(comment_id) FROM comment WHERE post_id =:id", nativeQuery = true)
	public int totalCommentByPost(int id);
	
	
	//23-9-2023 -lấy tổng bình luận của người dùng đã bình luận
	@Query(value = "SELECT COUNT(comment_id) FROM comment WHERE user_id =:id", nativeQuery = true)
	public int totalCommentByUser(int id);
	
}