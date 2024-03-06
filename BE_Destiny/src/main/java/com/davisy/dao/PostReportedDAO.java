package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.PostReported;

public interface PostReportedDAO extends JpaRepository<PostReported, Integer> {
	
	// 6-11
	@Query(value = "SELECT post_reported_id, count(post_reported_id) FROM post_reported WHERE EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year GROUP BY post_reported_id;", nativeQuery = true)
	public List<Object[]> getAllPostReportedByDay(int day, int month, int year);
	
	// 6-11
	@Query(value = "SELECT post_reported_id, count(post_reported_id) FROM post_reported WHERE EXTRACT(YEAR FROM date_report)=:year GROUP BY post_reported_id;", nativeQuery = true)
	public List<Object[]> getAllPostReportedByYear(int year);

	// 8-11
	@Query(value = "SELECT * FROM post_reported WHERE post_reported_id=:id", nativeQuery = true)
	public List<PostReported> getAllPostReportedById(int id);

	// 1-11-2023 -lấy tổng số bài đăng theo ngày
	@Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalPostReportedByDay(int day, int month, int year);

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalPostReportedByMonth(int month, int year);

	// 1-11-2023 -lấy tổng số bài đăng theo năm
	@Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalPostReportedByYear(int year);
}