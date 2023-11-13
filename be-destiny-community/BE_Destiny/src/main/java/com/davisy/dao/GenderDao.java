package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Gender;
//@Cacheable("gender")//Tạo bộ nhớ đệm
public interface GenderDAO extends JpaRepository<Gender, Integer> {

	//22-9-2023 -tìm giới tính theo id
	@Query(value = "SELECT * FROM gender WHERE gender_id=:id", nativeQuery = true)
	public Gender findGenderByID(int id);
	
	//11-10-2023 -lấy tất cả tên giới tính
	@Query(value = "SELECT gender_name FROM gender", nativeQuery = true)
	public List<Object[]> getAllGenderName();
	
	//13-10-2023 -tìm id giới tính theo tên
	@Query(value = "SELECT gender_id FROM gender WHERE gender_name=:nameGender", nativeQuery = true)
	public int findIDGenderByName(String nameGender);
	
	@Query(value = "SELECT * FROM gender WHERE gender_name=:nameGender", nativeQuery = true)
	public Gender findGenderByName(String nameGender);
}
