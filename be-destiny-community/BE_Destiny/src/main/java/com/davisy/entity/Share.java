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
@Table(name = "share")
@NoArgsConstructor
@AllArgsConstructor
public class Share {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int share_id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;
	
	@Temporal(TemporalType.DATE)
	Date date_share = new Date();

}
