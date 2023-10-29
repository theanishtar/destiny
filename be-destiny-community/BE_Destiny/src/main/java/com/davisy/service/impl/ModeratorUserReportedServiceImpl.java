//package com.davisy.service.impl;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.davisy.mongodb.MongoDBUtils;
//import com.davisy.mongodb.documents.UserReported;
//import com.davisy.service.ModeratorUserReportedService;
//
//@Service
//public class ModeratorUserReportedServiceImpl implements ModeratorUserReportedService {
//
//	@Autowired
//	private MongoDBUtils dbUtils;
//
//	@Override
//	public List<UserReported> findAll(UserReported userReported, Class<UserReported> classUserReported,
//			String collectionName) {
//		return dbUtils.findAll(userReported, classUserReported, collectionName);
//	}
//
//	@Override
//	public List<UserReported> findAllByUserReportedId(UserReported userReported, Class<UserReported> classUserReported,
//			String collectionName, int user_reported_id) {
//		return dbUtils.findAllByUserReportedId(userReported, classUserReported, collectionName, user_reported_id);
//	}
//
//	@Override
//	public UserReported findByUserReportedId(UserReported userReported, Class<UserReported> classUserReported,
//			String collectionName, int user_reported_id) {
//		return findByUserReportedId(userReported, classUserReported, collectionName, user_reported_id);
//	}
//
//	@Override
//	public UserReported insert(UserReported userReported, Class<UserReported> classUserReported,
//			String collectionName) {
//		return dbUtils.insert(userReported, classUserReported, collectionName);
//	}
//
//	@Override
//	public List<UserReported> inserts(List<UserReported> userReporteds, String collectionName) {
//		return dbUtils.inserts(userReporteds, collectionName);
//	}
//
//	@Override
//	public UserReported update(Class<UserReported> classUserReported, String collectionName, String name,
//			UserReported userReportedUpdate) {
//		return dbUtils.updateFirstByName(classUserReported, collectionName, name, userReportedUpdate);
//	}
//
//	@Override
//	public long delete(UserReported userReported, Class<UserReported> classUserReported, String collectionName,
//			String name) {
//		return dbUtils.deletesByName(userReported, classUserReported, collectionName, name);
//	}
//
//}
