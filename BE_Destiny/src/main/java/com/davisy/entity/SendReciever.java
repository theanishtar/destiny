package com.davisy.entity;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "send_reciever")
@NoArgsConstructor
@AllArgsConstructor
public class SendReciever {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int send_reciever_id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;

	@Temporal(TemporalType.TIMESTAMP)
	Calendar date_send_reciever = GregorianCalendar.getInstance(TimeZone.getTimeZone("GMT+7"));
}
