package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.PostReportedDAO;
import com.davisy.entity.PostReported;
import com.davisy.service.PostReportedService;

@Service
public class PostReportedServiceImpl implements PostReportedService{
	
	@Autowired
	private PostReportedDAO postReportedDAO;

	@Override
	public PostReported findById(int id) {

		return postReportedDAO.findByID(id);
	}
	
	@Override
	public void create(PostReported postReported) {
		
		postReportedDAO.save(postReported);	
	}
	
	@Override
	public void update(PostReported postReported) {
		
		postReportedDAO.saveAndFlush(postReported);	
		
	}
	
	@Override
	public void disable(PostReported postReported) {
		
		postReportedDAO.delete(postReported);
	}
}
