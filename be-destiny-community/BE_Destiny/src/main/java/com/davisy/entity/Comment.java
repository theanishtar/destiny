package com.davisy.entity;

import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int comment_id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToOne()
	@JoinColumn(name = "parent_comment_id")
	Comment commentParent;
	
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;
	
	@Temporal(TemporalType.DATE)
	Date date_comment = new Date();
	
	String content;
	
	boolean comment_status = true;

}
