package com.davisy.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.davisy.dao.PostDAO;
import com.davisy.entity.Post;
import com.davisy.service.PostService;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDAO postDao;

	Calendar now = Calendar.getInstance();
	int year = now.get(Calendar.YEAR);

	@Override
	public int countPost(int id) {
		return postDao.countPost(id);
	}

	@Override
	public List<Object[]> getTOP5Post() {
		return postDao.getTOP5Post();
	}

	// 1-11-2023 -lấy tổng số bài đăng theo ngày
	@Override
	public int getTotalPostByDay(int day, int month) {
		return postDao.getTotalPostByDay(day, month, year);
	}

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Override
	public int getTotalPostByMonth(int month) {
		return postDao.getTotalPostByMonth(month, year);
	}

	// 1-11-2023 -lấy tổng số bài đăng theo năm
	@Override
	public int getTotalPostByYear(int year) {
		return postDao.getTotalPostByYear(year);
	}

	// 21-9-2023 -lấy phần trăm bài đăng có trạng thái đã gửi
	@Override
	public double getPercentPostSendSuccess() {
		return postDao.getPercentPostSendSuccess(year);
	}

	// 21-9-2023 -Top 4 bài đăng có lượt yêu thích nhiều nhất
	@Override
	public List<Object[]> getTOP4Post() {
		return postDao.getTOP4Post(year);
	}

	// 22-0-2023 -Tổng số bài đăng theo từng tháng
	@Override
	public List<Object[]> getTotalPostEveryMonth() {
		return postDao.getTotalPostEveryMonth(year);
	}

	// 22-9-2023 -TOP 3 sản phẩm được đăng bài nhiều nhất
	@Override
	public List<Object[]> getTOP3Product() {
		return postDao.getTOP3Product();
	}

	// 23-9-2023 -Tổng bài đăng của người dùng đã dăng
	@Override
	public int getTotalPostByUser(int id) {
		return postDao.getTotalPostByUser(id);
	}

	// 23-9-2023 -Danh sách tất cả bài đăng của người dùng theo id
	@Override
	public List<Post> getListPostByUserID(int id) {
		return postDao.getListPostByUserID(id);
	}

	@Override
	public Post findPostByID(int id) {
		return postDao.findPostByID(id);
	}

	@Override
//	@CacheEvict("postFindAll")
	public void create(Post post) {
		postDao.save(post);

	}

	@Override
//	@CacheEvict("postFindAll")
	public void update(Post post) {
		postDao.saveAndFlush(post);
	}

	// 22-9-2023 Vô hiệu hóa bài đăng
	@Override
//	@CacheEvict("postFindAll")
	public void disable(Post post) {
		if (!post.isBan()) {
			post.setBan(true);
		} else {
			post.setBan(false);
		}
		postDao.saveAndFlush(post);
	}

	@Override
	public List<Object[]> getTop5postProfile(int id) {
		List<Object[]> list = postDao.getTop5postProfile(id);
		if (list == null)
			return null;
		return list;
	}

	// Lấy tất cả bài post có quan hệ bạn bè hoặc follow
	@Override
//	@Cacheable("postFindAll")
	public List<Object[]> findAllPost(int id, int current_page) {
		return postDao.findAllPost(id, (current_page - 1) * 5);
	}

	@Override
	public List<Object[]> findAllPostShare(int user_id) {
		return postDao.findAllPostShare(user_id);
	}

	@Override
	public Post findById(int id) {
		return postDao.findById(id).get();
	}

	// lấy số lượng comment,interested, share của bài post
//	@Override
//	public List<Object[]> getCountPost(int id, int provinceId) {
//		return postDao.getCountPost(id, provinceId);
//	}

	@Override
	public List<Object[]> getCountPostProfile(int id) {
		return postDao.getCountPostProfile(id);
	}

	@Override
	public Object[] getCountPostHistory(int id) {
		return postDao.getCountPostHistory(id);
	}

	@Override
	public List<Object[]> getPostProfile(int user_id, int user_guest_id, int page) {
		return postDao.getPostProfile(user_id,user_guest_id, (page - 1) * 5);
	}

	@Override
	public List<Object[]> getPostProfileShare(int user_id, int user_guest_id) {
		return postDao.getPostProfileShare(user_id,user_guest_id);
	}
	@Override
	public Object[] findByIdPost(int id, int current_page, int post_id) {
		return postDao.findByIdPost(id,  (current_page - 1) * 5, post_id);
	}

	@Override
	public Object[] get_posts_id(int post_id) {
		return postDao.get_posts_id(post_id);
	}

	@Override
	public Object[] get_posts_share_id(int post_id) {
		return postDao.get_posts_share_id(post_id);
	}
}
