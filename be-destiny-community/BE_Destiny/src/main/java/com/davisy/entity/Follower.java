package com.davisy.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
