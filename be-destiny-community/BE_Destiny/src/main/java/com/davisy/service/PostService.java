package com.davisy.service;

import java.util.List;

import com.davisy.entity.Post;

public interface PostService {
	public int countPost(int id);

	public List<Object[]> getTOP5Post();

	// Lấy tất cả bài post có quan hệ bạn bè hoặc follow
	public List<Object[]> findAllPost(int id, int current_page);

	public List<Object[]> findAllPostShare(int id);

	public Object[] findByIdPost(int id, int current_page, int post_id);

	// lấy số lượng comment,interested, share của bài post
//	public List<Object[]> getCountPost(int id, int provinceId);

	public List<Object[]> getCountPostProfile(int id);

	public Object[] getCountPostHistory(int id);

	// 21-9-2023 -tìm post theo id
	public Post findPostByID(int id);

	// 1-11-2023 -lấy tổng số bài đăng theo ngày
	public int getTotalPostByDay(int day, int month);

	// 1-11-2023 -lấy tổng số bài đăng theo năm
	public int getTotalPostByYear(int year);

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	public int getTotalPostByMonth(int month);

	// 21-9-2023 -lấy phần trăm bài đăng có trạng thái đã gửi
	public double getPercentPostSendSuccess();

	// 21-9-2023 -Top 4 bài đăng có lượt yêu thích nhiều nhất
	public List<Object[]> getTOP4Post();

	// 22-0-2023 -Tổng số bài đăng theo từng tháng
	public List<Object[]> getTotalPostEveryMonth();

	// 22-9-2023 -TOP 3 sản phẩm được đăng bài nhiều nhất
	public List<Object[]> getTOP3Product();

	// 23-9-2023 -Tổng bài đăng của người dùng đã dăng
	public int getTotalPostByUser(int id);

	public Post findById(int id);
	
	public Object[] get_posts_id(int post_id);
	
	public Object[] get_posts_share_id(int post_id);

	// 23-9-2023 -Danh sách tất cả bài đăng của người dùng theo id
	public List<Post> getListPostByUserID(int id);

	public List<Object[]> getTop5postProfile(int id);

	public List<Object[]> getPostProfile(int user_id, int user_guest_id, int page);

	public List<Object[]> getPostProfileShare(int user_id, int user_guest_id);

	public void create(Post post);

	public void update(Post post);

	public void disable(Post post);
}
