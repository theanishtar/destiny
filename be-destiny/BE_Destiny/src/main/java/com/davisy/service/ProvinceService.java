package com.davisy.service;

import java.util.List;

import com.davisy.entity.Provinces;

public interface ProvinceService {

	// 22-9-2023 -tìm thành phố/tỉnh theo id
	public Provinces findProvinceByID(String id);

	// 11-10-2023 -lấy tất cả tên thành phố
	public List<Object[]> getAllProvinceName();

	// 11-10-2023 -tìm mã tỉnh theo tên
	public String provinceCode(String provinceName);

	public List<Provinces> findAll();

	public Provinces provinces(String name);
}
