package com.davisy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.CommentUserMentionDAO;
import com.davisy.entity.CommentUserMention;
import com.davisy.service.CommentUserMentionService;
@Service
public class CommentUserMentionServiceImpl implements CommentUserMentionService {
	@Autowired
	CommentUserMentionDAO mentionDAO;

	@Override
	public void create(CommentUserMention commentUserMention) {
		mentionDAO.save(commentUserMention);
	}

	@Override
	public void update(CommentUserMention commentUserMention) {
		mentionDAO.saveAndFlush(commentUserMention);
	}

	@Override
	public void delete(CommentUserMention commentUserMention) {
		mentionDAO.delete(commentUserMention);
	}

}
