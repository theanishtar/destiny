package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;
import com.davisy.service.BadWordService;
import com.davisy.service.CacheService;

@Service
public class BadWordServiceImpl implements BadWordService{

	@Autowired
	private MongoDBUtils dbUtils;
	
	@Value("${davis.mongodb.collectionBadWords}")
	private String collectionBadWords;
	
	@Autowired
	private CacheService cacheService;
	
	
	@Override
	public boolean checkBadword(String badword) {
		try {
			if(checkExistBadWord(badword) == true) {
				System.out.println("tìm thấy từ ngữ vi phạm");
				//thông báo
				
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public boolean checkExistBadWord(String badword) {
		String[] words = badword.split(" ");
		boolean result = false;
		for (String word : words) {
			String resultWord = cacheService.getByKey(word);
			if(resultWord != null) {
				result = true;
				BadWord badWord = findByName("name", word);
				badWord.setSeverityLevel(badWord.getSeverityLevel() + 1);
				update("name", word, badWord);
			}
		}
		return result;
	}
	
	@Override
	public BadWord findByName(String name, String data) {
		return dbUtils.findByColumn(BadWord.class, collectionBadWords, name, data);
	}
	
	@Override
	public List<BadWord> findAllByName(String name, String data) {
		return dbUtils.findAllByColumn(BadWord.class, collectionBadWords, name, data);
	}
	
	@Override
	public List<BadWord> findAll() {
		return dbUtils.findAll(BadWord.class, collectionBadWords);
	}
	
	@Override
	public BadWord insert(BadWord badWord) {
		return dbUtils.insert(badWord ,BadWord.class, collectionBadWords);	
	}
	
	@Override
	public List<BadWord> inserts(List<BadWord> badWords) {
		return dbUtils.inserts(badWords, collectionBadWords);
	}

	@Override
	public BadWord update(String name, String data, BadWord badWordUpdate) {
		return dbUtils.updateFirstByColumn(BadWord.class, collectionBadWords, name, data, badWordUpdate);
	}
	
	@Override
	public long delete(String name, String data) {
		return dbUtils.deletesByColumn(BadWord.class, collectionBadWords, name, data);
	}
	
}
