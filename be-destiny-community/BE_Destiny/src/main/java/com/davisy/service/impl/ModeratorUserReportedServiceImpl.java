package com.davisy.service.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.mongodb.documents.ModeratorUserReported;
import com.davisy.service.ModeratorUserReportedService;

@Service
public class ModeratorUserReportedServiceImpl implements ModeratorUserReportedService {

	@Autowired
	private MongoDBUtils dbUtils;
	@Value("${davis.mongodb.collectionUserReported}")
	private String collectionUserReported;
	
	@Override
	public boolean checkExistReport(String user_reported_id, String user_send_report_id) {
		ModeratorUserReported userReported = findByTwoColumn("user_reported_id", user_reported_id, "user_send_report_id", user_send_report_id);
		if(userReported != null) {
			System.out.println("Ban da bao cao roi");
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public List<ModeratorUserReported> findAll() {
		
		return dbUtils.findAll(ModeratorUserReported.class, collectionUserReported);
	}
	
	@Override
	public List<ModeratorUserReported> findAllByColumn(String column, String id) {
		
		return dbUtils.findAllByColumn(ModeratorUserReported.class, collectionUserReported, column, id);
	}
	
	@Override
	public ModeratorUserReported findByColumn(String column, String id) {
		
		return dbUtils.findByColumn(ModeratorUserReported.class, collectionUserReported, column, id);
	}
	
	@Override
	public ModeratorUserReported findByTwoColumn(String column1, String id1, String column2, String id2) {
		
		return dbUtils.findByTwoColumn(ModeratorUserReported.class, collectionUserReported, column1,  id1, column2, id2);
	}
	
	@Override
	public ModeratorUserReported findById(ObjectId _id) {
		
		return dbUtils.findById(ModeratorUserReported.class, collectionUserReported, _id);
	}
		
	@Override
	public ModeratorUserReported insert(ModeratorUserReported UserReported) {
		
		return dbUtils.insert(UserReported, ModeratorUserReported.class, collectionUserReported);
	}
	
	@Override
	public long delete(ObjectId _id) {
		
		return dbUtils.deleteById(ModeratorUserReported.class, collectionUserReported, _id);
	}

}
