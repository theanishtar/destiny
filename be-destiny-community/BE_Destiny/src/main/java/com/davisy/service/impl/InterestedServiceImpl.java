package com.davisy.service.impl;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> status-online
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.InterestedDAO;
<<<<<<< HEAD
import com.davisy.entity.Interested;
=======
>>>>>>> status-online
import com.davisy.service.InterestedService;

@Service
public class InterestedServiceImpl implements InterestedService {
	@Autowired
	private InterestedDAO interestedDao;

	//23-9-2023 tổng lượt thích theo bài đăng
	@Override
	public int totalInterestedByPost(int id) { 
		return interestedDao.totalInterestedByPost(id);
	}
	
	//23-9-2023 tổng lượt thích của người dùng đã thích
	@Override
	public int totalInterestedByUser(int id) {
		return interestedDao.totalInterestedByUser(id);
	}
<<<<<<< HEAD

	@Override
	public List<Object[]> findByIdPost(int id) {
		return interestedDao.findByIdPost(id);
	}
=======
>>>>>>> status-online
}
