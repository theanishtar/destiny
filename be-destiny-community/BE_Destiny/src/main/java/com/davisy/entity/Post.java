package com.davisy.entity;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

<<<<<<< HEAD
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.davisy.controller.admin.AdminControl;
=======
>>>>>>> status-online
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

<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;

	String content;

	@Temporal(TemporalType.DATE)
	Calendar date_Post = GregorianCalendar.getInstance();

	String hash_Tag;

<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "post_provinces_id")
	Provinces provinces;

<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "post_districts_id")
	Districts districts;

<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "post_wards_id")
	Wards wards;

	boolean send_status = true;

	boolean post_status = true;

	String product;

	boolean ban = false;

<<<<<<< HEAD
//	@JsonIgnore
=======
	@JsonIgnore
>>>>>>> status-online
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
<<<<<<< HEAD

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
=======
>>>>>>> status-online
}
