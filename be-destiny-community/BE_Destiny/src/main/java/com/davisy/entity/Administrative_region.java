package com.davisy.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
