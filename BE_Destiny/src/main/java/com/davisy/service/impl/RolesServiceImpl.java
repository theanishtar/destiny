package com.davisy.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.dao.RolesDAO;
import com.davisy.entity.Roles;
import com.davisy.service.RolesService;

@Service
public class RolesServiceImpl implements RolesService {
	@Autowired
	RolesDAO rolesDAO;

	@Override
	public Roles findById(int id) {
		return rolesDAO.findById(id).get();
	}

}
