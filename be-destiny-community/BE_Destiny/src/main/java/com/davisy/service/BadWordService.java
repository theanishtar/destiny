package com.davisy.service;

import java.util.List;

import com.davisy.mongodb.documents.BadWord;

public interface BadWordService {
	
	public BadWord findByName(String name, String data);

	public List<BadWord> findAllByName(String name, String data);
	
	public List<BadWord> findAll();
	
	public BadWord insert(BadWord badWord);
	
	public List<BadWord> inserts(List<BadWord> badWords);

	public BadWord update(String name, String data, BadWord badWordUpdate);
	
	public long delete(String name, String data);
	
	public boolean checkBadword(String badword);
	
	public boolean checkTheSameBadword(String badword);
	
	public long missingWordsFromMongoDB();
	
}
