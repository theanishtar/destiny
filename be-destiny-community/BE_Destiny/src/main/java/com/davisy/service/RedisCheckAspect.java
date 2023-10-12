package com.davisy.service;

import java.net.InetAddress;
import java.net.UnknownHostException;

import jakarta.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class RedisCheckAspect {
	

	@Value("${davis.redis.ttl}")	// thời gian tồn tại của một khiên (60s)
    private Long ttl;
	
	@Value("${davis.redis.requests}")	// số reuqest được chạy trong 1 phiên khiên (10)
    private Long requests;

    @Autowired
    private RedisService redisService;
    
    private String getClientIp(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-Forwarded-For");
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("0:0:0:0:0:0:0:1")) {
				// Lấy địa chỉ IPv4 cho localhost
				try {
					InetAddress inetAddress = InetAddress.getLocalHost();
					ipAddress = inetAddress.getHostAddress();
				} catch (UnknownHostException e) {
					// Xử lý lỗi nếu cần
				}
			}
		}
		return ipAddress;
	}

    @Around("@annotation(com.davisy.RedisCheck)")
    public Object checkRedis(ProceedingJoinPoint joinPoint) throws Throwable {
    	
    	 // Lấy request hiện tại
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        
        // Thực hiện kiểm tra và xử lý Redis ở đây
        // Ví dụ: Kiểm tra một key trong Redis và xử lý dựa trên kết quả
        boolean isValid = redisService.allowRequest(getClientIp(request), requests, ttl); // Thay thế bằng phương thức kiểm tra thực tế

        if (isValid) {
            // Nếu request hợp lệ, tiếp tục thực hiện method bằng cách gọi joinPoint.proceed()
            return joinPoint.proceed();
        } else {
            // Nếu không hợp lệ, có thể trả về lỗi hoặc xử lý khác
        	return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests");
        }
    }
}
