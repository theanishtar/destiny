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
