package com.davisy.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "administrative_regions")
@NoArgsConstructor
@AllArgsConstructor
public class Administrative_region implements Serializable{
	@Id
	int id;
	String name;
	String name_en;
	String code_name;
	String code_name_en;

	@JsonIgnore
	@OneToMany (mappedBy = "administrative_region")
	List<Provinces> provinces;
}
