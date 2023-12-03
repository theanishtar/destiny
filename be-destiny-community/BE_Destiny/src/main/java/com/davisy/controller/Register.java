package com.davisy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.entity.User;
import com.davisy.model.RegisterResponse;
import com.davisy.model.RegisterUser;
import com.davisy.service.RegisterService;
import com.davisy.service.impl.UserServiceImpl;

@RestController
@CrossOrigin("*")
public class Register {

	@Autowired
	private RegisterService registerService;
	
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	UserServiceImpl userService;

	// api: v1/oauth/register/authen/codeMail
	@GetMapping("v1/oauth/register/authen/{codeMail}")
	public ResponseEntity<RegisterUser> authenRegister(@PathVariable String codeMail) {
		RegisterUser u = registerService.authenRegisterCode();
		if (u == null) {
			return ResponseEntity.status(202).body(null);
		}
		u.setCode(codeMail);
		simpMessagingTemplate.convertAndSend("/topic/autologin/" + u.getEmail(), u);
		return ResponseEntity.status(200).body(u);
	}

	@PostMapping("v1/oauth/register")
	public ResponseEntity<String> toRegister(@RequestBody RegisterResponse registerResponse) {
		// kiểm tra tính hợp lệ
		User u = userService.findByEmail(registerResponse.getEmail());
		if (u == null) {
			registerService.createAccountTempWithEmail(registerResponse.getEmail(), registerResponse.getName(),
					registerResponse.getPassword());
//			simpMessagingTemplate.convertAndSend("/topic/autologin/" + registerResponse.getEmail(), registerResponse.getEmail());
			return ResponseEntity.status(200).body("Check email of: "+registerResponse.getEmail());
		}
//		else {
//			simpMessagingTemplate.convertAndSend("/topic/status-autologin/" + registerResponse.getEmail());
//		}

		return ResponseEntity.status(202).body(registerResponse.getEmail()+" already exists from DB");
	}
}
