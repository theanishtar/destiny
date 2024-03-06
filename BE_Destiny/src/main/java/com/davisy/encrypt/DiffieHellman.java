package com.davisy.encrypt;

import java.math.BigInteger;

public class DiffieHellman {
	public static final int DIFFINE_HELLMAN_GROUP1 = 3; //G
    public static final int DIFFINE_HELLMAN_GROUP2 = 17; //P
    
    public static boolean isPrime(int num) {
        if (num < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    /*
    tạo giúp tôi một hàm trả về số nguyên tố từ một số tự nhiên, với số nguyên tố trả về là số nguyên tố lớn hơn và gần nhất với số n truyền vào:
        - đầu vào n
        - trả về prime ( prime > n) và prime là số nguyên tố gần nhất với n (nếu n là số nguyên tố thì trả về n luôn)

        VD: (n = 9) => prime = 11, (n = 17) => prime = 17
    */
    public static int genPrivateKey(int n) {
        if (n < 2) {
            return 2;
        }
        
        if(isPrime(n))
            return n;

        int prime = n + 1;
        while (true) {
            if (isPrime(prime)) {
                return prime;
            }
            prime++;
        }
    }
    
    public static int genPublicKey(int id){
        BigInteger G = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP1);
        BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
        BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
        
        BigInteger result = powerMod(G, privateK, P);
        
        try {
            return result.intValueExact();
        } catch (ArithmeticException e) {
            // Handle the case where the BigInteger value is too large for an int
            System.out.println("BigInteger value is too large for int.");
            return -1;  // You can return some default value or throw an exception based on your requirements
        }
    }
    
    public static int genSecretKey(int id, int resId){
        BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
        
        BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
        BigInteger publicK = BigInteger.valueOf(genPublicKey(resId));
        BigInteger result = powerMod(publicK, privateK, P);
        
        try {
        	System.out.println("Secrets Key: "+result);
            return result.intValueExact();
        } catch (ArithmeticException e) {
            // Handle the case where the BigInteger value is too large for an int
            System.out.println("BigInteger value is too large for int.");
            return -1;  // You can return some default value or throw an exception based on your requirements
        }
        
    }
    
    public static BigInteger powerMod(BigInteger base, BigInteger exponent, BigInteger modulus) {
        return base.modPow(exponent, modulus);
    }
    
    
    public static void main(String[] args) {
    	DiffieHellman hellmanPrime = new DiffieHellman();
    	AES aes = new AES();
    	
    	int u1 = 18;
    	int u2 = 26;
    	String message = "Hello bạn, khỏe chứ?";
    	
    	// u1 send u2
    	
    	// Step1. Get SecretKey from u1, u2
    	int keyU1 = hellmanPrime.genSecretKey(u1, u2);
    	int keyU2 = hellmanPrime.genSecretKey(u2, u1);
    	// -> keyU1 == keyU2 == SecretKey
    	
    	// Step2. Rar message
    	String rarMess = "Sy3jW2SFD8be/Yj5nBct/qbsTGppK9Bf2Rym+wgNuabaHO7WaP/oAcPOzRF/wTm1";
//    	String rarMess = aes.encrypt(message, keyU1);
    	
    	// Step3. Decode
    	String deRarMess = aes.decrypt(rarMess, keyU2);
    	
    	System.out.println(rarMess);
    	System.out.println(deRarMess);
    	
    	
    }
}