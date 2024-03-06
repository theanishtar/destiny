package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.davisy.mongodb.MongoDBUtils;
import com.davisy.mongodb.documents.UserInfoStatus;
import com.davisy.service.CacheService;
import com.davisy.service.UserInfoStatusService;

@Service
public class UserInfoStatusServiceImpl implements UserInfoStatusService {

	@Autowired
	private MongoDBUtils dbUtils;

	@Value("${davis.mongodb.collectionUserInfoStatus}")
	private String collectionUserInfoStatus;

	@Autowired
	private CacheService cacheService;

	private String birthday = "birthday";
	private String gender = "gender";
	private String location = "location";


	
	@Override
	public UserInfoStatus findByColumn(String column, String data) {
		return dbUtils.findByColumn(UserInfoStatus.class, collectionUserInfoStatus, column, data);
	}

	@Override
	public UserInfoStatus updateStatusProfile(UserInfoStatus statusUser) {
		String strId = statusUser.getUser_id()+"";
		UserInfoStatus doesExist = dbUtils.findByColumn(UserInfoStatus.class, collectionUserInfoStatus,"user_id" , strId);
		
		if(doesExist == null) {
			// chưa tồn tại -> add
			UserInfoStatus addData = dbUtils.insert( statusUser,UserInfoStatus.class, collectionUserInfoStatus);
			return addData;
		}
		
		// đã tồn tại -> Cập nhật
		UserInfoStatus updateData = dbUtils.updateFirstByColumn(UserInfoStatus.class, collectionUserInfoStatus,"user_id" , strId, statusUser);
		
		return updateData;		
	}

	@Override
	public UserInfoStatus getStatusInfor(String userId) {
		return dbUtils.findByColumn(UserInfoStatus.class, collectionUserInfoStatus,"user_id" , userId);
	}
	


}
