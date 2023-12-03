package com.davisy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.auth.AuthenticationRequest;
import com.davisy.auth.AuthenticationResponse;
import com.davisy.config.JwtTokenUtil;
import com.davisy.constant.Cache;
import com.davisy.dto.UserProfile;
import com.davisy.entity.DataFollows;
import com.davisy.entity.Districts;
import com.davisy.entity.Gender;
import com.davisy.entity.Post;
import com.davisy.entity.PostEntity;
import com.davisy.entity.ProfileEnitity;
import com.davisy.entity.Provinces;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.service.AuthenticationService;
import com.davisy.service.CacheService;
import com.davisy.service.ChatsService;
import com.davisy.service.DistrictService;
import com.davisy.service.EmailService;
import com.davisy.service.FollowService;
import com.davisy.service.GenderService;
import com.davisy.service.InterestedService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostService;
import com.davisy.service.ProvinceService;
import com.davisy.service.UserService;
import com.davisy.service.WardService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
public class ProfileContronller {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserService userService;
	@Autowired
	FollowService followService;
	@Autowired
	PostService postService;
	@Autowired
	InterestedService interestedService;
	@Autowired
	PostImagesService postImagesService;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	ChatsService chatsService;
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
	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	ObjectMapper mapper;

	@Autowired
	EmailService emailService;

	String provinceCode;
	String districtCode;

	String randCodeAuth = "";
	@Value("${davis.client.uri}")
	String client;
	// http://localhost:4200/chang-email-confirm

	public static String random() {
		String code = "";
		for (int i = 0; i < 6; i++) {
			code = code + (int) (Math.floor(Math.random() * 9));
		}
		return code;
	}

	@PostMapping("/v1/user/profile/data/header")
	public ResponseEntity<DataFollows> loadProfile(HttpServletRequest request, @RequestBody int toProfileUser) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user1 = userService.findByEmail(email);
			User user = new User();
			boolean check = false;
			if (user1.getUser_id() == toProfileUser || toProfileUser == 0) {
				user = user1;
			} else {
				user = userService.findById(toProfileUser);
				check = true;
			}
			List<Object[]> list = userService.loadTimeLine(user.getEmail());
			DataFollows data = new DataFollows();
			for (Object[] ob : list) {
				data.setUser_id(Integer.valueOf(ob[0] + ""));
				data.setThumb(ob[1] + "");
				data.setAvatar(ob[2] + "");
				data.setMark(Integer.valueOf(ob[3] + ""));
				data.setFullname(ob[4] + "");
				data.setIntro(ob[5] + "");
				data.setCountPost(Integer.valueOf(ob[6] + ""));
				data.setCountFollower(Integer.valueOf(ob[7] + ""));
				data.setCountImg(Integer.valueOf(ob[8] + ""));
				data.setUsername(ob[9] + "");
				if (check) {
					List<Integer> listData = followService.findAllFollowingUser(user1.getUser_id());
					if (listData.contains(toProfileUser)) {
						data.setCheckFollow(true);
					}
				} else if (user1.getUser_id() == toProfileUser) {
					data.setCheckFollow(true);
				}
			}

			return ResponseEntity.ok().body(data);
		} catch (Exception e) {
			System.out.println("error header: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/profile/load/data")
	public ResponseEntity<UserProfile> adminProfile(HttpServletRequest request) {

		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		UserProfile userP = new UserProfile();

		userP.setUsername(user.getUsername());
		userP.setFullname(user.getFullname());
		userP.setEmail(user.getEmail());
		userP.setIntro(user.getIntro());

		Calendar birthday = user.getBirthday();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String formatted = "";
		if (birthday != null) {
			formatted = format.format(birthday.getTime());
		}
		userP.setBirthday(formatted);

		Calendar daycreate = user.getDay_create();
		String formattedDC = format.format(daycreate.getTime());
		userP.setDay_create(formattedDC);

		Provinces provinces = user.getProvinces();
		Districts districts = user.getDistricts();
		Wards wards = user.getWards();
		if (provinces == null) {
			userP.setProvince_name("");
		} else {
			userP.setProvince_name(provinces.getFull_name());
		}
		if (districts == null) {
			userP.setDistrict_name("");
		} else {
			userP.setDistrict_name(districts.getFull_name());
		}
		if (wards == null) {
			userP.setWard_name("");
		} else {
			userP.setWard_name(wards.getFull_name());
		}

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
			User userUpdate = userService.findByEmail(email);
			userUpdate.setUsername(userRequestUpdate.getUsername());
			if (!userUpdate.getUsername().equals(userRequestUpdate.getUsername())) {
				chatsService.update_name_chats(userUpdate.getUser_id(), userRequestUpdate.getUsername());
			}
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

			userService.update(userUpdate);

			return ResponseEntity.ok().body(userUpdate);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(400).build();
		}
	}

	@PostMapping("/v1/user/profile/data/timeline")
	public ResponseEntity<ProfileEnitity> loadTimeLine(HttpServletRequest request, @RequestBody int toProfileUser) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user1 = userService.findByEmail(email);
			User user = new User();
			boolean check = false;
			if (user1.getUser_id() == toProfileUser || toProfileUser == 0) {
				user = user1;
			} else {
				user = userService.findById(toProfileUser);
				check = true;
			}
			int id = user.getUser_id();
			ProfileEnitity profileEnitity = new ProfileEnitity();
			profileEnitity.setIntro(user.getIntro());
			profileEnitity.setImages(postImagesService.findAllImagesUser(id));
			profileEnitity.setDateJoin(user.getDay_create());

			Provinces provinces = user.getProvinces();
			Districts districts = user.getDistricts();
			Wards wards = user.getWards();
			String provinces_fullname = "";
			String district_fullname = "";
			String ward_fullname = "";

			String provinces_fullname_en = "";
			String district_fullname_en = "";
			String ward_fullname_en = "";

			if (provinces != null) {
				provinces_fullname = provinces.getFull_name();
				provinces_fullname_en = provinces.getFull_name_en();
			}
			if (districts != null) {
				district_fullname = districts.getFull_name();
				district_fullname_en = districts.getFull_name_en();
			}
			if (wards != null) {
				ward_fullname = wards.getFull_name();
				ward_fullname_en = wards.getFull_name_en();
			}

			profileEnitity.setAddress_fullname(district_fullname + " " + provinces_fullname);
			profileEnitity.setAddress_fullname_en(district_fullname_en + " " + provinces_fullname_en);
			profileEnitity.setListPostInterested(postService.getTop5postProfile(id));
			return ResponseEntity.ok().body(profileEnitity);
		} catch (Exception e) {
			System.out.println("error loadPostPro: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

	@PostMapping("/v1/user/profile/post/timeline")
	public ResponseEntity<List<PostEntity>> loadPostTimeLine(HttpServletRequest request,
			@RequestBody Profile entityProfile) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int user_id = user.getUser_id();
			List<Object[]> postProfile = postService.getPostProfile(entityProfile.getToProfile(),user_id, entityProfile.getPage());
			List<Object[]> postProfileShare = postService.getPostProfileShare(entityProfile.getToProfile(),user_id);
			List<PostEntity> postEntityProfile = new ArrayList<>();

			for (Object[] ob : postProfile) {
				if (null != ob[2]) {
					int idPostShare = Integer.valueOf(ob[2].toString());
					PostEntity profileTemp = new PostEntity();
					for (Object[] ps : postProfileShare) {
						if (Integer.valueOf(ps[0].toString()) == idPostShare) {
							profileTemp = postEntityProfile(ps, null, 1);
							postEntityProfile.add(postEntityProfile(ob, profileTemp, 0));
							break;
						}
					}
				} else {
					postEntityProfile.add(postEntityProfile(ob, null, 0));
				}
			}
			return ResponseEntity.ok().body(postEntityProfile);
		} catch (Exception e) {
			System.out.println("post/timeline " + e);
			return ResponseEntity.ok().body(null);
		}
	}

	public PostEntity postEntityProfile(Object[] ob, PostEntity entityProfile, int check) {
		try {
			PostEntity profile = new PostEntity();
			profile.setPost_id(Integer.valueOf(ob[0].toString()));
			profile.setUser_id(Integer.valueOf(ob[1].toString()));
			profile.setContent(ob[3] + "");
			Date date = null;
			if (ob[4] != null && !ob[4].toString().isEmpty()) {
				date = dateFormat.parse(ob[4].toString());
			}
			if (date != null) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(date);
				profile.setDate_post(calendar);
			}

			profile.setHash_tag(ob[5] + "");
			profile.setSend_status(Boolean.valueOf(ob[6] + ""));
			profile.setPost_status(Boolean.valueOf(ob[7] + ""));
			profile.setProduct(ob[8] + "");

			if (!ob[9].toString().isEmpty()) {
				profile.setBan(Boolean.valueOf(ob[9] + ""));
			}

			profile.setCountInterested(Integer.valueOf(ob[10].toString()));
			profile.setCountCommnet(Integer.valueOf(ob[11].toString()));
			profile.setCountShare(Integer.valueOf(ob[12].toString()));

			if (ob[2] == null) {
				profile.setImages(postImagesService.findAllImagesofPost(profile.getPost_id()));
			}

			List<Object[]> userOb = interestedService.findByIdPost(profile.getPost_id());
			if (userOb != null && check == 0) {
				profile.setUser(userOb);
			}

			profile.setFullname(ob[13] + "");
			profile.setAvatar(ob[14] + "");

			profile.setProvince_fullname(ob[15] + "");
			profile.setDistrict_fullname(ob[16] + "");
			profile.setWard_fullname(ob[17] + "");
			profile.setProvince_fullname_en(ob[18] + "");
			profile.setDistrict_fullname_en(ob[19] + "");
			profile.setWard_fullname_en(ob[20] + "");
			if (entityProfile != null) {
				profile.setPostEntityProfile(entityProfile);
			}
			return profile;
		} catch (NumberFormatException e) {
			System.out.println("Error postEntityProfile: " + e);
			return null;
		} catch (Exception e) {
			System.out.println("Error postEntityProfile: " + e);
			return null;
		}
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
		User currentUser = userService.findByEmail(email);

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
		userService.update(currentUser);

		return ResponseEntity.status(200).body("OK");
	}

	@PostMapping("/v1/user/profile/change/email")
	private ResponseEntity<String> changeEmail(HttpServletRequest request, @RequestBody EmailChange change)
			throws MessagingException {
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User currentUser = userService.findByEmail(email);

		if (!passwordEncoder.matches(change.getPassword(), currentUser.getPassword())) {
			return ResponseEntity.status(300).body(null); // "Mật khẩu xác nhận không đúng"
		}

		if (currentUser.getEmail().equalsIgnoreCase(change.getNewEmail())) {
			return ResponseEntity.status(301).body(null); // "Email mới trùng với email cũ"
		}

		// currentUser.setEmail(change.getNewEmail());

		// userServiceImpl.update(currentUser);
		this.randCodeAuth = random();

		EmailConfirm eConfirm = new EmailConfirm(currentUser.getEmail(), change.newEmail, change.getPassword());

		// {key: "change:email", value: "newMail", time 5m}
		cacheService.writeCacheAtTime("changemail:" + this.randCodeAuth, eConfirm, 5, Cache.TimeUnit_MINUTE);

		// Gửi mail
		/*
		 * 
		 * BUTTON click :
		 * http://localhost:4200/chang-email-confirm?code=this.randCodeAuth => call api
		 * GET: /v1/user/profile/change/email?code=this.randCodeAuth
		 * 
		 */
		emailService.sendHtmlEmail(client + "/chang-email-confirm" + "?code=" + this.randCodeAuth, change.newEmail);
		return ResponseEntity.status(200).body(this.randCodeAuth); // "OK"
	}

	// /v1/user/profile/change/email/confirm?code=
	@PostMapping("/v1/user/profile/change/email/confirm")
	private ResponseEntity<AuthenticationResponse> confirmChangeEmail(HttpServletRequest request,
			@RequestParam String code) {
		System.out.println(code + "::::::::");
		String dataCache = cacheService.getByKey("changemail:" + code);

		try {
			EmailConfirm eConfirm = mapper.readValue(dataCache, EmailConfirm.class);
			User user = userService.findByEmail(eConfirm.getOldEmail());

			user.setEmail(eConfirm.getNewEmail());
			userService.update(user);

			AuthenticationResponse authRes = authenticationService.authenticationResponse(
					new AuthenticationRequest(eConfirm.newEmail, eConfirm.getCurrentPassword()));

			// gửi token mới qua socket
			simpMessagingTemplate.convertAndSend("/topic/changetoken/" + user.getUser_id(), authRes);
			cacheService.destroyCache("changemail:" + code);
			return ResponseEntity.status(200).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(300).body(null); // dịch vụ dừng, vui lòng thử lại sau
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
class EmailConfirm {
	String oldEmail;
	String newEmail;
	String currentPassword;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class Profile {
	int toProfile;
	int page;
}
