package com.davisy.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.davisy.entity.User;
import com.davisy.model.redis.BlockSpam;

@Service
public class RedisService {
	

	@Autowired
	private RedisTemplate redisTemplate;

	@Autowired
	public RedisService(StringRedisTemplate redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	public boolean allowRequest(String ipAddress, long maxRequests, long timeIntervalInSeconds) {

		String key = "ip:" + ipAddress;
		Long currentTime = System.currentTimeMillis() / 1000;
		//Long previousRequestTime = (Long) redisTemplate.opsForValue().get(key);
		BlockSpam b = (BlockSpam) redisTemplate.opsForValue().get(key);
		// nếu chưa request trong 10p
		if (b == null) {
			BlockSpam bs = new BlockSpam(currentTime, 1);
			redisTemplate.opsForValue().set(key, bs, timeIntervalInSeconds, TimeUnit.SECONDS);
			return true;
		}
		System.out.println(b.getCountrequest());
		b.setCountrequest(b.getCountrequest()+1);
		if((b.getCountrequest()) < maxRequests) {
			redisTemplate.opsForValue().set(key, b, timeIntervalInSeconds, TimeUnit.SECONDS);
			return true;
		}
		// ngượpc lại
		System.out.println("Bi chan trong "+ (currentTime - b.getCurrenTime()));
		return false;
	}
	
    public void redisCheckMethod() {
        // Logic của phương thức
    }
    
    public void addCodeRegister(User u, String code) {
    	if(redisTemplate.opsForValue().get(code) == null) {
    		redisTemplate.opsForValue().set(code, u, 5, TimeUnit.MINUTES); //tồn tại mã xác nhận trong vòng 5 phút
    	}
    	
    }
    
    public User authenRegister(String code) {
    	if(redisTemplate.opsForValue().get(code) == null) {
    		return null;
    	}
    	return (User) redisTemplate.opsForValue().get(code);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
