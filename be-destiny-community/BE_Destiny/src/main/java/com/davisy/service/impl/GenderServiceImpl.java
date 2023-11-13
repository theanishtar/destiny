package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.GenderDAO;
import com.davisy.entity.Gender;
import com.davisy.service.GenderService;

@Service
public class GenderServiceImpl implements GenderService {
	@Autowired
	private GenderDAO genderDao;

	// 22-9-2023 tìm giới tính bằng id
	@Override
	public Gender findGenderByID(int id) {
		return genderDao.findGenderByID(id);
	}

	//11-10-2023 -lấy tất cả tên giới tính
	@Override
	public List<Object[]> getAllGenderName() {
		return genderDao.getAllGenderName();
	}
	
	//13-10-2023 -tìm id giới tính theo tên
	@Override
	public int findIDGenderByName(String nameGender) {
		return genderDao.findIDGenderByName(nameGender);
	}

	@Override
	public Gender findGenderByName(String name) {
		return genderDao.findGenderByName(name);
	}
}
