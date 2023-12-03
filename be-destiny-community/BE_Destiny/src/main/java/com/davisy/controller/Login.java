package com.davisy.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.GregorianCalendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.SpamRrequestCheck;
import com.davisy.auth.AuthenticationRequest;
import com.davisy.auth.AuthenticationResponse;
import com.davisy.config.JwtTokenUtil;
import com.davisy.encrypt.AES;
import com.davisy.entity.User;
import com.davisy.model.LoginResponse;
import com.davisy.reponsitory.RoleCustomRepo;
import com.davisy.reponsitory.UsersReponsitory;
import com.davisy.service.AuthenticationService;
import com.davisy.service.JwtService;
import com.davisy.service.UserService;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class Login {
	@Autowired
	UsersReponsitory usersReponsitory;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationService authenticationService;


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

	@SpamRrequestCheck // Áp dụng kiểm tra Redis trước khi xử lý method này
	@PostMapping("/v1/oauth/login")
	public ResponseEntity<AuthenticationResponse> authLog(@RequestBody AuthenticationRequest authenticationRequest) {
		LoginResponse resLog = authenticationService.loginResponseService(authenticationRequest);
		return ResponseEntity.status(resLog.getStatusResponse()).body(resLog.getData());
		/*
		 * Status code: 200: Đăng nhập thành công 404: Không thể tìm thấy tài khoản
		 * trong DB 403: Tài khoản bị khóa, liên hệ admin để được mở 401: Đăng nhập thất
		 * bại hoặc lỗi server
		 */
	}

	@GetMapping("/v1/oauth/login/authcode/{code}/{email}")
	public ResponseEntity<AuthenticationResponse> authLogRegisCode(@PathVariable String code,
			@PathVariable String email) {
		LoginResponse resLog = authenticationService.loginWithEmailAndCodeauthregis(code, email);
		return ResponseEntity.status(resLog.getStatusResponse()).body(resLog.getData());
	} 
	
//	@GetMapping("/v1/oauth/login/authcode/{code}/{email}")
//	public ResponseEntity<AuthenticationResponse> authLogRegisCode(@PathVariable String code,
//			@PathVariable String email) {
//		LoginResponse resLog = authenticationService.loginWithEmailAndCodeauthregis(code, email);
//		
//		return ResponseEntity.status(resLog.getStatusResponse()).body(resLog.getData());
//	} 
	
	// call api by: host:port/v1/oauth/login/oauth2?token=val&type=value
	@GetMapping("/v1/oauth/login/oauh2")
	public ResponseEntity<AuthenticationResponse> auth2(@RequestParam String token, @RequestParam String type){
		LoginResponse res = authenticationService.loginByOuath2(token,type);
		return ResponseEntity.status(res.getStatusResponse()).body(res.getData());
	}

}
