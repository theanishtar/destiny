package com.davisy.dao;

import java.util.List;

<<<<<<< HEAD
import org.springframework.cache.annotation.Cacheable;
=======
>>>>>>> status-online
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.davisy.entity.Messages;

@Transactional
<<<<<<< HEAD
//@Cacheable("messages")//Tạo bộ nhớ đệm
=======
>>>>>>> status-online
public interface MessagesDAO extends JpaRepository<Messages, Integer> {

	@Query(value = "SELECT COUNT(messages.id) FROM messages WHERE send_status =false and  sender_id =:id", nativeQuery = true)
	public int countMessageUnread(int id);

	@Query(value = "SELECT messages.id, messages.content, messages.send_Time, users.user_id,users.avatar\r\n"
			+ "FROM messages\r\n" + "INNER JOIN users ON messages.sender_id = users.user_id\r\n"
			+ "INNER JOIN chats ON messages.chat_id = chats.id\r\n"
			+ "WHERE chats.name_chats =:chatName", nativeQuery = true)
	public List<Object[]> findListMessage(String chatName);

	@Modifying
	@Query(value = "update  messages  set send_status =:st where send_status = false and  sender_id =:senden_id and  chat_id =:chat_id ", nativeQuery = true)
	public void updateStatusMessages(boolean st, int senden_id, int chat_id);
	
	@Query(value ="SELECT * FROM messages WHERE send_Status = false AND sender_id =:id",nativeQuery = true)
	public List<Messages> findStatus(int id);
}
