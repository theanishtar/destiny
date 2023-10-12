package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.MessagesDAO;
import com.davisy.entity.Messages;
import com.davisy.service.MessagesService;

@Service
public class MessagesServiceImpl implements MessagesService {
	@Autowired
	MessagesDAO messagesDAO;

	@Override
	public int countMessageUnread(int id) {
		int count = messagesDAO.countMessageUnread(id);
		return count;
	}

	@Override
	public List<Object[]> findListMessage(String chatName) {
		List<Object[]> list = messagesDAO.findListMessage(chatName);
		if (list == null)
			return null;
		return list;
	}

	@Override
	public void create(Messages messages) {
		if (messages != null)
			messagesDAO.save(messages);
	}

	@Override
	public void update(Messages messages) {
		if (messages != null)
			messagesDAO.saveAndFlush(messages);
	}

	@Override
	public void delete(Messages messages) {
		if (messages != null)
			messagesDAO.delete(messages);
	}

}
