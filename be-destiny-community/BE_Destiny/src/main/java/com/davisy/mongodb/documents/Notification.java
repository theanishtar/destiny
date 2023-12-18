package com.davisy.mongodb.documents;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
	private int idUserSend;
	private int idUserReceive;
	private String contentNotification;
	private String typeNotification;
	private Date dateNotification;
	
}
