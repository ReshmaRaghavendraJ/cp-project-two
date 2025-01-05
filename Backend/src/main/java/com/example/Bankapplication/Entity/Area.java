package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Area
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer areaid;
    private String areaname;

    public Area()
    {
    }

    public Area(Integer areaid, String areaname, City city5, List<Bankmanager> bankmanager1, List<Accountdetails> accountdetail2) {
        this.areaid = areaid;
        this.areaname = areaname;
        this.city5 = city5;
        this.bankmanager1 = bankmanager1;
        this.accountdetail2 = accountdetail2;
    }

    public Integer getAreaid() {
        return areaid;
    }

    public void setAreaid(Integer areaid) {
        this.areaid = areaid;
    }

    public String getAreaname() {
        return areaname;
    }

    public void setAreaname(String areaname) {
        this.areaname = areaname;
    }

    public City getCity5() {
        return city5;
    }

    public void setCity5(City city5) {
        this.city5 = city5;
    }

    public List<Bankmanager> getBankmanager1() {
        return bankmanager1;
    }

    public void setBankmanager1(List<Bankmanager> bankmanager1) {
        this.bankmanager1 = bankmanager1;
    }

    public List<Accountdetails> getAccountdetail2() {
        return accountdetail2;
    }

    public void setAccountdetail2(List<Accountdetails> accountdetail2) {
        this.accountdetail2 = accountdetail2;
    }

    @ManyToOne
    @JoinColumn(name="cityid")
    private City city5;

    @OneToMany(mappedBy = "area1")
    @JsonIgnore
    private List<Bankmanager> bankmanager1;

    @OneToMany(mappedBy = "area2")
    @JsonIgnore
    private List<Accountdetails> accountdetail2;
}
