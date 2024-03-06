package com.davisy.reponsitory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.davisy.entity.User;

@Repository
public interface UsersReponsitory extends JpaRepository<User, Long>{

	Optional<User>findByEmail(String email);
	//Optional<Users>findByIdOptional(Long id);
	//Optional<Users>findByUser_name(String username);
}
