package com.davisy.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chats")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chats {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String name_chats;

	@JsonIgnore
	@OneToMany(mappedBy = "chats")
	List<Messages> messages;
	boolean isfriend = true;
	boolean hide = false;
	boolean status = true;
}
