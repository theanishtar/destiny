package com.davisy.entity;

import java.util.List;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Roles {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int role_id;
	String name;
	String role_des;
	
	@ManyToMany( mappedBy = "roles",targetEntity = User.class)
	List<User>user ;
	
	public Roles(String name) {
		this.name = name;
	}
	
}
