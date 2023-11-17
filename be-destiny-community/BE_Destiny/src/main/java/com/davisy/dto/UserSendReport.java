package com.davisy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSendReport {
	String email;
	String avatar;
	String fullname;
	String content;
	String date_report;

}
