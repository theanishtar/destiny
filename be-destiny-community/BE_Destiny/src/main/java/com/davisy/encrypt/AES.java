package com.davisy.encrypt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Configuration;

import com.davisy.constant.SecretDavisy;

import lombok.RequiredArgsConstructor;
@Configuration
@RequiredArgsConstructor
public class AES {
	
	static String secretKeyString = SecretDavisy.AES_KEY;
    private static SecretKey secretKey = generateAesKey(secretKeyString);
	
	public static String bytesToBase64UrlSafe(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static byte[] base64UrlSafeToBytes(String base64UrlSafe) {
        return Base64.getUrlDecoder().decode(base64UrlSafe);
    }

    public static String EncryptAESfinal(String data) {
    	try {
			byte[] encryptedData = encryptData(data, secretKey);
			String encryptedDataUrlSafe = bytesToBase64UrlSafe(encryptedData);
        
			return encryptedDataUrlSafe;
		} catch (Exception e) {
			return null;
		}
    	
    }
    
    public static String DecryptAESfinal(String encryptedDataUrlSafe) {
    	try {
    		byte[] encryptedDataOriginal = base64UrlSafeToBytes(encryptedDataUrlSafe);
            String decryptedData = decryptData(encryptedDataOriginal, secretKey);
            
            return decryptedData;
		} catch (Exception e) {
			return null;
		}
    	
    }
    
    public static void main(String[] args) throws Exception {
        // ...
    	String data = "dangthpc04349@fpt.edu.vn:dangth";
        // Mã hóa dữ liệu
        byte[] encryptedData = encryptData(data, secretKey);
        String encryptedDataUrlSafe = bytesToBase64UrlSafe(encryptedData);

        // Giải mã dữ liệu
        byte[] encryptedDataOriginal = base64UrlSafeToBytes(encryptedDataUrlSafe);
        String decryptedData = decryptData(encryptedDataOriginal, secretKey);

        // ...
        System.out.println(encryptedDataUrlSafe);
        System.out.println(DecryptAESfinal("jLDrvN8pJJwtYZHg5fkRD4Cv8Q7okUSA04ZXyQJLfvM"));
    }

    public static SecretKey generateAesKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(128); // Độ dài khóa AES là 128 bit
        return keyGenerator.generateKey();
    }
    
    public static SecretKey generateAesKey(String secretKeyString) {
        byte[] keyData = secretKeyString.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyData, "AES");
    }

    public static byte[] encryptData(String data, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
    }

    public static String decryptData(byte[] encryptedData, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedBytes = cipher.doFinal(encryptedData);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }

    public static String bytesToBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }
}
