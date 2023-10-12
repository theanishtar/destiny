package com.davisy.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Roles implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int role_id;
	String name;
	String role_des;
	
	@JsonIgnore
	@ManyToMany( mappedBy = "roles",targetEntity = User.class)
	List<User>user ;
	
	public Roles(String name) {
		this.name = name;
	}
	
}
