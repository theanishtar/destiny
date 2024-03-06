package com.davisy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.entity.Interested;
import com.davisy.entity.Post;
import com.davisy.entity.Share;
import com.davisy.entity.User;
import com.davisy.service.InterestedService;
import com.davisy.service.PostService;
import com.davisy.service.ShareService;
import com.davisy.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin("*")
public class ShareController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	UserService userService;
	@Autowired
	PostService postService;
	@Autowired
	ShareService shareService;
	@Autowired
	InterestedService interestedService;

	@PostMapping("/v1/user/update/share/post")
	public ResponseEntity<Void> updateShare(HttpServletRequest request, @RequestBody UpdateShare updateShare) {
		try {
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			Share share = shareService.findById(updateShare.getId());
			share.setShare_status(updateShare.isStatus());
			shareService.update(share);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/v1/user/update/interested/post")
	public ResponseEntity<Void> deleteInterested(HttpServletRequest request, @RequestBody int post_id) {
		try {
			System.out.println("post_id: " + post_id);
			String email = jwtTokenUtil.getEmailFromHeader(request);
			User user = userService.findByEmail(email);
			Interested interested = interestedService.findInterested(user.getUser_id(), post_id);
			interestedService.delete(interested);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			System.out.println("Error deleteInterested: " + e);
			return ResponseEntity.badRequest().build();
		}

	}

}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UpdateShare {
	int id;
	boolean status;
}
