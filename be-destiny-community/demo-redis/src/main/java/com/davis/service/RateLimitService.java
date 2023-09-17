package com.davis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
public class RateLimitService {
    private final StringRedisTemplate redisTemplate;

    
    @Autowired
    public RateLimitService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean isAllowed(String userId) {
        String key = "rate_limit:" + userId;
        System.out.println(userId);
        Instant now = Instant.now();
        
        System.out.println(now);
        Instant lastRequestTime = Instant.parse(redisTemplate.opsForValue().get(key) != null ?
                redisTemplate.opsForValue().get(key) : now.toString());

        // Kiểm tra xem đã đủ thời gian giữa các yêu cầu chưa
        Duration timeElapsed = Duration.between(lastRequestTime, now);
        if (timeElapsed.getSeconds() >= 60) {
            // Reset thời gian cho yêu cầu tiếp theo và cập nhật vào Redis
            redisTemplate.opsForValue().set(key, now.toString());
            return true;
        } else {
            // Chưa đủ thời gian giữa các yêu cầu
            return false;
        }
    }
    
    
}
