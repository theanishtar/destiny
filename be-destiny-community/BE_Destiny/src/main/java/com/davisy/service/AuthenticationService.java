package com.davisy.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.davisy.auth.AuthenticationRequest;
import com.davisy.auth.AuthenticationResponse;
import com.davisy.auth.OAuthenticationRequest;
import com.davisy.dao.UserDao;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.model.LoginResponse;
import com.davisy.reponsitory.RoleCustomRepo;
import com.davisy.reponsitory.UsersReponsitory;
import com.davisy.service.impl.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class AuthenticationService {

	private final UsersReponsitory usersReponsitory;

	private AuthenticationManager authenticationManager = new AuthenticationManager() {

		@Override
		public Authentication authenticate(Authentication authentication) throws AuthenticationException {
			// TODO Auto-generated method stub
			return null;
		}
	};

	private final RoleCustomRepo roleCustomRepo;
	private final JwtService jwtService;
	@Autowired
	UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	// Bean PasswordEncoder trả về bởi BCryptPasswordEncoder
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}

	public boolean isTokenValid(String username, String password) {
		try {
			System.out.println("Valid Token In4: " + username + " pass: " + password);
			// Create a new UsernamePasswordAuthenticationToken with the provided username
			// and password
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
					password);

			// Perform authentication using AuthenticationManager
			Authentication authenticationResult = authenticationManager.authenticate(authenticationToken);

			// If the authentication was successful, the token is considered valid
			// You can also get the authenticated principal using
			// authenticationResult.getPrincipal()
			return authenticationResult.isAuthenticated();
		} catch (Exception e) {// If authentication failed, the token is considered invalid
			return false;
		}
	}

	public AuthenticationResponse authenticationResponse(AuthenticationRequest authenticationRequest) {
		try {
			User user = userService.findByEmail(authenticationRequest.getEmail());
//			System.out.println(user.getFullname());
			if (user == null) {
				return null;
			}
			System.out.println(user.getFullname());
			if (user.isBan())
				return null;
//			
//			System.out.println(passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword()));
//			
//			System.out.println(user.getFullname());

			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
					authenticationRequest.getEmail(), authenticationRequest.getPassword());

//			System.out.println(user.getFullname());
			List<Roles> role = null;
			if (user != null) {
				role = roleCustomRepo.getRole(user);
				/*
				 * System.out.println("Details list role:");
				 * role.stream().forEach(System.out::println);
				 */
			}
			Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

			Set<Roles> set = new HashSet<>();
//			List<Roles>set = new ArrayList<>();
			role.stream().forEach(c -> set.add(new Roles(c.getName())));
			user.setRoles(set);

			set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
			System.out.println("=====+++++++++++++++========");

			authenticationManager.authenticate(token);
			System.out.println("=============");

			var jwtToken = jwtService.generateToken(user, authorities);
			var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);

			return AuthenticationResponse.builder().token(jwtToken).refreshToken(jwtRefreshToken)
					.name(user.getFullname()).roles(authorities).build();
		} catch (Exception e) {
			System.out.println("error: " + e);
		}
		return null;
	}

	public LoginResponse loginResponseService(AuthenticationRequest authenticationRequest) {
		/*
		 * Status code: 200: Đăng nhập thành công 404: Không thể tìm thấy tài khoản
		 * trong DB 403: Tài khoản bị khóa, liên hệ admin để được mở 401: Đăng nhập thất
		 * bại hoặc lỗi server
		 */
		try {
			User user = userService.findByEmail(authenticationRequest.getEmail());
			if (user == null) {
				return new LoginResponse(404, null, "Dont find your account");
			}
			System.out.println(user.getFullname());
			if (user.isBan())
				return new LoginResponse(403, null, "Your account is blocked");

			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
					authenticationRequest.getEmail(), authenticationRequest.getPassword());

			List<Roles> role = roleCustomRepo.getRole(user);

			Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

			Set<Roles> set = new HashSet<>();
			role.stream().forEach(c -> set.add(new Roles(c.getName())));
			user.setRoles(set);

			set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));

			authenticationManager.authenticate(token);

			var jwtToken = jwtService.generateToken(user, authorities);
			var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);

			AuthenticationResponse authRes = AuthenticationResponse.builder().token(jwtToken)
					.refreshToken(jwtRefreshToken).name(user.getFullname()).roles(authorities).build();
			return new LoginResponse(200, authRes, "Login successfully!");
		} catch (Exception e) {
			System.out.println("error: " + e);
		}
		return new LoginResponse(401, null, null);
	}

	/*
	 * public AuthenticationResponse authenticationResponse(OAuthenticationRequest
	 * oAuthenticationRequest) {
	 * 
	 * try { User user =
	 * usersReponsitory.findByEmail(oAuthenticationRequest.getEmail()).orElseThrow()
	 * ;
	 * 
	 * System.out.println(user.getEmail()+"-------------------");
	 * 
	 * UsernamePasswordAuthenticationToken token = new
	 * UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
	 * 
	 * System.out.println(user.getFullname()); List<Roles> role = null; if (user !=
	 * null) { role = roleCustomRepo.getRole(user); }
	 * Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
	 * 
	 * Set<Roles> set = new HashSet<>(); role.stream().forEach(c -> set.add(new
	 * Roles(c.getName()))); user.setRoles(set);
	 * 
	 * set.stream().forEach(i -> authorities.add(new
	 * SimpleGrantedAuthority(i.getName())));
	 * System.out.println("=====+++++++++++++++========");
	 * 
	 * authenticationManager.authenticate(token);
	 * System.out.println("=============");
	 * 
	 * var jwtToken = jwtService.generateToken(user, authorities); var*
	 * jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
	 * 
	 * return AuthenticationResponse.builder().token(jwtToken).refreshToken(
	 * jwtRefreshToken) .name(user.getFullname()).roles(authorities).build(); }
	 * catch (Exception e) { System.out.println(e); } return null; }
	 */
}