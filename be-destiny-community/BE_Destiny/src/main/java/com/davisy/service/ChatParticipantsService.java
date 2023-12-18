package com.davisy.service;

import java.util.List;

import com.davisy.entity.ChatParticipants;

public interface ChatParticipantsService {

	public List<ChatParticipants> findAllId(int id);

	public void create(ChatParticipants chatParticipants);

	public void update(ChatParticipants chatParticipants);

	public void delete(ChatParticipants chatParticipants);

	public void block(boolean status,int chat_id, int user_id);

	public int chat_id(int id1, int id2);
	
	public boolean checkBlock(int from, int to);

}
