package com.davisy.controller;

import java.util.ArrayList;
import java.util.Calendar;
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
	public ResponseEntity<PostEntity> loadPost(HttpServletRequest request) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			int provinceId = Integer.valueOf(user.getIdProvince());
			List<Object[]> listUser = userService.getUserofPost(id, provinceId);
			List<Post> listPosts = postService.findAllPost(id, provinceId);
			List<Object[]> listCount = postService.getCountPost(id, provinceId);
			PostEntity entity = new PostEntity();
			entity.setUser(listUser);
			entity.setPost(listPosts);
			entity.setCount(listCount);
			return ResponseEntity.ok().body(entity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/upload/post")
	public ResponseEntity<PostEntity> createPost(HttpServletRequest request,
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
			List<Object[]> listUser = userService.getUserofPost(id, provinceId);
			List<Post> listPosts = postService.findAllPost(id, provinceId);
			List<Object[]> listCount = postService.getCountPost(id, provinceId);
			PostEntity entity = new PostEntity();
			entity.setUser(listUser);
			entity.setPost(listPosts);
			entity.setCount(listCount);
			return ResponseEntity.ok().body(entity);
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
	public ResponseEntity<PostEntity> updatePost(HttpServletRequest request,
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
			if (listImages != null) {
				for (String img : listImages) {
					PostImages images = postImagesService.findById(idPost);
					images.setPost(post);
					images.setLink_image(img);
					postImagesService.update(images);
				}
			}

			List<Object[]> listUser = userService.getUserofPostProfile(id);
			List<Post> listPosts = postService.getListPostByUserID(id);
			List<Object[]> listCount = postService.getCountPostProfile(id);
			PostEntity entity = new PostEntity();
			entity.setUser(listUser);
			entity.setPost(listPosts);
			entity.setCount(listCount);
			return ResponseEntity.ok().body(entity);

		} catch (Exception e) {
			System.out.println("Lỗi nè: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	// cach sai
	public void time() {
		Calendar calendar = GregorianCalendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);
	}
}
