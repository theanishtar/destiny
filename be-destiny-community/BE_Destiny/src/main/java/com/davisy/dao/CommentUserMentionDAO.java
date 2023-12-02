package com.davisy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.davisy.entity.CommentUserMention;

@Repository
public interface CommentUserMentionDAO extends JpaRepository<CommentUserMention, Integer>{

}
