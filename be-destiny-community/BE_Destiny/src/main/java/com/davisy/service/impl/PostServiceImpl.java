package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.davisy.dao.PostDAO;
import com.davisy.entity.Post;
import com.davisy.service.PostService;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDAO postDao;

	@Override
	public int countPost(int id) {
		return postDao.countPost(id);
	}

	@Override
	public List<Object[]> getTOP5Post() {
		return postDao.getTOP5Post();
	}

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Override
	public int getTotalPostByMonth(int month) {
		return postDao.getTotalPostByMonth(month);
	}

	// 21-9-2023 -lấy phần trăm bài đăng có trạng thái đã gửi
	@Override
	public double getPercentPostSendSuccess() {
		return postDao.getPercentPostSendSuccess();
	}

	// 21-9-2023 -Top 4 bài đăng có lượt yêu thích nhiều nhất
	@Override
	public List<Object[]> getTOP4Post() {
		return postDao.getTOP4Post();
	}

	// 22-0-2023 -Tổng số bài đăng theo từng tháng
	@Override
	public List<Object[]> getTotalPostEveryMonth() {
		return postDao.getTotalPostEveryMonth();
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
	public void create(Post post) {
		postDao.save(post);

	}

	@Override
	public void update(Post post) {
		postDao.saveAndFlush(post);
	}

	// 22-9-2023 Vô hiệu hóa bài đăng
	@Override
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

	@Cacheable("post")
	@Override
	public List<Post> findAll() {
		return postDao.findAllPost();
	}

	@Override
	public Post findById(int id) {
		return postDao.findById(id).get();
	}

}
