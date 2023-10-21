package com.davisy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.User;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class UserController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserServiceImpl userServiceImpl;

	@GetMapping("/v1/user/getTop5User")
	public ResponseEntity<List<Object[]>> getTop5User() {
		List<Object[]> list = userServiceImpl.getTOP5User();
		return ResponseEntity.ok(list);
	}

}
