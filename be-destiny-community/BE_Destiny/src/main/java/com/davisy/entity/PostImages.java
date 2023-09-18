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
