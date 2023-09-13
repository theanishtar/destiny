package com.davisy.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "provinces")
@NoArgsConstructor
@AllArgsConstructor
public class Provinces {
	@Id
	String code;
	String name;
	String name_en;
	String full_name;
	String full_name_en;
	String code_name;
	
	@JsonIgnore
	@OneToMany (mappedBy = "provinces")
	List<Districts> districts;
	
	@ManyToOne
	@JoinColumn(name = "administrative_region_id")
	Administrative_region administrative_region;
	
	@ManyToOne
	@JoinColumn(name = "administrative_unit_id")
	Administrative_unit administrative_unit;
	
	@JsonIgnore
	@OneToMany(mappedBy = "provinces")
	List<User> users;
	
	@JsonIgnore
	@OneToMany(mappedBy = "provinces")
	List<Post> post;

}
