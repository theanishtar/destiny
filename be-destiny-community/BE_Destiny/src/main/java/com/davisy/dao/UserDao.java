package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.User;

//@Cacheable("users")//Tạo bộ nhớ đệm
public interface UserDAO extends JpaRepository<User, Integer> {
	@Query(value = "SELECT *FROM users WHERE email:=email AND password:=password", nativeQuery = true)
	public User findByEmailAndPassword(String email, String password);

	@Query(value = "SELECT * FROM users WHERE email=:email ", nativeQuery = true)
	public User findByEmail(String email);

	@Query(value = "SELECT * FROM users WHERE email=:email Or username=:email", nativeQuery = true)
	public User findByEmailOrUsername(String email);

	@Query(value = "select u.user_id from users u  inner join user_role ur on u.user_id =ur.user_id inner join roles r on ur.role_id=r.role_id where u.user_provinces_id =:idPr or u.user_districts_id =:idDt or u.user_wards_id =:idW and  r.role_id=3", nativeQuery = true)
	public List<Integer> findAllUserProvinces(String idPr, String idDt, String idW);

	// 21-9-2023 -Top 5 người dùng đăng bài nhiều nhất
	// 1-11
	@Query(value = "SELECT users.avatar, users.fullname, users.intro, users.user_id, users.mark, COUNT(*) AS totalPost FROM post \r\n"
			+ "INNER JOIN users ON post.user_id = users.user_id WHERE EXTRACT(YEAR FROM date_Post)=:year\r\n"
			+ "GROUP BY users.avatar, users.fullname, users.user_id, users.mark \r\n"
			+ "ORDER BY totalPost DESC LIMIT 5", nativeQuery = true)
	public List<Object[]> getTOP5User(int year);

	@Query(value = "SELECT * FROM users WHERE fb_id=:fb_id ", nativeQuery = true)
	public User findByFbId(String fb_id);

	@Query(value = "SELECT * FROM users WHERE gg_id=:gg_id ", nativeQuery = true)
	public User findByGgId(String gg_id);

	// 1-11-2023 -lấy tổng số người dùng theo ngày
	@Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(DAY FROM day_create)=:day AND EXTRACT(MONTH FROM day_create)=:month AND EXTRACT(YEAR FROM day_create)=:year", nativeQuery = true)
	public int getTotalUserByDay(int day, int month, int year);

	// 21-9-2023 -lấy tổng số người dùng theo tháng
	// lastest update 14-10
	// 1-11
	@Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(MONTH FROM day_create)=:month AND EXTRACT(YEAR FROM day_create)=:year", nativeQuery = true)
	public int getTotalUserByMonth(int month, int year);

	// 1-11-2023 -lấy tổng số người dùng theo năm
	@Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(YEAR FROM day_create)=:year", nativeQuery = true)
	public int getTotalUserByYear(int year);

	// 21-9-2023 -Tóng số lượng tương tác của người dùng theo từng tháng
	// 1-11
	@Query(value = "SELECT MONTH, SUM(COUNT) AS TotalCount\r\n" + "FROM (\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_interested) AS MONTH, COUNT(*) AS COUNT FROM interested WHERE EXTRACT(YEAR FROM date_interested)=:year GROUP BY EXTRACT(MONTH FROM date_interested)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_comment) AS MONTH, COUNT(*) AS COUNT FROM comment WHERE EXTRACT(YEAR FROM date_comment)=:year GROUP BY EXTRACT(MONTH FROM date_comment)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_share) AS MONTH, COUNT(*) AS COUNT FROM share WHERE EXTRACT(YEAR FROM date_share)=:year GROUP BY EXTRACT(MONTH FROM date_share)\r\n"
			+ ") AS CombinedData\r\n" + "GROUP BY MONTH\r\n" + "ORDER BY MONTH ASC", nativeQuery = true)
	public List<Object[]> getInteractionOfUser(int year);

	// lastest update 14-10 Tóng số lượng tương tác của người dùng theo tháng
	// 1-11
	@Query(value = "SELECT COALESCE(SUM(COUNT), 0) AS TotalInteract\r\n" + "FROM (\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_interested) AS MONTH, COUNT(*) AS COUNT FROM interested WHERE EXTRACT(MONTH FROM date_interested)=:month AND EXTRACT(YEAR FROM date_interested)=:year GROUP BY EXTRACT(MONTH FROM date_interested)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_comment) AS MONTH, COUNT(*) AS COUNT FROM comment WHERE EXTRACT(MONTH FROM date_comment)=:month AND EXTRACT(YEAR FROM date_comment)=:year GROUP BY EXTRACT(MONTH FROM date_comment)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_share) AS MONTH, COUNT(*) AS COUNT FROM share WHERE EXTRACT(MONTH FROM date_share)=:month AND EXTRACT(YEAR FROM date_share)=:year GROUP BY EXTRACT(MONTH FROM date_share)\r\n"
			+ ") AS CombinedData;", nativeQuery = true)
	public int getInteractionOfUserByMonth(int month, int year);

	// 21-9-2023 -Top 4 người dùng đăng bài nhiều nhất
	// 1-11
	@Query(value = "SELECT users.email, COUNT(*) AS totalPost FROM post \r\n"
			+ "INNER JOIN users ON post.user_id = users.user_id WHERE EXTRACT(YEAR FROM date_Post)=:year GROUP BY users.email \r\n"
			+ "ORDER BY totalPost DESC LIMIT 4", nativeQuery = true)
	public List<Object[]> getTOP4User(int year);

	// 22-9-2023 -Tổng số người dùng tham gia từng theo từng tháng
	// 1-11
	@Query(value = "SELECT EXTRACT(MONTH FROM day_create) AS MONTH, COUNT(user_id) "
			+ "FROM users WHERE EXTRACT(YEAR FROM day_create)=:year GROUP BY EXTRACT(MONTH FROM day_create) ORDER BY EXTRACT(MONTH FROM day_create) ASC", nativeQuery = true)
	public List<Object[]> getTotalUserEveryMonth(int year);

	// Lấy user đã đăng bài
	@Query(value = "SELECT u.user_id, u.fullname,i.post_id \n" + "FROM interested i\n"
			+ "INNER JOIN users u ON i.user_id = u.user_id\n"
			+ "WHERE i.post_id IN (SELECT post_id FROM get_friend_posts(:id,:provinceId));", nativeQuery = true)
	public List<Object[]> getUserofPost(int id, int provinceId);

	@Query(value = "SELECT u.user_id, u.fullname,i.post_id \r\n" + "FROM interested i\r\n"
			+ "INNER JOIN users u ON i.user_id = u.user_id\r\n"
			+ "WHERE i.post_id IN (SELECT p.post_id FROM post p where p.user_id=:id)", nativeQuery = true)
	public List<Object[]> getUserofPostProfile(int id);

	@Query(value = "select u.user_id ,u.fullname from interested i inner join users u  on i.user_id =u.user_id  where i.post_id =:id", nativeQuery = true)
	public List<Object[]> getUserofPostHistory(int id);

	@Query(value = "select u.user_id,u.thumb,u.avatar,u.mark,u.fullname,u.intro,\r\n"
			+ "(select count(p.post_id) from post p where p.user_id =u.user_id)as countPost,\r\n"
			+ "(select  count(f.follower_id)  from follower f inner join users u1 on f.user_id =u1.user_id where u1.user_id =u.user_id) as countFollower,\r\n"
			+ "(select count(pi2.post_images_id) as imgcount from post_images pi2  inner join post p on pi2.post_id =p.post_id where p.user_id =u.user_id)as countImg,\r\n"
			+ "u.username\r\n" + "from users u where u.email =:email", nativeQuery = true)
	public List<Object[]> loadTimeLine(String email);
	
	@Query(value = "select *from find_user(:user_id,:fullname)",nativeQuery = true)
	public List<Object[]>findFullnameUser(int user_id,String fullname);
	
	@Query(value = "SELECT\r\n"
			+ "        p.post_id,\r\n"
			+ "        p.content AS post_title,\r\n"
			+ "        COALESCE(SUM(i.interested_count + s.share_count + c.comment_count), 0) AS total_engagement,\r\n"
			+"(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image"
			+ "    FROM\r\n"
			+ "        post p\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS interested_count\r\n"
			+ "        FROM interested\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) i ON p.post_id = i.post_id\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS share_count\r\n"
			+ "        FROM share\r\n"
			+ "        WHERE share_status = true\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) s ON p.post_id = s.post_id\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS comment_count\r\n"
			+ "        FROM comment\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) c ON p.post_id = c.post_id\r\n"
			+ "    WHERE\r\n"
			+ "        p.post_status = true\r\n"
			+ "        AND p.ban = false\r\n"
			+ "        AND p.hash_tag ILIKE '%' || :hashtag || '%'\r\n"
			+ "    GROUP BY\r\n"
			+ "        p.post_id, p.content\r\n"
			+ "    ORDER BY\r\n"
			+ "        total_engagement DESC\r\n"
			+ "    LIMIT 5;", nativeQuery = true)
	public List<Object[]> get5PostByHashtagKeyword(String hashtag);
	
	@Query(value = "SELECT\r\n"
			+ "        p.post_id,\r\n"
			+ "        p.content AS post_title,\r\n"
			+ "        COALESCE(SUM(i.interested_count + s.share_count + c.comment_count), 0) AS total_engagement,\r\n"
			+"(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image"
			+ "    FROM\r\n"
			+ "        post p\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS interested_count\r\n"
			+ "        FROM interested\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) i ON p.post_id = i.post_id\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS share_count\r\n"
			+ "        FROM share\r\n"
			+ "        WHERE share_status = true\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) s ON p.post_id = s.post_id\r\n"
			+ "    LEFT JOIN (\r\n"
			+ "        SELECT post_id, COUNT(*) AS comment_count\r\n"
			+ "        FROM comment\r\n"
			+ "        GROUP BY post_id\r\n"
			+ "    ) c ON p.post_id = c.post_id\r\n"
			+ "    WHERE\r\n"
			+ "        p.post_status = true\r\n"
			+ "        AND p.ban = false\r\n"
			+ "        AND p.content ILIKE '%' || :keyword || '%'\r\n"
			+ "    GROUP BY\r\n"
			+ "        p.post_id, p.content\r\n"
			+ "    ORDER BY\r\n"
			+ "        total_engagement DESC\r\n"
			+ "    LIMIT 5;", nativeQuery = true)
	public List<Object[]> get5PostByKeyword(String keyword);
	
	
	

}
