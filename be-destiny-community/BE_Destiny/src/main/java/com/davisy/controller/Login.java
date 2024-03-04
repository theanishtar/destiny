package com.davisy.controller;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.Base64;

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
import com.davisy.service.CacheService;
import com.davisy.service.JwtService;
import com.davisy.service.QrCodeGeneratorService;
import com.davisy.service.UserService;
import org.springframework.http.MediaType;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class Login {
	@Autowired
	UsersReponsitory usersReponsitory;

	@Autowired
	private UserService userService;
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	CacheService cacheService;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	JwtService jwtService;

	@Autowired
	HttpServletRequest httpServletRequest;

	@Autowired
	QrCodeGeneratorService generatorService;

	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	static final int secretKey = 12981;

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
	public ResponseEntity<AuthenticationResponse> auth2(@RequestParam String token, @RequestParam String type) {
		LoginResponse res = authenticationService.loginByOuath2(token, type);
		return ResponseEntity.status(res.getStatusResponse()).body(res.getData());
	}

//	@GetMapping("/v1/oauth/login/toapp")
//	public ResponseEntity<String> loginWithQRToApp(HttpServletRequest request) {
//		String email = jwtTokenUtil.getEmailFromHeader(request);
//		User user = userService.findByEmail(email);
//		if (user == null)
//			return ResponseEntity.status(400).body(null);
//		String token = genToken(user.getUser_id()); // id.code_confirm
//		return ResponseEntity.status(200).body(token);
//	}

	@GetMapping("/v1/login/qr/app")
	public ResponseEntity<Object[]> loginWithQRToApp(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			if (user == null)
				return ResponseEntity.status(400).body(null);
			String token = genToken(user.getUser_id()); // id.code_confirm
			byte[] qr = generatorService.generateQrCodeImage(token, 200, 200);

			return ResponseEntity.status(200).body(new Object[] { qr, 0 });
		} catch (Exception e) {
			return null;
		}
	}

	@PostMapping("/v1/oauth/login/byapp")
	public ResponseEntity<LoginResponse> loginWithQRByApp(@RequestBody String token) {
		int idUser = readToken(token);
		if (idUser == -1) {
			return ResponseEntity.status(402).body(null);
		}
		LoginResponse loginResponse = authenticationService.loginWithTokenApp(idUser);
		return ResponseEntity.status(200).body(loginResponse);
	}

	@GetMapping("/v1/login/qr/web")
	public ResponseEntity<Object[]> loginWithQRToWeb() {
		try {
			String token = genToken(); // id.code_confirm
			System.err.println("token: " + token);
			byte[] qr = generatorService.generateQrCodeImage(token, 200, 200);
			return ResponseEntity.status(200).body(new Object[] { qr,token});
		} catch (Exception e) {
			return null;
		}
	}

	@PostMapping("/v1/oauth/login/byweb")
	public ResponseEntity<Void> loginWithQRByWeb(@RequestBody String token,HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int check = readToken(token);
			int idUser =user.getUser_id();
			if (check == -1) {
				simpMessagingTemplate.convertAndSend("/topic/login/qr-code/" + token, false);
//				return;
				return ResponseEntity.status(402).build();
			}
			LoginResponse loginResponse = authenticationService.loginWithTokenApp(idUser);
			simpMessagingTemplate.convertAndSend("/topic/login/qr-code/" + token, loginResponse);
			return ResponseEntity.status(200).build();
		} catch (Exception e) {
		System.err.println("error create qr code: "+e);
		return ResponseEntity.badRequest().build();
		}
		
	}

	private static int readToken(String token) {
		Instant currentTime = Instant.now();
		// token = Base64[ AES(id|time) ]
		int id = 0;
		try {
			String deB64 = base64Decode(token);
			String get = AES.decrypt(deB64, secretKey);
			String time =get;
			if (get.contains("|")) {
				id = Integer.valueOf(get.substring(0, get.lastIndexOf("|")));
				 time = get.substring(get.lastIndexOf("|") + 1);
			}
			Instant timeFromToken = Instant.parse(time);

			long minutesDifference = java.time.Duration.between(timeFromToken, currentTime).toMinutes();

			if (minutesDifference > 5)
				return -1;
			return id;
		} catch (Exception e) {
			return -1;
		}
	}

	private static String genToken(int idUser) {
		Instant currentTime = Instant.now();
		// token = Base64[ AES(id|time) ]
		String id = idUser + "";
		String time = currentTime.toString();
		String token = id + "|" + time;
		String enc = AES.encrypt(token, secretKey);

//        System.out.println(base64Encode(enc));
//        System.err.println(base64Decode(base64Encode(enc)));
//        System.out.println(AES.decrypt(base64Decode(base64Encode(enc)),12212));

		return base64Encode(enc);
	}

	private static String genToken() {
		Instant currentTime = Instant.now();
		String time = currentTime.toString();
		String token = time;
		String enc = AES.encrypt(token, secretKey);
		return base64Encode(enc);
	}

	private static String base64Encode(String input) {
		// Encode the string to Base64
		byte[] encodedBytes = Base64.getEncoder().encode(input.getBytes());
		return new String(encodedBytes);
	}

	private static String base64Decode(String input) {
		// Decode the Base64-encoded string
		byte[] decodedBytes = Base64.getDecoder().decode(input);
		return new String(decodedBytes);
	}

	public static void main(String[] args) {
		String gen = genToken(secretKey);

		try {
			Thread.sleep(6000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("GEN: " + gen);
		System.out.println("ID DE: " + readToken(
				"KzhHbTlQendTaUtXdmRxSTFjaEdZemY2eXBqT0tzNWh6dDdMa2ZjTStBVFZHUVVvSXppd2dMR1RKNGFDR2xkNQ=="));
	}
}