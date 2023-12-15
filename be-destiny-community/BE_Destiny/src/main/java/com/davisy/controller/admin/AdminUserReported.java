package com.davisy.controller.admin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.dto.UserReportedDetail;
import com.davisy.entity.Post;
import com.davisy.entity.User;
import com.davisy.service.PostService;
import com.davisy.service.UserReportedService;
import com.davisy.service.UserService;

import jakarta.annotation.security.RolesAllowed;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminUserReported {
	@Autowired
	private UserReportedService userReportedService;
	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;

	// 6-11
	@GetMapping("/v1/admin/getListUserReportedByDay")
	public ResponseEntity<List<UserReportedDetail>> getListUserReportedByDay() {
		try {
			int day = now.get(Calendar.DAY_OF_MONTH);
			List<Object[]> list = userReportedService.getAllUserReportedByDay(day, month);

			return ResponseEntity.status(200).body(setListUserReportedDetail(list));
		} catch (Exception e) {
			System.out.println("Error at admin/getListUserReportedByDay: " + e);
			return ResponseEntity.status(403).body(null);
		}

	}

	// 6-11
	@GetMapping("/v1/admin/getListUserReportedByYear")
	public ResponseEntity<List<UserReportedDetail>> getListUserReportedByYear() {
		try {
			int year = now.get(Calendar.YEAR);
			List<Object[]> list = userReportedService.getAllUserReportedByYear(year);

			for (Object[] oj : list) {
				System.out.println("sadsa" + oj[0]);
			}

			
			return ResponseEntity.status(200).body(setListUserReportedDetail(list));
		} catch (Exception e) {
			System.out.println("Error at admin/getListUserReportedByYear: " + e);
			return ResponseEntity.status(403).body(null);
		}

	}

	// 6-11
	public List<UserReportedDetail> setListUserReportedDetail(List<Object[]> list) {

		List<UserReportedDetail> listUserReportedDetails = new ArrayList<>();

		for (Object[] oj : list) {
			UserReportedDetail userReportedDetail = new UserReportedDetail();
			User user = userService.findById(Integer.valueOf(String.valueOf(oj[0])));
			userReportedDetail.setAvatar(user.getAvatar());
			userReportedDetail.setFullname(user.getFullname());
			userReportedDetail.setBirthday(formatDate(user.getBirthday()));
			userReportedDetail.setDate_join(formatDate(user.getDay_create()));
			userReportedDetail.setEmail(user.getEmail());
			userReportedDetail.setIntro(AdminPostReported.truncateText(user.getIntro()));
			userReportedDetail.setGender_name(user.getGender().getGender_name());
			userReportedDetail.setLocation(user.getLocation());
			int totalPost = postService.countPost(user.getUser_id());
			userReportedDetail.setTotal_post(totalPost);
			
			userReportedDetail.setTotal_report(Integer.valueOf(String.valueOf(oj[1])));
			listUserReportedDetails.add(userReportedDetail);
		}

		return listUserReportedDetails;
	}

	// 6-11
	public String formatDate(Calendar date) {
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

		String formatted = format.format(date.getTime());

		return formatted;
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalUserReportedByYear")
	public int getTotalUserReportedByYear() {
		int year = now.get(Calendar.YEAR);
		return userReportedService.getTotalUserReportedByYear(year);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalUserReportedByMonth")
	public int getTotalUserReportedByMonth() {

		return userReportedService.getTotalUserReportedByMonth(month);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalUserReportedByDay")
	public int getTotalUserReportedByDay() {
		int day = now.get(Calendar.DAY_OF_MONTH);
		return userReportedService.getTotalUserReportedByDay(day, month);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentUserReportedYearIncrease")
	public double getPercentUserReportedYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = userReportedService.getTotalUserReportedByYear(previousYear);
		int currentMonthValue = userReportedService.getTotalUserReportedByYear(currentYear);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentUserReportedMonthIncrease")
	public double getPercentUserReportedMonthIncrease() {
		int previousMonth = now.get(Calendar.MONTH);
		int currentMonth = previousMonth + 1;
		int previousMonthValue = userReportedService.getTotalUserReportedByMonth(previousMonth);
		int currentMonthValue = userReportedService.getTotalUserReportedByMonth(currentMonth);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentUserReportedDayIncrease")
	public double getPercentUserReportedDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int previousMonthValue = userReportedService.getTotalUserReportedByDay(previousDay, month);
		int currentMonthValue = userReportedService.getTotalUserReportedByDay(currentDay, month);

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
}
