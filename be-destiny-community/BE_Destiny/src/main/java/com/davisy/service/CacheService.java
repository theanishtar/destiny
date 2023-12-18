package com.davisy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.constant.Cache;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.params.ScanParams;
import redis.clients.jedis.resps.ScanResult;

@Service
@RequiredArgsConstructor
public class CacheService {

	@Autowired
	private Jedis jedisConnectionFactory;

	private final ObjectMapper objectMapper;

	public String getByKey(String key) {
		return jedisConnectionFactory.get(key);
	}

	public String writeCache(String key, Object result) {
		try {
			String json = objectMapper.writeValueAsString(result);
			jedisConnectionFactory.set(key, json);
		} catch (Exception e) {
			return Cache.ERROR;
		}
		return Cache.DONE;
	}

	public String destroyCache(String key) {
		try {
			jedisConnectionFactory.del(key);
		} catch (Exception e) {
			return Cache.ERROR;
		}
		return Cache.DONE;
	}

	public String writeCacheAtTime(String key, Object result, long time, int timeUnit) {
		if (timeUnit == Cache.TimeUnit_SECONDS) {
			// đơn vị giây
		} else if (timeUnit == Cache.TimeUnit_MINUTE) {
			// đơn vị phút
			time = time * Cache.TimeUnit_MINUTE;
		} else if (timeUnit == Cache.TimeUnit_HOUR) {
			// đơn vị giờ
			time = time * Cache.TimeUnit_HOUR;
		}
		try {
			String json = objectMapper.writeValueAsString(result);
			System.out.println("Writing "+json);
			jedisConnectionFactory.set(key, json);
			jedisConnectionFactory.expire(key, time);
			
			System.out.println("Write success! key: "+key);
		} catch (Exception e) {
			return Cache.ERROR;
		}
		return Cache.DONE;
	}
	public long getCacheLength(String key) {
		String type = jedisConnectionFactory.type(key);

		switch (type) {
		case "list":
			return jedisConnectionFactory.llen(key);
		case "set":
			return jedisConnectionFactory.scard(key);
		case "hash":
			return jedisConnectionFactory.hlen(key);
		default:
			// Nếu không phải là danh sách, tập hợp, hoặc bảng ánh xạ, bạn có thể xử lý theo
			// cách khác.
			return -1;
		}
	}
	
	public long countAllKeys() {
        // Sử dụng lệnh SCAN để lặp qua toàn bộ keys
        String cursor = "0";
        long count = 0;

        do {
            ScanResult<String> scanResult = jedisConnectionFactory.scan(cursor, new ScanParams().count(1000));
            cursor = scanResult.getCursor();
            count += scanResult.getResult().size();
        } while (!"0".equals(cursor));

        System.out.println("Total count of keys in Redis: " + count);
        return count;
    }

}
