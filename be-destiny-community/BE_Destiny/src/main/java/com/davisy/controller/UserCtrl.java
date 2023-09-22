package com.davisy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.reponsitory.RolesReponsitory;
import com.davisy.service.UserService;

@RestController
@CrossOrigin("*")
public class UserCtrl {
	

	@Autowired
	private UserService userService;
	
	@Autowired
	RolesReponsitory reponsitory;
	
	@GetMapping("/v1/oauth/user/{email}")
	public ResponseEntity<User> getU(@PathVariable String email){
		return ResponseEntity.status(200).body(userService.findByEmail(email));
	}
	
	@GetMapping("/v1/oauth/user/role/{role}")
	public ResponseEntity<Roles> getUs(@PathVariable String role){
		return ResponseEntity.status(200).body(reponsitory.findByName(role));
	}
}
