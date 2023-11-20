package com.davisy.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "wards")
@NoArgsConstructor
@AllArgsConstructor
public class Wards implements Serializable{
	@Id
	String code;
	@JsonIgnore
	String name;
	@JsonIgnore
	String name_en;
	String full_name;
	@JsonIgnore
	String full_name_en;
	@JsonIgnore
	String code_name;
	
	@ManyToOne
	@JoinColumn(name = "district_code")
	Districts districts;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "administrative_unit_id")
	Administrative_unit administrative_unit;
	
	@JsonIgnore
	@OneToMany(mappedBy = "wards")
	List<User> users;
	
	@JsonIgnore
	@OneToMany(mappedBy = "wards")
	List<Post> post;

}
