package com.davisy.mongodb.documents;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentReported {
	private int comment_reported_id;
	private int user_send_report_id;
	private Date dateNotification;
}
