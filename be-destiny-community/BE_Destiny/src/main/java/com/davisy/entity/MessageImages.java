package com.davisy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "messages_images")
@NoArgsConstructor
@AllArgsConstructor
public class MessageImages {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int message_image_id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "messages_id")
	Messages messages;
	
	String link_image;
	
}
