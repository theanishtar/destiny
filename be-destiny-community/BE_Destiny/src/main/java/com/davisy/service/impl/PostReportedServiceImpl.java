package com.davisy.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.PostReportedDAO;
import com.davisy.entity.PostReported;
import com.davisy.service.PostReportedService;

@Service
public class PostReportedServiceImpl implements PostReportedService{
	
	@Autowired
	private PostReportedDAO postReportedDAO;
	
	Calendar now = Calendar.getInstance();
	int year = now.get(Calendar.YEAR);

	@Override
	public List<Object[]> getAllPostReportedByDay(int day, int month) {
		// TODO Auto-generated method stub
		return postReportedDAO.getAllPostReportedByDay(day, month, year);
	}
	
	@Override
	public List<Object[]> getAllPostReportedByYear(int year) {
		// TODO Auto-generated method stub
		return postReportedDAO.getAllPostReportedByYear(year);
	}
	
	@Override
	public List<PostReported> getAllPostReported() {
		// TODO Auto-generated method stub
		return postReportedDAO.findAll();
	}

	@Override
	public List<PostReported> getAllPostReportedById(int id) {

		return postReportedDAO.getAllPostReportedById(id);
	}
	
	@Override
	public int getTotalPostReportedByDay(int day, int month) {
		// TODO Auto-generated method stub
		return postReportedDAO.getTotalPostReportedByDay(day, month, year);
	}
	
	
	@Override
	public int getTotalPostReportedByMonth(int month) {
		// TODO Auto-generated method stub
		return postReportedDAO.getTotalPostReportedByMonth(month, year);
	}
	
	
	@Override
	public int getTotalPostReportedByYear(int year) {
		// TODO Auto-generated method stub
		return postReportedDAO.getTotalPostReportedByYear(year);
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