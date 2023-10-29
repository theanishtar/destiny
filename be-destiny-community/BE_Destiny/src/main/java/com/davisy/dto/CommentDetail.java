package com.davisy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetail {
	String content;
	String user_fullname;
	String user_avartar;
	String user_email;
}
