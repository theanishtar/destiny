package com.davisy.service;

import java.util.List;

import com.davisy.entity.CommentUserMention;

public interface CommentUserMentionService {

	public void create(CommentUserMention commentUserMention);

	public void update(CommentUserMention commentUserMention);

	public void delete(CommentUserMention commentUserMention);

	public void deleteCommentMention(int id);

	public List<CommentUserMention> findAllId(int id);



}
