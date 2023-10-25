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
	@Query(value = "SELECT users.avatar, users.fullname, users.intro, users.user_id, users.mark, COUNT(*) AS totalPost FROM post \r\n"
			+ "INNER JOIN users ON post.user_id = users.user_id \r\n"
			+ "GROUP BY users.avatar, users.fullname, users.user_id, users.mark \r\n"
			+ "ORDER BY totalPost DESC LIMIT 5", nativeQuery = true)
	public List<Object[]> getTOP5User();

	@Query(value = "SELECT * FROM users WHERE fb_id=:fb_id ", nativeQuery = true)
	public User findByFbId(String fb_id);

	@Query(value = "SELECT * FROM users WHERE gg_id=:gg_id ", nativeQuery = true)
	public User findByGgId(String gg_id);

	// 21-9-2023 -lấy tổng số người dùng theo tháng
	// lastest update 14-10
	@Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(MONTH FROM day_create)=:month", nativeQuery = true)
	public int getTotalUserByMonth(int month);

	// 21-9-2023 -Tóng số lượng tương tác của người dùng theo từng tháng
	@Query(value = "SELECT MONTH, SUM(COUNT) AS TotalCount\r\n" + "FROM (\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_interested) AS MONTH, COUNT(*) AS COUNT FROM interested GROUP BY EXTRACT(MONTH FROM date_interested)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_comment) AS MONTH, COUNT(*) AS COUNT FROM comment GROUP BY EXTRACT(MONTH FROM date_comment)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_share) AS MONTH, COUNT(*) AS COUNT FROM share GROUP BY EXTRACT(MONTH FROM date_share)\r\n"
			+ ") AS CombinedData\r\n" + "GROUP BY MONTH\r\n" + "ORDER BY MONTH ASC", nativeQuery = true)
	public List<Object[]> getInteractionOfUser();

	// lastest update 14-10 Tóng số lượng tương tác của người dùng theo tháng
	@Query(value = "SELECT COALESCE(SUM(COUNT), 0) AS TotalInteract\r\n" + "FROM (\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_interested) AS MONTH, COUNT(*) AS COUNT FROM interested WHERE EXTRACT(MONTH FROM date_interested) =:month GROUP BY EXTRACT(MONTH FROM date_interested)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_comment) AS MONTH, COUNT(*) AS COUNT FROM comment WHERE EXTRACT(MONTH FROM date_comment) =:month GROUP BY EXTRACT(MONTH FROM date_comment)\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT EXTRACT(MONTH FROM date_share) AS MONTH, COUNT(*) AS COUNT FROM share WHERE EXTRACT(MONTH FROM date_share) =:month GROUP BY EXTRACT(MONTH FROM date_share)\r\n"
			+ ") AS CombinedData;", nativeQuery = true)
	public int getInteractionOfUserByMonth(int month);

	// 21-9-2023 -Top 4 người dùng đăng bài nhiều nhất
	@Query(value = "SELECT users.email, COUNT(*) AS totalPost FROM post \r\n"
			+ "INNER JOIN users ON post.user_id = users.user_id \r\n" + "GROUP BY users.email \r\n"
			+ "ORDER BY totalPost DESC LIMIT 4", nativeQuery = true)
	public List<Object[]> getTOP4User();

	// 22-9-2023 -Tổng số người dùng tham gia từng theo từng tháng
	@Query(value = "SELECT EXTRACT(MONTH FROM day_create) AS MONTH, COUNT(user_id) "
			+ "FROM users GROUP BY EXTRACT(MONTH FROM day_create) ORDER BY EXTRACT(MONTH FROM day_create) ASC", nativeQuery = true)
	public List<Object[]> getTotalUserEveryMonth();

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

}
