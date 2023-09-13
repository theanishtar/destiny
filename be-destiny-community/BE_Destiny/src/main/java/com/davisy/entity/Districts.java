package com.davisy.entity;

import java.io.Serializable;
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
@Table(name = "districts")
@NoArgsConstructor
@AllArgsConstructor
public class Districts implements Serializable{
	@Id
	String code;
	String name;
	String name_en;
	String full_name;
	String full_name_en;
	String code_name;
	
	@ManyToOne
	@JoinColumn(name = "province_code")
	Provinces provinces;
	
	@ManyToOne
	@JoinColumn(name = "administrative_unit_id")
	Administrative_unit administrative_unit;
	
	@JsonIgnore
	@OneToMany (mappedBy = "districts")
	List<Wards> wards;
	
	@JsonIgnore
	@OneToMany(mappedBy = "districts")
	List<User> users;
	
	@JsonIgnore
	@OneToMany(mappedBy = "districts")
	List<Post> post;

}
