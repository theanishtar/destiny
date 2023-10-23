package com.davisy.controller.moderator;

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
import com.davisy.entity.UserReported;
import com.davisy.entity.User;
import com.davisy.mongodb.documents.ModeratorUserReported;
import com.davisy.service.ModeratorUserReportedService;
import com.davisy.service.PostReportedService;
import com.davisy.service.UserReportedService;
import com.davisy.service.UserService;


@RestController
public class ModeratorControlUser {
	@Value("${davis.mongodb.collectionUserReported}")
	private String collectionUserReported;
	
	@Autowired
	private ModeratorUserReportedService moderatorUserReportedService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserReportedService userReportedService;
	
	@GetMapping("/v1/moderator/userReporteds")
	public List<ModeratorUserReported> listBadWords() {
		List<ModeratorUserReported> userReporteds = moderatorUserReportedService.findAll();
		return userReporteds;
	}
	
	@GetMapping("/v1/moderator/findUserReported")
	public ModeratorUserReported findUserReported() {
		
		String user_reported_id = "26";
		String user_send_report_id = "16";
		ObjectId id = new ObjectId("653214546912a178bfcc9bca");
		
//		UserReported UserReported = moderatorUserReportedService.findByColumn("User_reported_id", User_reported_id); 
//		UserReported UserReported = moderatorUserReportedService.findByColumn("user_send_report_id", user_send_report_id);
		ModeratorUserReported UserReported = moderatorUserReportedService.findById(id);
//		UserReported UserReported = moderatorUserReportedService.findByTwoColumn("user_reported_id", user_reported_id, "user_send_report_id", user_send_report_id);
		return UserReported;
	}
	
	@PostMapping("/v1/moderator/addUserReported")
	public String add() {
		try {
			Date now = new Date();
			ModeratorUserReported userReported = new ModeratorUserReported();
			userReported.setUser_reported_id("26");
			userReported.setUser_send_report_id("7");
			userReported.setContent_report("Đăng bài nhưng khi ib thì kêu trả tiền");
			userReported.setDate_report(now);
			
			String user_reported_id = "26";
			String user_send_report_id = "7";
			if(moderatorUserReportedService.checkExistReport(user_reported_id, user_send_report_id) == false) {
				moderatorUserReportedService.insert(userReported);
			}
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	

	@PostMapping("/v1/moderator/deleteUserReported")
	public String delete() {
		try {
			String user_reported_id = "26";
			String user_send_report_id = "7";
			ModeratorUserReported UserReported = moderatorUserReportedService.findByTwoColumn("user_reported_id", user_reported_id, "user_send_report_id", user_send_report_id);
			moderatorUserReportedService.delete(UserReported.getId());
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}
	
	@PostMapping("/v1/moderator/sendUserReported")
	public UserReported sendPostToAdmin() {
		try {
			ObjectId id = new ObjectId("653214546912a178bfcc9bca");
			ModeratorUserReported moderatorUserReported = moderatorUserReportedService.findById(id);
			
			UserReported UserReported = new UserReported();
			
			User userIsReported = userService.findById(Integer.valueOf(moderatorUserReported.getUser_reported_id()));
			UserReported.setUserReported(userIsReported);
			
			User userSend = userService.findById(Integer.valueOf(moderatorUserReported.getUser_send_report_id()));
			UserReported.setUserSendReport(userSend);
			
			UserReported.setContent_report(moderatorUserReported.getContent_report());

			Calendar date_report = Calendar.getInstance();
			date_report.setTime(moderatorUserReported.getDate_report());
			UserReported.setDate_report(date_report);
			
			//thêm vào db
			userReportedService.create(UserReported);
			
			//xóa khỏi mongo
			removePostFromMongo(moderatorUserReported.getId());
			
			return UserReported;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	@PostMapping("/v1/moderator/removeUserReported")
	public String removePostFromMongo(ObjectId id) {
		try {
			moderatorUserReportedService.delete(id);
			return "suc";
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
