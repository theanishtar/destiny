package com.davisy.service.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.PostReported;
import com.davisy.service.ModeratorPostReportedService;

@Service
public class ModeratorPostReportedServiceImpl implements ModeratorPostReportedService{

	@Autowired
	private MongoDBUtils dbUtils;
	
	@Value("${davis.mongodb.collectionPostReported}")
	private String collectionPostReported;
	
	@Override
	public boolean checkExistReport(String post_reported_id, String user_send_report_id) {
		
		PostReported postReported = findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
		if(postReported != null) {
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public List<PostReported> findAll() {
		
		return dbUtils.findAll(PostReported.class, collectionPostReported);
	}
	
	@Override
	public List<PostReported> findAllByColumn(String column, String id) {
		
		return dbUtils.findAllByColumn(PostReported.class, collectionPostReported, column, id);
	}
	
	@Override
	public PostReported findByColumn(String column, String id) {
		
		return dbUtils.findByColumn(PostReported.class, collectionPostReported, column, id);
	}
	
	@Override
	public PostReported findByTwoColumn(String column1, String id1, String column2, String id2) {
		
		return dbUtils.findByTwoColumn(PostReported.class, collectionPostReported, column1,  id1, column2, id2);
	}
	
	@Override
	public PostReported findById(ObjectId _id) {
		
		return dbUtils.findById(PostReported.class, collectionPostReported, _id);
	}
		
	@Override
	public PostReported insert(PostReported postReported) {
		
		return dbUtils.insert(postReported, PostReported.class, collectionPostReported);
	}
	
	@Override
	public long delete(ObjectId _id) {
		
		return dbUtils.deleteById(PostReported.class, collectionPostReported, _id);
	}
}
