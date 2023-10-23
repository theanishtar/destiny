package com.davisy.service;

import com.davisy.entity.PostReported;

public interface PostReportedService {

	public PostReported findById(int id);
	
	public void create(PostReported postReported);

	public void update(PostReported postReported);

	public void disable(PostReported postReported);
}
