package com.davisy.controller.moderator;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.mongodb.documents.BadWord;
import com.davisy.mongodb.documents.PostReported;
import com.davisy.service.ModeratorPostReportedService;

@RestController
public class ModeratorControlPost {

	@Value("${davis.mongodb.collectionPostReported}")
	private String collectionPostReported;
	
	@Autowired
	private ModeratorPostReportedService moderatorPostReportedService;
	
	@GetMapping("/v1/moderator/postReporteds")
	public List<PostReported> listBadWords() {
		List<PostReported> postReporteds = moderatorPostReportedService.findAll();
		return postReporteds;
	}
	
	@GetMapping("/v1/moderator/findPostReported")
	public PostReported findPostReported() {
		
		String post_reported_id = "49";
		String user_send_report_id = "8";
		ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");
		
//		PostReported postReported = moderatorPostReportedService.findByColumn("post_reported_id", post_reported_id); 
//		PostReported postReported = moderatorPostReportedService.findByColumn("user_send_report_id", user_send_report_id);
//		PostReported postReported = moderatorPostReportedService.findById(id);
		PostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
		return postReported;
	}
	
	@PostMapping("/v1/moderator/addPostReported")
	public String add() {
		try {
			Date now = new Date();
			PostReported postReported = new PostReported();
			postReported.setPost_reported_id("49");
			postReported.setUser_send_report_id("7");
			postReported.setContent_report("Đăng bài nhưng khi ib thì kêu trả tiền");
			postReported.setDate_report(now);
			
			String post_reported_id = "49";
			String user_send_report_id = "7";
			if(moderatorPostReportedService.checkExistReport(post_reported_id, user_send_report_id) == false) {
				moderatorPostReportedService.insert(postReported);
			}
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	

	@PostMapping("/v1/moderator/deletePostReported")
	public String delete() {
		try {
			String post_reported_id = "49";
			String user_send_report_id = "7";
			PostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
			moderatorPostReportedService.delete(postReported.getId());
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
}
