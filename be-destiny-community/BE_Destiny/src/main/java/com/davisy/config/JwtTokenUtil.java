package com.davisy.config;

import java.io.Serializable;
import java.util.Date;
import java.util.function.Function;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtTokenUtil implements Serializable {
	private static final long serialVersionUID = 8544329907338151549L;
	//public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60 * 1000; // 5 Hours
	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 1000; // 5 Minutes
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.header}")
	private String headerAuth;
	
	public String getEmailFromHeader(HttpServletRequest request) {
		try {
			String header = request.getHeader(headerAuth);
			String token = header.substring(7);
			//String token = header;
			System.out.println(token);
			
			Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
	    	JWTVerifier jwtVerifier = JWT.require(algorithm).build();
			
			DecodedJWT decodedJWT = jwtVerifier.verify(token);
			
			String email = decodedJWT.getSubject();
	        System.out.println("email: "+email);
			return email;
		} catch (Exception e) {
			return null;
		}
	}

	public String getUsernameFromToken(String token) {
		System.out.println(secret);
		return getClaimFromToken(token, Claims::getSubject);
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	public Boolean validateToken(String token, String usernameFromToken) {
		final String username = getUsernameFromToken(token);
		return (username.equals(usernameFromToken) && !isTokenExpired(token));
	}

}
