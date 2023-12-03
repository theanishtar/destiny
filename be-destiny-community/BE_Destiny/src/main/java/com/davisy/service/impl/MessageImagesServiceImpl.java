package com.davisy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.MessageImagesDAO;
import com.davisy.entity.MessageImages;
import com.davisy.service.MessageImagesService;

@Service
public class MessageImagesServiceImpl implements MessageImagesService {
	@Autowired
	MessageImagesDAO messageImagesDAO;

	@Override
	public void create(MessageImages messageImages) {
		messageImagesDAO.save(messageImages);
	}

	@Override
	public void update(MessageImages messageImages) {
		messageImagesDAO.saveAndFlush(messageImages);
	}

	@Override
	public void delete(MessageImages messageImages) {
		messageImagesDAO.delete(messageImages);
	}

	@Override
	public List<String> findAllImagesMessage(int id) {
		List<String> list = messageImagesDAO.findAllImagesMessage(id);
		return list;
	}

	@Override
	public List<String> loadAllImages(int from ,int to) {
		return messageImagesDAO.loadImages(from, to);
	}

}
