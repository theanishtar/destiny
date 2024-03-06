package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Provinces;
//@Cacheable("provinces")//Tạo bộ nhớ đệm
public interface ProvinceDAO extends JpaRepository<Provinces, Integer>{

	//22-9-2023 -tìm thành phố/tỉnh theo id
	@Query(value = "SELECT * FROM provinces WHERE code=:code", nativeQuery = true)
	public Provinces findProvinceByID(String code);
	
	//11-10-2023 -lấy tất cả tên thành phố
	@Query(value = "SELECT full_name FROM provinces", nativeQuery = true)
	public List<Object[]> getAllProvinceName();
	
	//11-10-2023 -tìm mã tỉnh theo tên
	@Query(value = "SELECT code FROM provinces WHERE full_name=:provinceName", nativeQuery = true)
	public String provinceCode(String provinceName);
	
	@Query(value = "SELECT * FROM provinces WHERE full_name=:provinceName", nativeQuery = true)
	public Provinces provinces(String provinceName);
	
	
}
