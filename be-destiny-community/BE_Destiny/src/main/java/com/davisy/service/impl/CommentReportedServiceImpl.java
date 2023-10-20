package com.davisy.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.davisy.mongodb.documents.CommentReported;
import com.davisy.mongodb.documents.PostReported;
import com.davisy.service.CommentReportedService;

@Service
public class CommentReportedServiceImpl implements CommentReportedService {
	@Override
	public List<CommentReported> findAll(CommentReported commentReported, Class<CommentReported> classCommentReported,
			String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentReported insert(CommentReported commentReported, Class<CommentReported> classCommentReported,
			String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentReported update(Class<CommentReported> classCommentReported, String collectionName,
			CommentReported commentReportedUpdate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long delete(CommentReported commentReported, Class<CommentReported> classCommentReported,
			String collectionName) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<CommentReported> inserts(List<PostReported> postReporteds, String collectionName) {
		// TODO Auto-generated method stub
		return null;
	}

}
