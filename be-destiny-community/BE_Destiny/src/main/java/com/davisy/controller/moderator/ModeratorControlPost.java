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
import com.davisy.dto.CommentDetail;
import com.davisy.dto.PostImagesDetail;
import com.davisy.dto.PostReportedDTO;
import com.davisy.dto.UserSendReport;
import com.davisy.entity.Comment;
import com.davisy.entity.Post;
import com.davisy.entity.PostImages;
import com.davisy.entity.PostReported;
import com.davisy.entity.User;
import com.davisy.entity.UserReported;
import com.davisy.mongodb.documents.ModeratorPostReported;
import com.davisy.service.CommentService;
import com.davisy.service.FollowService;
import com.davisy.service.InterestedService;
import com.davisy.service.ModeratorPostReportedService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostReportedService;
import com.davisy.service.PostService;
import com.davisy.service.ShareService;
import com.davisy.service.UserReportedService;
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

	@Autowired
	private InterestedService interestedService;
	@Autowired
	private ShareService shareService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private FollowService followService;
	
	@Autowired
	private UserReportedService userReportedService;

	Calendar now = Calendar.getInstance();
	int month = now.get(Calendar.MONTH) + 1;
	int year = now.get(Calendar.YEAR);
	

	
	@GetMapping("/v1/moderator/detailUser/{email}")
	public ResponseEntity<AdminUserProfile> detailUser(@PathVariable String email) {
		try {
			User user = userService.findByEmail(email);

			return ResponseEntity.status(200).body(setUserDetail(user));
		} catch (Exception e) {
			System.out.println("Error at moderator/detailUser: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}
	
	public AdminUserProfile setUserDetail(User user) {

		AdminUserProfile userProfile = new AdminUserProfile();

		userProfile.setFullname(user.getFullname());
		userProfile.setEmail(user.getEmail());
		userProfile.setIntro(user.getIntro());

		userProfile.setBirthday(formatDate(user.getBirthday()));

		userProfile.setDay_join(String.valueOf(user.getDay_create().get(Calendar.DAY_OF_MONTH)));
		userProfile.setMonth_join(String.valueOf(user.getDay_create().get(Calendar.MONTH) + 1));
		userProfile.setYear_join(String.valueOf(user.getDay_create().get(Calendar.YEAR)));

		userProfile.setCity_name(user.getProvinces().getFull_name());
		userProfile.setGender_name(user.getGender().getGender_name());
		userProfile.setAvatar(user.getAvatar());
		userProfile.setThumb(user.getThumb());
		userProfile.setMark(user.getMark());
		
		userProfile.setBan(user.isBan());

		userProfile.setTotalPost(userTotalPost(user.getUser_id()));

		userProfile.setTotalInterested(userTotalInterested(user.getUser_id()));

		userProfile.setTotalFollower(userTotalFollower(user.getUser_id()));

		userProfile.setTotalComment(userTotalComment(user.getUser_id()));

		userProfile.setTotalShare(userTotalShare(user.getUser_id()));

		List<Post> listPost = postService.getListPostByUserID(user.getUser_id());

		List<AdminPostDetail> listAdminPostDetails = new ArrayList<>();

		for (Post post : listPost) {
			if (post.getPostParent() == null && post.isBan() == false && post.isPost_status() == true) {
				listAdminPostDetails.add(setPostDetail(post));
			}
		}

		userProfile.setListAllPostOfUser(listAdminPostDetails);
		userProfile.setListUserSendReports(listUserSendReportToUser(user.getUser_id()));

		return userProfile;
	}
	
	public List<UserSendReport> listUserSendReportToUser(int userId) {

		List<UserReported> userReporteds = userReportedService.getAllUserReportedById(userId);
		List<UserSendReport> listUserSendReport = new ArrayList<>();
		for (UserReported userR : userReporteds) {
			UserSendReport userSendReport = new UserSendReport();
			userSendReport.setEmail(userR.getUserSendReport().getEmail());
			userSendReport.setFullname(userR.getUserSendReport().getFullname());
			userSendReport.setAvatar(userR.getUserSendReport().getAvatar());
			userSendReport.setContent(userR.getContent_report());
			userSendReport.setDate_report(formatDate(userR.getDate_report()));
			listUserSendReport.add(userSendReport);
		}

		return listUserSendReport;
	}


	@GetMapping("/v1/moderator/detailPost/{postid}")
	public ResponseEntity<AdminPostDetail> detailPost(@PathVariable int postid) {
		try {
			Post post = postService.findPostByID(postid);

			return ResponseEntity.status(200).body(setPostDetail(post));

		} catch (Exception e) {
			System.out.println("Error at moderator/detailPost: " + e);
			return ResponseEntity.status(403).body(null);
		}
	}

	// update lastest 7-10
	public AdminPostDetail setPostDetail(Post post) {

		AdminPostDetail postDTO = new AdminPostDetail();

		postDTO.setPost_id(post.getPost_id());

		postDTO.setUser_email(post.getUser().getEmail());

		postDTO.setUser_fullname(post.getUser().getFullname());

		postDTO.setUser_avatar(post.getUser().getAvatar());

		postDTO.setContent(post.getContent());

		postDTO.setDate_Post(timeCaculate(post.getDate_Post()));

		postDTO.setProduct(post.getProduct());
		
		postDTO.setBan(post.isBan());

		postDTO.setTotalInterested(postTotalInterested(post.getPost_id()));

		postDTO.setTotalShare(postTotalShare(post.getPost_id()));

		postDTO.setTotalComment(postTotalComment(post.getPost_id()));

		postDTO.setListPostImages(listImagesDetail(post.getPost_id()));

		postDTO.setListComments(listCommentDetail(post.getPost_id()));

		postDTO.setListUserSendReports(listUserSendReportToPost(post.getPost_id()));

		return postDTO;
	}


	// update lastest 7-10
	public int userTotalPost(int userId) {
		return postService.getTotalPostByUser(userId);
	}

	// update lastest 7-10
	public int userTotalInterested(int userId) {
		return interestedService.totalInterestedByUser(userId);
	}

	// update lastest 7-10
	public int userTotalFollower(int userId) {
		return followService.countFollowers(userId);
	}

	// update lastest 7-10
	public int userTotalComment(int userId) {
		return commentService.totalCommentByUser(userId);
	}

	// update lastest 7-10
	public int userTotalShare(int userId) {
		return shareService.totalShareByUser(userId);
	}

	// update lastest 7-10
	public int postTotalInterested(int postId) {
		return interestedService.totalInterestedByPost(postId);
	}

	// update lastest 7-10
	public int postTotalShare(int postId) {
		return shareService.totalShareByPost(postId);
	}

	// update lastest 7-10
	public int postTotalComment(int postId) {
		return commentService.totalCommentByPost(postId);
	}

	// update lastest 7-10
	public String timeCaculate(Calendar datePost) {
		String timeCaculate = "";

		Calendar calendar = GregorianCalendar.getInstance();

		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);

		int dayPost = datePost.get(Calendar.DAY_OF_MONTH);
		int monthPost = datePost.get(Calendar.MONTH) + 1;
		int yearPost = datePost.get(Calendar.YEAR);

		int yearCaculate = year - yearPost;
		int monthCaculate = month - monthPost;

		int totalDayInMonth = checkMonth(monthPost, yearPost);
		int dayCaculate = (totalDayInMonth - dayPost) + day;

		if (yearCaculate > 0) {
			timeCaculate = String.valueOf(yearCaculate + " năm trước");
		}
		if (monthCaculate == 1) {

			if (dayCaculate <= 7) {
				timeCaculate = String.valueOf(dayCaculate + " ngày trước");
			} else if (dayCaculate > 7 && dayCaculate <= 14) {
				timeCaculate = String.valueOf("2 tuần trước");
			} else if (dayCaculate > 14 && dayCaculate <= 21) {
				timeCaculate = String.valueOf("3 tuần trước");
			} else {
				timeCaculate = String.valueOf(monthCaculate + " tháng trước");
			}

		} else if (monthCaculate > 1) {
			timeCaculate = String.valueOf(monthCaculate + " tháng trước");
		} else {
			int time = dayCaculate - totalDayInMonth;
			if (time == 0) {
				timeCaculate = String.valueOf("Vài giờ trước");
			} else {
				timeCaculate = String.valueOf(time + " ngày trước");
			}
		}

		return timeCaculate;

	}

	// update lastest 7-10
	public boolean checkYear(int year) {
		return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
	}

	// update lastest 7-10
	public int checkMonth(int month, int year) {
		int totalDayInMonth = 0;
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
			totalDayInMonth = 31;
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {
			totalDayInMonth = 30;
		} else if (month == 2) {
			if (checkYear(year)) {
				totalDayInMonth = 29;
			} else {
				totalDayInMonth = 28;
			}
		}
		return totalDayInMonth;
	}

	// update lastest 7-10
	public List<PostImagesDetail> listImagesDetail(int postId) {
		String img = "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.";
		List<PostImages> listImages = postImagesService.getListPostImagesByPostID(postId);
		List<PostImagesDetail> listImagesDetail = new ArrayList<>();
		for (PostImages postImages : listImages) {
			PostImagesDetail postImagesDetail = new PostImagesDetail();
			if (postImages.getLink_image().equals("")) {
				postImages.setLink_image(img);
			}
			postImagesDetail.setLink_image(postImages.getLink_image());
			listImagesDetail.add(postImagesDetail);
		}
		return listImagesDetail;
	}

	// update lastest 7-10
	public List<CommentDetail> listCommentDetail(int postId) {

		List<Comment> listComment = commentService.getListCommentByPostID(postId);

		List<CommentDetail> listCommentDetail = new ArrayList<>();

		for (Comment comment : listComment) {
			if (comment.getCommentParent() == null) {
				CommentDetail commentDetail = new CommentDetail();
				commentDetail.setContent(comment.getContent());
				commentDetail.setUser_fullname(comment.getUser().getFullname());
				commentDetail.setUser_avatar(comment.getUser().getAvatar());
				commentDetail.setUser_email(comment.getUser().getEmail());
				commentDetail.setTime_comment(timeCaculate(comment.getDate_comment()));
				;
				List<Comment> listCommentReply = commentService.findAllByIdComment(comment.getComment_id());
				commentDetail.setListCommentReply(setlistCommentDetail(listCommentReply));

				listCommentDetail.add(commentDetail);
			}
		}

		return listCommentDetail;
	}

	public List<CommentDetail> setlistCommentDetail(List<Comment> listComment) {

		List<CommentDetail> listCommentDetail = new ArrayList<>();

		for (Comment comment : listComment) {
			CommentDetail commentDetail = new CommentDetail();
			commentDetail.setContent(comment.getContent());
			commentDetail.setUser_fullname(comment.getUser().getFullname());
			commentDetail.setUser_avatar(comment.getUser().getAvatar());
			commentDetail.setUser_email(comment.getUser().getEmail());
			commentDetail.setTime_comment(timeCaculate(comment.getDate_comment()));

			listCommentDetail.add(commentDetail);
		}

		return listCommentDetail;
	}

	// update lastest 8-11
	public List<UserSendReport> listUserSendReportToPost(int postId) {

		List<PostReported> postReporteds = postReportedService.getAllPostReportedById(postId);
		List<UserSendReport> listUserSendReport = new ArrayList<>();
		for (PostReported postR : postReporteds) {
			UserSendReport userSendReport = new UserSendReport();
			userSendReport.setEmail(postR.getUserSendReport().getEmail());
			userSendReport.setFullname(postR.getUserSendReport().getFullname());
			userSendReport.setAvatar(postR.getUserSendReport().getAvatar());
			userSendReport.setContent(postR.getContent_report());
			userSendReport.setDate_report(formatDate(postR.getDate_report()));
			listUserSendReport.add(userSendReport);
		}

		return listUserSendReport;
	}

	public int totalPost(int time, String date) {
		List<ModeratorPostReported> postReporteds = moderatorPostReportedService.findAll();

		int totalPost = 0;

		switch (date) {
		case "day": {
			for (ModeratorPostReported postReported : postReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(postReported.getDate_report());
				if (calendar.get(Calendar.DAY_OF_MONTH) == time && calendar.get(Calendar.MONTH) == month
						&& calendar.get(Calendar.YEAR) == year) {
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
		int previousMonthValue = totalPost(previousMonth, "month" + "");
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
		if(postReporteds != null) {
			for (ModeratorPostReported postReported : postReporteds) {
				Calendar calendar = new GregorianCalendar();
				calendar.setTime(postReported.getDate_report());
				if (calendar.get(Calendar.YEAR) == year) {
					PostReportedDTO pdto = setPostReported(postReported);
					listPostReported.add(pdto);
				}
			}
		}

		return listPostReported;
	}

	public PostReportedDTO setPostReported(ModeratorPostReported postReported) {

		PostReportedDTO postReportedDTO = new PostReportedDTO();
		postReportedDTO.setId(postReported.getId());
		postReportedDTO.setPost_id(postReported.getPost_reported_id());
		Post post = postService.findById(Integer.valueOf(postReported.getPost_reported_id()));
		postReportedDTO.setContent_post(truncateText(post.getContent()));
		postReportedDTO.setDate_post(formatDate(post.getDate_Post()));
		postReportedDTO.setProduct(post.getProduct());
		postReportedDTO.setPostImage(imagesDetail(post.getPost_id()));
		postReportedDTO.setContent_report(postReported.getContent_report());
		postReportedDTO.setId_user_send(postReported.getUser_send_report_id());
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
			if (!postImages.getLink_image().equals("") && i == 1) {
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

	@DeleteMapping("/v1/moderator/sendPostReported/{postId}/{userSendId}")
	public ResponseEntity<String> sendPostToAdmin(@PathVariable String postId, @PathVariable String userSendId) {
		try {
//			ObjectId id = new ObjectId("653212f46912a178bfcc9bc8");
			ModeratorPostReported moderatorPostReported = moderatorPostReportedService.findByTwoColumn("post_reported_id",
					postId, "user_send_report_id", userSendId);
			
			System.out.println(moderatorPostReported.getContent_report() + "sadasjdajs");

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
