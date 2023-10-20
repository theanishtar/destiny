package com.davisy.mongodb.documents;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
	int idUserSend;
	int idUserReceive;
	String contentNotification;
	String typeNotification;
	Date dateNotification = new Date();
}
