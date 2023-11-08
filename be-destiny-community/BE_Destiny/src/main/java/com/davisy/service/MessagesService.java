package com.davisy.service;

import java.util.List;

import com.davisy.entity.Messages;

public interface MessagesService {
	public int countMessageUnread(int id);

	public List<Object[]> findListMessage(int from_user, int to_user);

	public void updateStatusMessages(boolean st, int senden_id, int chat_id);

	public List<Object[]> loadNotification(int user_id);

	public List<Messages> findStatus(int id);

	public void create(Messages messages);

	public void update(Messages messages);

	public void delete(Messages messages);
}
