package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userid;
    private String prefix;
    private String fname;
    private String lname;
    private String password;
    private String mobileno;
    private String emailid;

    public User()
    {
    }

    public User(Integer userid, String prefix, String fname, String lname, String password, String mobileno, String emailid, List<Accountdetails> accountdetails2) {
        this.userid = userid;
        this.prefix = prefix;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.mobileno = mobileno;
        this.emailid = emailid;
        this.accountdetails2 = accountdetails2;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobileno() {
        return mobileno;
    }

    public void setMobileno(String mobileno) {
        this.mobileno = mobileno;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public List<Accountdetails> getAccountdetails2() {
        return accountdetails2;
    }

    public void setAccountdetails2(List<Accountdetails> accountdetails2) {
        this.accountdetails2 = accountdetails2;
    }

    @OneToMany(mappedBy = "user1")
    @JsonIgnore
    private List<Accountdetails> accountdetails2;

}
