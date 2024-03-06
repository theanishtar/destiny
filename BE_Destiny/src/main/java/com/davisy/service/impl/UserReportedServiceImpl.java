package com.davisy.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.UserReportedDAO;
import com.davisy.entity.UserReported;
import com.davisy.service.UserReportedService;

@Service
public class UserReportedServiceImpl implements UserReportedService {

	@Autowired
	private UserReportedDAO userReportedDAO;
	
	Calendar now = Calendar.getInstance();
	int year = now.get(Calendar.YEAR);
	
	@Override
	public List<Object[]> getAllUserReportedByDay(int day, int month) {
		// TODO Auto-generated method stub
		return userReportedDAO.getAllUserReportedByDay(day, month, year);
	}
	
	@Override
	public List<Object[]> getAllUserReportedByYear(int year) {
		// TODO Auto-generated method stub
		return userReportedDAO.getAllUserReportedByYear(year);
	}
	
	@Override
	public List<UserReported> getAllUserReported() {
		// TODO Auto-generated method stub
		return userReportedDAO.findAll();
	}

	@Override
	public List<UserReported> getAllUserReportedById(int id) {
		// TODO Auto-generated method stub
		return userReportedDAO.getAllUserReportedById(id);
	}

	@Override
	public int getTotalUserReportedByDay(int day, int month) {
		// TODO Auto-generated method stub
		return userReportedDAO.getTotalUserReportedByDay(day, month, year);
	}

	@Override
	public int getTotalUserReportedByMonth(int month) {
		// TODO Auto-generated method stub
		return userReportedDAO.getTotalUserReportedByMonth(month, year);
	}

	@Override
	public int getTotalUserReportedByYear(int year) {
		// TODO Auto-generated method stub
		return userReportedDAO.getTotalUserReportedByYear(year);
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