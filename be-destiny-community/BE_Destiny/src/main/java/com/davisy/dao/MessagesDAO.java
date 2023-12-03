package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.davisy.entity.Messages;

@Transactional
//@Cacheable("messages")//Tạo bộ nhớ đệm
public interface MessagesDAO extends JpaRepository<Messages, Integer> {

	@Query(value = "SELECT COUNT(messages.id) FROM messages WHERE send_status =false and  sender_id =:id", nativeQuery = true)
	public int countMessageUnread(int id);

//	@Query(value = "select *from get_messages(:from_user,:to_user)", nativeQuery = true)
//	public List<Object[]> findListMessage(int from_user, int to_user);
	
	@Query(value = "SELECT * FROM (SELECT * FROM get_messages(:from_user,:to_user) ORDER BY id desc LIMIT 50 offset :page) AS messages ORDER BY id asc", nativeQuery = true)
	public List<Object[]> findListMessage(int from_user, int to_user,int page);

	@Query(value = "select *from get_messages(:from_user,:to_user) where id=:id", nativeQuery = true)
	public Object[] findByIdMessage(int from_user, int to_user,int id);
	
	@Modifying
	@Query(value = "update  messages  set send_status =:st where send_status = false and  sender_id =:senden_id and  chat_id =:chat_id ", nativeQuery = true)
	public void updateStatusMessages(boolean st, int senden_id, int chat_id);
	
	@Modifying
	@Query(value = "update  messages  set recall =:st where id=:id ", nativeQuery = true)
	public void updateRecallMessages(boolean st, int id);

	@Query(value = "SELECT * FROM messages WHERE send_Status = false AND sender_id =:id", nativeQuery = true)
	public List<Messages> findStatus(int id);

	@Query(value = "select *from get_notification(:user_id) order by \"time\" DESC", nativeQuery = true)
	public List<Object[]> loadNotification(int user_id);
}
