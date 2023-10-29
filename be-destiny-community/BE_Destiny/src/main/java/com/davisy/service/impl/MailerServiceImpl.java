package com.davisy.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.davisy.interfaces.MailerServices;
import com.davisy.model.MailInfo;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailerServiceImpl implements MailerServices {
	@Autowired
	JavaMailSender sender;

	@Override
	public void send(MailInfo mail) {
		// Tạo message
		MimeMessage message = sender.createMimeMessage();
		// Sử dụng Helper để thiết lập các thông tin cần thiết cho message
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(mail.getFrom());
			helper.setTo(mail.getTo());
			helper.setSubject(mail.getSubject());
			helper.setText(mail.getBody(), true);
			helper.setReplyTo(mail.getFrom());
			String[] cc = mail.getCc();
			if (cc != null && cc.length > 0) {
				helper.setCc(cc);
			}
			String[] bcc = mail.getBcc();
			if (bcc != null && bcc.length > 0) {
				helper.setBcc(bcc);
			}
			String[] attachments = mail.getAttachments();
			if (attachments != null && attachments.length > 0) {
				for (String path : attachments) {
					File file = new File(path);
					helper.addAttachment(file.getName(), file);
				}
			}
			// Gửi message đến SMTP server
			sender.send(message);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void send(String to, String subject, String body) {
		this.send(new MailInfo(to, subject, body));
	}

	List<MailInfo> list = new ArrayList<>();

	@Override
	public void queue(MailInfo mail) {
		list.add(mail);
	}

	@Override
	public void queue(String to, String subject, String body) {
		queue(new MailInfo(to, subject, body));
	}

	@Scheduled(fixedDelay = 5000)
	public void run() {
		while (!list.isEmpty()) {
			MailInfo mail = list.remove(0);
			try {
				this.send(mail);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}