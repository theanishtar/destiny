package com.davisy.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "administrative_units")
@NoArgsConstructor
@AllArgsConstructor
public class Administrative_unit {
	@Id
	int id;
	String full_name;
	String full_name_en;
	String short_name;
	String short_name_en;
	String code_name;
	String code_name_en;
	
	@JsonIgnore
	@OneToMany (mappedBy = "administrative_unit")
	List<Provinces> provinces;
	
	@JsonIgnore
	@OneToMany (mappedBy = "administrative_unit")
	List<Districts> districts;
	
	@JsonIgnore
	@OneToMany (mappedBy = "administrative_unit")
	List<Wards> wards;
	
}
