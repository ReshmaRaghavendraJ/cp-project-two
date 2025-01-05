package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.Appliedloan;
import com.example.Bankapplication.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("*")

public class AppliedloanController
{
    @Autowired
    AppliedloanRepo appliedloanRepo;

    @Autowired
    ServicesRepo servicesRepo;

    @Autowired
    AccountdetailsRepo accountdetailsRepo;

    @Autowired
    LoanRepo loanRepo;

    @Autowired
    BankmanagerRepo bankmanagerRepo;

    @Autowired
    AreaRepo areaRepo;

    @Autowired
    UserRepo userRepo;

    /* apply loan */
    @PostMapping("/applyloan/{serviceid}/{accountdetailsid}/{loanid}")
    public ResponseEntity<?> applyloan(@PathVariable Integer serviceid, @PathVariable Integer accountdetailsid, @PathVariable Integer loanid, @RequestBody Appliedloan obj)
    {
        var serviceinfo=servicesRepo.findById(serviceid).orElseThrow(()->new RuntimeException("Serviceid not found"));
        var accountdetailinfo=accountdetailsRepo.findById(accountdetailsid).orElseThrow(()->new RuntimeException("Account details id not found"));
        var loaninfo=loanRepo.findById(loanid).orElseThrow(()->new RuntimeException("Loan id not found"));
        obj.setAccountdetails3(accountdetailinfo);
        obj.setServices4(serviceinfo);
        obj.setStatus("Pending");
        obj.setLoan1(loaninfo);
        appliedloanRepo.save(obj);
        return new ResponseEntity<>("Applied for loan", HttpStatus.OK);
    }

    /* Update - Approve for Applied Loan  -  Viewapplyloandetails */
    @PutMapping("/approveforappliedloan/{accountdetailsid}")
    public ResponseEntity<?> approveforappliedloan(@PathVariable Integer accountdetailsid)
    {
        var appliedLoan =appliedloanRepo.findByAccountdetails3_Accountdetailsid(accountdetailsid)
                .orElseThrow(()->new RuntimeException("Account details id not fund"));
        // Check if the loan is already approved or not
        if ("Loan Approved".equals(appliedLoan.getStatus())) {
            return new ResponseEntity<>("Loan is already approved.", HttpStatus.BAD_REQUEST);
        }
        appliedLoan.setStatus("Loan Approved");
        appliedloanRepo.save(appliedLoan);
        return new ResponseEntity<>("Loan Approved Successfully",HttpStatus.OK);
    }


    /* Display applied loans details - Viewapplyloandetails */
    @GetMapping("/getloandetails/{accountdetailsid}")
    public ResponseEntity<?> getloandetails(@PathVariable Integer accountdetailsid) {
        return accountdetailsRepo.findById(accountdetailsid)
                .map(actdetailsinfo -> {
                    List<Appliedloan> loaninfo = appliedloanRepo.findByAccountdetails3(actdetailsinfo);
                    if (loaninfo.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No loan details found for the specified account");
                    }
                    return ResponseEntity.ok(loaninfo);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account details ID not found"));
    }


    /* View Users(own) Loan - Viewurloans */
    @GetMapping("/Viewmyloandetails/{userid}")
    public ResponseEntity<?> Viewmyloandetails(@PathVariable Integer userid) {
        // Fetch user by userId (userid)
        var userinfo = userRepo.findById(userid)
                .orElseThrow(() -> new RuntimeException("Userid not found"));

        // Fetch the applied loan using the updated query method
        var loaninfo = appliedloanRepo.findByAccountdetails3_User1_userid(userid)
                .orElseThrow(() -> new RuntimeException("Loan not found for user id " + userid));

        // Return the loan details as the response
        return new ResponseEntity<>(loaninfo, HttpStatus.OK);
    }

}
