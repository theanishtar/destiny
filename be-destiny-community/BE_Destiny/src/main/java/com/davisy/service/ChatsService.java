package com.davisy.service;

import java.util.List;

import com.davisy.entity.Chats;

public interface ChatsService {
	public List<Chats> findAllChatsUser(String nameChat);

	public Chats findChatNames(String nameChat, String chatName);

	public Chats findById(int id);

	public List<Object[]> loadAllChatRoom(int id);
	
	public void update_name_chats(int id, String chats_name);

	public boolean isFriend(int id);

	public void create(Chats chats);

	public void update(Chats chats);

	public void delete(Chats chats);

}
