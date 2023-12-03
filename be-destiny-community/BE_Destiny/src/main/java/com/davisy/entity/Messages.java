package com.davisy.entity;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;

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

	@Temporal(TemporalType.TIMESTAMP)
	Calendar send_Time = GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "sender_id")
	User user;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "chat_id")
	Chats chats;
	
	@OneToMany(mappedBy = "messages")
	List<MessageImages> messageImages;

	boolean send_Status;
	
	String type ="text";
	boolean recall =false;
}