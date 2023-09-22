package com.davisy.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.davisy.entity.User;

import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	private final JavaMailSender mailSender;

	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendEmailWithImage(List<byte[]> imageBytesList, User user, String seat, int tickets,
			int money) throws MessagingException, IOException {
		List<String> tempImagePaths = new ArrayList<>();
		String[] s = seat.split(",");
		// Save the image to a temporary file
		for (int i = 0; i < imageBytesList.size(); i++) {
			byte[] imageBytes = imageBytesList.get(i);

			// Save the image to a temporary file
			String tempImagePath = "temp_image" + i + ".png";
			try (FileOutputStream fos = new FileOutputStream(tempImagePath)) {
				fos.write(imageBytes);
			}

			tempImagePaths.add(tempImagePath);

			// Send email with the image embedded in HTML
			//sendHtmlEmail(tempImagePath, user, "uiu", s[i], tickets, money);
			if (tempImagePath != null) {
				java.io.File tempFile = new java.io.File(tempImagePath);
				if (tempFile.exists()) {
					tempFile.delete();
				}
			}
		}

		// Delete the temporary image file
		// (You can also store the image in a different location or avoid creating a
		// file altogether if not needed)

	}

	public void sendHtmlEmail(String attachmentFilePath, String seat, int tickets,	int money) throws MessagingException {
		String fromEmail = "daviticket@gmail.com";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		// Set email properties
		helper.setFrom(fromEmail);
		helper.setTo("dangtt135@gmail.com");
		helper.setSubject("Subject");

		// Add the HTML body with the image attachment (embedded)
		helper.setText("HTML Codes", true);
		DataSource source = new FileDataSource(attachmentFilePath);
		helper.addInline("image", source);

		// Send the email
		mailSender.send(message);

		System.out.println("Email sent successfully!");
	}
}