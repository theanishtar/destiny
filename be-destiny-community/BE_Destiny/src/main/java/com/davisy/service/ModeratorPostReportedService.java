package com.davisy.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.davisy.mongodb.documents.ModeratorPostReported;

public interface ModeratorPostReportedService {
	
	public boolean checkExistReport(String post_reported_id, String user_send_report_id);
	
	public ModeratorPostReported findById(ObjectId _id);
	
	public ModeratorPostReported findByColumn(String column, String id);
	
	public ModeratorPostReported findByTwoColumn(String column1, String id1, String column2, String id2);
	
	public List<ModeratorPostReported> findAllByColumn(String column, String id);
	
	public List<ModeratorPostReported> findAll();
	
	public ModeratorPostReported insert(ModeratorPostReported postReported);
	
	public long delete(ObjectId _id);

}
