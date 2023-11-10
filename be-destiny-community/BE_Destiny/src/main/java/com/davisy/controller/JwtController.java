package com.davisy.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.auth.AuthenticationResponse;
import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.reponsitory.RoleCustomRepo;
import com.davisy.service.JwtService;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class JwtController {
	
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	UserServiceImpl impl;
	
	@Autowired
	RoleCustomRepo roleCustomRepo;
	
	@Autowired
	JwtService jwtService;
	
	@GetMapping("/v1/jwt/get")
	public ResponseEntity<AuthenticationResponse> jwt(HttpServletRequest request){
		User user = impl.findByEmail(jwtTokenUtil.getEmailFromHeader(request));
		
		List<Roles> role = roleCustomRepo.getRole(user);

		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

		Set<Roles> set = new HashSet<>();
		role.stream().forEach(c -> set.add(new Roles(c.getName())));
		user.setRoles(set);

		set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
		
		AuthenticationResponse authRes = AuthenticationResponse.builder()
		.avatar(user.getAvatar())
		.id(user.getUser_id())
		.name(user.getFullname())
		.roles(authorities)
		.token(jwtService.generateToken(user, authorities))
		.refreshToken(jwtService.generateRefreshToken(user, authorities)).build();
		
		System.out.println("đã cập nhật token");
		return ResponseEntity.status(200).body(authRes);
	}
}

