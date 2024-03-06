package com.davisy.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuthenticationResponse {
	String name;
	Collection<SimpleGrantedAuthority> roles = new ArrayList<>();
	String token;
	String refreshToken;
}