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

import com.davisy.dto.PostImagesDetail;
import com.davisy.dto.PostReportedDetail;
import com.davisy.entity.Post;
import com.davisy.entity.PostImages;
import com.davisy.entity.PostReported;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostReportedService;
import com.davisy.service.PostService;

import jakarta.annotation.security.RolesAllowed;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminPostReported {
	@Autowired
	private PostReportedService postReportedService;
	@Autowired
	private PostService postService;
	@Autowired
	private PostImagesService postImagesService;

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;

	// 6-11
	@GetMapping("/v1/admin/getListPostReportedByDay")
	public ResponseEntity<List<PostReportedDetail>> getListPostReportedByDay() {
		try {
			int day = now.get(Calendar.DAY_OF_MONTH);
			List<Object[]> list = postReportedService.getAllPostReportedByDay(day, month);

			return ResponseEntity.status(200).body(setListPostReportedDetail(list));
		} catch (Exception e) {
			System.out.println("Error at admin/getListPostReportedByDay: " + e);
			return ResponseEntity.status(403).body(null);
		}

	}

	// 6-11
	@GetMapping("/v1/admin/getListPostReportedByYear")
	public ResponseEntity<List<PostReportedDetail>> getListPostReportedByYear() {
		try {
			int year = now.get(Calendar.YEAR);
			List<Object[]> list = postReportedService.getAllPostReportedByYear(year);

			return ResponseEntity.status(200).body(setListPostReportedDetail(list));
		} catch (Exception e) {
			System.out.println("Error at admin/getListPostReportedByYear: " + e);
			return ResponseEntity.status(403).body(null);
		}

	}

	// 6-11
	public List<PostReportedDetail> setListPostReportedDetail(List<Object[]> list) {

		List<PostReportedDetail> listPostReportedDetails = new ArrayList<>();

		for (Object[] oj : list) {
			PostReportedDetail postReportedDetail = new PostReportedDetail();
			Post post = postService.findById(Integer.valueOf(String.valueOf(oj[0])));
			postReportedDetail.setContent(truncateText(post.getContent()));
			postReportedDetail.setPost_id(post.getPost_id());
			postReportedDetail.setProduct(post.getProduct());
			postReportedDetail.setDate_post(formatDate(post.getDate_Post()));

			postReportedDetail.setListPostImages(listImagesDetail(post.getPost_id()));

			postReportedDetail.setUser_avatar(post.getUser().getAvatar());
			postReportedDetail.setUser_email(post.getUser().getEmail());
			postReportedDetail.setUser_fullname(post.getUser().getFullname());
			postReportedDetail.setTotal_report(Integer.valueOf(String.valueOf(oj[1])));
			listPostReportedDetails.add(postReportedDetail);
		}

		return listPostReportedDetails;
	}

	public static String truncateText(String text) {
		if (text.length() > 35) {
			return text.substring(0, 35) + "...";
		} else {
			return text;
		}
	}

	// 6-11
	public String formatDate(Calendar date) {
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

		String formatted = format.format(date.getTime());

		return formatted;
	}

	// 6-11
	public List<PostImagesDetail> listImagesDetail(int postId) {

		String img = "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.";
		List<PostImages> listImages = postImagesService.getListPostImagesByPostID(postId);
		List<PostImagesDetail> listImagesDetail = new ArrayList<>();
		for (PostImages postImages : listImages) {
			PostImagesDetail postImagesDetail = new PostImagesDetail();
			if(postImages.getLink_image().equals("")) {
				postImages.setLink_image(img);
			}
			postImagesDetail.setLink_image(postImages.getLink_image());
			listImagesDetail.add(postImagesDetail);
		}
		return listImagesDetail;
	}

	// 6-11
	@GetMapping("/v1/admin/getListPostReported")
	public ResponseEntity<List<PostReported>> getListPostReported() {
		try {

			return ResponseEntity.status(200).body(postReportedService.getAllPostReported());
		} catch (Exception e) {
			System.out.println("Error at admin/getListPostReported: " + e);
			return ResponseEntity.status(403).body(null);
		}

	}

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
