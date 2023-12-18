package com.davisy.service;

import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.davisy.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Configuration
public class JwtService {
	@Value("${jwt.secret}")
    private String secret;
	

    public static final long    JWT_TOKEN_VALIDITY  = 5 * 60 * 60 * 1000; // 5 Hours
    //public static final long    JWT_TOKEN_VALIDITY  = 5 * 60 * 1000; // 5 Minutes
	
	public String generateToken(User user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
		
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis()+ JWT_TOKEN_VALIDITY))
				.withClaim("roles", authorities.stream().map(GrantedAuthority:: getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
	}
	
	public String generateRefreshToken(User user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
		
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY))
				.sign(algorithm);
	}
	

    public String getUsernameFromToken(String token)
    {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token)
    {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token)
    {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token)
    {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    public Boolean validateToken(String token, String usernameFromToken)
    {
        final String username = getUsernameFromToken(token);
        return (username.equals(usernameFromToken) && !isTokenExpired(token));
    }
	
//	public String generateToken(Users user) {
//		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
//		
//		return JWT.create()
//				.withSubject(user.getEmail())
//				.withExpiresAt(new Date(System.currentTimeMillis()+50*60*1000))
//				.withClaim("roles", user.getUser_role())
//				.sign(algorithm);
//	}
//	
//	public String generateRefreshToken(Users user) {
//		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
//		
//		return JWT.create()
//				.withSubject(user.getEmail())
//				.withExpiresAt(new Date(System.currentTimeMillis()+70*60*1000))
//				.sign(algorithm);
//	}
}
