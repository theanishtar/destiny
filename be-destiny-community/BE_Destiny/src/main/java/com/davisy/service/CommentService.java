package com.davisy.service;

import java.util.List;

import com.davisy.entity.Comment;

public interface CommentService {

	//22-9-2023 -lấy tất cả bình luận của bài đăng
	public int totalCommentByPost(int id);
	
	//22-9-2023 -lấy tổng bình luận của bài đăng)
	public List<Comment> getListCommentByPostID(int id);
	
	//23-9-2023 -lấy tổng bình luận của người dùng đã bình luận
	public int totalCommentByUser(int id);
	
}
