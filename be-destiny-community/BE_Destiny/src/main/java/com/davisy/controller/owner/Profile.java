package com.davisy.controller.owner;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.davisy.entity.Gender;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.model.LoginResponse;
import com.davisy.service.AuthenticationService;
import com.davisy.service.GenderService;
import com.davisy.service.impl.PostServiceImpl;
import com.davisy.service.impl.RolesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
public class Profile {

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
	private PasswordEncoder passwordEncoder;
	@Autowired
	GenderService genderService;
	@GetMapping("/v1/owner/get/admin")
	public ResponseEntity<List<User>> getAllAdmin(){
		try {
			List admins = userService.getAllByRole("ROLE_ADMIN");
			return ResponseEntity.status(200).body(admins);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/v1/owner/get/moderator")
	public ResponseEntity<List<User>> getAllModerator(){
		try {
			List admins = userService.getAllByRole("ROLE_MODERATOR");
			return ResponseEntity.status(200).body(admins);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@PutMapping("/v1/owner/updateProfile")
	public ResponseEntity<LoginResponse> updateProfile(HttpServletRequest request, @RequestBody Owner u){
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
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
	
	@PatchMapping("/v1/owner/updateAdmin")
	public ResponseEntity<String> updateAdmin(@RequestBody Admin u){
		try {
			User user = userService.findById(u.getId());
			user.setFullname(u.getFullname());
			user.setAvatar(u.getAvatar());
			user.setEmail(u.getEmail());
			Roles roles = rolesServiceImpl.findById(u.getRoles());
			roles.setName(roles.getName());
			roles.setRole_des(roles.getRole_des());
			user.getRoles().add(roles);
			user.setPassword(passwordEncoder.encode(u.getPassword()));
			
			userService.update(user);
			return ResponseEntity.status(200).body("Successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@PatchMapping("/v1/owner/updateStatusAdmin/{id}/{status}")
	public ResponseEntity<String> updateStatusAdmin(@PathVariable Integer id, @PathVariable boolean status){
		try {
			User user = userService.findById(id);
			user.setBan(status);
			
			userService.update(user);
			return ResponseEntity.status(200).body("Successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@PatchMapping("/v1/owner/updateRole/{id}/{role}")
	public ResponseEntity<String> updateStatusAdmin(@PathVariable Integer id, @PathVariable int role){
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
	
	@PostMapping("/v1/owner/create/{role}")	// 2:admin; 3: moderator; 4:user
	public ResponseEntity<String> createAdmin(@RequestBody Admin u, @PathVariable int role){
		try {
			User user = userService.findById(u.getId());
			user.setFullname(u.getFullname());
			user.setAvatar(u.getAvatar());
			user.setEmail(u.getEmail());
			
			Roles roles = rolesServiceImpl.findById(role);
			roles.setName(roles.getName());
			roles.setRole_des(roles.getRole_des());
			user.getRoles().add(roles);
			
			Gender gender = genderService.findGenderByID(3);
			user.setGender(gender);
			user.setPassword(passwordEncoder.encode(u.getPassword()));
			user.setThumb("https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA");
			user.setUser_status(true);
			user.setBan(false);

			// Create a GregorianCalendar object for January 1, 2000
			GregorianCalendar calendar = new GregorianCalendar(2000, Calendar.JANUARY, 1);
			user.setBirthday(calendar);

			user.setComments(null);
			user.setDay_create(GregorianCalendar.getInstance());
			user.setDistricts(null);
			user.setInteresteds(null);
			user.setIntro(null);
			user.setMark(0);
			user.setGg_id("");
			user.setThumb(null);
			user.setWards(null);
			
			userService.update(user);
			return ResponseEntity.status(200).body("Successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class Owner {
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
	String avatar;
	int roles; // 2. Admin; 3. Moderator; 4. User
}

