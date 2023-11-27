package com.davisy.controller.moderator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.controller.admin.AdminControl;
import com.davisy.dto.AdminPostDetail;
import com.davisy.dto.AdminUserProfile;
import com.davisy.dto.PostReportedDTO;
import com.davisy.dto.UserReportedDTO;
import com.davisy.entity.Post;
import com.davisy.entity.User;
import com.davisy.entity.UserReported;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.mongodb.documents.ModeratorUserReported;
import com.davisy.service.ModeratorUserReportedService;
import com.davisy.service.PostService;
import com.davisy.service.UserReportedService;
import com.davisy.service.UserService;


@RestController
@CrossOrigin("*")
public class ModeratorControlUser {
	@Value("${davis.mongodb.collectionUserReported}")
	private String collectionUserReported;
	
	@Autowired
	private ModeratorUserReportedService moderatorUserReportedService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserReportedService userReportedService;
	
	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;
	int year = now.get(Calendar.YEAR);

	public int totalUser(int time, String date) {
		List<ModeratorUserReported> UserReporteds = moderatorUserReportedService.findAll();

		int totalUser = 0;
	
		switch (date) {
		case "day": {
			for (ModeratorUserReported UserReported : UserReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(UserReported.getDate_report());
				if (calendar.get(Calendar.DAY_OF_MONTH) == time && calendar.get(Calendar.MONTH) == month && calendar.get(Calendar.YEAR) == year) {
					totalUser++;
				}
			}
			break;

		}
		case "month": {
			for (ModeratorUserReported UserReported : UserReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(UserReported.getDate_report());
				if (calendar.get(Calendar.MONTH) == time && calendar.get(Calendar.YEAR) == year) {
					totalUser++;
				}
			}
			break;
		}
		case "year": {
			for (ModeratorUserReported UserReported : UserReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(UserReported.getDate_report());
				if (calendar.get(Calendar.YEAR) == time) {
					totalUser++;
				}
			}
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + date);
		}

		return totalUser;
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalUserReportedByYear")
	public int getTotalUserReportedByYear() {

		return totalUser(year, "year");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalUserReportedByMonth")
	public int getTotalUserReportedByMonth() {

		return totalUser(month, "month");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalUserReportedByDay")
	public int getTotalUserReportedByDay() {
		
		int day = now.get(Calendar.DAY_OF_MONTH);
		return totalUser(day, "day");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentUserReportedYearIncrease")
	public double getPercentUserReportedYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = totalUser(previousYear, "year");
		int currentMonthValue = totalUser(currentYear, "year");

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentUserReportedMonthIncrease")
	public double getPercentUserReportedMonthIncrease() {
		int previousMonth = now.get(Calendar.MONTH);
		int currentMonth = previousMonth + 1;
		int previousMonthValue = totalUser(previousMonth, "month"
				+ "");
		int currentMonthValue = totalUser(currentMonth, "month");

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentUserReportedDayIncrease")
	public double getPercentUserReportedDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int previousMonthValue = totalUser(previousDay, "day");
		int currentMonthValue = totalUser(currentDay, "day");

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	public double caculatePercentIncrease(int previousMonthValue, int currentMonthValue) {
		if (currentMonthValue == 0) {
			return 0;
		} else if (previousMonthValue == 0) {
			return 100;
		} else {
			double diff = currentMonthValue - previousMonthValue;
			double percentageIncrease = (diff / previousMonthValue) * 100;
			if (percentageIncrease < 0) {
				return 0;
			} else {
				return percentageIncrease;
			}
		}
	}
	
	@GetMapping("/v1/moderator/userReporteds")
	public List<UserReportedDTO> listReported() {
		List<ModeratorUserReported> userReporteds = moderatorUserReportedService.findAll();
		
		List<UserReportedDTO> listUserReporteds = new ArrayList<>();
		for (ModeratorUserReported reported : userReporteds) {
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(reported.getDate_report());
			if (calendar.get(Calendar.YEAR) == year) {
				UserReportedDTO pdto = setUserReported(reported);
				listUserReporteds.add(pdto);			}
		}
		
		return listUserReporteds;
	}
	
	public UserReportedDTO setUserReported(ModeratorUserReported reported) {
		UserReportedDTO userReportedDTO = new UserReportedDTO();
		userReportedDTO.setId(reported.getId());
		User user = userService.findById(Integer.valueOf(reported.getUser_reported_id()));
		userReportedDTO.setFullname(user.getFullname());
		userReportedDTO.setAvatar(user.getAvatar());
		userReportedDTO.setContent_report(reported.getContent_report());
		Calendar time = new GregorianCalendar();
		time.setTime(reported.getDate_report());
		userReportedDTO.setDate_report(formatDate(time));
		userReportedDTO.setTotalPost(userTotalPost(user.getUser_id()));
		userReportedDTO.setEmail(user.getEmail());
		userReportedDTO.setId_user_send(reported.getUser_send_report_id());
		
		return userReportedDTO;
	}
	
	public int userTotalPost(int userId) {
		return postService.getTotalPostByUser(userId);
	}
	
	public String formatDate(Calendar date) {
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

		String formatted = format.format(date.getTime());

		return formatted;
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
	

	@DeleteMapping("/v1/moderator/deleteUserReported")
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
	
	@DeleteMapping("/v1/moderator/sendUserReported/{email}/{userSendId}")
	public ResponseEntity<String> sendUserToAdmin(@PathVariable String email, @PathVariable String userSendId) {
		try {
//			ObjectId id = new ObjectId("653214546912a178bfcc9bca");
			User userMail = userService.findByEmail(email);
			String userId = userMail.getUser_id().toString();
			ModeratorUserReported moderatorUserReported = moderatorUserReportedService.findByTwoColumn("user_reported_id", userId, "user_send_report_id", userSendId);
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
			removeUserFromMongo(moderatorUserReported.getId());
			
			return ResponseEntity.status(200).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(403).body(null);		}
	}
	
	
	@DeleteMapping("/v1/moderator/removeUserReported")
	public String removeUserFromMongo(ObjectId id) {
		try {
			moderatorUserReportedService.delete(id);
			return "suc";
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
