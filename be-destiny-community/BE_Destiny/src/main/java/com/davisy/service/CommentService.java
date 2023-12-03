package com.davisy.service;

import java.util.List;

import com.davisy.entity.Comment;
import com.davisy.entity.CommentEntity;

public interface CommentService {

	// 22-9-2023 -lấy tất cả bình luận của bài đăng
	public int totalCommentByPost(int id);

	// 22-9-2023 -lấy tổng bình luận của bài đăng)
	public List<Comment> getListCommentByPostID(int id);

	// 23-9-2023 -lấy tổng bình luận của người dùng đã bình luận
	public int totalCommentByUser(int id);

	public Integer findByIdtoUser(int id);

	public List<Object[]> loadHistoryComment(int id);

	public Comment findById(int id);

	public Object[] findByIdComment(int id);

	public List<Comment> findAllByIdComment(int id);

	public List<Object[]> findAllComment(int id, int check);

	public Object[] findCommentId(int id, int check, int commentId);

	public void create(Comment comment);

	public void update(Comment comment);

	public void delete(Comment comment);

	public void remove_parent_comment(int id);

	public void removeComment(int id);

	public List<Integer> get_parent_id(int id);
}
