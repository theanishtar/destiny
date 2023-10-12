package com.davisy.entity;

import java.util.Date;

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
