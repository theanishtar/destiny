package com.davisy.mongodb.documents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoStatus {
	public String user_id;
	public Boolean gender = true;
	public Boolean location = true;
	public Boolean birthday = true;
}
