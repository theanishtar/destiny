package com.davisy.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer user_id;

	String username;

	String password;

	String fullname;

	String email;

	String intro;

	@Temporal(TemporalType.DATE)
	Date birthday;

	@Temporal(TemporalType.DATE)
	Date day_create = new Date();

	@ManyToOne
	@JoinColumn(name = "gender_id")
	Gender gender;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_provinces_id")
	Provinces provinces;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_districts_id")
	Districts districts;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_wards_id")
	Wards wards;

	String avatar;
	String thumb;

	@Temporal(TemporalType.DATE)
	Date online_last_date;

	int mark;

	boolean user_status;

	boolean ban;

	String gg_id;
	String fb_id;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, targetEntity = Roles.class)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
	Set<Roles> roles = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	List<Post> posts;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	List<Interested> interesteds;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	List<Comment> comments;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	List<Share> shares;

//	@JsonIgnore
//	@OneToMany(mappedBy = "user")
//	List<Follower> followers;

	@JsonIgnore
	public String[] getAuth() {
		List<String> roles = new ArrayList<>();
		for (Roles role : this.roles) {
			// System.out.println(role.getName().substring(5)); // "ROLE_" ->
			roles.add(role.getName().substring(5));
		}
		return roles.toArray(new String[0]);
	}

	public String getLocation() {
		if (wards == null || districts == null || provinces == null)
			return null;
		return wards.full_name + ". " + districts.full_name + ". " + provinces.full_name;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (Roles role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));

			System.out.println("ROLE: " + role.getName());
		}
		return authorities;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@JsonIgnore
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

}
