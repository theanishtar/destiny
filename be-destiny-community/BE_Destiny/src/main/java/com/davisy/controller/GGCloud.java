package com.davisy.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.davisy.constant.SessionAttribute;

import com.davisy.encrypt.AES;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.service.RolesService;
import com.davisy.service.UserService;
import com.davisy.service.impl.RolesServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class GGCloud {
	@Autowired
	private UserService userService;

	@Autowired
	HttpServletRequest httpServletRequest;

	@GetMapping("tohome")
	public String redec(Model m) {
		return "index";
	}

	@Autowired
	AES aes;

	@Autowired
	RolesService rolesService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	RolesServiceImpl rolesServiceImpl;

	@PostMapping("oauth/loginGG")
	public String login(Model m) {
		System.out.println("Hello");
		try {
			System.out.println("s: " + httpServletRequest.getParameter("credential"));
			String token = httpServletRequest.getParameter("credential");
			String[] chunks = token.split("\\.");

			Base64.Decoder decoder = Base64.getUrlDecoder();

			String header = new String(decoder.decode(chunks[0]));
			String payload = new String(decoder.decode(chunks[1]));

			// UserGoogleCloud ugc = new Gson().fromJson(payload, UserGoogleCloud.class);

			ObjectMapper mapper = new ObjectMapper();
			// UserGoogleCloud userGoogleCloud = mapper.readValue(payload,
			// UserGoogleCloud.class);
			JsonNode usgc = mapper.readTree(payload);

			// System.out.println(">> Name : " + usgc.get("email").asText());
			/*
			 * usgc.iterator().forEachRemaining(u -> {
			 * System.out.println(">> Name : "+u.get(0).asText()); });
			 */

			User checkUser = userService.findByEmail(usgc.get("email").asText());
			if (checkUser != null) {
				String emailEnc = aes.EncryptAESfinal(checkUser.getEmail());
				System.err.println(emailEnc);
				m.addAttribute("dataEnc", emailEnc);
			} else {
				User user = new User();
				String uname = usgc.get("email").asText();
				user.setUsername(uname); // uname.substring(0, uname.indexOf("@"))
				user.setFullname(usgc.get("name").asText());
				user.setGender(null);
				user.setPassword(passwordEncoder.encode(usgc.get("sub").asText()));
				user.setEmail(usgc.get("email").asText());
				user.setAvatar(usgc.get("picture").asText());
				user.setUser_status(true);
				user.setBan(false);

				String pattern = "yyyy-MM-dd";
				DateFormat dateFormat = new SimpleDateFormat(pattern);
				Date birthdayDate = dateFormat.parse("2000-1-1");
				user.setBirthday(birthdayDate);

				user.setComments(null);
				user.setDay_create(new Date());
				user.setDistricts(null);
				user.setInteresteds(null);
				user.setIntro(null);
				user.setMark(0);
				user.setGg_id(usgc.get("sub").asText());
				user.setThumb(null);
				user.setWards(null);
				if (checkUser == null) {
					Roles roles = rolesServiceImpl.findById(4);
					roles.setName(roles.getName());
					roles.setRole_des(roles.getRole_des());
					user.getRoles().add(roles);
					userService.create(user);
				}

				String emailEnc = aes.EncryptAESfinal(user.getEmail());

				System.err.println(emailEnc);
				m.addAttribute("dataEnc", emailEnc);
			}

			return "oauth/login";

		} catch (Exception e) {
			System.out.println("error: " + e);
			return "oauth/login";
		}
	}
}