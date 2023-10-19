package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.Comment;

//@Cacheable("comment")//Tạo bộ nhớ đệm
@Repository
public interface CommentDAO extends JpaRepository<Comment, Integer> {

	// 23-9-2023 -lấy tất cả bình luận của bài đăng
	@Query(value = "SELECT /*+ RESULT_CACHE */ * FROM comment WHERE post_id =:id", nativeQuery = true)
	public List<Comment> getListCommentByPostID(int id);

	// 23-9-2023 -lấy tổng bình luận của bài đăng
//	@Cacheable("comment")
	@Query(value = "SELECT /*+ RESULT_CACHE */ COUNT(comment_id) FROM comment WHERE post_id =:id", nativeQuery = true)
	public int totalCommentByPost(int id);

	// 23-9-2023 -lấy tổng bình luận của người dùng đã bình luận
	@Query(value = "SELECT /*+ RESULT_CACHE */ COUNT(comment_id) FROM comment WHERE user_id =:id", nativeQuery = true)
	public int totalCommentByUser(int id);

	@Query(value = "SELECT /*+ RESULT_CACHE */ *FROM COMMENT WHERE parent_comment_id =:id", nativeQuery = true)
	public List<Comment> findAllByIdComment(int id);

}