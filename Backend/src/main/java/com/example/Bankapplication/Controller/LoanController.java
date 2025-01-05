package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Loan;
import com.example.Bankapplication.Repository.LoanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class LoanController
{
    @Autowired
    LoanRepo loanRepo;

    /* Add Loans */
    @PostMapping("/addloans")
    public ResponseEntity<?> addloans(@RequestBody Loan obj)
    {
        loanRepo.save(obj);
        return new ResponseEntity<>("Loan Added Successfully", HttpStatus.OK);
    }

    /* Display all Loans */
    @GetMapping("/getallloans")
    public ResponseEntity<?> getallloans()
    {
        List<Loan> loanlist =loanRepo.findAll();
        return new ResponseEntity<>(loanlist,HttpStatus.OK);
    }
}
