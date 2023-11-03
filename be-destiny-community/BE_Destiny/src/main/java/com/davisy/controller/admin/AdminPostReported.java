package com.davisy.controller.admin;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.service.PostReportedService;

import jakarta.annotation.security.RolesAllowed;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminPostReported {
	@Autowired
	private PostReportedService postReportedService;

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalPostReportedByYear")
	public int getTotalPostReportedByYear() {
		int year = now.get(Calendar.YEAR);
		return postReportedService.getTotalPostReportedByYear(year);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalPostReportedByMonth")
	public int getTotalPostReportedByMonth() {

		return postReportedService.getTotalPostReportedByMonth(month);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalPostReportedByDay")
	public int getTotalPostReportedByDay() {
		int day = now.get(Calendar.DAY_OF_MONTH);
		return postReportedService.getTotalPostReportedByDay(day, month);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostReportedYearIncrease")
	public double getPercentPostReportedYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = postReportedService.getTotalPostReportedByYear(previousYear);
		int currentMonthValue = postReportedService.getTotalPostReportedByYear(currentYear);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostReportedMonthIncrease")
	public double getPercentPostReportedMonthIncrease() {
		int previousMonth = now.get(Calendar.MONTH);
		int currentMonth = previousMonth + 1;
		int previousMonthValue = postReportedService.getTotalPostReportedByMonth(previousMonth);
		int currentMonthValue = postReportedService.getTotalPostReportedByMonth(currentMonth);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostReportedDayIncrease")
	public double getPercentPostReportedDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		int previousMonthValue = postReportedService.getTotalPostReportedByDay(previousDay, month);
		int currentMonthValue = postReportedService.getTotalPostReportedByDay(currentDay, month);

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
