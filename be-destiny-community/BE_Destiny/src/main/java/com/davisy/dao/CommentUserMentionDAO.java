package com.davisy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.CommentUserMention;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface CommentUserMentionDAO extends JpaRepository<CommentUserMention, Integer> {

	@Modifying
	@Query(value = "delete from comment_user_mention cum where cum.comment_id=:id", nativeQuery = true)
	public void deleteCommentMention(int id);

	@Query(value = "select *from comment_user_mention cum where cum.comment_id =:id", nativeQuery = true)
	public List<CommentUserMention> findAllId(int id);
}
