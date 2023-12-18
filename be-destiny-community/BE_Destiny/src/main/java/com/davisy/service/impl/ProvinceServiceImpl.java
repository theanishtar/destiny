package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.ProvinceDAO;
import com.davisy.entity.Provinces;
import com.davisy.service.ProvinceService;

@Service
public class ProvinceServiceImpl implements ProvinceService {
	@Autowired
	private ProvinceDAO provinceDao;

	// 22-9-2023 -tìm thành phố/tỉnh theo id
	@Override
	public Provinces findProvinceByID(String code) {
		return provinceDao.findProvinceByID(code);
	}

	// 11-10-2023 -lấy tất cả tên thành phố
	@Override
	public List<Object[]> getAllProvinceName() {
		return provinceDao.getAllProvinceName();
	}

	// 11-10-2023 -tìm mã tỉnh theo tên
	@Override
	public String provinceCode(String provinceName) {
		return provinceDao.provinceCode(provinceName);
	}

	@Override
	public List<Provinces> findAll() {
		return provinceDao.findAll();
	}

	@Override
	public Provinces provinces(String name) {
		return provinceDao.provinces(name);
	}
}
