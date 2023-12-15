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
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
import com.davisy.service.BadWordService;
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
@CrossOrigin("*")
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

	@Autowired
	BadWordService badWordService;
	
	List<PostEntity> listPost = new ArrayList<>();

	Object[] commObjects = new Object[] {};

	@GetMapping("/v1/user/getTop5Post")
	public ResponseEntity<List<Object[]>> getTOP5Post() {
		List<Object[]> list = postService.getTOP5Post();
		return ResponseEntity.ok(list);
	}

	@PostMapping("/v1/user/load/post")
	public ResponseEntity<List<PostEntity>> loadPost(HttpServletRequest request, @RequestBody int page) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> post = postService.findAllPost(id, page);
			List<Object[]> postShare = postService.findAllPostShare(id);
			return ResponseEntity.ok().body(postEntity(post, postShare));
		} catch (Exception e) {
			System.out.println("error loadPost: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/load/checkpost")
	public ResponseEntity<String[]> checkPost(HttpServletRequest request, @RequestBody int page) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			List<Object[]> post = postService.findAllPost(id, page);
			System.out.println("post: " + post.size());
			if (post.size() == 0)
				return ResponseEntity.ok().body(null);
			return ResponseEntity.ok().body(new String[] { "success" });
		} catch (Exception e) {
			System.out.println("error loadPost: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/reload/post")
	public ResponseEntity<PostEntity> reloadPost(HttpServletRequest request, @RequestParam("post_id") int post_id,
			@RequestParam("page") int page) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			Object[] post = postService.findByIdPost(id, page, post_id);
			List<Object[]> postShare = postService.findAllPostShare(id);
			PostEntity entity = new PostEntity();
			if (null != ((Object[]) post[0])[2]) {
				int idPostShare = Integer.valueOf(((Object[]) post[0])[2].toString());
				PostEntity profileTemp = new PostEntity();
				for (Object[] ps : postShare) {
					if (Integer.valueOf(ps[0].toString()) == idPostShare) {
						profileTemp = postEntityProfile(ps, null, 1);
						entity = postEntity(post, profileTemp, 0);
						break;
					}
				}
			} else {
				entity = postEntity(post, null, 0);
			}
			return ResponseEntity.ok().body(entity);
		} catch (Exception e) {
			System.out.println("error: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/v1/user/detail/post/{id}")
	public ResponseEntity<PostEntity> detailPost(@PathVariable int id) {
		Object[] post = postService.get_posts_id(id);
		PostEntity entity = new PostEntity();
		if(post.length>0) {
			System.out.println("id2: " + ((Object[]) post[0])[2]);
			if (null != ((Object[]) post[0])[2]) {
				int idPostShare = Integer.valueOf(((Object[]) post[0])[2].toString());
				Object[] postShare = postService.get_posts_share_id(idPostShare);
//				System.out.println("id1: " + ((Object[]) postShare[0])[1]);
				entity = postEntity(post, postEntity(postShare, null, 1), 0);
			} else {
				entity = postEntity(post, null, 0);
			}
			return ResponseEntity.ok().body(entity);
		}
		return ResponseEntity.ok().body(null);
		
	}
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	@PostMapping("/v1/user/upload/post")
	public ResponseEntity<List<PostEntity>> createPost(HttpServletRequest request,
			@RequestBody UploadPostEntity uploadPostEntity) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			int id = user.getUser_id();
			if (badWordService.checkBadword(uploadPostEntity.getContent())) {
//				simpMessagingTemplate.convertAndSend("/topic/error-notification/" + id, true);
				return ResponseEntity.ok().body(null);
			}
			List<PostImages> listPostImages = new ArrayList<>();
			Post post = new Post();
			post.setUser(user);
			post.setContent(uploadPostEntity.getContent());
			if (uploadPostEntity.getHash_tag() != null)
				post.setHash_Tag(hashTag(uploadPostEntity.getHash_tag()));
			else
				post.setHash_Tag("");
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
			if (!uploadPostEntity.getPost_images().isEmpty()) {
				for (String img : uploadPostEntity.getPost_images()) {
					PostImages postImages = new PostImages();
					postImages.setLink_image(img);
					postImages.setPost(post);
					postImagesService.create(postImages);
				}
			}
			List<Object[]> postProfile = postService.findAllPost(id, 1);
			List<Object[]> postShare = postService.findAllPost(id, 1);

			return ResponseEntity.ok().body(postEntity(postProfile, postShare));
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
		try {
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
			System.out.println("id: " + id);
			System.out.println("idPost: " + idPost);
			List<String> listImages = uploadPostEntity.getPost_images();
			Post post = postService.findById(idPost);
			post.setUser(user);
			post.setContent(uploadPostEntity.getContent());

			if (uploadPostEntity.getHash_tag() != null)
				post.setHash_Tag(hashTag(uploadPostEntity.getHash_tag()));
			else
				post.setHash_Tag("");
			Provinces provinces = provinceService.provinces(uploadPostEntity.getProvince_name());
			Districts district = new Districts();
			Wards ward = new Wards();
			if (provinces != null) {
				String districtCode = districtService.districtCode(uploadPostEntity.getDistrict_name(),
						provinces.getCode());
				district = districtService.findDistrictByID(districtCode);

				String wardCode = wardService.wardCode(uploadPostEntity.getWard_name(), districtCode);
				ward = wardService.findWardByID(wardCode);
				post.setProvinces(provinces);
				post.setDistricts(district);
				post.setWards(ward);
			}

			post.setSend_status(uploadPostEntity.isSend_status());
			post.setPost_status(uploadPostEntity.isPost_status());
			post.setProduct(uploadPostEntity.getProduct());
			postService.update(post);
			System.out.println("success update");
//			List<PostImages> listPostImg = postImagesService.getListPostImagesByPostID(idPost);
//			if (listImages.size() > listPostImg.size()) {
//				int i = 0;
//				for (PostImages pi : listPostImg) {
//					pi.setLink_image(listImages.get(i));
//					postImagesService.update(pi);
//					i++;
//				}
//				for (int k = i; k < listImages.size(); k++) {
//					PostImages postImages = new PostImages();
//					postImages.setPost(post);
//					postImages.setLink_image(listImages.get(k));
//					postImagesService.create(postImages);
//				}
//			} else {
//				int i = 0;
//				for (PostImages pi : listPostImg) {
//					if (!listImages.isEmpty())
//						pi.setLink_image(listImages.get(i));
//					else
//						pi.setLink_image("");
//					postImagesService.update(pi);
//					i++;
//				}
//			}
			List<Object[]> postProfile = postService.getPostProfile(id, id, 1);
			List<Object[]> postShare = postService.getPostProfileShare(id, id);
			return ResponseEntity.ok().body(postEntity(postProfile, postShare));
		} catch (Exception e) {
			System.out.println("Lỗi nè: " + e);
			return ResponseEntity.badRequest().build();
		}
	}

	public List<PostEntity> postEntity(List<Object[]> postProfile, List<Object[]> postShare) {
		List<PostEntity> postEntityProfile = new ArrayList<>();
		for (Object[] ob : postProfile) {
			if (null != ob[2]) {
				int idPostShare = Integer.valueOf(ob[2].toString());
				PostEntity profileTemp = new PostEntity();
				for (Object[] ps : postShare) {
					if (Integer.valueOf(ps[0].toString()) == idPostShare) {
						profileTemp = postEntityProfile(ps, null, 1);
						postEntityProfile.add(postEntityProfile(ob, profileTemp, 0));
						break;
					}
				}
			} else {
				postEntityProfile.add(postEntityProfile(ob, null, 0));
			}
		}
		return postEntityProfile;
	}

	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public PostEntity postEntity(Object[] ob, PostEntity entityProfile, int check) {
		try {
//	    	((Object[])ob[0])[2]
			PostEntity profile = new PostEntity();
			profile.setPost_id(Integer.valueOf(((Object[]) ob[0])[0].toString()));
			profile.setUser_id(Integer.valueOf(((Object[]) ob[0])[1].toString()));
			profile.setContent(((Object[]) ob[0])[3] + "");

			// Xử lý ngày tháng
			Date date = null;
			if (((Object[]) ob[0])[4] != null && !((Object[]) ob[0])[4].toString().isEmpty()) {
				date = dateFormat.parse(((Object[]) ob[0])[4].toString());
			}
			if (date != null) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(date);
				profile.setDate_post(calendar);
			}

			profile.setHash_tag(((Object[]) ob[0])[5] + "");
			profile.setSend_status(Boolean.valueOf(((Object[]) ob[0])[6] + ""));
			profile.setPost_status(Boolean.valueOf(((Object[]) ob[0])[7] + ""));
			profile.setProduct(((Object[]) ob[0])[8] + "");

			if (!((Object[]) ob[0])[9].toString().isEmpty()) {
				profile.setBan(Boolean.valueOf(((Object[]) ob[0])[9] + ""));
			}

			profile.setCountInterested(Integer.valueOf(((Object[]) ob[0])[10].toString()));
			profile.setCountCommnet(Integer.valueOf(((Object[]) ob[0])[11].toString()));
			profile.setCountShare(Integer.valueOf(((Object[]) ob[0])[12].toString()));

			if (((Object[]) ob[0])[2] == null) {
				profile.setImages(postImagesService.findAllImagesofPost(profile.getPost_id()));
			}
			List<Object[]> userOb = interestedService.findByIdPost(profile.getPost_id());
			if (userOb != null && check == 0) {
				profile.setUser(userOb);
			}

			profile.setFullname(((Object[]) ob[0])[13] + "");
			profile.setAvatar(((Object[]) ob[0])[14] + "");
			profile.setProvince_fullname(((Object[]) ob[0])[15] + "");
			;
			profile.setDistrict_fullname(((Object[]) ob[0])[16] + "");
			profile.setWard_fullname(((Object[]) ob[0])[17] + "");
			profile.setProvince_fullname_en(((Object[]) ob[0])[18] + "");
			profile.setDistrict_fullname_en(((Object[]) ob[0])[19] + "");
			profile.setWard_fullname_en(((Object[]) ob[0])[20] + "");

			if (entityProfile != null) {
				profile.setPostEntityProfile(entityProfile);
			}

			return profile;
		} catch (NumberFormatException e) {
			System.out.println("Error postEntityProfile1: " + e);
			return null;
		} catch (Exception e) {
			System.out.println("Error postEntityProfile1: " + e);
			return null;
		}
	}

	public PostEntity postEntityProfile(Object[] ob, PostEntity entityProfile, int check) {
		try {
			PostEntity profile = new PostEntity();
			
			try {
				profile.setPost_id(Integer.valueOf(ob[0].toString()));
				profile.setUser_id(Integer.valueOf(ob[1].toString()));
			} catch (Exception e) {
				System.out.println("Error e1: " + e);
			}
			
			profile.setContent(ob[3] + "");

			// Xử lý ngày tháng
			Date date = null;
			if (ob[4] != null && !ob[4].toString().isEmpty()) {
				date = dateFormat.parse(ob[4].toString());
			}
			if (date != null) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(date);
				profile.setDate_post(calendar);
			}

			profile.setHash_tag(ob[5] + "");
			profile.setSend_status(Boolean.valueOf(ob[6] + ""));
			profile.setPost_status(Boolean.valueOf(ob[7] + ""));
			profile.setProduct(ob[8] + "");

			if (!ob[9].toString().isEmpty()) {
				profile.setBan(Boolean.valueOf(ob[9] + ""));
			}

			try {
				profile.setCountInterested(Integer.valueOf(ob[10].toString()));
				profile.setCountCommnet(Integer.valueOf(ob[11].toString()));
				profile.setCountShare(Integer.valueOf(ob[12].toString()));
			} catch (Exception e) {
				System.out.println("Error e1: " + e);
			}

			if (ob[2] == null) {
				profile.setImages(postImagesService.findAllImagesofPost(profile.getPost_id()));
			}
			List<Object[]> userOb = interestedService.findByIdPost(profile.getPost_id());
			if (userOb != null && check == 0) {
				profile.setUser(userOb);
			}

			profile.setFullname(ob[13] + "");
			profile.setAvatar(ob[14] + "");
			profile.setProvince_fullname(ob[15] + "");
			profile.setDistrict_fullname(ob[16] + "");
			profile.setWard_fullname(ob[17] + "");
			profile.setProvince_fullname_en(ob[18] + "");
			profile.setDistrict_fullname_en(ob[19] + "");
			profile.setWard_fullname_en(ob[20] + "");

//			if (entityProfile != null) {
				profile.setPostEntityProfile(entityProfile);
//			}

			return profile;
		} catch (NumberFormatException e) {
			System.out.println("Error postEntityProfile2: " + e);
			System.out.println("post_id: " + (ob[0].toString()));
			System.out.println("User_id: " + (ob[1].toString()));
			System.out.println("content: " + (ob[3] + ""));
			System.out.println("date: " + (ob[4]));
			System.out.println("hash_tag: " + (ob[5] + ""));
			System.out.println("send_status: " + (ob[6] + ""));
			System.out.println("post_status: " + (ob[7] + ""));
			System.out.println("product: " + (ob[8] + ""));
			System.out.println("ban: " + (ob[9] + ""));
			System.out.println("count_interested: " + (ob[10].toString()));
			System.out.println("count_cmt: " + (ob[11].toString()));
			System.out.println("count_share: " + (ob[12].toString()));
			System.out.println("fullname: " + (ob[13] + ""));
			System.out.println("avatar: " + (ob[14] + ""));
			System.out.println("provinces_fullname: " + (ob[15] + ""));
			System.out.println("district_fullname: " + (ob[16] + ""));
			System.out.println("ward_fullname: " + (ob[17] + ""));
			System.out.println("provinces_fullname_en: " + (ob[18] + ""));
			System.out.println("district_fullname_en: " + (ob[19] + ""));
			System.out.println("ward_fullname_en: " + (ob[20] + ""));
			System.err.println("check2: " + check);
			return null;
		} catch (Exception e) {
			System.out.println("Error postEntityProfile3: " + e);
			System.err.println("check3: " + check);
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
