package com.davisy.reponsitory;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import com.davisy.entity.Roles;
import com.davisy.entity.User;

@Repository
public class RoleCustomRepo {
	@PersistenceContext
	private EntityManager entityManager;

	public List<Roles> getRole(User user) {
		StringBuilder sql = new StringBuilder()
				.append("SELECT r.name\n"
						+ "FROM users u\n"
						+ "INNER JOIN user_role ur ON u.user_id = ur.user_id\n"
						+ "INNER JOIN roles r ON ur.role_id = r.role_id\n");
		sql.append("WHERE 1=1 ");
		if (user.getEmail() != null) {
			sql.append(" and email=:email");
		}
		NativeQuery<Roles> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
		if (user.getEmail() != null) {
			query.setParameter("email", user.getEmail());
		}
		query.addScalar("name", StandardBasicTypes.STRING);
		query.setResultTransformer(Transformers.aliasToBean(Roles.class));
		return query.list();
	}
}
