package com.davisy.service;

import com.davisy.entity.UserReported;

public interface UserReportedService {

	public UserReported findById(int id);

	public void create(UserReported userReported);

	public void update(UserReported userReported);

	public void disable(UserReported userReported);
}
