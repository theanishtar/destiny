package com.davisy.entity;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;

=======
>>>>>>> status-online
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
@Table(name = "interested")
@NoArgsConstructor
@AllArgsConstructor
public class Interested {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int interested_id;
	
<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
<<<<<<< HEAD
	@JsonIgnore
=======
>>>>>>> status-online
	@ManyToOne
	@JoinColumn(name = "post_id")
	Post post;

	@Temporal(TemporalType.DATE)
	Calendar date_interested = GregorianCalendar.getInstance();
}
