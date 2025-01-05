package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Loan
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer loanid;
    private String loanname;

    public Loan()
    {
    }

    public Loan(Integer loanid, String loanname, List<Appliedloan> appliedloan3) {
        this.loanid = loanid;
        this.loanname = loanname;
        this.appliedloan3 = appliedloan3;
    }

    public Integer getLoanid() {
        return loanid;
    }

    public void setLoanid(Integer loanid) {
        this.loanid = loanid;
    }

    public String getLoanname() {
        return loanname;
    }

    public void setLoanname(String loanname) {
        this.loanname = loanname;
    }

    public List<Appliedloan> getAppliedloan3() {
        return appliedloan3;
    }

    public void setAppliedloan3(List<Appliedloan> appliedloan3) {
        this.appliedloan3 = appliedloan3;
    }

    @OneToMany(mappedBy = "loan1")
    @JsonIgnore
    private List<Appliedloan> appliedloan3;
}
