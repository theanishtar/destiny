package com.davisy.entity;

import java.text.SimpleDateFormat;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
	List<Object[]> user;
	List<Post> post;
	List<Object[]> count;

}
