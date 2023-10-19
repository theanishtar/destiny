package com.davisy.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ModeratorController {

	@Autowired
	MongoDBUtils dbUtils;

	@Value("${davis.mongodb.collection}")
	private String collectionName;

	@GetMapping("/v1/moderator/badwords")
	public List<BadWord> list() {
		List<BadWord> badWordsList = dbUtils.findAll(new BadWord(), BadWord.class, collectionName);
		return badWordsList;
	}

	@PostMapping("/v1/moderator/badwords")
	public String add() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<BadWord> list = new ArrayList<>();
		try {
			File jsonFile = new File("E:\\FPT\\ozaniz\\vietnam-sensitive-words\\davisy\\output.json"); // Thay đổi đường
																										// dẫn đến tệp
																										// JSON của bạn
			list = objectMapper.readValue(jsonFile,
					objectMapper.getTypeFactory().constructCollectionType(List.class, BadWord.class));
			List<BadWord> badWordsList = dbUtils.inserts(list, collectionName);

			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
}
