package com.davisy.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;

@Configuration
@EnableCaching
public class CacheConfig {
	@Bean
	public CacheManager cacheManager() {
		return new ConcurrentMapCacheManager("users","user_role","post", "chats", "chat_participants", "comment", "districts","interested", "follower", "gender", "messages", "provinces", "share", "wards", "roles", "post_images");
		// Đặt tên cho các cache cần sử dụng, ví dụ: "interested", "follower",
		// "post_images"
	}
}
