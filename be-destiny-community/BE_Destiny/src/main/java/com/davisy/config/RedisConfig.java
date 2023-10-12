package com.davisy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import redis.clients.jedis.Jedis;

@Configuration
public class RedisConfig {

	@Value("${davis.redis.uri}")
	private String redisURI;

	public LettuceConnectionFactory redisConnectionFactory() {
		// Tạo Standalone Connection tới Redis
		RedisStandaloneConfiguration rf = new RedisStandaloneConfiguration("singapore-redis.render.com", 6379);
		rf.setPassword("ZleRTUCdR8fqjegljaMAcp551jsH1vWw");
		rf.setUsername("red-ck83erfq54js73a93b90");
		return new LettuceConnectionFactory(rf);
	}

	public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
		RedisTemplate<String, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory);
		template.setHashKeySerializer(new StringRedisSerializer());
		template.setKeySerializer(new StringRedisSerializer());
		template.setHashKeySerializer(new JdkSerializationRedisSerializer());
		template.setValueSerializer(new JdkSerializationRedisSerializer());
		template.setEnableTransactionSupport(true);
		template.afterPropertiesSet();
		try {
			RedisStandaloneConfiguration configuration = (RedisStandaloneConfiguration) ((LettuceConnectionFactory) redisConnectionFactory)
					.getStandaloneConfiguration();

			System.out.println(configuration.getHostName());
			System.out.println(configuration.getPort());
			System.out.println(configuration.getUsername());
			System.out.println(configuration.getPassword().toString());
			System.out.println(template.getConnectionFactory().getConnection().ping());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Connected fail!");
		}
		return template;
	}

	public RedisProperties redisProperties() {
		RedisProperties rp = new RedisProperties();
		rp.getSsl().setEnabled(true);
		rp.setUrl(redisURI);
		System.out.println("SSL is: " + rp.getSsl().isEnabled());
		return rp;
	}

	@Bean
	public Jedis jedisConnectionFactory() {
		Jedis jedis = new Jedis(redisURI);
		System.out.println(jedis.isConnected());
		return jedis;
	}

}
