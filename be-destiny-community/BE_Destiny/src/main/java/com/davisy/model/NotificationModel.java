package com.davisy.model;

import java.awt.TrayIcon.MessageType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationModel {
	String avatar;
	String fullname;
	int fromUserId;
	String content;
	int postId;
	int replyId;
	String time;
	MessageType type;
	boolean following_status;
	int[] follow_id;

	public enum MessageType {
		COMMENT, REPCOMMENT, INTERESTED, FOLLOW, SHARE, JOIN
	}

	@Override
	public String toString() {
		return "NotificationModel[{" + "avatar='" + avatar + '\'' + ", fullname='" + fullname + '\'' + ", fromUserId='"
				+ fromUserId + '\'' + ",content='" + content + '\'' + ", postId='" + postId + '\'' + ",replyId='"
				+ replyId + '\'' + ", time='" + time + '\'' + ",type='" + type + '\'' + ",following_status='"
				+ following_status + '\'' + ",follow_id='" + follow_id + '\'' + "}]";
	}
}
