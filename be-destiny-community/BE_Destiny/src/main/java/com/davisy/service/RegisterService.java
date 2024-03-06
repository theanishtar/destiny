package com.davisy.service;

import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.davisy.dao.RolesDAO;
import com.davisy.entity.Gender;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.model.RegisterUser;
import com.davisy.service.impl.MailerServiceImpl;
import com.davisy.service.impl.RolesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.mail.MessagingException;

@Service
public class RegisterService {

	@Autowired
	RolesDAO rolesDao;
	@Autowired
	RolesServiceImpl rolesServiceImpl;

	@Autowired
	MailerServiceImpl mailer;

	@Autowired
	private RedisService redisService;

	@Autowired
	UserServiceImpl service;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	EmailService emailService;
	
	@Autowired
	GenderService genderService;
	
	@Value("${davis.client.uri}")
	private String client;
	//http://localhost:4200/regisauth?authcode=

	public void registerResponseService() {

	}

	String randCodeAuth = "";

	public static String random() {
		String code = "";
		for (int i = 0; i < 6; i++) {
			code = code + (int) (Math.floor(Math.random() * 9));
		}
		return code;
	}

	public static String ranDomUsername() {
		// Get the current time as an Instant
		Instant currentTime = Instant.now();

		// Convert the Instant to a byte array
		byte[] timeBytes = currentTime.toString().getBytes();

		// Encode the byte array as Base64
		String base64Time = Base64.getEncoder().encodeToString(timeBytes);

		return base64Time;
	}

	public void createAccountTempWithEmail(String email, String name, String password) {
		this.randCodeAuth = random();
		// Write account to Redis
		Roles role = rolesServiceImpl.findById(4);
		System.out.println(role.getName());
		Set<Roles> roles = new HashSet<>();
		roles.add(role);

		RegisterUser registerUser = new RegisterUser();
		registerUser.setEmail(email);
		registerUser.setPassword(passwordEncoder.encode(password));
		registerUser.setFullname(name);
		// Write to Redis
		redisService.addCodeRegister(registerUser, randCodeAuth);
		System.out.println(randCodeAuth);

		// Send Mail
		try {
			emailService.sendHtmlEmail(client+"/regisauth?authcode="+this.randCodeAuth, email);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// api: v1/oauth/register/authen/codeMail

		// response
	}

	public RegisterUser authenRegisterCode() {
		RegisterUser u = redisService.authenRegister(randCodeAuth);
		if (u == null)
			return null;
		if (service.findByEmail(u.getEmail()) != null)
			return null;
		User us = new User();
		Gender gender = genderService.findGenderByID(3);
		us.setUsername(u.getUsername());
		us.setPassword(u.getPassword());
		us.setFullname(u.getFullname());
		us.setEmail(u.getEmail());
		us.setIntro("Xin chào!");
		us.setBirthday(null);
		us.setGender(gender);
		us.setProvinces(null);
		us.setDistricts(null);
		us.setWards(null);
		us.setAvatar("https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.");
		us.setThumb("https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA");
		us.setOnline_last_date(null);
		us.setMark(u.getMark());
		us.setUser_status(true);
		us.setBan(false);
		Roles roles = rolesServiceImpl.findById(4);
		roles.setName(roles.getName());
		roles.setRole_des(roles.getRole_des());
		us.getRoles().add(roles);
		// add to DB
		service.create(us);

		// add roles
		return u;
	}

	public void createAccountTempWithPhone(String phone, String name, String password) {
		// Write account to Firebase

		// Send OTP

		// response
	}
}
