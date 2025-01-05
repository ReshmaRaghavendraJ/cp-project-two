package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Services
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceid;
    private String servicename;

    public Services()
    {
    }

    public Services(Integer serviceid, String servicename, List<Amountdeposit> amountdeposit2, List<Appliedloan> appliedloan4) {
        this.serviceid = serviceid;
        this.servicename = servicename;
        this.amountdeposit2 = amountdeposit2;
        this.appliedloan4 = appliedloan4;
    }

    public Integer getServiceid() {
        return serviceid;
    }

    public void setServiceid(Integer serviceid) {
        this.serviceid = serviceid;
    }

    public String getServicename() {
        return servicename;
    }

    public void setServicename(String servicename) {
        this.servicename = servicename;
    }

    public List<Amountdeposit> getAmountdeposit2() {
        return amountdeposit2;
    }

    public void setAmountdeposit2(List<Amountdeposit> amountdeposit2) {
        this.amountdeposit2 = amountdeposit2;
    }

    public List<Appliedloan> getAppliedloan4() {
        return appliedloan4;
    }

    public void setAppliedloan4(List<Appliedloan> appliedloan4) {
        this.appliedloan4 = appliedloan4;
    }



    @OneToMany(mappedBy = "services2")
    @JsonIgnore
    private List<Amountdeposit> amountdeposit2;


    @OneToMany(mappedBy = "services4")
    @JsonIgnore
    private List<Appliedloan> appliedloan4;

}
