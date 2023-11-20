package com.davisy.entity;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.davisy.controller.admin.AdminControl;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;

	@ManyToOne()
	@JoinColumn(name = "parent_post_id")
	Post postParent;

	String content;

	@Temporal(TemporalType.TIMESTAMP)
	Calendar date_Post= GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));

	String hash_Tag;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_provinces_id")
	Provinces provinces;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_districts_id")
	Districts districts;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_wards_id")
	Wards wards;

	boolean send_status = true;

	boolean post_status = true;

	String product;

	boolean ban = false;

//	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<PostImages> postImages;

	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Interested> interesteds;

	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<SendReciever> send_reciever;

	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Comment> comments;

	@JsonIgnore
	@OneToMany(mappedBy = "post")
	List<Share> shares;

	@JsonIgnore
	@OneToMany(mappedBy = "postReported")
	List<PostReported> postReporteds;

	public int getUserId() {
		return user.getUser_id();
	}

	public String getFullname() {
		return user.getFullname();
	}

	public String getUsername() {
		return user.getUsername();
	}

	public String getAvatar() {
		return user.getAvatar();
	}

	public String getDate() {
		String date = AdminControl.timeCaculate(date_Post);
		return date;
	}

	public List<String> getList_Hash_Tag() {
		if (hash_Tag != null) {
			List<String> list = new ArrayList<>();
			for (String h : hash_Tag.split(",")) {
				list.add(h);
			}
			return list;
		}
		return null;
	}

}
