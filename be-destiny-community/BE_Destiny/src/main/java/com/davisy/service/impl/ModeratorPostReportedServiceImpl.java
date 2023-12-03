package com.davisy.service.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.service.ModeratorPostReportedService;

@Service
public class ModeratorPostReportedServiceImpl implements ModeratorPostReportedService{

	@Autowired
	private MongoDBUtils dbUtils;
	
	@Value("${davis.mongodb.collectionPostReported}")
	private String collectionPostReported;
	
	@Override
	public boolean checkExistReport(String post_reported_id, String user_send_report_id) {
		
		ModeratorPostReported postReported = findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
		if(postReported != null) {
			System.out.println("Ban da bao cao roi");
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public List<ModeratorPostReported> findAll() {
		
		return dbUtils.findAll(ModeratorPostReported.class, collectionPostReported);
	}
	
	@Override
	public List<ModeratorPostReported> findAllByColumn(String column, String id) {
		
		return dbUtils.findAllByColumn(ModeratorPostReported.class, collectionPostReported, column, id);
	}
	
	@Override
	public ModeratorPostReported findByColumn(String column, String id) {
		
		return dbUtils.findByColumn(ModeratorPostReported.class, collectionPostReported, column, id);
	}
	
	@Override
	public ModeratorPostReported findByTwoColumn(String column1, String id1, String column2, String id2) {
		
		return dbUtils.findByTwoColumn(ModeratorPostReported.class, collectionPostReported, column1,  id1, column2, id2);
	}
	
	@Override
	public ModeratorPostReported findById(ObjectId _id) {
		
		return dbUtils.findById(ModeratorPostReported.class, collectionPostReported, _id);
	}
		
	@Override
	public ModeratorPostReported insert(ModeratorPostReported postReported) {
		
		return dbUtils.insert(postReported, ModeratorPostReported.class, collectionPostReported);
	}
	
	@Override
	public long delete(ObjectId _id) {
		
		return dbUtils.deleteById(ModeratorPostReported.class, collectionPostReported, _id);
	}
}
