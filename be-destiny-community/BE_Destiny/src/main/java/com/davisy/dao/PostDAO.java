package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Post;

public interface PostDAO extends JpaRepository<Post, Long> {

	@Query(value = "select count(p.post_id) as CountPost  from post p where p.user_id =:id", nativeQuery = true)
	public int countPost(int id);

	// 22-9-2023 -Top 5 bài đăng có lượt yêu thích nhiều nhất
	@Query(value = "	SELECT p.post_id,u.fullname , p.content, COUNT(i.post_id) FROM post p INNER JOIN interested i\r\n"
			+ "			ON p.post_id = i.post_id INNER JOIN users u \r\n" + "			ON p.user_id = u.user_id \r\n"
			+ "			GROUP BY p.post_id, u.fullname\r\n" + "			ORDER BY COUNT(i.post_id) DESC\r\n"
			+ "			LIMIT 5;", nativeQuery = true)
	public List<Object[]> getTOP5Post();

	// 21-9-2023 -tìm post theo id
	@Query(value = "SELECT * FROM post WHERE post_id=:id", nativeQuery = true)
	public Post findPostByID(int id);

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE EXTRACT(MONTH FROM date_post)=:month", nativeQuery = true)
	public int getTotalPostByMonth(int month);

	// 21-9-2023 -Tổng phần trăm bài đăng có trạng thái là đã gửi
	@Query(value = "SELECT ((SELECT COUNT(post_id) * 100 FROM post WHERE send_status = '1') / (SELECT COUNT(post_id) FROM post)) AS percent_send_success;", nativeQuery = true)
	public double getPercentPostSendSuccess();

	// 22-9-2023 -Top 4 bài đăng có lượt yêu thích nhiều nhất
	@Query(value = "SELECT p.post_id, COUNT(i.post_id) \r\n" + "FROM post p \r\n"
			+ "INNER JOIN interested i \r\n" + "ON p.post_id = i.post_id\r\n" + "GROUP BY p.post_id\r\n"
			+ "ORDER BY COUNT(i.post_id) DESC\r\n" + "LIMIT 4;", nativeQuery = true)
	public List<Object[]> getTOP4Post();

	// 22-9-2023 -Tổng số bài đăng theo từng tháng
	@Query(value = "SELECT EXTRACT(MONTH FROM date_post) AS MONTH, COUNT(*) \r\n"
			+ "FROM post \r\n"
			+ "GROUP BY EXTRACT(MONTH FROM date_post) \r\n"
			+ "ORDER BY EXTRACT(MONTH FROM date_post) ASC;", nativeQuery = true)
	public List<Object[]> getTotalPostEveryMonth();

	// 22-9-2023 -TOP 3 sản phẩm được đăng bài nhiều nhất
	@Query(value = "SELECT post.product, COUNT(*) AS AMOUNT FROM post GROUP BY post.product ORDER BY AMOUNT DESC LIMIT 3", nativeQuery = true)
	public List<Object[]> getTOP3Product();

	// 23-9-2023 -Tổng bài đăng của người dùng đã dăng
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE user_id=:id", nativeQuery = true)
	public int getTotalPostByUser(int id);

	// 23-9-2023 -Danh sách tất cả bài đăng của người dùng theo id
	@Query(value = "SELECT * FROM post WHERE user_id=:id", nativeQuery = true)
	public List<Post> getListPostByUserID(int id);

}
