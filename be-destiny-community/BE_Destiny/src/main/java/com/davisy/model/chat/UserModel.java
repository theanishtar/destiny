package com.davisy.model.chat;

import java.awt.TrayIcon.MessageType;
import java.util.Calendar;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
	private MessageType type;
	private int user_id;
	private String username;
	private String fullname;
	private String email;
	private String avatar;
	private int messageUnRead;
	private String lastMessage;
	private String online;
	private boolean isFriend;
	private String typeMessage;
	private boolean recall;
	

	public enum MessageType {
		JOIN, LEAVE
	}
}
