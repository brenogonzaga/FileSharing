package com.filesharing.backend.services;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.spec.*;

import javax.crypto.*;
import javax.crypto.spec.*;

import org.springframework.stereotype.Service;

@Service
public class AesCryptoService {

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public void encryptFile(String fileName, String fileId, String password) throws Exception {
        Path inputFilePath = Paths.get(UPLOAD_DIR + File.separator + fileName);
        Path outputFilePath = Paths.get(UPLOAD_DIR + File.separator + fileId);
        SecretKey secretKey = this.createSecretKey(password);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(new byte[16]));
        var cos = new CipherOutputStream(new FileOutputStream(outputFilePath.toFile()), cipher);
        this.writeContentToFile(inputFilePath.toFile(), cos);
        System.out.println("File encrypted successfully!");
    }

    public void decryptFile(String fileName, String fileId, String password) throws Exception {
        Path inputFilePath = Paths.get(UPLOAD_DIR + File.separator + fileId);
        Path outputFilePath = Paths.get(UPLOAD_DIR + File.separator + fileName);
        SecretKey secretKey = this.createSecretKey(password);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(new byte[16]));
        var cis = new CipherInputStream(new FileInputStream(inputFilePath.toFile()), cipher);
        this.writeContentToFile(outputFilePath.toFile(), cis);
        System.out.println("File decrypted successfully!");

    }

    private SecretKey createSecretKey(String password) throws Exception {
        final byte[] SALT = "salt".getBytes();
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), SALT, 65536, 256);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), "AES");
    }

    private void writeContentToFile(File inputFile, CipherOutputStream cos) throws IOException {
        try (FileInputStream fis = new FileInputStream(inputFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                cos.write(buffer, 0, bytesRead);
            }
        }
        cos.flush();
        cos.close();
    }

    private void writeContentToFile(File outputFile, CipherInputStream cis) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = cis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
        }
        cis.close();
    }
}
