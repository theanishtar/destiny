package com.davisy.service;

import java.util.List;

import com.davisy.entity.Chats;

public interface ChatsService {
	List<Chats> findAllChatsUser(String nameChat);

	Chats findChatNames(String nameChat, String chatName);

	Chats findById(int id);

	public boolean isFriend(int id);

	public void create(Chats chats);

	public void update(Chats chats);

	public void delete(Chats chats);

}
