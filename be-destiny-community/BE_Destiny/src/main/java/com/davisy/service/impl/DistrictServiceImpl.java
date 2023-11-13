package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.DistrictDAO;
import com.davisy.entity.Districts;
import com.davisy.service.DistrictService;

@Service
public class DistrictServiceImpl implements DistrictService {
	@Autowired
	private DistrictDAO districtDao;

	// 22-9-2023 -tìm quận/huyện theo id
	@Override
	public Districts findDistrictByID(String code) {
		return districtDao.findDistrictByID(code);
	}

	// 11-10-2023 -lấy tất cả tên quận/huyện
	@Override
	public List<Object[]> getAllDistrictName(String code) {
		return districtDao.getAllDistrictName(code);
	}

	// 11-10-2023 -lấy tất cả tên quận/huyện
	@Override
	public List<Object[]> getAllDistrict() {
		return districtDao.getAllDistrict();
	}

	// 11-10-2023 -tìm mã quận/huyện theo tên
	@Override
	public String districtCode(String districtName, String provinceCode) {
		return districtDao.districtCode(districtName, provinceCode);
	}

	@Override
	public List<Districts> findByIdProvince(String id) {
		List<Districts> list = districtDao.findByIdProvince(id);
		return list;
	}

	@Override
	public List<Districts> findAll() {
		return districtDao.findAll();
	}

	@Override
	public Districts districts(String districtName, String provinceCode) {
		return districtDao.districts(districtName, provinceCode);
	}
}
