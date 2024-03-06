package com.davisy.controller.moderator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.dto.PostReportedDetail;
import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.BadWord;
import com.davisy.service.BadWordService;
import com.davisy.service.CacheService;
import com.davisy.service.PostReportedService;

@RestController
@CrossOrigin("*")
public class ModeratorControlBadword {

	@Value("${davis.mongodb.collectionBadWords}")
	private String collectionBadWord;
	
	@Autowired
	private BadWordService badWordService;
	
	@Autowired
	private CacheService cacheService;
	
	@GetMapping("/v1/moderator/missingredis")
	public long missingRedis() {
		return badWordService.missingWordsFromMongoDB();
	}
	
	@GetMapping("/v1/moderator/sendDataRedis")
	public List<BadWord> sendToRedis() {
		List<BadWord> badWordsList = listBadWords();
		try {
			System.out.println("send data nè ");
			
			for(BadWord badWord: badWordsList) {
				cacheService.writeCache(badWord.getName(), badWord);
			}
			
			System.out.println("send data xong ời nè ");
			
			return badWordsList;
		} catch (Exception e) {
			System.out.println(e + " moderator/sendDataRedis");
			return badWordsList;
		}
	}


	@GetMapping("/v1/moderator/badwords")
	public List<BadWord> listBadWords() {
		List<BadWord> listBadWords = badWordService.findAll();

		return listBadWords;
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
	
	@PostMapping("/v1/moderator/addBadwords")
	public ResponseEntity<String> addBadwords(@RequestBody List<BadWord> badWords) {
		try {
			if(badWords.size() == 0) {
				return ResponseEntity.status(302).body(null);
			}
			else {
				List<BadWord> wordsToRemove = new ArrayList<>();
				
				for (BadWord badWord : badWords) {
				    BadWord find = badWordService.findByName("name", badWord.getName());
				    if (find != null) {
				        wordsToRemove.add(badWord);
				    }else {
				    	cacheService.writeCache(badWord.getName(), badWord);
				    }
				}

				badWords.removeAll(wordsToRemove);
				
				if(badWords.size() == 0) {
					return ResponseEntity.status(301).body(null);
				}else {
					badWordService.inserts(badWords);
				}
				
			}
			return ResponseEntity.status(200).body(null);
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e + " moderator/addBadwords");
			return ResponseEntity.status(403).body(null);
		}
	}
	
	@PostMapping("/v1/moderator/addBadword")
	public ResponseEntity<String> addBadword(@RequestBody BadWord badWord) {
		try {

			BadWord find = badWordService.findByName("name", badWord.getName());
			if(find != null) {
//				System.out.println("đã tồn tại khứa này");
				return ResponseEntity.status(301).body(null);
				
			}else {

				badWordService.insert(badWord);
				cacheService.writeCache(badWord.getName(), badWord);
				
//				System.out.println("thêm thành công");
				return ResponseEntity.status(200).body(null);
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e + " moderator/addBadword");
			return ResponseEntity.status(403).body(null);
		}
	}
	
	@PutMapping("/v1/moderator/updateBadword/{oldName}")
	public ResponseEntity<String> updateBadWord(@PathVariable String oldName, @RequestBody BadWord badWord) {
		try { 
			
			BadWord find = badWordService.findByName("name", badWord.getName());
			if(find != null) {
//				System.out.println("đã tồn tại khứa này");
				return ResponseEntity.status(301).body(null);
				
			}else {
				badWordService.update("name", oldName, badWord);
				cacheService.writeCache(oldName, badWord);
				
//				System.out.println("thêm thành công");
				return ResponseEntity.status(200).body(null);
			}

			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(403).body(null);
		}
	}
	
	@DeleteMapping("/v1/moderator/removeBadword/{name}")
	public ResponseEntity<String>  removeBadWord(@PathVariable String name) {
		try {
			badWordService.delete("name", name);
			cacheService.destroyCache(name);

			return ResponseEntity.status(200).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(403).body(null);
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
