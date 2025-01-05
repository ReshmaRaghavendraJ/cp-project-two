package com.example.Bankapplication.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Admin
{
    @Id
    private Integer adminid;
    private String adminname;
    private String password;
    private String emailid;

    public Admin()
    {
    }

    public Admin(Integer adminid, String adminname, String password, String emailid) {
        this.adminid = adminid;
        this.adminname = adminname;
        this.password = password;
        this.emailid = emailid;
    }

    public Integer getAdminid() {
        return adminid;
    }

    public void setAdminid(Integer adminid) {
        this.adminid = adminid;
    }

    public String getAdminname() {
        return adminname;
    }

    public void setAdminname(String adminname) {
        this.adminname = adminname;
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
}
