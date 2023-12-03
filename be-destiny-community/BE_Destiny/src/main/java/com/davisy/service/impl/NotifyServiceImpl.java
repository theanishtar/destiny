package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;
import com.davisy.mongodb.documents.Notification;
import com.davisy.service.CacheService;
import com.davisy.service.NotifyService;

@Service
public class NotifyServiceImpl implements NotifyService {

	@Autowired
	private MongoDBUtils dbUtils;

	@Value("${davis.mongodb.collectionNotification}")
	private String collectionNotification;

	@Autowired
	private CacheService cacheService;

	@Override
	public Notification findByName(String name, String data) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notification> findAllByName(String name, String data) {
		return dbUtils.findAllByColumn(Notification.class, collectionNotification, name, data);
	}

	@Override
	public List<Notification> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notification insert(Notification Notification) {
		return dbUtils.insert(Notification ,Notification.class, collectionNotification);
	}

	@Override
	public List<Notification> inserts(List<Notification> Notifications) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notification update(String name, String data, Notification NotificationUpdate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long delete(String name, String data) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean checkNotification(String Notification) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long updateStatus(boolean newStatus) {
		return dbUtils.updateStatusNotification(Notification.class, collectionNotification, newStatus);
	}

}