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
	MongoDBUtils dbUtils;
	
	@Value("${davis.mongodb.collectionBadWords}")
	private String collectionName;
	
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
				BadWord badWord = findByName(new BadWord(), BadWord.class, collectionName, word);
				badWord.setSeverityLevel(badWord.getSeverityLevel() + 1);
				update(BadWord.class, collectionName, word, badWord);
			}
		}
		return result;
	}
	
	@Override
	public BadWord findByName(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name) {
		return dbUtils.findByName(badWord, classBadWord, collectionName, name);
	}
	
	@Override
	public List<BadWord> findAllByName(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name) {
		return dbUtils.findAllByName(badWord, classBadWord, collectionName, name);
	}
	
	@Override
	public List<BadWord> findAll(BadWord badWord, Class<BadWord> classBadWord, String collectionName) {
		return dbUtils.findAll(badWord, classBadWord, collectionName);
	}
	
	@Override
	public BadWord insert(BadWord badWord, Class<BadWord> classBadWord, String collectionName) {
		return dbUtils.insert(badWord, classBadWord, collectionName);	
	}
	
	@Override
	public List<BadWord> inserts(List<BadWord> badWords, String collectionName) {
		return dbUtils.inserts(badWords, collectionName);
	}

	@Override
	public BadWord update(Class<BadWord> classBadWord, String collectionName, String name, BadWord badWordUpdate) {
		return dbUtils.updateFirstByName(classBadWord, collectionName, name, badWordUpdate);
	}
	
	@Override
	public long delete(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name) {
		return dbUtils.deletesByName(badWord, classBadWord, collectionName, name);
	}
	
}
