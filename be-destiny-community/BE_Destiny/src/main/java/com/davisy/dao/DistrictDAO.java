package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Districts;
//@Cacheable("districts")//Tạo bộ nhớ đệm
public interface DistrictDAO extends JpaRepository<Districts, Integer> {

	// 22-9-2023 -tìm quận/huyện theo id
	@Query(value = "SELECT * FROM districts WHERE code=:code", nativeQuery = true)
	public Districts findDistrictByID(String code);

	// 11-10-2023 -lấy tất cả tên quận/huyện
	@Query(value = "SELECT full_name FROM districts WHERE province_code=:code", nativeQuery = true)
	public List<Object[]> getAllDistrictName(String code);

	// 11-10-2023 -lấy tất cả tên quận/huyện
	@Query(value = "SELECT full_name FROM districts", nativeQuery = true)
	public List<Object[]> getAllDistrict();

	// 11-10-2023 -tìm mã quận/huyện theo tên
	@Query(value = "SELECT code FROM districts WHERE full_name=:districtName AND province_code=:provinceCode", nativeQuery = true)
	public String districtCode(String districtName, String provinceCode);

	@Query(value = "SELECT * FROM districts WHERE province_code=:id", nativeQuery = true)
	public List<Districts> findByIdProvince(String id);
	
	
	@Query(value = "SELECT code FROM districts WHERE full_name=:districtName AND province_code=:provinceCode", nativeQuery = true)
	public Districts districts(String districtName, String provinceCode);

}
