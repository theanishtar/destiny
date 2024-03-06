package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.WardDAO;
import com.davisy.entity.Wards;
import com.davisy.service.WardService;

@Service
public class WardServiceImpl implements WardService {
	@Autowired
	private WardDAO wardDao;

	// 22-9-2023 -tìm đường theo id
	@Override
	public Wards findWardByID(String code) {
		return wardDao.findWardByID(code);
	}

	// 11-10-2023 -lấy tất cả tên xã/phường
	@Override
	public List<Object[]> getAllWardName(String code) {
		return wardDao.getAllWardName(code);
	}

	// 11-10-2023 -lấy tất cả tên xã/phường
	@Override
	public List<Object[]> getAllWard() {
		return wardDao.getAllWard();
	}

	// 11-10-2023 -tìm mã xã/phường theo tên
	@Override
	public String wardCode(String wardName, String districtCode) {
		return wardDao.wardCode(wardName, districtCode);

	}

	@Override
	public List<Wards> findByIdDistrict(String id) {
		List<Wards> list = wardDao.findByIdDistrict(id);
		return list;
	}

	@Override
	public List<Wards> findAllL() {
		return wardDao.findAll();
	}

	@Override
	public Wards ward(String wardName, String districtCode) {
		return wardDao.ward(wardName, districtCode);
	}

}
