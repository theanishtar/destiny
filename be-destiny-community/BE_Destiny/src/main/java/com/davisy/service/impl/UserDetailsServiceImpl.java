package com.davisy.service.impl;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.davisy.reponsitory.UsersReponsitory;
import com.davisy.service.UserService;
import com.davisy.dao.UserDao;
import com.davisy.entity.*;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsersReponsitory usersReponsitory;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserDao dao;
    
    com.davisy.entity.User user;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        this.user = userService.findByEmail(email);
//    	Users user =usersReponsitory.findByEmail(email).orElseThrow();
        if (user == null) {
        	System.out.println("User not found with username: " + email);
            throw new UsernameNotFoundException("User not found with username: " + email);
        }

        System.out.println("find: "+email+" "+user.getUsername()+" "+user.getPassword()+"\n\n\n");
        System.out.println("qưerty");
		/*
		 * custom.setUsername(user.getUsername());
		 * custom.setPassword(user.getPassword());
		 */
        /*
        String[] roles = user.getAuthorities().toArray(new String[0]);
        for (String r : roles) {
            System.out.println(r);
        }
        */
        //System.out.println("Auths: "+Arrays.toString(user.getAuth()));
       
        try {
        	 System.out.println(user.getPassword()+user.getUsername()+ " auth: "+user.getAuth());
		} catch (Exception e) {
			System.out.println("Error: "+e);
		}
        System.out.println(user.getPassword()+user.getUsername()+ Arrays.toString(user.getAuth()));
        return User.withUsername(user.getUsername()).password(user.getPassword()).roles(user.getAuth()).build();
    }
}






