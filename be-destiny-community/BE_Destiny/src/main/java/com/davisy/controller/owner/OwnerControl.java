package com.davisy.controller.owner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.dto.AdminPostDetail;
import com.davisy.entity.Districts;
import com.davisy.entity.Gender;
import com.davisy.entity.Post;
import com.davisy.entity.Provinces;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.model.LoginResponse;
import com.davisy.service.AuthenticationService;
import com.davisy.service.DistrictService;
import com.davisy.service.EmailService;
import com.davisy.service.GenderService;
import com.davisy.service.ProvinceService;
import com.davisy.service.WardService;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.RolesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_OWNER")
public class OwnerControl {

	@Autowired
	UserServiceImpl userService;

	@Autowired
	PostServiceImpl postService;

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	RolesServiceImpl rolesServiceImpl;

	@Autowired
	ProvinceService provinceService;

	@Autowired
	DistrictService districtService;

	@Autowired
	WardService wardService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	GenderService genderService;

	@Autowired
	EmailService emailService;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	
	@GetMapping("/v1/owner/totalPost")
	public int getTotalPost() {
		List<Post> listPost = postService.findAll();
		
		List<Post> list = new ArrayList<>();

		for (Post post : listPost) {
			if (post.getPostParent() == null && post.isBan() == false && post.isPost_status() == true) {
				list.add((post));
			}
		}
		;
		return list.size();
	}
	
	@GetMapping("/v1/owner/totalUser")
	public int getTotalUser() {
		List<User> list = userService.findAll();
		return list.size();
	}
	
	@GetMapping("/v1/owner/getTotalPostEveryMonth")
	public ResponseEntity<int[]> getTotalPostEveryMonth() {
		try {
			List<Object[]> list = postService.getTotalPostEveryMonth();
			int[] listMonth = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
			int[] listTotalPost = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

			for (Object[] oj : list) {
				String month = String.valueOf(oj[0]);
				for (int i = 0; i < listMonth.length; i++) {
					if (month.equals(String.valueOf(i + 1))) {
						listTotalPost[i] = Integer.valueOf(String.valueOf(oj[1]));
					}
				}
			}
			return ResponseEntity.status(200).body(listTotalPost);
		} catch (Exception e) {
			System.out.println("Error at owner/getTotalPostEveryMonth: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}
	
	@GetMapping("/v1/owner/getTotalUserEveryMonth")
	public ResponseEntity<int[]> getTotalUserEveryMonth(){
		try {
			List<Object[]> list = userService.getTotalUserEveryMonth();
			int[] listMonth = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
			int[] listTotalUser = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
			
			for(Object[] oj: list) {
				String month = String.valueOf(oj[0]);
				for(int i = 0; i < listMonth.length; i++) {
					if(month.equals(String.valueOf(i+1))) {
						listTotalUser[i] = Integer.valueOf(String.valueOf(oj[1]));
					}
				}
			}
			return ResponseEntity.status(200).body(listTotalUser);
		} catch (Exception e) {
			System.out.println("Error at owner/getTotalUserEveryMonth: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	@GetMapping("/v1/owner/get/admin")
	public ResponseEntity<List<User>> getAllAdmin() {
		try {
			List<Object[]> adminOj = userService.getAllByRole("ROLE_ADMIN");
			List<User> admins = new ArrayList<>();
			for (Object[] oj : adminOj) {
				User u = userService.findById(Integer.valueOf(String.valueOf(oj[0])));
				admins.add(u);
			}

			return ResponseEntity.status(200).body(admins);
		} catch (Exception e) {
			System.out.println(e + "owner/admin");
			return ResponseEntity.status(500).body(null);
		}
	}

	@GetMapping("/v1/owner/get/moderator")
	public ResponseEntity<List<User>> getAllModerator() {
		try {
			List<Object[]> moderatorsOj = userService.getAllByRole("ROLE_MODERATOR");
			List<User> moderators = new ArrayList<>();
			for (Object[] oj : moderatorsOj) {
				User u = userService.findById(Integer.valueOf(String.valueOf(oj[0])));
				moderators.add(u);
			}

			return ResponseEntity.status(200).body(moderators);
		} catch (Exception e) {
			System.out.println(e + "owner/moder");
			return ResponseEntity.status(500).body(null);
		}
	}

	@GetMapping("/v1/owner/get/infor")
	public ResponseEntity<Infor> getInfor(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			Infor u = new Infor();
			u.setAvatar(user.getAvatar());
			u.setBirthday(user.getBirthday());
			u.setEmail(user.getEmail());
			u.setFullname(user.getFullname());
			u.setUsername(user.getUsername());
			u.setBirthdayYear(user.getBirthDayStringYear());
			return ResponseEntity.status(200).body(u);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

	@PutMapping("/v1/owner/updateProfile")
	public ResponseEntity<LoginResponse> updateProfile(HttpServletRequest request, @RequestBody Owner u) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);

			User uExp = userService.findByEmailOrUsername(u.getUsername());
			if (uExp != null) {
				ResponseEntity.status(203).body(null);
			}

			user.setUsername(u.getUsername());
			user.setFullname(u.getFullname());
			user.setAvatar(u.getAvatar());
			user.setBirthday(u.getBirthday());
			user.setEmail(u.getEmail());

			userService.update(user);

			LoginResponse res = authenticationService.loginWithEmail(u.getEmail());
			return ResponseEntity.status(200).body(res);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

//	@PatchMapping("/v1/owner/updateAdmin")
//	public ResponseEntity<String> updateAdmin(@RequestBody Admin u){
//		try {
//			User user = userService.findById(u.getId());
//			
//			User uExp = userService.findByEmailOrUsername(u.getUsername());
//			if(uExp != null) {
//				ResponseEntity.status(203).body(null);
//			}
//			
//			user.setFullname(u.getFullname());
//			user.setAvatar(u.getAvatar());
//			user.setEmail(u.getEmail());
//			Roles roles = rolesServiceImpl.findById(u.getRoles());
//			roles.setName(roles.getName());
//			roles.setRole_des(roles.getRole_des());
//			user.getRoles().add(roles);
//			user.setPassword(passwordEncoder.encode(u.getPassword()));
//			
//			userService.update(user);
//			return ResponseEntity.status(200).body("Successfully");
//		} catch (Exception e) {
//			return ResponseEntity.status(500).body(null);
//		}
//	}

//	@PatchMapping("/v1/owner/updateStatusAdmin/{id}")
//	public ResponseEntity<User> updateStatusAdmin(@PathVariable Integer id){
//		try {
//			User user = userService.findById(id);
//			if(user.isBan() == true) {
//				user.setBan(false);
//			}else {
//				user.setBan(true);
//			}
//			
//			
//			userService.update(user);
//			return ResponseEntity.status(200).body(user);
//		} catch (Exception e) {
//			return ResponseEntity.status(500).body(null);
//		}
//	}
	@PatchMapping("/v1/owner/updateStatusAdmin/{id}")
	public void adminGetActionUser(@PathVariable int id) {
		try {
			User user = userService.findById(id);
			userService.disable(user);
			if (user.isBan() == true) {
				emailService.sendHtmlEmailToUserIsBan(user.getEmail());
				simpMessagingTemplate.convertAndSend("/topic/notify/user/ban/" + user.getUser_id(), "ban");
			} else {
				emailService.sendHtmlEmailToUserIsUnBan(user.getEmail());
			}

		} catch (Exception e) {
			System.out.println("Error at admin/actionOnModer: " + e);
		}
	}

	@PatchMapping("/v1/owner/updateRole/{id}/{role}")
	public ResponseEntity<String> updateStatusAdmin(@PathVariable Integer id, @PathVariable int role) {
		try {
			User user = userService.findById(id);

			Set<Roles> roleList = new HashSet<>();
			Roles roles = rolesServiceImpl.findById(role);
			roles.setName(roles.getName());
			roles.setRole_des(roles.getRole_des());
			roleList.add(roles);
			user.setRoles(roleList);

			userService.update(user);
			return ResponseEntity.status(200).body("Successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

	@PostMapping("/v1/owner/create/{role}") // 2:admin; 3: moderator; 4:user
	public ResponseEntity<User> createAdmin(@RequestBody Admin u, @PathVariable int role) {
		try {
			User user = new User();

			boolean existUsername = false;
			List<User> userAll = userService.findAll();
			for (User ux : userAll) {
				if (u.getUsername().equals(ux.getUsername())) {
//					if (!u.getUsername().equals(ux.getUsername())) {
						existUsername = true;// trùng tên dn
//					}
				}
			}

			if (existUsername == false) {
				user.setUsername(u.getUsername());

				user.setFullname(u.getFullname());
				user.setAvatar(
						"https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=5a456a28-a596-459d-8e72-868d9d76df79");
				user.setEmail(u.getEmail());

				Roles roles = rolesServiceImpl.findById(3);
				roles.setName(roles.getName());
				roles.setRole_des(roles.getRole_des());
				user.getRoles().add(roles);

				Gender gender = genderService.findGenderByID(3);
				user.setGender(gender);
				user.setPassword(passwordEncoder.encode(u.getPassword()));
				user.setThumb(
						"https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA");
				user.setUser_status(true);
				user.setBan(false);

				// Create a GregorianCalendar object for January 1, 2000
				GregorianCalendar calendar = new GregorianCalendar(2000, Calendar.JANUARY, 1);
				user.setBirthday(calendar);

				user.setComments(null);
				user.setDay_create(GregorianCalendar.getInstance());

				Provinces pro = provinceService.findProvinceByID("92");
				user.setProvinces(pro);

				List<Districts> dis = districtService.findByIdProvince("92");
				Districts d = dis.get(0);
				user.setDistricts(d);

				List<Wards> ward = wardService.findByIdDistrict(d.getCode());

				Wards w = ward.get(0);

				user.setWards(w);

				user.setInteresteds(null);
				user.setIntro("");
				user.setMark(0);
				user.setGg_id("");
				user.setThumb(null);

				userService.create(user);

				return ResponseEntity.status(200).body(user);
			} else {

				return ResponseEntity.status(301).body(null);
			}
		} catch (Exception e) {
			System.err.println("error createAdmin: " + e);
			return ResponseEntity.status(500).body(null);
		}
	}

}

@Data
@NoArgsConstructor
@AllArgsConstructor
class Owner {
	String username;
	String fullname;
	Calendar birthday;
	String email;
	String avatar;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class Admin {
	Integer id;
	String fullname;
	String username;
	String email;
	String password;
//	String avatar;
	int roles; // 2. Admin; 3. Moderator; 4. User
}

@Data
class Infor {
	String fullname;
	String username;
	Calendar birthday;
	String email;
	String avatar;
	String birthdayYear;
}
