package com.davisy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebRTCControllerMVC {
	@GetMapping("/v1/test/webrtc")
	public String index() {
		return "forward:/index.html";
	}
}
