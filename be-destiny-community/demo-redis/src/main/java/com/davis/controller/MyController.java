package com.davis.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.davis.service.RateLimitService;

@RestController
public class MyController {
	
    private final RateLimitService rateLimitService;

    
    @Autowired
    public MyController(RateLimitService rateLimitService) {
        this.rateLimitService = rateLimitService;
    }

    @GetMapping("/process/{userId}")
    public String processRequest(@PathVariable String userId) {
        if (rateLimitService.isAllowed(userId)) {
            // Xử lý yêu cầu nếu được phép
            return "Request processed successfully";
        } else {
            // Trả về thông báo hoặc mã lỗi nếu yêu cầu bị từ chối
        	System.out.println("bi chan");
            return "Request rate limit exceeded";
        }
    }
    
    
    
}
