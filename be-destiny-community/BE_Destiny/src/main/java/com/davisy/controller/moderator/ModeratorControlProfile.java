package com.davisy.controller.moderator;

import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.dto.Admin;
import com.davisy.dto.AdminPassword;
import com.davisy.entity.Districts;
import com.davisy.entity.Gender;
import com.davisy.entity.Provinces;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.service.DistrictService;
import com.davisy.service.GenderService;
import com.davisy.service.ProvinceService;
import com.davisy.service.UserService;
import com.davisy.service.WardService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_MODERATOR")
public class ModeratorControlProfile {
	@Autowired
	private UserService userService;
	@Autowired
	private GenderService genderService;
	@Autowired
	private ProvinceService provinceService;
	@Autowired
	private DistrictService districtService;
	@Autowired
	private WardService wardService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private PasswordEncoder passwordEncoder;

	String provinceCode;
	String districtCode;

	// update lastest 9-10
	@GetMapping("/v1/mod/checkAdminLog")
	public ResponseEntity<Admin> checkAdminLog(HttpServletRequest request) {

		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		Admin admin = new Admin();
		admin.setAvartar(user.getAvatar());

		return ResponseEntity.status(200).body(admin);
	}

	// 22-9-2023 -Thông tin chi tiết của admin
	// update lastest 10-10
	@GetMapping("/v1/mod/profile")
	public ResponseEntity<Admin> adminProfile(HttpServletRequest request) {

		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		Admin admin = new Admin();

		admin.setUsername(user.getUsername());

		String auth = String.valueOf(user.getAuthorities());
		String authName = auth.substring(6, auth.length() - 1).toLowerCase();
		char capitalFirstLetter = Character.toUpperCase(authName.charAt(0));
		String authNameUp1Char = authName.replace(authName.charAt(0), capitalFirstLetter);

		admin.setAuthorities(authNameUp1Char);

		admin.setFullname(user.getFullname());
		admin.setEmail(user.getEmail());
		admin.setIntro(user.getIntro());

		Calendar birthday = user.getBirthday();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatVN = new SimpleDateFormat("dd-MM-yyyy");

		String formatted = format.format(birthday.getTime());
		String formattedVN = formatVN.format(birthday.getTime());

		admin.setBirthday(formatted);
		admin.setBirthdayFormat(formattedVN);

		admin.setProvince_name(user.getProvinces().getFull_name());
		admin.setDistrict_name(user.getDistricts().getFull_name());
		admin.setWard_name(user.getWards().getFull_name());

		admin.setGender_name(user.getGender().getGender_name());
		admin.setAvartar(user.getAvatar());
		admin.setThumb(user.getThumb());

		return ResponseEntity.status(200).body(admin);
	}

	// update lastest 11-10
	@GetMapping("/v1/mod/getAllGender")
	public ResponseEntity<List<String>> getAllGender() {
		try {
			List<Object[]> list = genderService.getAllGenderName();
			List<String> listGender = new ArrayList<>();

			for (Object[] oj : list) {
				String gender = String.valueOf(oj[0]);
				listGender.add(gender);
			}
			return ResponseEntity.status(200).body(listGender);
		} catch (Exception e) {
			System.out.println("Error at admin/getAllGenders: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// update lastest 11-10
	@GetMapping("/v1/mod/getAllProvinceName")
	public ResponseEntity<List<String>> getAllProvinceName() {
		try {
			List<Object[]> list = provinceService.getAllProvinceName();
			List<String> listProvince = new ArrayList<>();

			for (Object[] oj : list) {
				String province = String.valueOf(oj[0]);
				listProvince.add(province);
			}
			return ResponseEntity.status(200).body(listProvince);
		} catch (Exception e) {
			System.out.println("Error at admin/getAllProvinceName: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// update lastest 11-10
	@GetMapping("/v1/mod/getAllDistrictName/{provinceName}")
	public ResponseEntity<List<String>> getAllDistrictName(@PathVariable String provinceName) {
		try {
			provinceCode = provinceService.provinceCode(provinceName);
			List<Object[]> list = new ArrayList<>();

			if (provinceCode == null) {
				list = districtService.getAllDistrict();
			} else {
				list = districtService.getAllDistrictName(provinceCode);
			}
			List<String> listDistrict = new ArrayList<>();

			for (Object[] oj : list) {
				String district = String.valueOf(oj[0]);
				listDistrict.add(district);
			}
			return ResponseEntity.status(200).body(listDistrict);
		} catch (Exception e) {
			System.out.println("Error at admin/getAllDistrictName: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// update lastest 11-10
	@GetMapping("/v1/mod/getAllWardName/{districtName}")
	public ResponseEntity<List<String>> getAllWardName(@PathVariable String districtName) {
		try {
			districtCode = districtService.districtCode(districtName, provinceCode);
			List<Object[]> list = new ArrayList<>();

			if (provinceCode == null || districtCode == null) {
				list = wardService.getAllWard();
			} else {
				list = wardService.getAllWardName(districtCode);
			}
			List<String> listDistrict = new ArrayList<>();

			for (Object[] oj : list) {
				String district = String.valueOf(oj[0]);
				listDistrict.add(district);
			}
			return ResponseEntity.status(200).body(listDistrict);
		} catch (Exception e) {
			System.out.println("Error at admin/getAllDistrictName: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// 22-9-2023 Cập nhật thông tin tài khoản admin
	// 12-10-2023 lastest update
	@PostMapping("/v1/mod/updateProfile")
	public ResponseEntity<User> updateProfileAdmin(@RequestBody Admin adminRequestUpdate, HttpServletRequest request) throws Exception {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User admin = userService.findByEmail(email);

			admin.setUsername(adminRequestUpdate.getUsername());
			admin.setFullname(adminRequestUpdate.getFullname());	
			admin.setIntro(adminRequestUpdate.getIntro());
					
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date = sdf.parse(adminRequestUpdate.getBirthday());
			Calendar birthday = Calendar.getInstance();
			birthday.setTime(date);
			
			admin.setBirthday(birthday);
			
			int genderID = genderService.findIDGenderByName(adminRequestUpdate.getGender_name());
			Gender gender = genderService.findGenderByID(genderID);
			admin.setGender(gender);
			
			String provinceCode = provinceService.provinceCode(adminRequestUpdate.getProvince_name());			
			Provinces province = provinceService.findProvinceByID(provinceCode);
			admin.setProvinces(province);
			
			String districtCode = districtService.districtCode(adminRequestUpdate.getDistrict_name(), provinceCode);
			Districts district = districtService.findDistrictByID(districtCode);
			admin.setDistricts(district);
			
			String wardCode = wardService.wardCode(adminRequestUpdate.getWard_name(), districtCode);
			Wards ward = wardService.findWardByID(wardCode);
			admin.setWards(ward);

			userService.update(admin);

			return ResponseEntity.status(200).body(admin);
		} catch (Exception e) {
			System.out.println("Lỗi nè admin/update profile: " + e);
			throw e;
		}
	}

	// 22-9-2023 Kiểm tra mật khẩu khớp với mật khẩu cũ
	// 14-10-2023 lastest update
	@PostMapping("/v1/mod/checkPassword")
	public int checkPassword(@RequestBody AdminPassword userRequestChangePasswrod,
			HttpServletRequest request) throws Exception {
		try {
			int status;
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User admin = userService.findByEmail(email);
			String passwordRequest = userRequestChangePasswrod.getOldPassword();

			if (passwordEncoder.matches(passwordRequest, admin.getPassword())) {
				status = 1;
			} else {
				status = 0;
			}
			return status;
		} catch (Exception e) {
			System.out.println("Lỗi nè admin/checkPassword: " + e);
			throw e;
		}
	}

	// 22-9-2023 Cập nhật mật khẩu mới
	// 14-10-2023 lastest update
	@PostMapping("/v1/mod/changePassword")
	public void changePassword(@RequestBody AdminPassword adminRequestChangePasswrod,
			HttpServletRequest request) throws Exception {
		try {
			System.out.println(adminRequestChangePasswrod.getNewPassword());
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User admin = userService.findByEmail(email);
			String newPassword = adminRequestChangePasswrod.getNewPassword();
			admin.setPassword(passwordEncoder.encode(newPassword));

			userService.update(admin);
		} catch (Exception e) {
			System.out.println("Lỗi nè admin/changePassword: " + e);
		}
	}

}
