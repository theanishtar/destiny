package com.davisy.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.davisy.mongodb.documents.ModeratorUserReported;

public interface ModeratorUserReportedService {
	
	public boolean checkExistReport(String user_reported_id, String user_send_report_id);
	
	public ModeratorUserReported findById(ObjectId _id);
	
	public ModeratorUserReported findByColumn(String column, String id);
	
	public ModeratorUserReported findByTwoColumn(String column1, String id1, String column2, String id2);
	
	public List<ModeratorUserReported> findAllByColumn(String column, String id);
	
	public List<ModeratorUserReported> findAll();
	
	public ModeratorUserReported insert(ModeratorUserReported UserReported);
	
	public long delete(ObjectId _id);
}
