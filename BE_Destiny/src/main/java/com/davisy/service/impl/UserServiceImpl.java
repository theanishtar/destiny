package com.davisy.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.UserDAO;
import com.davisy.dao.UserRoleDAO;
import com.davisy.entity.User;
import com.davisy.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDAO userDao;

	Calendar now = Calendar.getInstance();
	int year = now.get(Calendar.YEAR);

	@Autowired
	private UserRoleDAO userRoleDao;

	@Override
	public User findByEmailAndPassword(String email, String password) {
		User user = userDao.findByEmailAndPassword(email, password);
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	@Override
	public User findByEmail(String email) {
		User user = userDao.findByEmail(email);
		if (user != null) {
			return user;
		} else {
			return null;
		}

	}

	@Override
	public User findById(int id) {
		User user = userDao.findById(id).get();
		if (user == null)
			return null;
		return user;
	}

	@Override
	public void create(User user) {
		userDao.save(user);
	}

	@Override
	public void update(User user) {
		userDao.saveAndFlush(user);
	}

	@Override
	public void delete(User user) {
		userDao.delete(user);
	}

	@Override
	public List<Integer> findAllUserProvinces(String idPr, String idDt, String idW) {
		List<Integer> list = userDao.findAllUserProvinces(idPr, idDt, idW);
		if (list == null) {
			return null;
		}
		return list;
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userDao.findAll();
	}

	@Override
	public List<Object[]> getTOP5User() {
		// TODO Auto-generated method stub
		return userDao.getTOP5User(year);
	}

	@Override
	public User findByFbId(String fb_id) {
		User user = userDao.findByFbId(fb_id);
		if (user == null)
			return null;
		return user;
	}

	@Override
	public User findByGgId(String gg_id) {
		User user = userDao.findByGgId(gg_id);
		if (user == null)
			return null;
		return user;
	}

	// 1-11-2023 -lấy tổng số người dùng theo ngày
	@Override
	public int getTotalUserByDay(int day, int month) {
		// TODO Auto-generated method stub
		return userDao.getTotalUserByDay(day, month, year);
	}

	// 21-9-2023 -lấy tổng số người dùng theo tháng
	// lastest update 14-10
	@Override
	public int getTotalUserByMonth(int month) {
		return userDao.getTotalUserByMonth(month, year);
	}

	// 1-11-2023 -lấy tổng số người dùng theo năm
	@Override
	public int getTotalUserByYear(int yearx) {
		// TODO Auto-generated method stub
		return userDao.getTotalUserByYear(yearx);
	}

	// 21-9-2023 -Tóng số lượng tương tác của người dùng theo từng tháng
	// 1-11
	@Override
	public List<Object[]> getInteractionOfUser() {
		return userDao.getInteractionOfUser(year);
	}

	// lastest update 14-10 Tóng số lượng tương tác của người dùng theo tháng
	@Override
	public int getInteractionOfUserByMonth(int month) {
		return userDao.getInteractionOfUserByMonth(month, year);
	}

	// 21-9-2023 -Top 4 người dùng đăng bài nhiều nhất
	@Override
	public List<Object[]> getTOP4User() {
		return userDao.getTOP4User(year);
	}

	// 22-0-2023 -Tổng số người dùng tham gia từng theo từng tháng
	@Override
	public List<Object[]> getTotalUserEveryMonth() {
		return userDao.getTotalUserEveryMonth(year);
	}

	// 22-9-2023 Vô hiệu hóa người dùng
	@Override
	public void disable(User user) {
		int role_id = userRoleDao.findRoleByUserID(user.getUser_id());
		if (!user.isBan()) {
			if (role_id != 1) {
				user.setBan(true);
			}
		} else {
			user.setBan(false);
		}
		userDao.saveAndFlush(user);
	}

	// Lấy user đã đăng bài
	@Override
	public List<Object[]> getUserofPost(int id, int provinceId) {
		return userDao.getUserofPost(id, provinceId);
	}

	@Override
	public List<Object[]> getUserofPostProfile(int id) {
		return userDao.getUserofPostProfile(id);
	}

	@Override
	public User findByEmailOrUsername(String email) {
		return userDao.findByEmailOrUsername(email);
	}

	@Override
	public List<Object[]> getUserofPostHistory(int id) {
		return userDao.getUserofPostHistory(id);
	}

	@Override
	public List<Object[]> loadTimeLine(String email) {
		return userDao.loadTimeLine(email);
	}

	@Override
	public List<Object[]> findFullnameUser(int user_id, String fullname) {
		return userDao.findFullnameUser(user_id, fullname);
	}
	
	@Override
	public List<Object[]> findTop5Post(String keyword) {
		// TODO Auto-generated method stub
		return userDao.get5PostByKeyword(keyword);
	}
	
	@Override
	public List<Object[]> findTop5PostByHashtag(String keyword) {
		// TODO Auto-generated method stub
		return userDao.get5PostByHashtagKeyword(keyword);
	}
}
