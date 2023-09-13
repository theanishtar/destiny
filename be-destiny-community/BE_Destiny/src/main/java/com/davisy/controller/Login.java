package com.davisy.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.auth.AuthenticationRequest;
import com.davisy.auth.AuthenticationResponse;
import com.davisy.dao.UserDao;
import com.davisy.encrypt.AES;
import com.davisy.entity.User;
import com.davisy.reponsitory.UsersReponsitory;
import com.davisy.service.AuthenticationService;
import com.davisy.service.JwtService;
import com.davisy.reponsitory.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin("*")
public class Login {
	@Autowired
	UsersReponsitory usersReponsitory;

    @Autowired
    private UserDao dao;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private AES aes;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	JwtService jwtService;

	@Autowired
	HttpServletRequest httpServletRequest;

	private final RoleCustomRepo roleCustomRepo = new RoleCustomRepo();

	private String getClientIp(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-Forwarded-For");
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("0:0:0:0:0:0:0:1")) {
				// Lấy địa chỉ IPv4 cho localhost
				try {
					InetAddress inetAddress = InetAddress.getLocalHost();
					ipAddress = inetAddress.getHostAddress();
				} catch (UnknownHostException e) {
					// Xử lý lỗi nếu cần
				}
			}
		}
		return ipAddress;
	}

	@PostMapping("/oauth/login")
	public ResponseEntity<AuthenticationResponse> authLog(@RequestBody AuthenticationRequest authenticationRequest) {
		
		System.out.println(passwordEncoder.matches("dangth","$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72"));
		return ResponseEntity.ok(authenticationService.authenticationResponse(authenticationRequest));
	
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<User>> authLog() {
		return ResponseEntity.ok(dao.findAll());
	
	}
}
