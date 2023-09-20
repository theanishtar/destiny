package com.davisy.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController

public class FB {
	@GetMapping("/facebook")
	public Principal user(Principal principal) {
        System.out.println("username : " + principal.getName());
        return principal;
    }
}
