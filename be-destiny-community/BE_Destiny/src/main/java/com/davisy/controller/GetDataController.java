package com.davisy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davisy.dao.UserDao;
import com.davisy.entity.User;

@Controller
public class GetDataController {
	@Autowired
	UserDao dao;
	
	@GetMapping("/getdata")
	public List<User> index () {
		List<User> list = dao.findAll();
		for (User user : list) {
			System.out.println("name: "+user.getFullname());
		}
		
		return list;
	}
	
	@GetMapping("/index")
	public String index2() {
		return "index";
	}
	
//	@GetMapping("/getdata")
//	public ResponseEntity<List<User>> index () {
//		List<User> list = dao.findAll();
//		for (User user : list) {
//			System.out.println("name: "+user.getFullname());
//		}
//		
//		return ResponseEntity.status(200).body(list);
//	}
}
