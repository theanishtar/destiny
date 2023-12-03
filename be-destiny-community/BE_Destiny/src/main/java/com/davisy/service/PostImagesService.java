package com.davisy.service;

import java.util.List;

import com.davisy.entity.PostImages;

public interface PostImagesService {

	public int countPostImages(int id);
	
	public PostImages findById(int id);

	// 22-9-2023 -lấy tổng ảnh của bài đăng
	public List<PostImages> getListPostImagesByPostID(int id);

	// 16-10-2023 - lấy tất cả hình ảnh của user đã đăng
	public List<String> findAllImagesUser(int id);

	public List<String> findAllImagesofPost(int id);

	public void create(PostImages images);

	public void update(PostImages images);;

	public void delete(PostImages images);
}
