package com.davisy.encrypt;

import java.security.spec.KeySpec;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class AES {
	public static String encrypt(String plaintext, int secretKey){
		// Chuyển đổi số nguyên thành byte array
		byte[] keyBytes = Integer.toString(secretKey).getBytes();

		try {
			// Tạo một khóa bí mật từ byte array sử dụng PBEKeySpec
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(new String(keyBytes, "UTF-8").toCharArray(), keyBytes, 65536, 256);
			SecretKey secret = factory.generateSecret(spec);
			SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getEncoded(), "AES");

			// Mã hóa văn bản
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
			byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());

			// Chuyển đổi byte array thành chuỗi Base64
			return Base64.getEncoder().encodeToString(encryptedBytes);
		} catch (Exception e) {
			System.err.println(e);
			return null;
		}
	}

	public static String decrypt(String ciphertext, int secretKey) {
		// Chuyển đổi số nguyên thành byte array
		byte[] keyBytes = Integer.toString(secretKey).getBytes();

		try {
			// Tạo một khóa bí mật từ byte array sử dụng PBEKeySpec
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(new String(keyBytes, "UTF-8").toCharArray(), keyBytes, 65536, 256);
			SecretKey secret = factory.generateSecret(spec);
			SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getEncoded(), "AES");

			// Giải mã chuỗi Base64
			byte[] encryptedBytes = Base64.getDecoder().decode(ciphertext);

			// Giải mã văn bản
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
			byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
			return new String(decryptedBytes);
		} catch (Exception e) {
			System.err.println(e);
			return null;
		}

	}

	public static void main(String[] args) throws Exception {
		int secretKey = 26;
		String originalText = "Hello, World!";

		// Mã hóa
		String encryptedText = encrypt(originalText, secretKey);
		System.out.println("Encrypted Text: " + encryptedText);

		// Giải mã
		String decryptedText = decrypt(encryptedText, secretKey);
		System.out.println("Decrypted Text: " + decryptedText);
	}
}