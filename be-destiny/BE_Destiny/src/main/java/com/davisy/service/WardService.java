package com.davisy.service;

import java.util.List;

import com.davisy.entity.Wards;

public interface WardService {

	// 22-9-2023 -tìm xã/phường theo id
	public Wards findWardByID(String id);

	// 11-10-2023 -lấy tất cả tên xã/phường
	public List<Object[]> getAllWardName(String code);

	// 11-10-2023 -lấy tất cả tên xã/phường
	public List<Object[]> getAllWard();

	// 11-10-2023 -tìm mã xã/phường theo tên
	public String wardCode(String wardName, String districtCode);

	public Wards ward(String wardName, String districtCode);

	public List<Wards> findByIdDistrict(String id);

	public List<Wards> findAllL();
}
