package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.UserReportedDAO;
import com.davisy.entity.UserReported;
import com.davisy.service.UserReportedService;

@Service
public class UserReportedServiceImpl implements UserReportedService{
	
	@Autowired
	private UserReportedDAO userReportedDAO;
	
	@Override
	public UserReported findById(int id) {
		
		return userReportedDAO.findByID(id);
	}
	
	
	@Override
	public void create(UserReported userReported) {
		
		userReportedDAO.save(userReported);
	}
	
	
	@Override
	public void update(UserReported userReported) {
		
		userReportedDAO.saveAndFlush(userReported);
	}
	
	@Override
	public void disable(UserReported userReported) {
		
		userReportedDAO.delete(userReported);
	}
	
}
