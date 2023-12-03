package com.davisy.service;

import java.util.List;

import com.davisy.entity.MessageImages;

public interface MessageImagesService {

	public List<String> findAllImagesMessage(int id);

	public List<String> loadAllImages(int from ,int to);

	public void create(MessageImages messageImages);

	public void update(MessageImages messageImages);

	public void delete(MessageImages messageImages);
}
