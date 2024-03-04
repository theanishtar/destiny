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
	public List<Object[]> findListMessage(int from_user, int to_user,int page) {
		int curent_page = (page-1)*50;
		List<Object[]> list = messagesDAO.findListMessage(from_user, to_user,curent_page);
		if (list == null)
			return null;
		return list;
	}

	@Override
	public Object[] findByIdMessage(int from_user, int to_user, int id) {
		Object[] o = messagesDAO.findByIdMessage(from_user, to_user,id);
		if (o == null)
			return null;
		return o;
	}

	@Override
	public void updateStatusMessages(boolean st, int senden_id, int chat_id) {
		messagesDAO.updateStatusMessages(st, senden_id, chat_id);
	}
	
	@Override
	public void updateRecallMessages(boolean st, int id) {
		messagesDAO.updateRecallMessages(st, id);
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

	@Override
	public List<Messages> findStatus(int id) {
		// TODO Auto-generated method stub
		return messagesDAO.findStatus(id);
	}

	@Override
	public List<Object[]> loadNotification(int user_id) {
		return messagesDAO.loadNotification(user_id);
	}

}
