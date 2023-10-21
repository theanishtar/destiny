package com.davisy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.auth.AuthenticationRequest;
import com.davisy.auth.AuthenticationResponse;
import com.davisy.config.JwtTokenUtil;
import com.davisy.dto.Admin;
import com.davisy.dto.UserProfile;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Districts;
import com.davisy.entity.Gender;
import com.davisy.entity.ProfileEnitity;
import com.davisy.entity.Provinces;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.model.LoginResponse;
import com.davisy.service.AuthenticationService;
import com.davisy.service.DistrictService;
import com.davisy.service.GenderService;
import com.davisy.service.ProvinceService;
import com.davisy.service.WardService;
import com.davisy.service.impl.DistrictServiceImpl;
import com.davisy.service.impl.FollowServiceImpl;
import com.davisy.service.impl.PostImagesServiceImpl;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.ProvinceServiceImpl;
import com.davisy.service.impl.UserServiceImpl;
import com.davisy.service.impl.WardServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class ProfileContronller {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserServiceImpl userServiceImpl;
	@Autowired
	FollowServiceImpl followServiceImpl;
	@Autowired
	PostServiceImpl postServiceImpl;
	@Autowired
	PostImagesServiceImpl postImagesServiceImpl;
	@Autowired
	ProvinceServiceImpl provinceServiceImpl;
	@Autowired
	WardServiceImpl wardServiceImpl;
	@Autowired
	DistrictServiceImpl districtServiceImpl;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationService authenticationService;
	@Autowired
	private ProvinceService provinceService;
	@Autowired
	private DistrictService districtService;
	@Autowired
	private WardService wardService;
	@Autowired
	private GenderService genderService;

	String provinceCode;
	String districtCode;

	@PostMapping("/v1/user/profile/data/timeline")
	public ResponseEntity<ProfileEnitity> loadProfile(HttpServletRequest request, @RequestBody int toProfileUser) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			return ResponseEntity.ok().body(loadProfile(email, toProfileUser));
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/profile/load/data")
	public ResponseEntity<UserProfile> adminProfile(HttpServletRequest request) {

		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userServiceImpl.findByEmail(email);
		UserProfile userP = new UserProfile();

		userP.setUsername(user.getUsername());
		userP.setFullname(user.getFullname());
		userP.setEmail(user.getEmail());
		userP.setIntro(user.getIntro());

		Calendar birthday = user.getBirthday();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String formatted = format.format(birthday.getTime());

		userP.setBirthday(formatted);

		Calendar daycreate = user.getDay_create();
		String formattedDC = format.format(daycreate.getTime());
		userP.setDay_create(formattedDC);

		userP.setProvince_name(user.getProvinces().getFull_name());
		userP.setDistrict_name(user.getDistricts().getFull_name());
		userP.setWard_name(user.getWards().getFull_name());

		userP.setGender_name(user.getGender().getGender_name());
		userP.setAvartar(user.getAvatar());
		userP.setThumb(user.getThumb());

		return ResponseEntity.status(200).body(userP);
	}
	@PostMapping("/v1/user/profile/update")
	public ResponseEntity<AuthenticationResponse> updateProfile(HttpServletRequest request,
			@RequestBody UserProfile userRequestUpdate) {
		try {
			
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User userUpdate = userServiceImpl.findByEmail(email);
//			System.out.println("check: "+);
			if(!passwordEncoder.matches(userRequestUpdate.getPassword(), userUpdate.getPassword())) {
				return ResponseEntity.status(401).build();
			}else {
				String emailUpdate = userRequestUpdate.getEmail();
				String passUpdate=userRequestUpdate.getPassword();
				userUpdate.setUsername(userRequestUpdate.getUsername());
				userUpdate.setFullname(userRequestUpdate.getFullname());
				userUpdate.setEmail(userRequestUpdate.getEmail());
				userUpdate.setIntro(userRequestUpdate.getIntro());

				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date date = sdf.parse(userRequestUpdate.getBirthday());
				Calendar birthday = Calendar.getInstance();
				birthday.setTime(date);
				userUpdate.setBirthday(birthday);

				int genderID = genderService.findIDGenderByName(userRequestUpdate.getGender_name());
				Gender gender = genderService.findGenderByID(genderID);
				userUpdate.setGender(gender);

				String provinceCode = provinceService.provinceCode(userRequestUpdate.getProvince_name());
				Provinces province = provinceService.findProvinceByID(provinceCode);
				userUpdate.setProvinces(province);

				String districtCode = districtService.districtCode(userRequestUpdate.getDistrict_name(), provinceCode);
				Districts district = districtService.findDistrictByID(districtCode);
				userUpdate.setDistricts(district);

				String wardCode = wardService.wardCode(userRequestUpdate.getWard_name(), districtCode);
				Wards ward = wardService.findWardByID(wardCode);
				userUpdate.setWards(ward);

				userUpdate.setAvatar(
						"https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.");

				userUpdate.setThumb(
						"https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.");

				userServiceImpl.update(userUpdate);
				AuthenticationRequest authenticationRequest = new AuthenticationRequest();
				authenticationRequest.setEmail(emailUpdate);
				authenticationRequest.setPassword(passUpdate);
				LoginResponse resLog = authenticationService.loginResponseService(authenticationRequest);
				return ResponseEntity.ok().body(resLog.getData());
			}
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.badRequest().build();
		}
	}

//	@PostMapping("")
//public ResponseEntity<T>

	public ProfileEnitity loadProfile(String email, int profileId) {
		User user1 = userServiceImpl.findByEmail(email);
		User user = new User();
//		int id = 0;
		boolean check = false;
		if (user1.getUser_id() == profileId || profileId == 0) {
			user = user1;
		} else {
			user = userServiceImpl.findById(profileId);
			check = true;
		}
		int id = user.getUser_id();
		DataFollows dataFollows = new DataFollows();
		ProfileEnitity profileEnitity = new ProfileEnitity();
		int countPost = postServiceImpl.countPost(id);
		int countFollower = followServiceImpl.countFollowers(id);
		int countImg = postImagesServiceImpl.countPostImages(id);
		dataFollows.setUser_id(user.getUser_id());
		dataFollows.setThumb(user.getThumb());
		dataFollows.setAvatar(user.getAvatar());
		dataFollows.setMark(user.getMark());
		dataFollows.setFullname(user.getFullname());
		dataFollows.setIntro(user.getIntro());
		dataFollows.setCountPost(countPost);
		dataFollows.setCountFollower(countFollower);
		dataFollows.setCountImg(countImg);
		dataFollows.setUsername(user.getUsername());
		if (check) {
			List<Integer> list = followServiceImpl.findAllFollowingUser(user1.getUser_id());
			if (list.contains(profileId)) {
				dataFollows.setCheckFollow(true);
			}
		} else if (user1.getUser_id() == profileId) {
			dataFollows.setCheckFollow(true);
		}
		profileEnitity.setDataFollows(dataFollows);
		profileEnitity.setImages(postImagesServiceImpl.findAllImagesUser(id));
		profileEnitity.setDateJoin(user.getDay_create());
		profileEnitity
				.setAddress_fullname(user.getDistricts().getFull_name() + " " + user.getProvinces().getFull_name());
		profileEnitity.setAddress_fullname_en(
				user.getDistricts().getFull_name_en() + " " + user.getProvinces().getFull_name_en());
		profileEnitity.setListPostInterested(postServiceImpl.getTop5postProfile(id));
		return profileEnitity;
	}

	@GetMapping("/v1/user/getAllProvinceName")
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

	@GetMapping("/v1/user/getAllDistrictName/{provinceName}")
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
	@GetMapping("/v1/user/getAllWardName/{districtName}")
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

	@GetMapping("/v1/user/getAllGender")
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

}
