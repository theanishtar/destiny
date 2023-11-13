package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.Wards;
//@Cacheable("wards")//Tạo bộ nhớ đệm
public interface WardDAO extends JpaRepository<Wards, Integer> {

	// 22-9-2023 -tìm xã/phường theo id
	@Query(value = "SELECT * FROM wards WHERE code=:code", nativeQuery = true)
	public Wards findWardByID(String code);

	// 11-10-2023 -lấy tất cả tên xã/phường
	@Query(value = "SELECT full_name FROM wards WHERE district_code=:code", nativeQuery = true)
	public List<Object[]> getAllWardName(String code);

	// 11-10-2023 -lấy tất cả tên xã/phường
	@Query(value = "SELECT full_name FROM wards", nativeQuery = true)
	public List<Object[]> getAllWard();

	// 11-10-2023 -tìm mã xã/phường theo tên
	@Query(value = "SELECT code FROM wards WHERE full_name =:wardName AND district_code=:districtCode", nativeQuery = true)
	public String wardCode(String wardName, String districtCode);

	@Query(value = "SELECT * FROM wards WHERE district_code=:id", nativeQuery = true)
	public List<Wards> findByIdDistrict(String id);
	
	@Query(value = "SELECT * FROM wards WHERE full_name =:wardName AND district_code=:districtCode", nativeQuery = true)
	public Wards ward(String wardName, String districtCode);
}
