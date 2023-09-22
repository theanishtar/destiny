package com.davisy.service;


import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.davisy.dao.RolesDAO;
import com.davisy.entity.Roles;
import com.davisy.entity.User;
import com.davisy.service.impl.MailerServiceImpl;
import com.davisy.service.impl.UserServiceImpl;

@Service
public class RegisterService {
	
	@Autowired
	RolesDAO rolesDao;
	
	@Autowired
	MailerServiceImpl mailer;

    @Autowired
    private RedisService redisService;
    
    @Autowired
    UserServiceImpl service;
    
    @Autowired
    PasswordEncoder passwordEncoder;
	

	static String codeMail = "";

	public void registerResponseService() {
		
	}
	
	public static void random() {
		for (int i = 0; i < 6; i++) {
			codeMail = codeMail + (int) (Math.floor(Math.random() * 9));
		}
	}
	
	public void createAccountTempWithEmail(String email, String name, String password) {
		// Write account to Redis
		User newUser = new User();
		newUser.setUsername("abuigiueveyu");
		newUser.setEmail(email);
		newUser.setPassword(passwordEncoder.encode(password));
		Roles role = rolesDao.findById(2).get();
		System.out.println(role.getName());
		Set<Roles> roles = new HashSet<>();
		roles.add(role);
		newUser.getRoles().add(role);
		newUser.setRoles(roles);
		
		// Write to Redis
		random();
		redisService.addCodeRegister(newUser, codeMail);
		System.out.println(codeMail);
		
		// Send Mail
		
		//api: v1/oauth/register/authen/codeMail
		
		// response
	}
	
	
	public User authenRegisterCode() {
		User u = redisService.authenRegister(codeMail);
		if(u == null) return null;
		if(service.findByEmail(codeMail) != null)
			return null;
		// add to DB
		service.create(u);
		return redisService.authenRegister(codeMail);
	}
	
	public void createAccountTempWithPhone(String phone, String name, String password) {
		// Write account to Firebase
		
		// Send OTP
		
		// response
	}
}
