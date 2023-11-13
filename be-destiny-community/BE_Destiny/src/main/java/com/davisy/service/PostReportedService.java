package com.davisy.service;

import java.util.List;


import com.davisy.entity.PostReported;

public interface PostReportedService {
	
	// 6-11-2023
	public List<Object[]> getAllPostReportedByDay(int day, int month);
	
	// 6-11-2023
	public List<Object[]> getAllPostReportedByYear(int year);
	
	// 6-11-2023
	public List<PostReported> getAllPostReported();

	// 6-11-2023
	public List<PostReported> getAllPostReportedById(int id);
	
	// 1-11-2023 -lấy tổng số bài đăng bị báo cáo theo ngày
	public int getTotalPostReportedByDay(int day, int month);

	// 21-9-2023 -lấy tổng số đăng bị báo cáo  theo tháng
	public int getTotalPostReportedByMonth(int month);

	// 1-11-2023 -lấy tổng số đăng bị báo cáo  theo năm
	public int getTotalPostReportedByYear(int year);
	
	public void create(PostReported postReported);

	public void update(PostReported postReported);

	public void disable(PostReported postReported);
}