package com.davisy.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.auth.AuthenticationResponse;
import com.davisy.config.JwtTokenUtil;
import com.davisy.constant.Cache;
import com.davisy.dto.UserProfile;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Districts;
import com.davisy.entity.Gender;
import com.davisy.entity.Post;
import com.davisy.entity.ProfileEnitity;
import com.davisy.entity.Provinces;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.service.AuthenticationService;
import com.davisy.service.CacheService;
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
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	@Autowired
	CacheService cacheService;
	
	@Autowired
	ObjectMapper mapper;

	String provinceCode;
	String districtCode;

	String randCodeAuth = "";

	public static String random() {
		String code = "";
		for (int i = 0; i < 6; i++) {
			code = code + (int) (Math.floor(Math.random() * 9));
		}
		return code;
	}

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
		userP.setAvatar(user.getAvatar());
		userP.setThumb(user.getThumb());

		return ResponseEntity.status(200).body(userP);
	}

	@PostMapping("/v1/user/profile/update")
	public ResponseEntity<User> updateProfile(HttpServletRequest request, @RequestBody UserProfile userRequestUpdate) {
		try {
			// lấy email
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User userUpdate = userServiceImpl.findByEmail(email);

			userUpdate.setUsername(userRequestUpdate.getUsername());
			userUpdate.setFullname(userRequestUpdate.getFullname());
			userUpdate.setIntro(userRequestUpdate.getIntro());

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date = sdf.parse(userRequestUpdate.getBirthday());
			Calendar birthday = Calendar.getInstance();
			birthday.setTime(date);
			userUpdate.setBirthday(birthday);

			Gender gender = genderService.findGenderByName(userRequestUpdate.getGender_name());
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

//			userUpdate.setAvatar("https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.");
			if (userRequestUpdate.getAvatar() == null) {
				userUpdate.setAvatar(userUpdate.getAvatar());
			} else {
				userUpdate.setAvatar(userRequestUpdate.getAvatar());
			}

			if (userRequestUpdate.getThumb() == null) {
				userUpdate.setThumb(userUpdate.getThumb());
			} else {
				userUpdate.setThumb(userRequestUpdate.getThumb());
			}

//			userUpdate.setThumb("https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.");
			userUpdate.setThumb(userRequestUpdate.getThumb());

			userServiceImpl.update(userUpdate);

			return ResponseEntity.ok().body(userUpdate);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(400).build();
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
		int provinceId = Integer.valueOf(user.getIdProvince());
		List<Object[]> listUser = userServiceImpl.getUserofPostProfile(id);
		List<Post> listPosts = postServiceImpl.getListPostByUserID(id);
		List<Object[]> listCount = postServiceImpl.getCountPostProfile(id);

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
		profileEnitity.setUser(listUser);
		profileEnitity.setPost(listPosts);
		profileEnitity.setCount(listCount);
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

	@PostMapping("/v1/user/profile/change/password")
	private ResponseEntity<String> changePassword(HttpServletRequest request, @RequestBody PasswordChange change) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User currentUser = userServiceImpl.findByEmail(email);

		if (!passwordEncoder.matches(change.oldPassword, currentUser.getPassword())) {
			return ResponseEntity.status(300).body("Mật khẩu cũ không đúng");
		}

		if (change.getOldPassword().equalsIgnoreCase(change.getNewPassword())) {
			return ResponseEntity.status(301).body("Mật khẩu mới trùng với mật khẩu cũ");
		}

		if (passwordEncoder.matches(change.newPassword, currentUser.getPassword())) {
			return ResponseEntity.status(302).body("Mật khẩu trùng với mật khẩu cũ hoặc không hợp lệ!");
		}

		currentUser.setPassword(passwordEncoder.encode(change.newPassword));
		userServiceImpl.update(currentUser);

		return ResponseEntity.status(200).body("OK");
	}

	@PostMapping("/v1/user/profile/change/email")
	private ResponseEntity<String> changeEmail(HttpServletRequest request, @RequestBody EmailChange change) {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User currentUser = userServiceImpl.findByEmail(email);

		if (!passwordEncoder.matches(change.getPassword(), currentUser.getPassword())) {
			return ResponseEntity.status(300).body(null); // "Mật khẩu xác nhận không đúng"
		}

		if (currentUser.getEmail().equalsIgnoreCase(change.getNewEmail())) {
			return ResponseEntity.status(301).body(null); // "Email mới trùng với email cũ"
		}

		//currentUser.setEmail(change.getNewEmail());

		// userServiceImpl.update(currentUser);
		this.randCodeAuth = random();
		
		EmailConfirm eConfirm = new EmailConfirm(currentUser.getEmail(), change.newEmail);

		// {key: "change:email", value: "newMail", time 5m}
		cacheService.writeCacheAtTime("changemail:" + this.randCodeAuth, eConfirm, 5,
				Cache.TimeUnit_MINUTE);

		// Gửi mail
		/*
		 * 
		 * 
		 * 
		 */
		return ResponseEntity.status(200).body(this.randCodeAuth); // "OK"
	}

	// /v1/user/profile/change/email/confirm?code=
	@PostMapping("/v1/user/profile/change/email/confirm")
	private ResponseEntity<AuthenticationResponse> confirmChangeEmail(HttpServletRequest request,
			@RequestParam String code) {
		System.out.println(code+"::::::::");
		String dataCache = cacheService.getByKey("changemail:" + code);
		
		try {
			EmailConfirm eConfirm = mapper.readValue(dataCache, EmailConfirm.class);
			User user = userServiceImpl.findByEmail(eConfirm.getOldEmail());
			
			user.setEmail(eConfirm.getNewEmail());
			userServiceImpl.update(user);
			
			cacheService.destroyCache("changemail:" + code);
			return ResponseEntity.status(200).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(300).body(null);	// dịch vụ dừng, vui lòng thử lại sau
		}		
	}
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class PasswordChange {
	String oldPassword;
	String newPassword;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class EmailChange {
	String newEmail;
	String password;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class EmailConfirm{
	String oldEmail;
	String newEmail;
}
