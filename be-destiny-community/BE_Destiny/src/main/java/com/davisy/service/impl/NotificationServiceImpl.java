package com.davisy.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.davisy.mongodb.documents.Notification;
import com.davisy.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService{

	@Override
	public List<Notification> findAll(Notification notification, Class<Notification> classNotification,
			String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<Notification> findAllByName(Notification notification, Class<Notification> classNotification,
			String collectionName, String name) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Notification findByName(Notification notification, Class<Notification> classNotification,
			String collectionName, String name) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Notification insert(Notification notification, Class<Notification> classNotification,
			String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<Notification> inserts(List<Notification> notifications, String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Notification update(Class<Notification> classNNotificationication, String collectionName, String name,
			Notification notificationUpdate) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public long delete(Notification notification, Class<Notification> classNotification, String collectionName,
			String name) {
		// TODO Auto-generated method stub
		return 0;
	}
}
