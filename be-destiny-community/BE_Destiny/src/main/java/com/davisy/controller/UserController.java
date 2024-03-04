package com.davisy.controller;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.config.JwtTokenUtil;
import com.davisy.dao.UserDAO;
import com.davisy.entity.User;
import com.davisy.service.EmailService;
import com.davisy.service.UserService;
import com.davisy.service.impl.UserServiceImpl;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Timer;
import java.util.TimerTask;

@RestController
@CrossOrigin("*")
public class UserController {
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserServiceImpl userService;

	@Autowired
	EmailService emailService;

	@Autowired
	PasswordEncoder passwordEncoder;

	private static Timer timer;

	HashMap<String, MapSendMail> userMap = new HashMap<String, MapSendMail>();

	@GetMapping("/v1/user/getTop5User")
	public ResponseEntity<List<Object[]>> getTop5User() {
		List<Object[]> list = userService.getTOP5User();
		return ResponseEntity.ok(list);
	}

	@PostMapping("/v1/user/find/user")
	public ResponseEntity<List<Object[]>> findUser(@RequestParam("id") int user_id,
			@RequestParam("fullname") String fullname) {
		try {
			List<Object[]> list = userService.findFullnameUser(user_id, fullname);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			System.out.println("Lỗi tìm kiếm: " + e);
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	@PostMapping("/v1/user/frind/post")
	public ResponseEntity<List<Object[]>> findPost(@RequestParam("keyword") String keyword, @RequestParam("type") String type){
		System.out.println(keyword);
		if (type.equalsIgnoreCase("content"))
			return ResponseEntity.ok(userService.findTop5Post(keyword));
		if (type.equalsIgnoreCase("hashtag"))
			return ResponseEntity.ok(userService.findTop5PostByHashtag(keyword));
		return ResponseEntity.badRequest().body(null);
	}
	
	

	@PostMapping("/v1/user/forgotpassword")
	public CompletableFuture<ResponseEntity<String[]>> forgotpass(@RequestBody String email) {

		try {
			Thread.sleep(100);
			stopClock();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		CompletableFuture<ResponseEntity<String[]>> future = CompletableFuture.supplyAsync(() -> {
			User user = userService.findByEmail(email);
			String[] res;
			System.out.println("status: " + userMap.containsKey(email));
			if (user == null) {
				res = new String[] { "wrongemail" };
				return ResponseEntity.ok().body(res);
			} else if (userMap.containsKey(email)) {
				res = new String[] { "isExists" };
				return ResponseEntity.ok().body(res);
			} else {
				String code = generateRandomNumbers();
				MapSendMail map = new MapSendMail();
				map.setCode(code);
				userMap.putIfAbsent(email, map);
				try {
					emailService.sendCodeMail(code, email);
				} catch (MessagingException e) {
					System.out.println("error send code mail: " + e);
				}
				if (!userMap.isEmpty())
					time();
				res = new String[] { "success" };
				return ResponseEntity.ok().body(res);
			}
		});
		return future;
	}

	@PostMapping("/v1/user/sendcode")
	public ResponseEntity<String[]> checkCode(@RequestBody Forgot forgot) {
		String value = userMap.get(forgot.email).getCode();
		System.out.println("email: " + forgot.email);
		System.out.println("value: " + value);
		System.out.println("code: " + forgot.code);
		if (value == null)
			return ResponseEntity.ok().body(new String[] { "timeup" });
		else if (!value.equals(forgot.code))
			return ResponseEntity.ok().body(new String[] { "wrongcode" });
		else
			return ResponseEntity.ok().body(new String[] { "success" });
	}

	@PostMapping("/v1/user/changepassword")
	public ResponseEntity<String[]> changePass(@RequestBody Forgot forgot) {
		System.out.println("email: " + forgot.email);
		System.out.println("pass: " + forgot.pass);
		User user = userService.findByEmail(forgot.email);
		if (!passwordEncoder.matches(forgot.pass, user.getPassword())) {
			user.setPassword(passwordEncoder.encode(forgot.pass));
			userService.update(user);
			userMap.remove(forgot.email);
			return ResponseEntity.ok().body(new String[] { "success" });
		} else {
			return ResponseEntity.ok().body(new String[] { "error" });
		}
	}

	@Async
	public void time() {
		timer = new Timer();
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				if (userMap.isEmpty()) {
					stopClock();
				}
				Iterator<String> email = userMap.keySet().iterator();
				while (email.hasNext()) {
					String key = email.next();
					MapSendMail mapSendMail = userMap.get(key);
					MapSendMail copyMap = mapSendMail;
					Calendar calendar = GregorianCalendar.getInstance();
					long currentTimeMillis = calendar.getTimeInMillis();
					long emailTimeMillis = copyMap.getCalendar().getTimeInMillis();
					long timeDifferenceMillis = currentTimeMillis - emailTimeMillis;
					long seconds = timeDifferenceMillis / 1000;
					long minutes = seconds / 60;
					if (minutes >= 5) {
						userMap.remove(key);
						System.out.println("userMap.get(key): " + userMap.get(key));
					}
				}
			}
		};
		timer.schedule(task, 0, 1000);
	}

	public static void stopClock() {
		if (timer != null) {
			timer.cancel();
		}
	}

	public String generateRandomNumbers() {
		String codeMail = "";
		for (int i = 0; i < 6; i++) {
			codeMail = codeMail + (int) (Math.floor(Math.random() * 9));
		}
		return codeMail;
	}
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class MapSendMail {
	Calendar calendar = GregorianCalendar.getInstance();
	String code;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class Forgot {
	String email;
	String code;
	String pass;
}