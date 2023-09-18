package com.davisy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "follower")
@NoArgsConstructor
@AllArgsConstructor
public class Follower {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int follower_id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
}
