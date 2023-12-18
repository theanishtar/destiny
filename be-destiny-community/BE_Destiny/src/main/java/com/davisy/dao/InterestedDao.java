package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.Interested;

//@Cacheable("interested")//Tạo bộ nhớ đệm
@Repository
public interface InterestedDAO extends JpaRepository<Interested, Integer> {

	// 23-9-2023 tổng lượt thích của bài đăng
//	@Cacheable("interested")
	@Query(value = "SELECT  COUNT(interested_id) FROM interested WHERE post_id =:id", nativeQuery = true)
	public int totalInterestedByPost(int id);

	// 23-9-2023 tổng lượt thích của người dùng đã thích
	@Query(value = "SELECT  COUNT(interested_id) FROM interested WHERE user_id =:id", nativeQuery = true)
	public int totalInterestedByUser(int id);

//	@Cacheable("interested")
	@Query(value = "SELECT  users.user_id , users.fullname  FROM interested  inner join users  on interested.user_id =users.user_id  where interested.post_id =:id", nativeQuery = true)
	public List<Object[]> findByIdPost(int id);

	// 24-10-2023 lịch sử quan tâm
	@Query(value = "select p.post_id,(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image,u.fullname,p.\"content\",TO_CHAR(i.date_interested, 'DD-MM-YYYY'),p.user_id\r\n"
			+ "			from post p  inner join interested i on p.post_id =i.post_id inner join users u on p.user_id =u.user_id  where i.user_id =:id order by  i.date_interested desc", nativeQuery = true)
	public List<Object[]> findAllHistoryInterested(int id);

	@Query(value = "select *from interested i where i.user_id =:user_id and i.post_id =:post_id", nativeQuery = true)
	public Interested findInterested(int user_id, int post_id);
}
