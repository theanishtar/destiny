package com.davisy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.SpamRrequestCheck;
import com.davisy.config.JwtTokenUtil;
import com.davisy.constant.Cache;
import com.davisy.entity.Comment;
import com.davisy.entity.CommentEntity;
import com.davisy.entity.Districts;
import com.davisy.entity.Follower;
import com.davisy.entity.Interested;
import com.davisy.entity.Post;
import com.davisy.entity.PostEntity;
import com.davisy.entity.PostImages;
import com.davisy.entity.Provinces;
import com.davisy.entity.UploadPostEntity;
import com.davisy.entity.User;
import com.davisy.entity.Wards;
import com.davisy.service.CommentService;
import com.davisy.service.DistrictService;
import com.davisy.service.FollowService;
import com.davisy.service.InterestedService;
import com.davisy.service.PostImagesService;
import com.davisy.service.PostService;
import com.davisy.service.ProvinceService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;
import com.davisy.service.WardService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
class RepCommentModel {
	int idPost;
	int cmtId;
}

@RestController
@CrossOrigin
public class PostController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserService userService;

	@Autowired
	PostService postService;

	@Autowired
	PostImagesService postImagesService;

	@Autowired
	InterestedService interestedService;

	@Autowired
	CommentService commentService;

	@Autowired
	ShareService shareService;

	@Autowired
	FollowService followService;

	@Autowired
	private ProvinceService provinceService;
	@Autowired
	private DistrictService districtService;
	@Autowired
	private WardService wardService;

	List<PostEntity> listPost = new ArrayList<>();

	Object[] commObjects = new Object[] {};

	@GetMapping("/v1/user/getTop5Post")
	public ResponseEntity<List<Object[]>> getTOP5Post() {
		List<Object[]> list = postService.getTOP5Post();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/v1/user/load/post")
	public ResponseEntity<List<PostEntity>> loadPost(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			int provinceId = Integer.valueOf(user.getIdProvince());
			List<Object[]> postProfile = postService.findAllPost(id, provinceId);
			return ResponseEntity.ok().body(postEntity(postProfile));
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/upload/post")
	public ResponseEntity<List<PostEntity>> createPost(HttpServletRequest request,
			@RequestBody UploadPostEntity uploadPostEntity) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<PostImages> listPostImages = new ArrayList<>();

			Post post = new Post();
			post.setUser(user);
			post.setContent(uploadPostEntity.getContent());
			post.setHash_Tag(hashTag(uploadPostEntity.getHash_tag()));
//			post.setDate_Post( GregorianCalendar.getInstance());
//			Provinces provinces =provinceService.provinces(uploadPostEntity.getProvince_name());
//			Districts districts =districtService.districts(uploadPostEntity.getDistrict_name(),provinces.getCode());
//			Wards wards =wardService.ward(uploadPostEntity.getWard_name(), districts.getCode());

			String provinceCode = provinceService.provinceCode(uploadPostEntity.getProvince_name());
			Provinces province = provinceService.findProvinceByID(provinceCode);

			String districtCode = districtService.districtCode(uploadPostEntity.getDistrict_name(), provinceCode);
			Districts district = districtService.findDistrictByID(districtCode);

			String wardCode = wardService.wardCode(uploadPostEntity.getWard_name(), districtCode);
			Wards ward = wardService.findWardByID(wardCode);
			post.setProvinces(province);
			post.setDistricts(district);
			post.setWards(ward);
			post.setPost_status(uploadPostEntity.isPost_status());
			post.setProduct(uploadPostEntity.getProduct());
			postService.create(post);
			for (String img : uploadPostEntity.getPost_images()) {
				PostImages postImages = new PostImages();
				postImages.setLink_image(img);
				postImages.setPost(post);
				postImagesService.create(postImages);
			}
			int provinceId = Integer.valueOf(user.getIdProvince());
			List<Object[]> postProfile = postService.findAllPost(id, provinceId);
			return ResponseEntity.ok().body(postEntity(postProfile));
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	public String hashTag(String hash_tag) {
		String[] words = hash_tag.split("\\s+"); // Tách chuỗi thành các từ
		String hash = "";
		String hash1 = "";
		String hash2 = "";

		for (String word : words) {
			if (word.startsWith("#")) {
				int count = word.length() - word.replace("#", "").length(); // Đếm số ký tự '#'

				if (count == 1) {
					hash1 += word + ",";
				} else if (count > 1) {
					hash2 += word.substring(0, word.indexOf('#', 1)) + ",";
				}
			}
		}

		hash = hash1 + hash2;
		if (hash.substring(hash.length() - 1, hash.length()).equals(",")) {
			return hash.substring(0, hash.length() - 1);
		}
		return hash;

	}

	@SpamRrequestCheck
	@PostMapping("/v1/user/load/comment")
	public ResponseEntity<CommentEntity> loadCmment(HttpServletRequest request, @RequestBody int id) {
		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userService.findByEmail(email);
			List<Object[]> commentEntities = commentService.findAllComment(id, 0);
			List<String> list_post_images = postImagesService.findAllImagesofPost(id);
			CommentEntity commentEntity = new CommentEntity(list_post_images, commentEntities);
			return ResponseEntity.ok().body(commentEntity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@SpamRrequestCheck
	@PostMapping("/v1/user/load/comment/reply")
	public ResponseEntity<CommentEntity> loadSeenMoreComment(HttpServletRequest request,
			@RequestBody RepCommentModel reModel) {
		System.out.println(reModel.idPost + "" + reModel.cmtId);
		try {
//			String email = jwtTokenUtil.getEmailFromHeader(request);
//			User user = userService.findByEmail(email);
			List<Object[]> commentEntities = commentService.findAllComment(reModel.idPost, reModel.cmtId);
			List<String> list_post_images = null;
			CommentEntity commentEntity = new CommentEntity(list_post_images, commentEntities);
			return ResponseEntity.ok().body(commentEntity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/load/data/post/update")
	public ResponseEntity<Object[]> loadPostUpdate(@RequestBody int idPost) {
		try {
			Post post = postService.findById(idPost);
			String province_name_vn = post.getProvinces().getFull_name();
			String districs_name_vn = post.getDistricts().getFull_name();
			String ward_name_vn = post.getWards().getFull_name();
			String province_name_en = post.getProvinces().getFull_name_en();
			String districs_name_en = post.getDistricts().getFull_name_en();
			String ward_name_en = post.getWards().getFull_name_en();
			Object[] objects = new Object[] { post, province_name_vn, districs_name_vn, ward_name_vn, province_name_en,
					districs_name_en, ward_name_en };
			return ResponseEntity.ok().body(objects);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/data/update/post")
	public ResponseEntity<List<PostEntity>> updatePost(HttpServletRequest request,
			@RequestBody UploadPostEntity uploadPostEntity) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			int idPost = uploadPostEntity.getPost_id();
			List<String> listImages = uploadPostEntity.getPost_images();
			Post post = postService.findById(idPost);
			post.setUser(user);
			post.setContent(uploadPostEntity.getContent());
			post.setHash_Tag(hashTag(uploadPostEntity.getHash_tag()));
			String provinceCode = provinceService.provinceCode(uploadPostEntity.getProvince_name());
			Provinces province = provinceService.findProvinceByID(provinceCode);

			String districtCode = districtService.districtCode(uploadPostEntity.getDistrict_name(), provinceCode);
			Districts district = districtService.findDistrictByID(districtCode);

			String wardCode = wardService.wardCode(uploadPostEntity.getWard_name(), districtCode);
			Wards ward = wardService.findWardByID(wardCode);
			post.setProvinces(province);
			post.setDistricts(district);
			post.setWards(ward);
			post.setSend_status(uploadPostEntity.isSend_status());
			post.setPost_status(uploadPostEntity.isPost_status());
			post.setProduct(uploadPostEntity.getProduct());
			postService.update(post);
			List<PostImages> listPostImg = postImagesService.getListPostImagesByPostID(idPost);
			int i = 0;
			for (PostImages pi : listPostImg) {
				pi.setLink_image(listImages.get(i));
				postImagesService.update(pi);
				i++;
			}
			int provinceId = Integer.valueOf(user.getIdProvince());
			List<Object[]> postProfile = postService.findAllPost(id, provinceId);
			return ResponseEntity.ok().body(postEntity(postProfile));
		} catch (Exception e) {
			System.out.println("Lỗi nè: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	public List<PostEntity> postEntity(List<Object[]> postProfile) {
		List<PostEntity> postEntityProfile = new ArrayList<>();
		for (Object[] ob : postProfile) {
			if (null != ob[2]) {
				int user_id = Integer.valueOf(ob[1].toString());
				int idPostShare = Integer.valueOf(ob[2].toString());
				List<Object[]> postShare = postService.getPostProfile(user_id, idPostShare);
				PostEntity profileTemp = new PostEntity();
				for (Object[] o : postShare) {
					profileTemp = postEntityProfile(o, null);
				}
				postEntityProfile.add(postEntityProfile(ob, profileTemp));
			} else {
				postEntityProfile.add(postEntityProfile(ob, null));
			}
		}
		return postEntityProfile;
	}

	public PostEntity postEntityProfile(Object[] ob, PostEntity entityProfile) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			PostEntity profile = new PostEntity();
			profile.setPost_id(Integer.valueOf(ob[0].toString()));
			profile.setUser_id(Integer.valueOf(ob[1].toString()));
			profile.setContent(ob[3] + "");
			Date date = dateFormat.parse(ob[4] + "");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			profile.setDate_post(calendar);
			profile.setHash_tag(ob[5] + "");
			profile.setSend_status(Boolean.valueOf(ob[6] + ""));
			profile.setPost_status(Boolean.valueOf(ob[7] + ""));
			profile.setProduct(ob[8] + "");
			profile.setBan(Boolean.valueOf(ob[9] + ""));
			profile.setCountInterested(Integer.valueOf(ob[10].toString()));
			profile.setCountCommnet(Integer.valueOf(ob[11].toString()));
			profile.setCountShare(Integer.valueOf(ob[12].toString()));
			profile.setImages(postImagesService.findAllImagesofPost(profile.getPost_id()));
			User user = userService.findById(profile.getUser_id());
			List<Object[]> userOb = interestedService.findByIdPost(profile.getPost_id());
			profile.setUser(userOb);
			profile.setFullname(ob[13] + "");
			profile.setAvatar(ob[14] + "");
			if (entityProfile != null)
				profile.setPostEntityProfile(entityProfile);
			return profile;
		} catch (Exception e) {
			System.out.println("Error postEntityProfile: " + e);
			return null;
		}

	}

	public static String getTime(Calendar datePost) {
		String timeCaculate = "";
		Calendar calendar = GregorianCalendar.getInstance();

		long currentTimeMillis = calendar.getTimeInMillis();
		long postTimeMillis = datePost.getTimeInMillis();

		long timeDifferenceMillis = currentTimeMillis - postTimeMillis;

		long seconds = timeDifferenceMillis / 1000;
		long minutes = seconds / 60;
		long hours = minutes / 60;
		long days = hours / 24;

		if (hours > 0) {
			timeCaculate = hours + " giờ trước";
		} else if (minutes > 0) {
			timeCaculate = minutes + " phút trước";
		} else {
			timeCaculate = seconds + " giây trước";
		}

		return timeCaculate;
	}

	// cach sai
	public void time() {
		Calendar calendar = GregorianCalendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);
	}
}
