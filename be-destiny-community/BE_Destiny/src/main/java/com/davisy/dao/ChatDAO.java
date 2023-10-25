package com.davisy.dao;

import java.util.List;

<<<<<<< HEAD
import org.springframework.cache.annotation.Cacheable;
=======
>>>>>>> status-online
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Chats;

<<<<<<< HEAD
//@Cacheable("chats")//Tạo bộ nhớ đệm
=======
>>>>>>> status-online
public interface ChatDAO extends JpaRepository<Chats, Integer> {

	@Query(value = "select *from chats c where c.name_chats like %:nameChat%", nativeQuery = true)
	public List<Chats> findAllChatsUser(String nameChat);

	@Query(value = "SELECT * FROM chats c WHERE c.name_chats=:chatName or c.name_chats=:nameChat ", nativeQuery = true)
	public Chats findChatNames(String chatName, String nameChat);
<<<<<<< HEAD

	@Query(value = "select  *from get_friend(:id)", nativeQuery = true)
	public List<Object[]> loadAllChatRoom(int id);
=======
>>>>>>> status-online
}
