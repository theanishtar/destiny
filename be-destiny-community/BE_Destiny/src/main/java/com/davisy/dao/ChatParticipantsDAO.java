package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.ChatParticipants;

public interface ChatParticipantsDAO extends JpaRepository<ChatParticipants, Long> {
	@Query(value = "select *from chat_participants where chat_id=:id", nativeQuery = true)
	public List<ChatParticipants> findAllId(int id);
}
