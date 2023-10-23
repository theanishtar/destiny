package com.davisy.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chat_participants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatParticipants {
	@EmbeddedId
	Primary primary;

	@Embeddable
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Primary implements Serializable {
		private static final long serialVersionUID = 1L;
		int chat_id;
		int user_id;

		@Override
		public String toString() {
			return "Primary [chat_id = " + chat_id + ", user_id = " + user_id + "]";
		}
	}

	@Override
	public String toString() {
		return "ChatParticipants [primary=" + primary + "]";
	}
}
