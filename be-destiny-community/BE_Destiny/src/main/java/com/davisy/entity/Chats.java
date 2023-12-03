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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
	@Temporal(TemporalType.TIMESTAMP)
	Calendar day_create = GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));

	@JsonIgnore
	@OneToMany(mappedBy = "chats")
	List<Messages> messages;
	boolean isfriend = true;
	
}
