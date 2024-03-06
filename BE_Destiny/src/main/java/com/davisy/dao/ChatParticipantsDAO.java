package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.ChatParticipants;

import jakarta.transaction.Transactional;

@Transactional
public interface ChatParticipantsDAO extends JpaRepository<ChatParticipants, Long> {
	@Query(value = "select *from chat_participants where chat_id=:id", nativeQuery = true)
	public List<ChatParticipants> findAllId(int id);

	@Query(value = "SELECT  *from chat_participants cp where cp.user_id =:id", nativeQuery = true)
	public List<ChatParticipants> findAllUser_id(int id);
	
	@Modifying
	@Query(value = "update chat_participants set chat_participants_status =:status where chat_id=:chat_id and user_id=:user_id",nativeQuery = true)
	public void block(boolean status ,int chat_id, int user_id);
	
	@Query(value = "select *from get_room_chat(:id1,:id2)",nativeQuery = true)
	public int chat_id(int id1,int id2);
	
	@Query(value = "select cp.chat_participants_status  from chat_participants cp where cp.chat_id =(select *from get_room_chat(:from,:to)) and cp.user_id =:from",nativeQuery = true)
	public boolean block(int from,int to);
}
