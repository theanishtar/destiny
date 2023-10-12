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
@Table(name = "post_images")
@NoArgsConstructor
@AllArgsConstructor
public class PostImages {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int post_images_id;
	
	String link_image;
	
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;
}
