package com.davisy.controller;

import java.util.Base64;
import java.util.Calendar;
import java.util.GregorianCalendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.davisy.encrypt.AES;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.service.RolesService;
import com.davisy.service.UserService;
import com.davisy.service.impl.RolesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class GGCloud {
	
	@Value("${davis.client.uri}")
    private String uri;
	
	@Autowired
	private UserServiceImpl userService;

	@Autowired
	HttpServletRequest httpServletRequest;

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
				m.addAttribute("token", checkUser.getGg_id());
				m.addAttribute("type", "google");
				m.addAttribute("uri", uri);
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

				// Create a GregorianCalendar object for January 1, 2000
				GregorianCalendar calendar = new GregorianCalendar(2000, Calendar.JANUARY, 1);
				user.setBirthday(calendar);

				user.setComments(null);
				user.setDay_create(GregorianCalendar.getInstance());
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

				m.addAttribute("token", user.getGg_id());
				m.addAttribute("type", "google");
				m.addAttribute("uri", uri);
			}

			return "oauth/login";

		} catch (Exception e) {
			System.out.println("error: " + e);
			return "oauth/login";
		}
	}
}