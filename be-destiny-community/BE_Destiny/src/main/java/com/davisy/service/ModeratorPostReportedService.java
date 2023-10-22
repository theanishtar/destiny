package com.davisy.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.davisy.mongodb.documents.PostReported;

public interface ModeratorPostReportedService {
	
	public boolean checkExistReport(String post_reported_id, String user_send_report_id);
	
	public PostReported findById(ObjectId _id);
	
	public PostReported findByColumn(String column, String id);
	
	public PostReported findByTwoColumn(String column1, String id1, String column2, String id2);
	
	public List<PostReported> findAllByColumn(String column, String id);
	
	public List<PostReported> findAll();
	
	public PostReported insert(PostReported postReported);
	
	public long delete(ObjectId _id);

}
