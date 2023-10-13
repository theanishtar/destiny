package com.davisy.controller;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@Controller
public class LoginFacebook {

	@GetMapping("/user-home")
    public String getUserInfo(@AuthenticationPrincipal OAuth2User principal,Model model) {
	  String name = principal.getAttribute("name");
    String email = principal.getAttribute("email");
    model.addAttribute("user",name );
    System.out.println(name);
    System.out.println(email);
        return "OK";
    }
}