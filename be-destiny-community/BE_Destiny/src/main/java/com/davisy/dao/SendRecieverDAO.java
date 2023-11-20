package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.SendReciever;

@Repository
public interface SendRecieverDAO extends JpaRepository<SendReciever, Integer> {

	// 24-10-2023 lịch sử nhận hàng
	@Query(value = "select p.post_id,(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image,u.fullname,p.\"content\",TO_CHAR(sr.date_send_reciever, 'DD-MM-YYYY'),p.user_id from post p \r\n"
			+ "inner join send_reciever sr  on p.post_id =sr.post_id  inner join users u on p.user_id =u.user_id  where sr.user_id =:id order by sr.date_send_reciever desc ", nativeQuery = true)
	public List<Object[]> findAllHistorySendReciever(int id);

}
