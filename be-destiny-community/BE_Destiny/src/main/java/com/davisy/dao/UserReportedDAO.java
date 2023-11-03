package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.UserReported;

public interface UserReportedDAO extends JpaRepository<UserReported, Integer>{

	@Query(value = "SELECT * FROM user_reported WHERE user_reported=:id", nativeQuery = true)
	public List<UserReported> getAllUserReporedById(int id);

	// 1-11-2023 -lấy tổng số bài đăng theo ngày
	@Query(value = "SELECT COUNT(id) FROM user_reported WHERE EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalUserReportedByDay(int day, int month, int year);

	// 21-9-2023 -lấy tổng số bài đăng theo tháng
	// lastest update 14-10
	@Query(value = "SELECT COUNT(id) FROM user_reported WHERE EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalUserReportedByMonth(int month, int year);

	// 1-11-2023 -lấy tổng số bài đăng theo năm
	@Query(value = "SELECT COUNT(id) FROM user_reported WHERE EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
	public int getTotalUserReportedByYear(int year);
}