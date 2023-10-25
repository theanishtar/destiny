package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {
	@Query(value = "SELECT *FROM users WHERE email:=email AND password:=password", nativeQuery = true)
	public User findByEmailAndPassword(String email, String password);

	@Query(value = "SELECT * FROM users WHERE email=:email ", nativeQuery = true)
	public User findByEmail(String email);

	@Query(value = "select u.user_id from users u  inner join user_role ur on u.user_id =ur.user_id inner join roles r on ur.role_id=r.role_id where u.user_provinces_id =:idPr or u.user_districts_id =:idDt or u.user_wards_id =:idW and  r.role_id=3", nativeQuery = true)
	public List<Integer> findAllUserProvinces(String idPr, String idDt, String idW);

	// 21-9-2023 -Top 5 người dùng đăng bài nhiều nhất
	@Query(value = "SELECT users.avatar, users.fullname, users.intro, users.user_id, users.mark, COUNT(*) AS totalPost FROM post \r\n"
			+ "INNER JOIN users ON post.user_id = users.user_id \r\n"
			+ "GROUP BY users.avatar, users.fullname, users.user_id, users.mark \r\n"
			+ "ORDER BY totalPost DESC LIMIT 5", nativeQuery = true)
	public List<Object[]> getTOP5User();
}
