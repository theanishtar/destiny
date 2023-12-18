package com.davisy.encrypt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
/*import javax.xml.bind.DatatypeConverter;*/

import org.springframework.context.annotation.Configuration;

import com.davisy.constant.SecretDavisy;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DES {

	private static final String secret = SecretDavisy.DES_KEY;
	

	/*
	 * private static String padString(String input) { int paddingLength = 8 -
	 * input.length() % 8; StringBuilder paddedString = new StringBuilder(input);
	 * for (int i = 0; i < paddingLength; i++) { paddedString.append("\0"); } return
	 * paddedString.toString(); }
	 * 
	 * public static String des_encrypt(String data) throws Exception {
	 * System.out.println("\n\n\n\n\n"+secret+"\n\n\n"); byte[] keyBytes =
	 * secret.getBytes(); DESKeySpec desKeySpec = new DESKeySpec(keyBytes);
	 * SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES"); SecretKey
	 * key = keyFactory.generateSecret(desKeySpec);
	 * 
	 * Cipher cipher = Cipher.getInstance("DES/ECB/NoPadding");
	 * cipher.init(Cipher.ENCRYPT_MODE, key); byte[] encryptedBytes =
	 * cipher.doFinal(padString(data).getBytes());
	 * 
	 * return DatatypeConverter.printBase64Binary(encryptedBytes); }
	 * 
	 * public static String des_decrypt(String encryptedData) throws Exception {
	 * System.out.println("\n\n\n\n\n"+secret+"\n\n\n"); String finl;
	 * 
	 * byte[] keyBytes = secret.getBytes(); DESKeySpec desKeySpec = new
	 * DESKeySpec(keyBytes); SecretKeyFactory keyFactory =
	 * SecretKeyFactory.getInstance("DES"); SecretKey key =
	 * keyFactory.generateSecret(desKeySpec);
	 * 
	 * Cipher cipher = Cipher.getInstance("DES/ECB/NoPadding");
	 * cipher.init(Cipher.DECRYPT_MODE, key); byte[] encryptedBytes =
	 * DatatypeConverter.parseBase64Binary(encryptedData); byte[] decryptedBytes =
	 * cipher.doFinal(encryptedBytes);
	 * 
	 * return new String(decryptedBytes).trim(); }
	 * 
	 * public static String des_replace(String s) { if(s.indexOf("+")>-1) return
	 * s.replace("+", "--dvs--"); if(s.indexOf("--dvs--")>-1) return
	 * s.replace("--dvs--","+"); return s; }
	 */
	
	/*
	private static final String SECRET_KEY = "davisy@p"; // Key có độ dài 8 ký tự
    private static final String INIT_VECTOR = "davisy#l"; // Vector khởi tạo có độ dài 8 ký tự

    public static String encrypt(String plaintext) throws Exception {
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        DESKeySpec desKeySpec = new DESKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey secretKey = keyFactory.generateSecret(desKeySpec);

        IvParameterSpec ivParameterSpec = new IvParameterSpec(INIT_VECTOR.getBytes(StandardCharsets.UTF_8));
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec);

        byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static String decrypt(String encryptedText) throws Exception {
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        DESKeySpec desKeySpec = new DESKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey secretKey = keyFactory.generateSecret(desKeySpec);

        IvParameterSpec ivParameterSpec = new IvParameterSpec(INIT_VECTOR.getBytes(StandardCharsets.UTF_8));
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);

        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    

	public static void main(String[] args) {
		try {
            String plaintext = "Hello, this is a secret message!";
            String encryptedText = des_encrypt(plaintext);
            System.out.println("Encrypted: " + encryptedText);

            String decryptedText = des_decrypt("XvEjOCPy9Xbj9Ls7ZcncAJ9ZNZHa%2FspKIHgUakpxhSLsAPTCLsxX7MNdtOKZ0bly");
            System.out.println("Decrypted: " + decryptedText);
        } catch (Exception e) {
            e.printStackTrace();
        }

	}
    */
}
