package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.SendRecieverDAO;
import com.davisy.service.SendRecieverService;

@Service
public class SendRecieverServiceImpl implements SendRecieverService {
	@Autowired
	SendRecieverDAO sendRecieverDAO;

	// 24-10-2023 lịch sử nhận hàng
	@Override
	public List<Object[]> findAllHistorySendReciever(int id) {
		return sendRecieverDAO.findAllHistorySendReciever(id);
	}

}
