package com.davisy.service;

import java.util.List;

import com.davisy.entity.UserReported;

public interface UserReportedService {

	public List<UserReported> getAllPostReporedById(int id);
	
	// 1-11-2023 -lấy tổng số người dùng bị báo cáo theo ngày
	public int getTotalUserReportedByDay(int day, int month);

	// 21-9-2023 -lấy tổng số người dùng bị báo cáo  theo tháng
	public int getTotalUserReportedByMonth(int month);

	// 1-11-2023 -lấy tổng số người dùng bị báo cáo  theo năm
	public int getTotalUserReportedByYear(int year);

	public void create(UserReported userReported);

	public void update(UserReported userReported);

	public void disable(UserReported userReported);
}