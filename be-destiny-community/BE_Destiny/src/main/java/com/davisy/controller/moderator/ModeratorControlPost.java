package com.davisy.controller.moderator;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.entity.Post;
import com.davisy.entity.PostReported;
import com.davisy.entity.User;
import com.davisy.mongodb.documents.BadWord;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.service.ModeratorPostReportedService;
import com.davisy.service.PostReportedService;
import com.davisy.service.PostService;
import com.davisy.service.UserService;

@RestController
public class ModeratorControlPost {

	@Value("${davis.mongodb.collectionPostReported}")
	private String collectionPostReported;
	
	@Autowired
	private ModeratorPostReportedService moderatorPostReportedService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostReportedService postReportedService;
	
	@GetMapping("/v1/moderator/postReporteds")
	public List<ModeratorPostReported> listBadWords() {
		List<ModeratorPostReported> postReporteds = moderatorPostReportedService.findAll();
		return postReporteds;
	}
	
	@GetMapping("/v1/moderator/findPostReported")
	public ModeratorPostReported findPostReported() {
		
		String post_reported_id = "49";
		String user_send_report_id = "8";
		ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");
		
//		PostReported postReported = moderatorPostReportedService.findByColumn("post_reported_id", post_reported_id); 
//		PostReported postReported = moderatorPostReportedService.findByColumn("user_send_report_id", user_send_report_id);
//		PostReported postReported = moderatorPostReportedService.findById(id);
		ModeratorPostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
		return postReported;
	}
	
	@PostMapping("/v1/moderator/addPostReported")
	public String add() {
		try {
			Date now = new Date();
			ModeratorPostReported postReported = new ModeratorPostReported();
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
			ModeratorPostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id", post_reported_id, "user_send_report_id", user_send_report_id);
			moderatorPostReportedService.delete(postReported.getId());
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	@PostMapping("/v1/moderator/sendPostReported")
	public PostReported sendPostToAdmin() {
		try {
			ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");
			ModeratorPostReported moderatorPostReported = moderatorPostReportedService.findById(id);
			
			PostReported postReported = new PostReported();
			
			Post post = postService.findById(Integer.valueOf(moderatorPostReported.getPost_reported_id()));
			postReported.setPostReported(post);
			
			User user = userService.findById(Integer.valueOf(moderatorPostReported.getUser_send_report_id()));
			postReported.setUserSendReport(user);
			
			postReported.setContent_report(moderatorPostReported.getContent_report());

			Calendar date_report = Calendar.getInstance();
			date_report.setTime(moderatorPostReported.getDate_report());
			postReported.setDate_report(date_report);
			
			//thêm vào db
			postReportedService.create(postReported);
			
			//xóa khỏi mongo
			removePostFromMongo(moderatorPostReported.getId());
			
			return postReported;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	@PostMapping("/v1/moderator/removePostReported")
	public String removePostFromMongo(ObjectId id) {
		try {
			moderatorPostReportedService.delete(id);
			return "suc";
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
