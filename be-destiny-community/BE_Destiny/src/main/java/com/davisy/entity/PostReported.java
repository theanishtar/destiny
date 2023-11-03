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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "post_reported")
@NoArgsConstructor
@AllArgsConstructor
public class PostReported {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_reported_id")
	Post postReported;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_send_report_id")
	User userSendReport;
	
	String content_report;
	@Temporal(TemporalType.DATE)
	Calendar date_report = GregorianCalendar.getInstance();
	
	
}
