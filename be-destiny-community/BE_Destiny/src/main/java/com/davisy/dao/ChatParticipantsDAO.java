package com.davisy.dao;

import java.util.List;

<<<<<<< HEAD
import org.springframework.cache.annotation.Cacheable;
=======
>>>>>>> status-online
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.ChatParticipants;
<<<<<<< HEAD
//@Cacheable("chat_participants")//Tạo bộ nhớ đệm
=======

>>>>>>> status-online
public interface ChatParticipantsDAO extends JpaRepository<ChatParticipants, Long> {
	@Query(value = "select *from chat_participants where chat_id=:id", nativeQuery = true)
	public List<ChatParticipants> findAllId(int id);

	@Query(value = "SELECT  *from chat_participants cp where cp.user_id =:id", nativeQuery = true)
	public List<ChatParticipants> findAllUser_id(int id);
}
