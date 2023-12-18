package com.davisy.model;

import java.time.Instant;
import java.util.Base64;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUser {
	String username = ranDomUsername() ;
    String password;
    String fullname;
    String email;
    int mark = 0;
    boolean user_status= true ;
    boolean ban = false ;
    String code;
    
    private String ranDomUsername() {
		// Get the current time as an Instant
		Instant currentTime = Instant.now();

		// Convert the Instant to a byte array
		byte[] timeBytes = currentTime.toString().getBytes();

		// Encode the byte array as Base64
		String base64Time = Base64.getEncoder().encodeToString(timeBytes);

		return base64Time;
	}
}
