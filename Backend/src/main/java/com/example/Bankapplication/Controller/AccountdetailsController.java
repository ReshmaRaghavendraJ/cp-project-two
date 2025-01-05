package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.User;
import com.example.Bankapplication.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static javax.crypto.Cipher.SECRET_KEY;

@RestController
@CrossOrigin("*")

public class AccountdetailsController {
    @Autowired
    AccountdetailsRepo accountdetailsRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    AreaRepo areaRepo;

    @Autowired
    BankmanagerRepo bankmanagerRepo;

    /* Create Accountby adding Account details */
    @PostMapping("/createaccount/{userid}/{areaid}")
    public ResponseEntity<?> createaccount(@PathVariable Integer userid, @PathVariable Integer areaid, @RequestBody Accountdetails obj) {
        var userinfo = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User id not found"));
        var areainfo = areaRepo.findById(areaid).orElseThrow(() -> new RuntimeException("areaid not found"));

        obj.setAccountno("Waiting for Approval");
        obj.setUser1(userinfo);
        obj.setArea2(areainfo);
        obj.setStatus("Pending");

        accountdetailsRepo.save(obj);

        // Returning a response with a message that includes the "Waiting for Approval" status
        return new ResponseEntity<>(new HashMap<String, String>() {{
            put("message", "Account created successfully, awaiting approval.");
            put("accountno", obj.getAccountno());
            put("status", obj.getStatus());
            put("salary",obj.getSalary());
        }}, HttpStatus.OK);
    }


    /* get particular user account details */
    @GetMapping("/getacctdetails/{userid}")
    public ResponseEntity<?> getacctdetails(@PathVariable Integer userid) {
        // Fetch the user information by user ID
        var usrinfo = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("Userid not found"));

        // Retrieve the associated account details
        Optional<Accountdetails> accountOptional = accountdetailsRepo.findByUser1(usrinfo);

        if (accountOptional.isPresent()) {
            Accountdetails account = accountOptional.get();

            // Print decrypted accountno for debugging
            System.out.println("Decrypted accountno: " + account.getAccountno());

            // No need to manually decrypt here; the getter handles it
            return new ResponseEntity<>(account, HttpStatus.OK);  // Return account with decrypted account number

        } else {
            return new ResponseEntity<>("Account not found for the given user.", HttpStatus.NOT_FOUND);
        }
    }





    @GetMapping("/getacctdetailsbymgrareaid/{areaid}")
    public ResponseEntity<?> getacctdetailsbymgrareaid(@PathVariable Integer areaid) {
        var data = accountdetailsRepo.findByArea2Areaid(areaid);
        return new ResponseEntity<>(data,HttpStatus.OK);
    }

    /* View Account Details - Viewacctdetails */
    @GetMapping("/getaccountdetails/{managerid}/{areaid}")
    public ResponseEntity<?> getaccountdetails(@PathVariable Integer managerid, @PathVariable Integer areaid) {
        var managerinfo = bankmanagerRepo.findById(managerid).orElseThrow(() -> new RuntimeException("Manager id not found"));
        var areainfo = areaRepo.findById(areaid).orElseThrow(() -> new RuntimeException("areaid not found"));
        var actinfo = accountdetailsRepo.findByArea2(areainfo);
        if (actinfo.isEmpty()) {
            return new ResponseEntity<>("No Accounts found", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(actinfo, HttpStatus.OK);
        }
    }

    /* Update - Approve to Create Account Details - Viewacctdetails */

    @PutMapping("/approvetocreateaccount/{accountdetailsid}")
    public ResponseEntity<?> approvetocreateaccount(@PathVariable Integer accountdetailsid) {
        // Find the Accountdetails entity by ID
        var actdetailsinfo = accountdetailsRepo.findById(accountdetailsid)
                .orElseThrow(() -> new RuntimeException("Account Details id not found"));

        // If the account number is "Waiting for Approval", generate and encrypt it
        if ("Waiting for Approval".equals(actdetailsinfo.getAccountno()) || actdetailsinfo.getAccountno() == null || actdetailsinfo.getAccountno().isEmpty()) {
            String generatedAccountNo = generateAccountNo(accountdetailsid);  // Custom method to generate account numbers
            actdetailsinfo.setAccountno(generatedAccountNo);  // Automatically encrypts when setting
        }

        // Set the account status to "Approved"
        actdetailsinfo.setStatus("Approved");

        try {
            // Save the updated account details (this will also save the encrypted account number)
            accountdetailsRepo.save(actdetailsinfo);
            return new ResponseEntity<>("Account No Generated and Approved Successfully", HttpStatus.OK);
        } catch (Exception e) {
            // Handle any error that may occur during the save operation
            return new ResponseEntity<>("Error while approving the account: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private String generateAccountNo(Integer accountdetailsid) {
        // Example of generating a more sophisticated account number.
        // You can include a prefix, the account details ID, and even a timestamp or random element if needed.
        return "ACCT-" + accountdetailsid + "-" + System.currentTimeMillis();  // Example format
    }
}
