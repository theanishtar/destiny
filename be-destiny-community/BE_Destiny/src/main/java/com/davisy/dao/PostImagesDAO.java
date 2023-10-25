package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.PostImages;

//@Cacheable("post_images")//Tạo bộ nhớ đệm
public interface PostImagesDAO extends JpaRepository<PostImages, Integer> {
	@Query(value = "select count(pi2.post_images_id) as imgcount from post_images pi2  inner join post p on pi2.post_id =p.post_id where p.user_id =:id", nativeQuery = true)
	public int countPostImages(int id);

	// 22-9-2023 -lấy tổng ảnh của bài đăng
	@Query(value = "SELECT * FROM post_images WHERE post_id =:id", nativeQuery = true)
	public List<PostImages> getListPostImagesByPostID(int id);

	// 16-10-2023 - lấy tất cả hình ảnh của user đã đăng
	@Query(value = "select pi2.link_image  from post_images pi2 inner join post p on pi2.post_id =p.post_id where p.user_id  =:id", nativeQuery = true)
	public List<String> findAllImagesUser(int id);

//	@Cacheable("post_images")
	@Query(value = "select  pi2.link_image from post_images pi2 where pi2.post_id=:id", nativeQuery = true)
	public List<String> findAllImagesofPost(int id);
}
