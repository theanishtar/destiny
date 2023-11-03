package com.davisy.controller.admin;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.service.UserReportedService;

import jakarta.annotation.security.RolesAllowed;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminUserReported {
	@Autowired
	private UserReportedService userReportedService;

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;

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
