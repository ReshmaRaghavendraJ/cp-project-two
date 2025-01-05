package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

import static javax.crypto.Cipher.SECRET_KEY;

@Entity
@Getter
@Setter

public class Amountdeposit
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer depositid;
    private String depositamount;
    @JsonFormat(pattern = "dd-MM-yyyy hh:mm a",timezone = "Asia/Kolkata")
    private LocalDateTime deposittime;
    private String withdrawamount;
    @JsonFormat(pattern = "dd:MM:yyyy hh:mm a",timezone="Asia/Kolkata")
    private LocalDateTime withdrawtime;
    private String balanceamount;

    private static final String SECRET_KEY = "MySecretKey12345";  // 16 bytes key for AES-128


    // AES Encryption method
    private String encryptWithAES(String data) {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");

            // Generate a random IV
            byte[] iv = new byte[16];  // AES block size is 16 bytes
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParameterSpec);

            byte[] encryptedData = cipher.doFinal(data.getBytes());

            // Concatenate the IV and the encrypted data
            byte[] encryptedWithIv = new byte[iv.length + encryptedData.length];
            System.arraycopy(iv, 0, encryptedWithIv, 0, iv.length);
            System.arraycopy(encryptedData, 0, encryptedWithIv, iv.length, encryptedData.length);

            // Return the base64-encoded string of IV + encrypted data
            return Base64.getEncoder().encodeToString(encryptedWithIv);
        } catch (Exception e) {
            throw new RuntimeException("Error during AES encryption", e);
        }
    }



    // AES Decryption method
    private String decryptWithAES(String encryptedData) {
        if (encryptedData == null || encryptedData.isEmpty()) {
            System.out.println("Encrypted data is null or empty.");
            return null;  // Or handle appropriately
        }

        try {
            byte[] decodedData = Base64.getDecoder().decode(encryptedData);

            // Ensure that the encrypted data is large enough to have both IV and encrypted content
            if (decodedData.length <= 16) {
                System.out.println("Invalid encrypted data (IV missing).");
                return null;
            }

            // Extract the IV (first 16 bytes)
            byte[] iv = Arrays.copyOfRange(decodedData, 0, 16);

            // Extract the encrypted data (rest of the bytes)
            byte[] encryptedBytes = Arrays.copyOfRange(decodedData, 16, decodedData.length);

            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParameterSpec);

            byte[] decryptedData = cipher.doFinal(encryptedBytes);
            return new String(decryptedData);
        } catch (Exception e) {
            System.out.println("Error during AES decryption: " + e.getMessage());
            return null;  // Return null if decryption fails
        }
    }




    // Method to set the deposit amount and encrypt it
    public void setDepositamount(String depositamount) {
        System.out.println("Encrypting depositamount: " + depositamount);
        this.depositamount = encryptWithAES(depositamount);
        System.out.println("Encrypted depositamount: " + this.depositamount);
    }

    public String getDepositamount() {
      //  return decryptWithAES(this.depositamount); // Decrypt when getting the deposit amount
        String decryptedamt = decryptWithAES(this.depositamount);
        System.out.println("Decrypted depositamount: " + decryptedamt);
        return decryptedamt;
    }

    public void setWithdrawamount(String withdrawamount) {
        System.out.println("Encrypting withdrawamount: " + withdrawamount);
        this.withdrawamount = encryptWithAES(withdrawamount);
        System.out.println("Encrypted withdrawamount: " + this.withdrawamount);
    }

    // Getter for withdrawamount that automatically decrypts it
    public String getWithdrawamount() {
        //return decryptWithAES(this.withdrawamount); // Decrypt when getting the withdraw amount
        String decryptedwithamt = decryptWithAES(this.withdrawamount);
        System.out.println("Decrypted withdrawamount: " + decryptedwithamt);
        return decryptedwithamt;
    }

    public void setBalanceamount(String balanceamount) {
        System.out.println("Encrypting balanceamount: " + balanceamount);
        this.balanceamount = encryptWithAES(balanceamount);
        System.out.println("Encrypted balanceamount: " + this.balanceamount);

    }
    public String getBalanceamount() {
        //return decryptWithAES(this.balanceamount); // Decrypt when getting the balance amount
        String decryptedbalance = decryptWithAES(this.balanceamount);
        System.out.println("Decrypted balanceamount: " + decryptedbalance);
        return decryptedbalance;
    }



    @ManyToOne
    @JoinColumn(name="accountdetailsid")
    private Accountdetails accountdetails1;

    @ManyToOne
    @JoinColumn(name="serviceid")
    private Services services2;

}
