package com.davisy.model.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageModel {
	private String message;
	private int fromLogin;
	private String avatar;
	private String typeMessage;
	private String[] linkImages;

	@Override
	public String toString() {
		return "MessageModel{" + "message='" + message + '\'' + ", fromLogin='" + fromLogin + '\'' + ", avatar='"
				+ avatar + '\'' + ", typeMessage='" + typeMessage + '\'' + ", linkImages='" + linkImages + '\'' + '}';
	}
}
