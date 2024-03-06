package com.davisy.service;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davisy.entity.QrData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import jakarta.servlet.ServletContext;

@Service
public class QrCodeGeneratorService {
	@Autowired
	ServletContext app;

	public static String prettyObject(QrData data) throws Exception {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
		} catch (Exception e) {
			System.out.println("error prettyObject: " + e);
			throw e;
		}
	}

	public byte[] generateQrCodeImage(String content, int width, int height) throws IOException {
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		Map<EncodeHintType, Object> hintsMap = new HashMap<>();
		hintsMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix;
		try {
			bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, width, height, hintsMap);
		} catch (Exception e) {
			throw new RuntimeException("Failed to generate QR code image.", e);
		}

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		BufferedImage qrImage = toBufferedImage(bitMatrix);
		try {
			String uploadRootPath = app.getRealPath("/views/images/a.png");
			ImageIO.write(qrImage, "png", outputStream);
//			MatrixToImageWriter.writeToFile(bitMatrix, uploadRootPath.substring(uploadRootPath.lastIndexOf('.') + 1),
//					new File(uploadRootPath));
			System.out.println("success");
		} catch (IOException e) {
			System.out.println(e);
			throw new RuntimeException("Failed to write QR code image to output stream.", e);
		}
		return outputStream.toByteArray();
	}

	private BufferedImage toBufferedImage(BitMatrix matrix) {
		int width = matrix.getWidth();
		int height = matrix.getHeight();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics = (Graphics2D) image.getGraphics();
		graphics.setColor(Color.WHITE);
		graphics.fillRect(0, 0, width, height);
		graphics.setColor(Color.BLACK);
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				if (matrix.get(x, y)) {
					graphics.fillRect(x, y, 1, 1);
				}
			}
		}
		return image;
	}
}
