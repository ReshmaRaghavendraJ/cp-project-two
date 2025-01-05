package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Random;

@Entity
@Getter
@Setter

public class Accountdetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountdetailsid;
    private String accountno;
    private String identification;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Kolkata")
    private LocalDateTime dob;
    private String age;
    private String gender;
    private String postalcode;
    private String qualification;
    private String status;
    private String salary;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;

    private static final String SECRET_KEY = "MySecretKey12345";  // 16 bytes key for AES-128

    // Constructor to generate account number
    public Accountdetails() {
        // Only generate account number if it's not already set (e.g., if status is not 'Approved' yet)
        if (this.accountno == null || this.accountno.equals("Waiting for Approval")) {
            generateaccountno();
        }
    }


    public void generateaccountno() {
        Random random = new Random();
        long rndvalue = 100000000000L + (long) (random.nextDouble() * 900000000000L); // Ensures 12 digits
        this.accountno = String.valueOf(rndvalue);
    }

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




    // Override the setter to handle encryption automatically when setting the account number
    public void setAccountno(String accountno) {
        System.out.println("Encrypting account number: " + accountno);
        this.accountno = encryptWithAES(accountno);
        System.out.println("Encrypted account number: " + this.accountno);
    }

    // Custom getter to decrypt accountno when accessed
    public String getAccountno() {
        String decrypted = decryptWithAES(this.accountno);
        System.out.println("Decrypted account number: " + decrypted);
        return decrypted;
    }

    /* Encrypt Age */
    public void setAge(String age)
    {
        System.out.println("Encrypting age : " + age);
        this.age = encryptWithAES(age);  // Store encrypted age
        System.out.println("Encrypted age: " + this.age);
    }

    /* Decrypt Age */
    public String getAge()
    {
        String decryptedage = decryptWithAES(this.age);
        System.out.println("Decrypted age: " + decryptedage);
        return decryptedage;
    }


    /* Encrypt postalcode */

    public void setPostalcode(String postalcode) {
        System.out.println("Encrypting postalcode: " + postalcode);
        this.postalcode = encryptWithAES(postalcode);
        System.out.println("Encrypted postalcode: " + this.postalcode);
    }


    /* Decrypt postalcode */

    public String getPostalcode() {
        String decryptedpostalcode = decryptWithAES(this.postalcode);
        System.out.println("Decrypted Postalcode: " + decryptedpostalcode);
        return decryptedpostalcode;
    }

    /* Encrypt Gender */

    public void setGender(String gender) {
        System.out.println("Encrypting gender: " + gender);
        this.gender = encryptWithAES(gender);
        System.out.println("Encrypted gender: " + this.gender);
    }

    /* Decrypt Gender */

    public String getGender() {
        String decryptedgender = decryptWithAES(this.gender);
        System.out.println("Decrypted gender: " + decryptedgender);
        return decryptedgender;
    }


    /* Encrypt qualification */
    public void setQualification(String qualification) {
        System.out.println("Encrypting qualification: " + qualification);
        this.qualification = encryptWithAES(qualification);
        System.out.println("Encrypted qualification: " + this.qualification);
    }


    /* Decrypt qualification */
    public String getQualification() {
        String decryptedqualification = decryptWithAES(this.qualification);
        System.out.println("Decrypted qualification: " + decryptedqualification);
        return decryptedqualification;
    }

    /* Encrypt status */
    public void setStatus(String status) {
        System.out.println("Encrypting status: " + status);
        this.status = encryptWithAES(status);
        System.out.println("Encrypted status: " + this.status);
    }

    /* Decrypt status */
    public String getStatus() {
        String decryptedstatus = decryptWithAES(this.status);
        System.out.println("Decrypted status: " + decryptedstatus);
        return decryptedstatus;
    }



    /* Encrypt salary */
public void setSalary(String salary)
{
    System.out.println("Encrypting salary: " + salary);
    this.salary = encryptWithAES(salary);
    System.out.println("Encrypted salary: " + this.salary);
}


 /* Decrypt Salary */
    public String getSalary() {
        String decryptedsalary = decryptWithAES(this.salary);
        System.out.println("Decrypted salary: " + decryptedsalary);
        return decryptedsalary;
    }


    /* Encrypt Identification */
    public void setIdentification(String identification) {
        System.out.println("Encrypting account number: " + identification);
        this.identification = encryptWithAES(identification);
        System.out.println("Encrypted account number: " + this.identification);
    }


    /* Decrypt Identification */
    public String getIdentification() {
        String decryptedidentification = decryptWithAES(this.identification);
        System.out.println("Decrypted identification: " + decryptedidentification);
        return decryptedidentification;
    }


    @ManyToOne
    @JoinColumn(name="userid")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Avoid lazy-loading issues
    private User user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="areaid")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Area area2;

    @OneToMany(mappedBy = "accountdetails1")
    @JsonIgnore
    private List<Amountdeposit> amountdeposit1;


    @OneToMany(mappedBy = "accountdetails3")
    @JsonIgnore
    private List<Appliedloan> appliedloan3;

}
