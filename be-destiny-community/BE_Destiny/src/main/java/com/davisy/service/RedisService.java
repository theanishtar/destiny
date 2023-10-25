package com.davisy.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.davisy.constant.Cache;
import com.davisy.entity.User;
import com.davisy.model.RegisterUser;
import com.davisy.model.cache.BlockSpam;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {
	

//	@Autowired
//	private RedisTemplate redisTemplate;
//
//	@Autowired
//	public RedisService(StringRedisTemplate redisTemplate) {
//		this.redisTemplate = redisTemplate;
//	}
	
	@Autowired
	CacheService cacheService;

	private final ObjectMapper objectMapper;

	public boolean allowRequest(String ipAddress, long maxRequests, long timeIntervalInSeconds) {

		try {
			String key = "ip:" + ipAddress;
			System.out.println(key);
			Long currentTime = System.currentTimeMillis() / 1000;
			System.out.println("Getdata with key: "+key);
			System.out.println(cacheService.getByKey(key));
			String dataIP = cacheService.getByKey(key);
			// nếu chưa request trong 10p
			if(dataIP == null) {
				BlockSpam bs = new BlockSpam(currentTime, 1);
				cacheService.writeCacheAtTime(key, bs, timeIntervalInSeconds, Cache.TimeUnit_SECONDS);
				return true;
			}
			BlockSpam b = objectMapper.readValue(dataIP, BlockSpam.class);
			System.out.println(b.toString());
			System.out.println(b.getCountrequest());
			b.setCountrequest(b.getCountrequest()+1);
			if((b.getCountrequest()) < maxRequests) {
				cacheService.writeCacheAtTime(key, b, timeIntervalInSeconds, Cache.TimeUnit_SECONDS);
				return true;
			}
			// ngượpc lại
			System.out.println("Bi chan trong "+ (currentTime - b.getCurrenTime()));
		} catch (Exception e) {
			System.out.println("LOI");
			return true;
		}
		return false;
	}
	
    public void redisCheckMethod() {
        // Logic của phương thức
    }
    
    public void addCodeRegister(RegisterUser u, String code) {
    	if(cacheService.getByKey(code) == null)
    		cacheService.writeCacheAtTime(code, u, 5, Cache.TimeUnit_MINUTE);//tồn tại mã xác nhận trong vòng 5 phút
    }
    
    public RegisterUser authenRegister(String code) {
    	RegisterUser u = null;
    	System.out.println("FIND Redis: "+cacheService.getByKey(code)+":");
    	System.out.println(cacheService.getByKey(code)==null);
    	if(cacheService.getByKey(code) == null)
    		return null;
    	try {
    		u =  objectMapper.readValue(cacheService.getByKey(code), RegisterUser.class);
    		System.out.println(u.getUsername());
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
    	return u;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
