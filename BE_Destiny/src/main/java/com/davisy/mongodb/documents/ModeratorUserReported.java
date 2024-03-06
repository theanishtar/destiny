package com.davisy.mongodb.documents;

import java.util.Date;

import org.bson.types.ObjectId;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModeratorUserReported {
	
	@Id
	private ObjectId id;
	private String user_reported_id;
	private String user_send_report_id;
	private String content_report;
	private Date date_report;
}
