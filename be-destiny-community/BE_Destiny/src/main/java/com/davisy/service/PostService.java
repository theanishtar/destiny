package com.davisy.service;

import java.util.List;

public interface PostService {
	public int countPost(int id);
	
	List<Object[]>getTOP5Post();
}
