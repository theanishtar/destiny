package com.davisy.service;

import java.util.List;

import com.davisy.entity.Gender;

public interface GenderService {

	//22-9-2023 tìm giới tính bằng id
	public Gender findGenderByID(int id);
	
	//11-10-2023 -lấy tất cả tên giới tính
	public List<Object[]> getAllGenderName();
	
	//13-10-2023 -tìm id giới tính theo tên
	public int findIDGenderByName(String nameGender);
	
	public Gender findGenderByName(String name);
}
