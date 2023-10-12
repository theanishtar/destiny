package com.davisy.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.encrypt.AES;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.service.RegisterService;
import com.davisy.service.UserService;
import com.davisy.service.impl.RolesServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class LoginFacebook {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	UserServiceImpl userService;

	@Autowired
	RolesServiceImpl rolesServiceImpl;

	@Autowired
	AES aes;

	@Autowired
	RegisterService registerService;

	@GetMapping("/user-home")
	public String getUserInfo(@AuthenticationPrincipal OAuth2User principal, Model model, HttpServletRequest request) {

		OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) request.getAttribute("oauth2Token");
		// OAuth2AuthenticationToken oauth2Token =
		// OAuth2AuthenticationToken.class.cast(request.getUserPrincipal());
		if (oauth2Token == null) {
			// Xử lý thông tin từ OAuth2
			// Ví dụ: Lấy thông tin người dùng từ OAuth2
			return "oauth/login";

		}

		System.out.println(oauth2Token.toString());
		String id = oauth2Token.getPrincipal().getAttribute("id");
		if (oauth2Token.getPrincipal().getAttribute("email") != null) {
			User userByFBId = userService.findByFbId(id);
			if() {
				
			}
			User userByMail = userService.findByEmail(oauth2Token.getPrincipal().getAttribute("email"));
			if (userByMail != null) {
				if(userByMail.getFb_id() == null) {
					// update sub
					userByMail.setFb_id(id);
					userService.update(userByMail);
				}
				String subEnc = aes.EncryptAESfinal(userByMail.getFb_id());
				System.err.println(subEnc);
				model.addAttribute("dataEnc", subEnc);
				model.addAttribute("type","FB"); 
			} else {
				User sub = userService.findByFbId(id);
				if (sub == null) {
					User user = new User();
					user.setFb_id(id);
					user.setGg_id(null);
					user.setUsername(registerService.ranDomUsername());
					user.setEmail(oauth2Token.getPrincipal().getAttribute("email"));
					user.setFullname(oauth2Token.getPrincipal().getAttribute("name"));
					user.setPassword(passwordEncoder.encode(id));
					user.setAvatar(
							"https://images.freeimages.com/fic/images/icons/2443/bunch_of_cool_bluish_icons/512/user.png");
					user.setBan(false);
					user.setBirthday(null);
					user.setComments(null);
					user.setDay_create(new Date());
					user.setDistricts(null);
					user.setGender(null);
					user.setInteresteds(null);
					user.setIntro(null);
					user.setMark(0);
					user.setOnline_last_date(null);
					user.setPosts(null);
					user.setProvinces(null);
					Roles roles = rolesServiceImpl.findById(4);
					roles.setName(roles.getName());
					roles.setRole_des(roles.getRole_des());
					user.getRoles().add(roles);
					user.setShares(null);
					user.setThumb(null);
					user.setUser_status(true);
					user.setWards(null);
					userService.create(user);
					String subEnc = aes.EncryptAESfinal(user.getFb_id());

					System.err.println(subEnc);
					model.addAttribute("dataEnc", subEnc);
				}
			}

			return "oauth/login";
		}
		return "oauth/login";
	}
}
