package com.davisy.controller.admin;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.dto.AdminPostTOP4;
import com.davisy.dto.PostImagesDetail;
import com.davisy.entity.Post;
import com.davisy.entity.PostImages;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostService;

import jakarta.annotation.security.RolesAllowed;

@RestController
@CrossOrigin("*")
@RolesAllowed("ROLE_ADMIN")
public class AdminPostStatistics {
	@Autowired
	private PostService postService;
	@Autowired
	private PostImagesService postImagesService;
	
	Calendar now = Calendar.getInstance();

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalPostByYear")
	public int getTotalPostByYear() {
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		return postService.getTotalPostByYear(year);
	}

//	 21-9-2023 -lấy tổng số bài đăng
//	 lastest update 14-10
	// latsest 1-11
	@GetMapping("/v1/admin/getTotalPostByMonth")
	public int getTotalPostByMonth() {
		int month = now.get(Calendar.MONTH) + 1;
		return postService.getTotalPostByMonth(month);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getTotalPostByDay")
	public int getTotalPostByDay() {
		int day = now.get(Calendar.DAY_OF_MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		return postService.getTotalPostByDay(day, month);
	}


	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostYearIncrease")
	public double getPercentPostYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = postService.getTotalPostByYear(previousYear);
		int currentMonthValue = postService.getTotalPostByYear(currentYear);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

		
	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostMonthIncrease")
	public double getPercentPostMonthIncrease() {
		int previousMonth = now.get(Calendar.MONTH);
		int currentMonth = previousMonth + 1;
		int previousMonthValue = postService.getTotalPostByMonth(previousMonth);
		int currentMonthValue = postService.getTotalPostByMonth(currentMonth);

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/admin/getPercentPostDayIncrease")
	public double getPercentPostDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		int previousMonthValue = postService.getTotalPostByDay(previousDay, month);
		int currentMonthValue = postService.getTotalPostByDay(currentDay, month);

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

	// 21-9-2023 -lấy phần trăm bài đăng có trạng thái đã gửi
	@GetMapping("/v1/admin/getPercentPostSendSuccess")
	public double getPercentPostSendSuccess() {
		return postService.getPercentPostSendSuccess();
	}

	// 22-9-2023 -TOP 4 bài đăng
	// update lastest 4-10
	@GetMapping("/v1/admin/getTOP4Post")
	public ResponseEntity<List<AdminPostTOP4>> getTOP4User() {
		try {
			List<Object[]> listTOP4Post = postService.getTOP4Post();
			;
			List<AdminPostTOP4> newList = new ArrayList<>();
			for (Object[] oj : listTOP4Post) {
				Post post = postService.findPostByID(Integer.valueOf(String.valueOf(oj[0])));
				AdminPostTOP4 adminPostTOP4 = new AdminPostTOP4();
				adminPostTOP4.setPost_id(post.getPost_id());
				adminPostTOP4.setContent(post.getContent());
				adminPostTOP4.setProduct(post.getProduct());

				adminPostTOP4.setListPostImages(listImagesDetail(post.getPost_id()));

				adminPostTOP4.setUser_email(post.getUser().getEmail());
				adminPostTOP4.setUser_fullname(post.getUser().getFullname());
				adminPostTOP4.setUser_avatar(post.getUser().getAvatar());
				newList.add(adminPostTOP4);
			}
			return ResponseEntity.status(200).body(newList);
		} catch (Exception e) {
			System.out.println("Error at admin/getTOP4Post: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// update lastest 7-10
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

	// 22-9-2023 -Tổng số bài đăng theo từng tháng
	// update lastest 4-10
	@GetMapping("/v1/admin/getTotalPostEveryMonth")
	public ResponseEntity<int[]> getTotalUserEveryMonth() {
		try {
			List<Object[]> list = postService.getTotalPostEveryMonth();
			int[] listMonth = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
			int[] listTotalPost = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

			for (Object[] oj : list) {
				String month = String.valueOf(oj[0]);
				for (int i = 0; i < listMonth.length; i++) {
					if (month.equals(String.valueOf(i + 1))) {
						listTotalPost[i] = Integer.valueOf(String.valueOf(oj[1]));
					}
				}
			}
			return ResponseEntity.status(200).body(listTotalPost);
		} catch (Exception e) {
			System.out.println("Error at admin/getTotalPostEveryMonth: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// 22-9-2023 -TOP 3 sản phẩm được đăng bài nhiều nhất
	@GetMapping("/v1/admin/getTOP3Product")
	public ResponseEntity<List<Object[]>> getTOP3Product() {
		try {
			return ResponseEntity.status(200).body(postService.getTOP3Product());
		} catch (Exception e) {
			System.out.println("Error at admin/getTOP3Product: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

}
