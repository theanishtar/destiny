package com.davisy.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int post_id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	String content;
	
	@Temporal(TemporalType.DATE)
	Date date_Post = new Date();
	
	String hash_Tag;
	
	@ManyToOne
	@JoinColumn(name = "post_provinces_id")
	Provinces provinces;
	
	@ManyToOne
	@JoinColumn(name = "post_districts_id")
	Districts districts;
	
	@ManyToOne
	@JoinColumn(name = "post_wards_id")
	Wards wards;
	
	boolean send_status = true;
	
	boolean post_status = true;
	
	String product;
	
	boolean ban = false;
	
	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<PostImages> postImages;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Interested> interesteds;
	
	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Comment> comments;
	
	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Share> shares;
}
