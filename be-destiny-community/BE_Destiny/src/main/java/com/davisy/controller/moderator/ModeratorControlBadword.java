package com.davisy.controller.moderator;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;
import com.davisy.service.BadWordService;
import com.davisy.service.CacheService;

@RestController
public class ModeratorControlBadword {

	@Value("${davis.mongodb.collectionBadWords}")
	private String collectionBadWord;
	
	@Autowired
	private BadWordService badWordService;
	
	@Autowired
	private CacheService cacheService;
	
	@GetMapping("/v1/moderator/sendDataRedis")
	public List<BadWord> sendToRedis() {
		
		List<BadWord> badWordsList = listBadWords();
		for(BadWord badWord: badWordsList) {
			cacheService.writeCache(badWord.getName(), badWord);
		}
		return badWordsList;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/v1/moderator/badwords")
	public List<BadWord> listBadWords() {
		List<BadWord> badWordsList = badWordService.findAll();
		return badWordsList;
	}
	
	@GetMapping("/v1/moderator/checkBadword")
	public String checkBadword() {
		try {
			badWordService.checkBadword("alo chó nè");
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	
	@PostMapping("/v1/moderator/addBadword")
	public String add() {
		try {
			BadWord badWord = new BadWord();
			badWord.setLabel(1);
			badWord.setName("sỹ chó");
			badWord.setSeverityLevel(3);
			Date now = new Date();
			badWord.setCreateDate(now);

			badWordService.insert(badWord);
			
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	@PostMapping("/v1/moderator/updateBadword")
	public String update() {
		try {
			BadWord badWord = new BadWord();
			badWord.setName("sỹ heo");
			badWordService.update("name", "sỹ chó", badWord);
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	@PostMapping("/v1/moderator/deleteBadword")
	public String delete() {
		try {
			badWordService.delete("name", "sỹ heo");
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	@GetMapping("/v1/moderator/sortBadwords")
	public List<BadWord> sortBadwords() {
		List<BadWord> badWordsList = badWordService.findAll();
		List<BadWord> badWordsListSort = bubbleSort(badWordsList);
		return badWordsListSort;
	}
	
	public List<BadWord> bubbleSort(List<BadWord> badWords) {
	    int n = badWords.size();
	    for (int i = 0; i < n - 1; i++) {
	        for (int j = 0; j < n - 1 - i; j++) {
	            BadWord word1 = badWords.get(j);
	            BadWord word2 = badWords.get(j + 1);

	            int severityLevel1 = word1.getSeverityLevel();
	            int severityLevel2 = word2.getSeverityLevel();

	            if (severityLevel1 > severityLevel2) {
	                badWords.set(j, word2);
	                badWords.set(j + 1, word1);
	            }
	        }
	    }
	    return badWords;
	}


//	@PostMapping("/v1/moderator/badwords")
//	public String add() {
//		ObjectMapper objectMapper = new ObjectMapper();
//		List<BadWord> list = new ArrayList<>();
//		try {
//			File jsonFile = new File("E:\\FPT\\ozaniz\\vietnam-sensitive-words\\davisy\\output.json"); // Thay đổi đường
//																										// dẫn đến tệp
//																										// JSON của bạn
//			list = objectMapper.readValue(jsonFile,
//					objectMapper.getTypeFactory().constructCollectionType(List.class, BadWord.class));
//			List<BadWord> badWordsList = dbUtils.inserts(list, collectionBadWord);
//
//			return "Successfully";
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "ERROR" + e;
//		}
//	}
}
