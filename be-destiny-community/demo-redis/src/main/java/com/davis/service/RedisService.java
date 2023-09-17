package com.davis.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.davis.model.BlockSpam;

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
		
//		if (currentTime != null && previousRequestTime != null)
//			System.out.println("Request dau: " + (currentTime - previousRequestTime));
//		if (previousRequestTime != null && currentTime - previousRequestTime < timeIntervalInSeconds) {
//			// String valuex = (String) redisTemplate.opsForValue().get(key);
//			Long requestCount = redisTemplate.opsForValue().increment(1, 1);
//			if (requestCount > maxRequests) {
//				return false;
//			}
//		} else {
//			redisTemplate.opsForValue().set(key, currentTime, timeIntervalInSeconds, TimeUnit.SECONDS);
//		}
//		return true;
	}
}
