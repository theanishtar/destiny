package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.StudentDAO;
import com.poly.entity.Student;

@RestController
public class GetDataController {
	@Autowired
	StudentDAO studentDAO;
	
	@GetMapping("/getdata")
	public List<Student> index () {
		List<Student> list = studentDAO.findAll();
		for (Student student : list) {
			System.out.println(student.getName());
		}
		
		return list;
	}
}
