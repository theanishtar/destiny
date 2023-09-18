package com.davisy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;


public class RedisConfig {

//	@Bean
//	public JedisConnectionFactory connectionfactory() {
//		RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
//		config.setHostName("localhost");
//		config.setPort(6379);
//		return new JedisConnectionFactory(config);
//	}
//
//	@Bean
//	public RedisTemplate<String, Long> redisTemplate() {
//		RedisTemplate<String, Long> templ = new RedisTemplate<>();
//		templ.setConnectionFactory(connectionfactory());
//		templ.setKeySerializer(new StringRedisSerializer());
//		templ.setHashKeySerializer(new StringRedisSerializer());
//		templ.setHashKeySerializer(new JdkSerializationRedisSerializer());
//		templ.setValueSerializer(new JdkSerializationRedisSerializer());
//		templ.setEnableTransactionSupport(true);
//		templ.afterPropertiesSet();
//		return templ;
//
//	}

	/*
	 * @Bean public RedisTemplate<String, Long> redisTemplate(RedisConnectionFactory
	 * redisConnectionFactory) { RedisTemplate<String, Long> redisTemplate = new
	 * RedisTemplate<>();
	 * redisTemplate.setConnectionFactory(redisConnectionFactory);
	 * redisTemplate.setKeySerializer(new StringRedisSerializer());
	 * redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
	 * return redisTemplate; }
	 * 
	 * @Bean(destroyMethod = "shutdown") public ClientResources clientResources() {
	 * return DefaultClientResources.create(); }
	 * 
	 * @Bean public RedisConnectionFactory redisConnectionFactory(ClientResources
	 * clientResources) { return LettuceConnectionFactory.builder()
	 * .clientResources(clientResources)
	 * .clientOptions(ClientOptions.builder().build()) .build(); }
	 */

}
