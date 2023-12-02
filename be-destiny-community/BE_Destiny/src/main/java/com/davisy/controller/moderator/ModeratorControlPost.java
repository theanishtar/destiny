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
import com.davisy.dto.PostReportedDTO;
import com.davisy.entity.Post;
import com.davisy.entity.PostImages;
import com.davisy.entity.PostReported;
import com.davisy.entity.User;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.service.ModeratorPostReportedService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostReportedService;
import com.davisy.service.PostService;
import com.davisy.service.UserService;

@RestController
@CrossOrigin("*")
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
	
	@Autowired
	private PostImagesService postImagesService;

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;
	int year = now.get(Calendar.YEAR);
	
//	
//	@GetMapping("/v1/moderator/detailPost/{postid}")
//	public ResponseEntity<AdminPostDetail> detailPost(@PathVariable int postid) {
//		try {
//			Post post = postService.findPostByID(postid);
//
////			return ResponseEntity.status(200).body(AdminControl.setPostDetail(post));
//			return ResponseEntity.status(200).body(null);
//
//		} catch (Exception e) {
//			System.out.println("Error at moderator/detailPost: " + e);
//			return ResponseEntity.status(403).body(null);
//		}
//	}

	public int totalPost(int time, String date) {
		List<ModeratorPostReported> postReporteds = moderatorPostReportedService.findAll();

		int totalPost = 0;
	
		switch (date) {
		case "day": {
			for (ModeratorPostReported postReported : postReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(postReported.getDate_report());
				if (calendar.get(Calendar.DAY_OF_MONTH) == time && calendar.get(Calendar.MONTH) == month && calendar.get(Calendar.YEAR) == year) {
					totalPost++;
				}
			}
			break;

		}
		case "month": {
			for (ModeratorPostReported postReported : postReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(postReported.getDate_report());
				if (calendar.get(Calendar.MONTH) == time && calendar.get(Calendar.YEAR) == year) {
					totalPost++;
				}
			}
			break;
		}
		case "year": {
			for (ModeratorPostReported postReported : postReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(postReported.getDate_report());
				if (calendar.get(Calendar.YEAR) == time) {
					totalPost++;
				}
			}
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + date);
		}

		return totalPost;
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalPostReportedByYear")
	public int getTotalPostReportedByYear() {

		return totalPost(year, "year");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalPostReportedByMonth")
	public int getTotalPostReportedByMonth() {

		return totalPost(month, "month");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getTotalPostReportedByDay")
	public int getTotalPostReportedByDay() {
		
		int day = now.get(Calendar.DAY_OF_MONTH);
		return totalPost(day, "day");
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentPostReportedYearIncrease")
	public double getPercentPostReportedYearIncrease() {
		int previousYear = now.get(Calendar.YEAR) - 1;
		int currentYear = now.get(Calendar.YEAR);
		int previousMonthValue = totalPost(previousYear, "year");
		int currentMonthValue = totalPost(currentYear, "year");

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentPostReportedMonthIncrease")
	public double getPercentPostReportedMonthIncrease() {
		int previousMonth = now.get(Calendar.MONTH);
		int currentMonth = previousMonth + 1;
		int previousMonthValue = totalPost(previousMonth, "month"
				+ "");
		int currentMonthValue = totalPost(currentMonth, "month");

		return caculatePercentIncrease(previousMonthValue, currentMonthValue);
	}

	// lastest update 1-11
	@GetMapping("/v1/moderator/getPercentPostReportedDayIncrease")
	public double getPercentPostReportedDayIncrease() {
		int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
		int currentDay = now.get(Calendar.DAY_OF_MONTH);
		int previousMonthValue = totalPost(previousDay, "day");
		int currentMonthValue = totalPost(currentDay, "day");

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

	@GetMapping("/v1/moderator/postReporteds")
	public List<PostReportedDTO> listReporteds() {
		List<ModeratorPostReported> postReporteds = moderatorPostReportedService.findAll();
		List<PostReportedDTO> listPostReported = new ArrayList<>();
		for (ModeratorPostReported postReported : postReporteds) {
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(postReported.getDate_report());
			if (calendar.get(Calendar.YEAR) == year) {
				PostReportedDTO pdto = setPostReported(postReported);
				listPostReported.add(pdto);			}
		}
		
		return listPostReported;
	}
	
	public PostReportedDTO setPostReported(ModeratorPostReported postReported) {

		PostReportedDTO postReportedDTO = new PostReportedDTO();
		postReportedDTO.setId(postReported.getId());
		postReportedDTO.setPost_id(postReported.getPost_reported_id());
		Post post = postService.findById(Integer.valueOf(postReported.getPost_reported_id()));
		postReportedDTO.setContent_post(post.getContent());
		postReportedDTO.setDate_post(formatDate(post.getDate_Post()));
		postReportedDTO.setProduct(post.getProduct());
		postReportedDTO.setPostImage(imagesDetail(post.getPost_id()));
		postReportedDTO.setContent_report(postReported.getContent_report());
		Calendar time = new GregorianCalendar();
		time.setTime(postReported.getDate_report());
		postReportedDTO.setDate_report(formatDate(time));
		
		return postReportedDTO;
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
	public String imagesDetail(int postId) {

		String img = "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.";
		List<PostImages> listImages = postImagesService.getListPostImagesByPostID(postId);
		int i = 0;
		for (PostImages postImages : listImages) {
			i++;
			if(!postImages.getLink_image().equals("") && i == 1) {
				img = postImages.getLink_image();
			}
		}
		return img;
	}

	@GetMapping("/v1/moderator/findPostReported")
	public ModeratorPostReported findPostReported() {

		String post_reported_id = "49";
		String user_send_report_id = "8";
		ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");

//		PostReported postReported = moderatorPostReportedService.findByColumn("post_reported_id", post_reported_id); 
//		PostReported postReported = moderatorPostReportedService.findByColumn("user_send_report_id", user_send_report_id);
//		PostReported postReported = moderatorPostReportedService.findById(id);
		ModeratorPostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id",
				post_reported_id, "user_send_report_id", user_send_report_id);
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
			if (moderatorPostReportedService.checkExistReport(post_reported_id, user_send_report_id) == false) {
				moderatorPostReportedService.insert(postReported);
			}
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}

	@DeleteMapping("/v1/moderator/deletePostReported")
	public String delete() {
		try {
			String post_reported_id = "49";
			String user_send_report_id = "7";
			ModeratorPostReported postReported = moderatorPostReportedService.findByTwoColumn("post_reported_id",
					post_reported_id, "user_send_report_id", user_send_report_id);
			moderatorPostReportedService.delete(postReported.getId());
			return "Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "ERROR" + e;
		}
	}

	@DeleteMapping("/v1/moderator/sendPostReported/{id}")
	public ResponseEntity<String> sendPostToAdmin(@PathVariable ObjectId id){
		try {
//			ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");
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

			// thêm vào db
			postReportedService.create(postReported);

			// xóa khỏi mongo
			removePostFromMongo(moderatorPostReported.getId());

			return ResponseEntity.status(200).body(null);
		} catch (Exception e) {
			e.printStackTrace(); 
			return ResponseEntity.status(403).body(null);
		}
	}

	@DeleteMapping("/v1/moderator/removePostReported")
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
