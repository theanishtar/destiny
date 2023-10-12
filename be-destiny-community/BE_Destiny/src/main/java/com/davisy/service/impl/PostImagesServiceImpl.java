package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.PostImagesDAO;
import com.davisy.service.PostImagesService;

@Service
public class PostImagesServiceImpl implements PostImagesService {

	@Autowired
	PostImagesDAO imagesDAO;

	@Override
	public int countPostImages(int id) {
		return imagesDAO.countPostImages(id);
	}

}
