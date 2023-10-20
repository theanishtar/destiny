package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.BadWord;

public interface BadWordService {
	
	public BadWord findByName(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name);

	public List<BadWord> findAllByName(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name);
	
	public List<BadWord> findAll(BadWord badWord, Class<BadWord> classBadWord, String collectionName);
	
	public BadWord insert(BadWord badWord, Class<BadWord> classBadWord, String collectionName);
	
	public List<BadWord> inserts(List<BadWord> badWords, String collectionName);

	public BadWord update(Class<BadWord> classBadWord, String collectionName, String name, BadWord badWordUpdate);
	
	public long delete(BadWord badWord, Class<BadWord> classBadWord, String collectionName, String name);
	
	public String checkBadword(String badword);
}
