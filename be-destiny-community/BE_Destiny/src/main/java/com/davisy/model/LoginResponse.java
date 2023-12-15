package com.davisy.model;

import com.davisy.auth.AuthenticationResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	int statusResponse;
	AuthenticationResponse data;
	String description;
}
