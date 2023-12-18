package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Share;

//@Cacheable("share")//Tạo bộ nhớ đệm
public interface ShareDAO extends JpaRepository<Share, Integer> {

	// 23-9-2023 tổng lượt chia sẻ của bài đăng
	@Query(value = "SELECT  COUNT(share_id) FROM share WHERE post_id =:id", nativeQuery = true)
	public int totalShareByPost(int id);

	// 23-9-2023 tổng lượt chia sẻ của người dùng đã chia sẻ
	@Query(value = "SELECT COUNT(share_id) FROM share WHERE user_id =:id", nativeQuery = true)
	public int totalShareByUser(int id);

	//24-10-2023 lịch sử lượt share
	@Query(value = "select p.post_id,(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image,u.fullname,p.\"content\",TO_CHAR(s.date_share, 'DD-MM-YYYY'),p.user_id  from post p  inner join \"share\" s \r\n"
			+ "on p.post_id =s.post_id inner join users u on p.user_id =u.user_id  where s.user_id =:id order by s.date_share desc ", nativeQuery = true)
	public List<Object[]> findAllHistoryShare(int id);

}
