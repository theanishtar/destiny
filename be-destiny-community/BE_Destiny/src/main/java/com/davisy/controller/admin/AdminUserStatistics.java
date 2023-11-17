package com.davisy.controller.admin;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.dto.AdminUserTOP4;
import com.davisy.entity.Post;
import com.davisy.entity.User;
import com.davisy.service.CommentService;
import com.davisy.service.FollowService;
import com.davisy.service.InterestedService;
import com.davisy.service.PostService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;

import jakarta.annotation.security.RolesAllowed;


@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminUserStatistics {
	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	@Autowired
	private InterestedService interestedService;
	@Autowired
	private ShareService shareService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private FollowService followService;
	
	Calendar now = Calendar.getInstance();
	int previousMonth = now.get(Calendar.MONTH);
	int currentMonth = previousMonth + 1;
	
	
	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalUserByYear")
	public int getTotalUserByYear() {
		int year = now.get(Calendar.YEAR);
		return userService.getTotalUserByYear(year);
	}
	
	//21-9-2023 -lấy tổng số người dùng
	//lastest update 14-10
	//lastest 1-11
	@GetMapping("/v1/admin/getTotalUserByMonth")
	public int getTotalUserByMonth() {
		int month = now.get(Calendar.MONTH) + 1;
		return userService.getTotalUserByMonth(month);
	}
	
	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalUserByDay")
	public int getTotalUserByDay() {
		int day = now.get(Calendar.DAY_OF_MONTH);
		int month = now.get(Calendar.MONTH);
		return userService.getTotalUserByDay(day, month);
	}
	
	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentUserYearIncrease")
	public double getPercentUserYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = userService.getTotalUserByYear(previousYear);
		int currentMonthValue = userService.getTotalUserByYear(currentYear);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}
	
	// lastest update 14-10
	@GetMapping("/v1/admin/getPercentUserMonthIncrease")
	public double getPercentUserByMonthIncrease() {
		int previousMonthValue = userService.getTotalUserByMonth(previousMonth);
		int currentMonthValue = userService.getTotalUserByMonth(currentMonth);
		
		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}
	
	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentUserDayIncrease")
	public double getPercentUserDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		int previousMonthValue = userService.getTotalUserByDay(previousDay, month);
		int currentMonthValue = userService.getTotalUserByDay(currentDay, month);

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
			if(percentageIncrease < 0) {
				return 0;
			}else {
				return percentageIncrease;
			}
		}
	}
	
	// lastest update 14-10
	@GetMapping("/v1/admin/getPercentUserInteractionIncrease")
	public double getPercentUserInteractionIncrease() {

		int previousMonthValue = userService.getInteractionOfUserByMonth(previousMonth);
		int currentMonthValue = userService.getInteractionOfUserByMonth(currentMonth);
		
		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}
	
	
	//21-9-2023 -Tóng số lượng tương tác của người dùng theo từng tháng
	//update lastest 4-10
	@GetMapping("/v1/admin/getInteractionOfUser")
	public ResponseEntity<int[]> getInteractionOfUser(){
		try {
			List<Object[]> list = userService.getInteractionOfUser();
			int[] listMonth = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
			int[] listInteraction = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
			
			for(Object[] oj: list) {
				String month = String.valueOf(oj[0]);
				for(int i = 0; i < listMonth.length; i++) {
					if(month.equals(String.valueOf(i+1))) {
						listInteraction[i] = Integer.valueOf(String.valueOf(oj[1]));
					}
				}
			}
			return ResponseEntity.status(200).body(listInteraction);
		} catch (Exception e) {
			System.out.println("Error at admin/getInteraction: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}
	
	
	//21-9-2023 -TOP 4 người dùng
	@GetMapping("/v1/admin/getTOP4User")
	public ResponseEntity<List<AdminUserTOP4>> getTOP4User(){
		try {
			List<Object[]> listTOP4User = userService.getTOP4User();;
			List<User> newList = new ArrayList<>();
			List<AdminUserTOP4> listTOP4 = new ArrayList<>();
			
			for (Object[] oj : listTOP4User) {
				User user = userService.findByEmail(String.valueOf(oj[0]));
				AdminUserTOP4 adminUserTOP4 = new AdminUserTOP4();
				
				adminUserTOP4.setEmail(user.getEmail());
				adminUserTOP4.setFullname(user.getFullname());
				adminUserTOP4.setAvatar(user.getAvatar());
				adminUserTOP4.setLocation(user.getLocation());
				
				int birthdayYear = user.getBirthday().get(Calendar.YEAR);
				Calendar calendar = GregorianCalendar.getInstance();
				int thisYear = calendar.get(Calendar.YEAR);
				
				int age = thisYear - birthdayYear;
				adminUserTOP4.setAge(age);
				
				int totalPost = postService.getTotalPostByUser(user.getUser_id());
				adminUserTOP4.setTotalPost(totalPost);
				
				int totalComment = commentService.totalCommentByUser(user.getUser_id());
				adminUserTOP4.setTotalComment(totalComment);
				
				int totalFollower = followService.countFollowers(user.getUser_id());
				adminUserTOP4.setTotalFollower(totalFollower);
				
				
				listTOP4.add(adminUserTOP4);
			}
			
			return ResponseEntity.status(200).body(listTOP4);
		} catch (Exception e) {
			System.out.println("Error at admin/getTOP4User: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}
	
	
	//22-9-2023 -Tổng số người dùng tham gia từng theo từng tháng
	//update lastest 4-10
	@GetMapping("/v1/admin/getTotalUserEveryMonth")
	public ResponseEntity<int[]> getTotalUserEveryMonth(){
		try {
			List<Object[]> list = userService.getTotalUserEveryMonth();
			int[] listMonth = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
			int[] listTotalUser = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
			
			for(Object[] oj: list) {
				String month = String.valueOf(oj[0]);
				for(int i = 0; i < listMonth.length; i++) {
					if(month.equals(String.valueOf(i+1))) {
						listTotalUser[i] = Integer.valueOf(String.valueOf(oj[1]));
					}
				}
			}
			return ResponseEntity.status(200).body(listTotalUser);
		} catch (Exception e) {
			System.out.println("Error at admin/getTotalUserEveryMonth: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}
	
	
	
	
}

