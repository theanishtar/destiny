package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.CommentReported;
import com.davisy.mongodb.documents.ModeratorPostReported;

public interface CommentReportedService {
	
	public List<CommentReported> findAll(CommentReported commentReported, Class<CommentReported> classCommentReported, String collectionName);
	
	public CommentReported insert(CommentReported commentReported, Class<CommentReported> classCommentReported, String collectionName);
	
	public List<CommentReported> inserts(List<ModeratorPostReported> postReporteds, String collectionName);

	public CommentReported update(Class<CommentReported> classCommentReported, String collectionName, CommentReported commentReportedUpdate);
	
	public long delete(CommentReported commentReported, Class<CommentReported> classCommentReported, String collectionName);
}
