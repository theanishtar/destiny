package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.ChatDAO;
import com.davisy.entity.Chats;
import com.davisy.service.ChatsService;

@Service
public class ChatsServiceImpl implements ChatsService {

	@Autowired
	ChatDAO chatDAO;

	@Override
	public List<Chats> findAllChatsUser(String nameChat) {
		List<Chats> list = chatDAO.findAllChatsUser(nameChat);
		if (list == null)
			return null;
		return list;
	}

	@Override
	public Chats findChatNames(String nameChat, String chatName) {
		return chatDAO.findChatNames(nameChat + chatName, chatName + nameChat);
	}

	@Override
	public Chats findById(int id) {
		return chatDAO.findById(id).get();
	}

	@Override
	public boolean isFriend(int id) {
		Chats chats = chatDAO.findById(id).get();
		if (chats == null)
			return false;
		return true;
	}

	@Override
	public void create(Chats chats) {
		if (chats != null) {
			chatDAO.save(chats);
		}
	}

	@Override
	public void update(Chats chats) {
		if (chats != null) {
			chatDAO.saveAndFlush(chats);
		}
	}

	@Override
	public void delete(Chats chats) {
		if (chats != null) {
			chatDAO.delete(chats);
		}
	}

	@Override
	public List<Object[]> loadAllChatRoom(int id) {
		return chatDAO.loadAllChatRoom(id);
	}

	@Override
	public void update_name_chats(int id, String chats_name) {
		chatDAO.update_name_chats(id, chats_name);
	}

}
