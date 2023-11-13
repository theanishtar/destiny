package com.davisy.service;

import java.util.List;

import com.davisy.entity.Districts;

public interface DistrictService {

	// 22-9-2023 -tìm quận/huyện theo id
	public Districts findDistrictByID(String id);

	// 11-10-2023 -lấy tất cả tên quận/huyện
	public List<Object[]> getAllDistrictName(String code);

	// 11-10-2023 -lấy tất cả tên quận/huyện
	public List<Object[]> getAllDistrict();

	// 11-10-2023 -tìm mã quận/huyện theo tên
	public String districtCode(String districtName, String provinceCode);
	
	public Districts districts(String districtName, String provinceCode);

	public List<Districts> findByIdProvince(String id);
	
	public List<Districts>findAll();
}
