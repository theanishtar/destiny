package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Chats;

//@Cacheable("chats")//Tạo bộ nhớ đệm
public interface ChatDAO extends JpaRepository<Chats, Integer> {

	@Query(value = "select *from chats c where c.name_chats like %:nameChat%", nativeQuery = true)
	public List<Chats> findAllChatsUser(String nameChat);

	@Query(value = "SELECT * FROM chats c WHERE c.name_chats=:chatName or c.name_chats=:nameChat ", nativeQuery = true)
	public Chats findChatNames(String chatName, String nameChat);

	@Query(value = "select  *from get_friend(:id)", nativeQuery = true)
	public List<Object[]> loadAllChatRoom(int id);

	@Query(value = "SELECT *FROM update_name_chat(:id,:chats_name)", nativeQuery = true)
	public void update_name_chats(int id, String chats_name);
	
}
