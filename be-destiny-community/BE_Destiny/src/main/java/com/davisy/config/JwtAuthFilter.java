package com.davisy.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

	// Create an instance of ObjectMapper
	ObjectMapper objectMapper = new ObjectMapper();

	@Override
<<<<<<< HEAD
	protected  void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
=======
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
>>>>>>> status-online
			throws ServletException, IOException {
		System.out.println("req" + request.getUserPrincipal());
		request.getAttributeNames().asIterator().forEachRemaining(attributeName -> {
			Object attributeValue = request.getAttribute(attributeName);
			System.out.println(attributeName + ": " + attributeValue.toString());
		});
		System.out.println("=======================");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			Object principal = authentication.getPrincipal();
			if (principal instanceof DefaultOidcUser) {
				DefaultOidcUser oidcUser = (DefaultOidcUser) principal;
				System.out.println(oidcUser);
				Map<String, Object> attributes = oidcUser.getAttributes();
				
				//System.out.println(Arrays.toString(attributes));
//				return Collections.singletonMap("user", attributes);
			}
		}
		// Kiểm tra xem yêu cầu có chứa thông tin OAuth2 không
		OAuth2AuthenticationToken oauth2Token = OAuth2AuthenticationToken.class.cast(request.getUserPrincipal());
		if (oauth2Token != null) {
			// Xử lý thông tin từ OAuth2
			// Ví dụ: Lấy thông tin người dùng từ OAuth2
			String userName = oauth2Token.getName();

			System.out.println(oauth2Token);
			// Thực hiện xử lý khác tùy theo thông tin từ OAuth2
//	        response.sendRedirect("/user-home");
			request.setAttribute("oauth2Token", oauth2Token);
			// return;
			// Tiếp tục chuỗi filter
		}

		final String header = request.getHeader("Authorization");

		System.out.println("=============START FILTER=========");

		if (header != null && header.startsWith("Bearer ")) { // && header.startsWith("Bearer ")
			String authToken = header.substring(7);
			// String authToken = header;
			System.out.println("authToken: " + authToken);

			try {
				Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
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