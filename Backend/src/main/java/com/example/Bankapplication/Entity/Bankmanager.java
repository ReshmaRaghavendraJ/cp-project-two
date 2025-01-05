package com.example.Bankapplication.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.SecureRandom;

@Entity
@Getter
@Setter
public class Bankmanager
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer managerid;
    private String managername;
    private Integer age;
    private  String address;
    private String phoneno;
    private String qualification;
    private String gender;
    private String password;
    private String emailid;

    public Bankmanager()
    {
        generatemanagerpswd();
    }

    public void generatemanagerpswd()
    {
        String chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random=new SecureRandom();
        StringBuilder paswdbuilder=new StringBuilder(4);
        for(int i=0;i<4;i++)
        {
            int index=random.nextInt(chars.length());
            paswdbuilder.append(chars.charAt(index));
        }
        this.password=paswdbuilder.toString();
    }

    public Bankmanager(Integer managerid, String managername, Integer age, String address, String phoneno, String qualification, String gender, String password, String emailid, Area area1) {
        this.managerid = managerid;
        this.managername = managername;
        this.age = age;
        this.address = address;
        this.phoneno = phoneno;
        this.qualification = qualification;
        this.gender = gender;
        this.password = password;
        this.emailid = emailid;
        this.area1 = area1;
    }

    public Integer getManagerid() {
        return managerid;
    }

    public void setManagerid(Integer managerid) {
        this.managerid = managerid;
    }

    public String getManagername() {
        return managername;
    }

    public void setManagername(String managername) {
        this.managername = managername;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(String phoneno) {
        this.phoneno = phoneno;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public Area getArea1() {
        return area1;
    }

    public void setArea1(Area area1) {
        this.area1 = area1;
    }

    @ManyToOne
    @JoinColumn(name="areaid")
    private Area area1;
}
