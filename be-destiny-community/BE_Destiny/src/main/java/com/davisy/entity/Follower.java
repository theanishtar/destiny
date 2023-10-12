package com.davisy.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "follower", uniqueConstraints = { @UniqueConstraint(columnNames = { "follower_id", "user_id" }) })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follower{
	@EmbeddedId
	private Pk pk;
	
	@Embeddable
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Pk implements Serializable{
		private static final long serialVersionUID = 1L;
		int follower_id;
		int user_id;
		
		@Override
		public String toString() {
			return "Pk [follower_id = " + follower_id + ", user_id = " + user_id + "]";
		}
	}
	
	@Override
	public String toString() {
	    return "Employee [pk=" + pk + "]";
	  }
}
