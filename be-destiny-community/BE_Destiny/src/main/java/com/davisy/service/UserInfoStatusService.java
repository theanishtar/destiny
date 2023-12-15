package com.davisy.service;

import com.davisy.mongodb.documents.UserInfoStatus;

public interface UserInfoStatusService {
	public UserInfoStatus findByColumn(String column, String data);
	
	public UserInfoStatus updateStatusProfile(UserInfoStatus statusUser);
	
	public UserInfoStatus getStatusInfor(String userId);
	
}
