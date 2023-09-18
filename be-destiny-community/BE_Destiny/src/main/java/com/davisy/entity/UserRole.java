package com.davisy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "user_role")
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	int user_id;
	int role_id;
}
