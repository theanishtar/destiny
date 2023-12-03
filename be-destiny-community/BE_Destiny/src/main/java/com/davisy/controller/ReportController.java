package com.davisy.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.User;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.mongodb.documents.ModeratorUserReported;
import com.davisy.service.ModeratorPostReportedService;
import com.davisy.service.ModeratorUserReportedService;
import com.davisy.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class ReportController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserService userService;
	
	@Autowired
	ModeratorUserReportedService moderatorUserReportedService;
	
	@Autowired
	ModeratorPostReportedService moderatorPostReportedService;
	
	@PostMapping("/v1/user/report/user")
	public ResponseEntity<Void>reportUser(HttpServletRequest request ,@RequestParam("to")String to,@RequestParam("content")String content){
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		ModeratorUserReported reported = new ModeratorUserReported();
		reported.setUser_reported_id(to);
		reported.setUser_send_report_id(user.getUser_id()+"");
		reported.setContent_report(content);
		reported.setDate_report(new Date());
		if(moderatorUserReportedService.checkExistReport(to, user.getUser_id()+"") == false) {
			moderatorUserReportedService.insert(reported);
		}
		return null;
	}
	
	@PostMapping("/v1/user/report/post")
	public ResponseEntity<Void>reportPost(HttpServletRequest request ,@RequestParam("postId")String postId,@RequestParam("content")String content){
		String email = jwtTokenUtil.getEmailFromHeader(request);
		User user = userService.findByEmail(email);
		ModeratorPostReported reported = new ModeratorPostReported();
		reported.setPost_reported_id(postId);
		reported.setUser_send_report_id(user.getUser_id()+"");
		reported.setContent_report(content);
		reported.setDate_report(new Date());
		if(moderatorPostReportedService.checkExistReport(postId, user.getUser_id()+"") == false) {
			moderatorPostReportedService.insert(reported);
		}
		return null;
	}
}
