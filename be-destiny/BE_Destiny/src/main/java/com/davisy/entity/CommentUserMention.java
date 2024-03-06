package com.davisy.entity;

import java.io.Serializable;
import java.util.Calendar;

import com.davisy.entity.Follower.Pk;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment_user_mention", uniqueConstraints = {
		@UniqueConstraint(columnNames = { "comment_id", "mentioned_user_id" }) })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentUserMention {
	@EmbeddedId
	private PK pk;

	@Embeddable
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class PK implements Serializable {
		private static final long serialVersionUID = 1L;
		int comment_id;
		int mentioned_user_id;

		@Override
		public String toString() {
			return "Pk [comment_id = " + comment_id + ", mentioned_user_id = " + mentioned_user_id + "]";
		}
	}

	@Override
	public String toString() {
		return "CommentUserMention [pk=" + pk + "]";
	}
}
