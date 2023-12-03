package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.Post;

@Repository
public interface PostDAO extends JpaRepository<Post, Integer> {

	@Query(value = "select count(p.post_id) as CountPost  from post p where p.user_id =:id", nativeQuery = true)
	public int countPost(int id);

	// 22-9-2023 -Top 5 bài đăng có lượt yêu thích nhiều nhất
	@Query(value = "SELECT p.post_id,u.fullname , p.content, COUNT(i.post_id),p.user_id  FROM post p INNER JOIN interested i ON p.post_id = i.post_id INNER JOIN users u ON  p.user_id = u.user_id GROUP BY p.post_id, u.fullname ORDER BY COUNT(i.post_id) DESC	LIMIT 5;\r\n"
			+ "\r\n" + "", nativeQuery = true)
	public List<Object[]> getTOP5Post();

	// 21-9-2023 -tìm post theo id
	@Query(value = "SELECT * FROM post WHERE post_id=:id", nativeQuery = true)
	public Post findPostByID(int id);

	// 1-11-2023 -lấy tổng số bài đăng theo ngày
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE EXTRACT(DAY FROM date_post)=:day AND EXTRACT(MONTH FROM date_post)=:month AND EXTRACT(YEAR FROM date_post)=:year", nativeQuery = true)
	public int getTotalPostByDay(int day, int month, int year);

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE EXTRACT(MONTH FROM date_post)=:month AND EXTRACT(YEAR FROM date_post)=:year", nativeQuery = true)
	public int getTotalPostByMonth(int month, int year);

	// 1-11-2023 -lấy tổng số bài đăng theo năm
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE EXTRACT(YEAR FROM date_post)=:year", nativeQuery = true)
	public int getTotalPostByYear(int year);

	// 21-9-2023 -Tổng phần trăm bài đăng có trạng thái là đã gửi
	// 1-11
	@Query(value = "SELECT ((SELECT COUNT(post_id) * 100 FROM post WHERE send_status = '1' AND EXTRACT(YEAR FROM date_post)=:year) / (SELECT COUNT(post_id) FROM post WHERE EXTRACT(YEAR FROM date_post)=:year)) AS percent_send_success;", nativeQuery = true)
	public double getPercentPostSendSuccess(int year);

	// 22-9-2023 -Top 4 bài đăng có lượt yêu thích nhiều nhất
	// 1-11
	@Query(value = "SELECT p.post_id, COUNT(i.post_id) \r\n" + "FROM post p \r\n" + "INNER JOIN interested i \r\n"
			+ "ON p.post_id = i.post_id\r\n WHERE EXTRACT(YEAR FROM p.date_post)=:year " + "GROUP BY p.post_id\r\n"
			+ "ORDER BY COUNT(i.post_id) DESC\r\n" + "LIMIT 4;", nativeQuery = true)
	public List<Object[]> getTOP4Post(int year);

	// 22-9-2023 -Tổng số bài đăng theo từng tháng
	// 1-11
	@Query(value = "SELECT EXTRACT(MONTH FROM date_post) AS MONTH, COUNT(*) \r\n"
			+ "FROM post WHERE EXTRACT(YEAR FROM date_post)=:year\r\n" + "GROUP BY EXTRACT(MONTH FROM date_post) \r\n"
			+ "ORDER BY EXTRACT(MONTH FROM date_post) ASC;", nativeQuery = true)
	public List<Object[]> getTotalPostEveryMonth(int year);

	// 22-9-2023 -TOP 3 sản phẩm được đăng bài nhiều nhất
	@Query(value = "SELECT post.product, COUNT(*) AS AMOUNT FROM post GROUP BY post.product ORDER BY AMOUNT DESC LIMIT 3", nativeQuery = true)
	public List<Object[]> getTOP3Product();

	// 23-9-2023 -Tổng bài đăng của người dùng đã dăng
	@Query(value = "SELECT COUNT(post_id) FROM post WHERE user_id=:id", nativeQuery = true)
	public int getTotalPostByUser(int id);

	// 23-9-2023 -Danh sách tất cả bài đăng của người dùng theo id
	@Query(value = "SELECT * FROM post p WHERE p.user_id=:id order by p.date_post desc", nativeQuery = true)
	public List<Post> getListPostByUserID(int id);

	// Top 5 bài viết có nhiều lượt quan tâm của trang profile
	@Query(value = "SELECT u.user_id, u.avatar,p.post_id, p.content, COUNT(i.interested_id) AS interest_count\n"
			+ "FROM post p\n" + "LEFT JOIN interested i ON p.post_id = i.post_id\n"
			+ "LEFT JOIN users u ON p.user_id = u.user_id where u.user_id =:id\n"
			+ "GROUP BY p.post_id, p.content, u.user_id, u.avatar\n" + "ORDER BY interest_count DESC\n" + "LIMIT 5;\n"
			+ "", nativeQuery = true)
	public List<Object[]> getTop5postProfile(int id);

	// Lấy tất cả bài post có quan hệ bạn bè hoặc follow
	@Query(value = "SELECT * FROM get_friend_posts(:id) LIMIT 5 OFFSET :current_page", nativeQuery = true)
	public List<Object[]> findAllPost(int id, int current_page);

//	@Query(value = "select *from get_friend_posts_share(:id) LIMIT 5 OFFSET :current_page", nativeQuery = true)
//	public List<Object[]> findAllPostShare(int id, int current_page);
	
	@Query(value = "select *from get_friend_posts_share(:id)", nativeQuery = true)
	public List<Object[]> findAllPostShare(int id);

	@Query(value = "SELECT * FROM get_friend_posts(:id) where post_id =:post_id LIMIT 5 OFFSET :current_page", nativeQuery = true)
	public Object[] findByIdPost(int id,int current_page , int post_id);
//	// lấy số lượng comment,interested, share của bài post
//	@Query(value = "WITH friend_posts AS (\n" + "    SELECT post_id  FROM get_friend_posts(:id,:provinceId)\n" + ")\n"
//			+ "SELECT\n" + "    fp.*,\n"
//			+ "    (SELECT COUNT(interested_id) FROM interested WHERE post_id = fp.post_id) AS interested_count,\n"
//			+ "    (SELECT  COUNT(comment_id) FROM comment WHERE post_id = fp.post_id) AS commnet_count,\n"
//			+ "    (SELECT  COUNT(share_id) FROM share WHERE  post_id = fp.post_id) AS share_count\n"
//			+ "FROM friend_posts fp;", nativeQuery = true)
//	public List<Object[]> getCountPost(int id, int provinceId);

	@Query(value = "WITH friend_posts AS (\r\n" + "    SELECT p.post_id  from post p  where p.user_id =:id\r\n"
			+ ")\r\n" + "SELECT\r\n" + "    fp.*,\r\n"
			+ "    (SELECT COUNT(interested_id) FROM interested WHERE post_id = fp.post_id) AS interested_count,\r\n"
			+ "    (SELECT  COUNT(comment_id) FROM comment WHERE post_id = fp.post_id) AS commnet_count,\r\n"
			+ "    (SELECT  COUNT(share_id) FROM share WHERE  post_id = fp.post_id) AS share_count\r\n"
			+ "FROM friend_posts fp;", nativeQuery = true)
	public List<Object[]> getCountPostProfile(int id);

	@Query(value = "WITH friend_posts AS (\r\n" + "    SELECT p.post_id  from post p  where p.post_id =:id\r\n"
			+ ")\r\n" + "SELECT\r\n" + "    fp.*,\r\n"
			+ "    (SELECT COUNT(interested_id) FROM interested WHERE post_id = fp.post_id) AS interested_count,\r\n"
			+ "    (SELECT  COUNT(comment_id) FROM comment WHERE post_id = fp.post_id) AS commnet_count,\r\n"
			+ "    (SELECT  COUNT(share_id) FROM share WHERE  post_id = fp.post_id) AS share_count\r\n"
			+ "FROM friend_posts fp;", nativeQuery = true)
	public Object[] getCountPostHistory(int id);

	@Query(value = "select *from get_profile_posts(:user_id,:user_guest_id)  LIMIT 5 OFFSET :page", nativeQuery = true)
	public List<Object[]> getPostProfile(int user_id,int user_guest_id, int page);

	@Query(value = "select *from get_profile_posts_shares(:user_id,:user_guest_id)", nativeQuery = true)
	public List<Object[]> getPostProfileShare(int user_id,int user_guest_id);
	
	@Query(value = "select *from get_posts_id(:post_id)",nativeQuery = true)
	public Object[] get_posts_id(int post_id);
	
	@Query(value = "select *from get_posts_share_id(:post_id)",nativeQuery = true)
	public Object[] get_posts_share_id(int post_id);

}
