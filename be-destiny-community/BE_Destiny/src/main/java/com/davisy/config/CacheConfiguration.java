package com.davisy.config;

import org.springframework.boot.autoconfigure.cache.CacheManagerCustomizer;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@EnableCaching
public class CacheConfiguration {

	@Bean
	public CacheManager cacheManager() {
		return new ConcurrentMapCacheManager("postFindAll","followerFindALlFriend"); // Đặt tên cho cache, ví dụ: "postCache"
	}
}