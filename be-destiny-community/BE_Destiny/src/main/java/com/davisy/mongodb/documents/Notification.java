package com.davisy.mongodb.documents;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
	private String idUserSend;
	private String idUserReceive;
	private String postId="";
	private String replyId;
	private String contentNotification;
	private String typeNotification;
	private String dateNotification;
	private boolean status=false;
	
}
