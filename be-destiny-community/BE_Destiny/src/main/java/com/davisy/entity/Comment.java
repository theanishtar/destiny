package com.davisy.entity;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToOne()
	@JoinColumn(name = "parent_comment_id")
	Comment commentParent;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;
	
	@Temporal(TemporalType.TIMESTAMP)
	Calendar date_comment= GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));
	
	String content;
	
	boolean comment_status = true;

}
