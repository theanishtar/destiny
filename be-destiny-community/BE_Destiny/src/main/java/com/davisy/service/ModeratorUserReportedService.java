package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.UserReported;

public interface ModeratorUserReportedService {
	public UserReported findByUserReportedId(UserReported userReported, Class<UserReported> classUserReported, String collectionName, int user_reported_id);

	public List<UserReported> findAllByUserReportedId(UserReported userReported, Class<UserReported> classUserReported, String collectionName, int user_reported_id);
	
	public List<UserReported> findAll(UserReported userReported, Class<UserReported> classUserReported, String collectionName);
	
	public UserReported insert(UserReported userReported, Class<UserReported> classUserReported, String collectionName);
	
	public List<UserReported> inserts(List<UserReported> userReporteds, String collectionName);

	public UserReported update(Class<UserReported> classUserReported, String collectionName, String name,UserReported userReportedUpdate);
	
	public long delete(UserReported userReported, Class<UserReported> classUserReported, String collectionName, String name);
}
