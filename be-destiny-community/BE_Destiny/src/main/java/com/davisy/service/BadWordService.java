package com.davisy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;

//@Service
public class BadWordService {

	@Autowired
	MongoDBUtils dbUtils;
	
	@Value("${davis.mongodb.collection}")
	private String collectionName;
	
	
	
	
}
