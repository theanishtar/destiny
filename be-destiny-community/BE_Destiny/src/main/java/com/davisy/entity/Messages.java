package com.davisy.entity;

import java.util.Calendar;
import java.util.GregorianCalendar;

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

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Messages {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String content;
	Calendar send_Time = GregorianCalendar.getInstance();

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "sender_id")
	User user;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "chat_id")
	Chats chats;

	boolean send_Status;
}
