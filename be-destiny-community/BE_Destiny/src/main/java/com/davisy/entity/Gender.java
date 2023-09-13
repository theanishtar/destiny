package com.davisy.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "gender")
@NoArgsConstructor
@AllArgsConstructor
public class Gender {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int gender_id;
	
	String gender_name;
	
	@JsonIgnore
	@OneToMany (mappedBy = "gender")
	List<User> users;
}
