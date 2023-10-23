package com.davisy.controller;

import java.util.ArrayList;
import java.util.Collection;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.davisy.auth.AuthenticationResponse;
import com.davisy.auth.OAuthenticationRequest;
import com.davisy.entity.User;
import com.davisy.dao.UserDAO;
import com.davisy.encrypt.AES;
import com.davisy.reponsitory.UsersReponsitory;
import com.davisy.service.AuthenticationService;
import com.davisy.service.JwtService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class LoginGoogle {
	/*
	 * @Autowired UsersReponsitory usersReponsitory;
	 * 
	 * @Autowired UserDao dao;
	 * 
	 * @Autowired AuthenticationService authenticationService;
	 * 
	 * @Autowired AES aes;
	 * 
	 * @Autowired private PasswordEncoder passwordEncoder;
	 * 
	 * @Autowired JwtService jwtService;
	 * 
	 * @Autowired HttpServletRequest httpServletRequest;
	 * 
	 * 
	 * @PostMapping("/oauth/login/authenticated") public
	 * ResponseEntity<AuthenticationResponse> authorization(@RequestBody String
	 * data) { String encryptData; System.out.println(data); try { ObjectMapper
	 * mapper = new ObjectMapper(); JsonNode usgc = mapper.readTree(data);
	 * encryptData = aes.DecryptAESfinal(usgc.get("data").asText());
	 * 
	 * String email = encryptData; // String password =
	 * encryptData.substring(encryptData.indexOf(":")+1);
	 * 
	 * System.out.println("EMAIL: " + email); //
	 * System.out.println("PASS: "+password);
	 * 
	 * // check user User userCheck = dao.findByEmail(email); if (userCheck != null)
	 * { String[] role = userCheck.getAuth(); Collection<SimpleGrantedAuthority>
	 * authorities = new ArrayList<>();
	 * 
	 * for (String s : role) { authorities.add(new SimpleGrantedAuthority("ROLE_" +
	 * s)); }
	 * 
	 * // Set<Roles> set = new HashSet<>(); // role.stream().forEach(c ->
	 * set.add(new Roles(c.getName()))); // userCheck.setRoles(set); //
	 * set.stream().forEach(i -> authorities.add(new //
	 * SimpleGrantedAuthority(i.getName())));
	 * 
	 * OAuthenticationRequest authReq = new OAuthenticationRequest(email); String
	 * token = jwtService.generateToken(userCheck, authorities); return
	 * ResponseEntity .ok(new AuthenticationResponse(userCheck.getFullname(),
	 * authorities, token, null)); } } catch (Exception e) { e.printStackTrace();
	 * return ResponseEntity.status(301).body(null); } return
	 * ResponseEntity.status(301).body(null); }
	 */
}
