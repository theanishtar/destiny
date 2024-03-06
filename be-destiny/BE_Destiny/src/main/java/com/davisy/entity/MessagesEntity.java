package com.davisy.entity;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessagesEntity {
	int id;
	String content;
	String send_time;
	int user_id;
	String avatar;
	boolean chat_parcipants_status;
	String day ;
	String type;
	boolean recall;
	List<String> images;
}
