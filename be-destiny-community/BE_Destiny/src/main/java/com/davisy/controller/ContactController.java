package com.davisy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.service.EmailService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
public class ContactController {
	@Autowired
	EmailService mailService;
	
@PostMapping("/v1/user/contact")
public ResponseEntity<Void> sendMailContact(HttpServletRequest request,@RequestBody UserSendMail user) {
	try {
//		System.out.println("user: " + user);
		mailService.sendHtmlEmailContact(user.getFullname(), user.getEmail(), user.getSubject(), user.getDescription());
		return ResponseEntity.ok().build();
	} catch (Exception e) {
		return ResponseEntity.badRequest().build();
	}
	
}
	
	
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class UserSendMail{
	String fullname;
	String email;
	String subject;
	String description;
	
}