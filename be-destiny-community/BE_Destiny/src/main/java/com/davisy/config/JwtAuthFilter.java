package com.davisy.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.davisy.constant.SessionAttribute;

import lombok.RequiredArgsConstructor;;

@Configuration
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	/*
	 * @Override protected void doFilterInternal(HttpServletRequest request,
	 * HttpServletResponse response, FilterChain filterChain) throws
	 * ServletException, IOException { // TODO Auto-generated method stub
	 * 
	 * }
	 */

	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	JwtTokenUtil jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		final String header = request.getHeader("Authorization");

		System.out.println("=============START FILTER=========");

		if (header != null && header.startsWith("Bearer ")) { // && header.startsWith("Bearer ")
			String authToken = header.substring(7);
			// String authToken = header;
			System.out.println("authToken: " + authToken);

			try {Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
			JWTVerifier jwtVerifier = JWT.require(algorithm).build();

			DecodedJWT decodedJWT = jwtVerifier.verify(authToken);

			String email = decodedJWT.getSubject();
			System.out.println("username: " + email);
//            Users u = dao.findEmailUser(username);

			String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
			if (email != null) {
				Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
				Arrays.stream(roles).forEach(role -> {
					authorities.add(new SimpleGrantedAuthority(role));
				});

				authorities.forEach(authority -> System.out.println(authority.getAuthority()));

				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						email, null, authorities);

				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// Đưa thông tin xác thực vào SecurityContextHolder
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);

				chain.doFilter(request, response);
				return;
			}
		} catch (Exception e) {
			System.out.println("Unable to get JWT Token, possibly expired");
			System.out.println(e);
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			return;
		}
	}

	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(null, null,
			null);

	authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

	// Đưa thông tin xác thực vào SecurityContextHolder
	SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	// response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
	chain.doFilter(request, response);
	return;

}

}