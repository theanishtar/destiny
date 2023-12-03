package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.Notification;

public interface NotifyService {
	public Notification findByName(String name, String data);

	public List<Notification> findAllByName(String name, String data);

	public List<Notification> findAll();

	public Notification insert(Notification Notification);

	public List<Notification> inserts(List<Notification> Notifications);

	public Notification update(String name, String data, Notification NotificationUpdate);

	public long delete(String name, String data);

	public boolean checkNotification(String Notification);
	
	public long updateStatus(boolean newStatus);
}
