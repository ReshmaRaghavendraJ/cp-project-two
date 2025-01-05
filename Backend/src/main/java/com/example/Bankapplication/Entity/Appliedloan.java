package com.example.Bankapplication.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

@Entity
@Getter
@Setter
public class Appliedloan
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appliedloanid;
    private String annualincome;
    private String desiredloanamt;
    private String occupation;
    private String leasestatus;
    private String status;
    private String maritalstatus;
    private String homeownership;

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

/* Encrypt annualincome */
public void setAnnualincome(String annualincome) {
    System.out.println("Encrypting annualincome: " + annualincome);
    this.annualincome = encryptWithAES(annualincome);
    System.out.println("Encrypted annualincome: " + this.annualincome);
}

/* Decrypt annualincome */
public String getAnnualincome() {
    //  return decryptWithAES(this.annualincome);
    String decryptedannualincome = decryptWithAES(this.annualincome);
    System.out.println("Decrypted annualincome: " + decryptedannualincome);
    return decryptedannualincome;
}

/* Encrypt status */
public void setStatus(String status)
{
    System.out.println("Encrypting status: " + status);
    this.status = encryptWithAES(status);
    System.out.println("Encrypted status: " + this.status);
}


/* Decrypt status */
public String getStatus() {
    //  return decryptWithAES(this.annualincome);
    String decryptedstatu = decryptWithAES(this.status);
    System.out.println("Decrypted status: " + decryptedstatu);
    return decryptedstatu;
}

/* Encrypt leasestatus */
public void setLeasestatus(String leasestatus)
{
    System.out.println("Encrypting leasestatus: " + leasestatus);
    this.leasestatus = encryptWithAES(leasestatus);
    System.out.println("Encrypted leasestatus: " + this.leasestatus);
}

/* Decrypt leasestatus */
public String getLeasestatus() {
    //  return decryptWithAES(this.leasestatus);
    String decryptedleasestatus = decryptWithAES(this.leasestatus);
    System.out.println("Decrypted leasestatus: " + decryptedleasestatus);
    return decryptedleasestatus;
}


    /* Encrypt occupation */
    public void setOccupation(String occupation)
    {
        System.out.println("Encrypting occupation: " + occupation);
        this.occupation = encryptWithAES(occupation);
        System.out.println("Encrypted occupation: " + this.occupation);
    }

    /* Decrypt occupation */
    public String getOccupation()
    {
        //  return decryptWithAES(this.annualincome);
        String decryptedoccupation = decryptWithAES(this.occupation);
        System.out.println("Decrypted occupation: " + decryptedoccupation);
        return decryptedoccupation;
    }

    /* Encrypt desiredloanamt */
    public void setDesiredloanamt(String desiredloanamt) {
        System.out.println("Encrypting desiredloanamt: " + desiredloanamt);
        this.desiredloanamt = encryptWithAES(desiredloanamt);
        System.out.println("Encrypted desiredloanamt: " + this.desiredloanamt);
    }
    /* Decrypt desiredloanamt */
    public String getDesiredloanamt() {
        //  return decryptWithAES(this.annualincome);
        String decrypteddesiredloanamt = decryptWithAES(this.desiredloanamt);
        System.out.println("Decrypted desiredloanamt: " + decrypteddesiredloanamt);
        return decrypteddesiredloanamt;
    }

    /* Encrypt homeownership */
    public void setHomeownership(String homeownership) {
        System.out.println("Encrypting homeownership: " + homeownership);
        this.homeownership = encryptWithAES(homeownership);
        System.out.println("Encrypted homeownership: " + this.homeownership);
    }
    /* Decrypt homeownership */
    public String getHomeownership() {
        //  return decryptWithAES(this.annualincome);
        String decryptedhomeownership= decryptWithAES(this.homeownership);
        System.out.println("Decrypted homeownership: " + decryptedhomeownership);
        return decryptedhomeownership;
    }


    /* Encrypt maritalstatus */
    public void setMaritalstatus(String maritalstatus) {
        System.out.println("Encrypting maritalstatus: " + maritalstatus);
        this.maritalstatus = encryptWithAES(maritalstatus);
        System.out.println("Encrypted maritalstatus: " + this.maritalstatus);
    }

    /* Decrypt maritalstatus */
    public String getMaritalstatus() {
        //  return decryptWithAES(this.annualincome);
        String decryptedmaritalstatus = decryptWithAES(this.maritalstatus);
        System.out.println("Decrypted maritalstatus: " + decryptedmaritalstatus);
        return decryptedmaritalstatus;
    }

    @ManyToOne
    @JoinColumn(name="accountdetailsid")
    private Accountdetails accountdetails3;

    @ManyToOne
    @JoinColumn(name="loanid")
    private Loan loan1;

    @ManyToOne
    @JoinColumn(name="serviceid")
    private Services services4;
}
