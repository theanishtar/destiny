package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.Notification;

public interface NotificationService {

	public Notification findByName(Notification notification, Class<Notification> classNotification, String collectionName, String name);

	public List<Notification> findAllByName(Notification notification, Class<Notification> classNotification, String collectionName, String name);
	
	public List<Notification> findAll(Notification notification, Class<Notification> classNotification, String collectionName);
	
	public Notification insert(Notification notification, Class<Notification> classNotification, String collectionName);
	
	public List<Notification> inserts(List<Notification> notifications, String collectionName);

	public Notification update(Class<Notification> classNNotificationication, String collectionName, String name, Notification notificationUpdate);
	
	public long delete(Notification notification, Class<Notification> classNotification, String collectionName, String name);
	
}
