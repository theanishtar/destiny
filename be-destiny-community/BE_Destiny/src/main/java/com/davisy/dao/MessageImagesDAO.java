package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davisy.entity.MessageImages;

public interface MessageImagesDAO extends JpaRepository<MessageImages, Integer> {
	@Query(value = "select mi.link_image  from messages_images mi where mi.messages_id =:id", nativeQuery = true)
	public List<String> findAllImagesMessage(int id);

	@Query(value = "select mi.link_image  from messages_images mi where mi.messages_id in(SELECT id FROM get_messages(:from,:to))ORDER BY message_image_id  desc", nativeQuery = true)
	public List<String> loadImages(int from, int to);
}
