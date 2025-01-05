package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.Amountdeposit;
import com.example.Bankapplication.Repository.AccountdetailsRepo;
import com.example.Bankapplication.Repository.AmountdepositRepo;
import com.example.Bankapplication.Repository.ServicesRepo;
import com.example.Bankapplication.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")

public class AmountdepositController
{
    @Autowired
    AmountdepositRepo amountdepositRepo;

    @Autowired
    ServicesRepo servicesRepo;

    @Autowired
    AccountdetailsRepo accountdetailsRepo;

    /* Add Amount deposit details */
    @PostMapping("/addamtdepositdetails/{serviceid}/{accountdetailsid}")
    public ResponseEntity<?> addamtdepositdetails(@PathVariable Integer serviceid,@PathVariable Integer accountdetailsid,@RequestBody Amountdeposit obj)
    {
        var servinfo=servicesRepo.findById(serviceid).orElseThrow(()->new RuntimeException("Serviceid not found"));
        var actdtlsinfo=accountdetailsRepo.findById(accountdetailsid).orElseThrow(()->new RuntimeException("Account details id not found"));
        obj.setAccountdetails1(actdtlsinfo);
        obj.setServices2(servinfo);
        obj.setDeposittime(LocalDateTime.now());

        // Check if balanceamount is null, if so set it to the deposited amount
        if (obj.getBalanceamount() == null) {
            obj.setBalanceamount(String.valueOf(obj.getDepositamount()));
        }
        else {
            // If balance amount is not null, retrieve the current balance and add the new deposit amount
            Integer currentBalance = Integer.valueOf(obj.getBalanceamount()); // Parse the current balance from String to Integer
            Integer newBalance = currentBalance + Integer.valueOf(obj.getDepositamount()); // Add the deposit amount to the current balance
            obj.setBalanceamount(String.valueOf(newBalance)); // Update balance amount as String
        }

        amountdepositRepo.save(obj);
        return new ResponseEntity<>("Amount Deposited Successfully", HttpStatus.OK);
    }

    /* Update - Amount Withdraw */
    @PutMapping("/amountwithdraw/{serviceid}/{accountdetailsid}")
    public ResponseEntity<?> amountwithdraw(@PathVariable Integer accountdetailsid, @PathVariable Integer serviceid,@RequestBody Amountdeposit obj) {
        var servinfo=servicesRepo.findById(serviceid).orElseThrow(()->new RuntimeException("Serviceid not found"));
        // Step 1: Retrieve the account details using the accountdetailsid
        Accountdetails accountDetails = accountdetailsRepo.findById(accountdetailsid)
                .orElseThrow(() -> new RuntimeException("Account Details not found with id " + accountdetailsid));

        // Step 2: Retrieve all deposit info associated with the account
        List<Amountdeposit> depositList = amountdepositRepo.findByAccountdetails1Accountdetailsid(accountdetailsid);
        if (depositList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Deposit information not found for the account.");
        }

        // Step 3: Calculate the current balance by considering all deposits and withdrawals
        int totalDepositAmount = 0;
        int totalWithdrawAmount = 0;

        // Calculate total deposits and total withdrawals
        for (Amountdeposit deposit : depositList) {
            // Use Optional.ofNullable to safely handle null values in the depositamount and withdrawamount fields
            totalDepositAmount += Optional.ofNullable(deposit.getDepositamount()).map(Integer::valueOf).orElse(0);  // Default to 0 if null
            totalWithdrawAmount += Optional.ofNullable(deposit.getWithdrawamount()).map(Integer::valueOf).orElse(0);  // Default to 0 if null
        }

        // Calculate current balance
        int currentBalance = totalDepositAmount - totalWithdrawAmount;

        // Step 4: Check if withdrawal amount is valid
        int withdrawAmount = Integer.valueOf(obj.getWithdrawamount());
        if (withdrawAmount > currentBalance) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Insufficient funds for withdrawal.");
        }

        // Step 5: Create new amount deposit record for the withdrawal
        Amountdeposit withdrawal = new Amountdeposit();
        withdrawal.setAccountdetails1(accountDetails);
        withdrawal.setServices2(servinfo);  // Assuming services2 is included in the request
        withdrawal.setWithdrawamount(String.valueOf(withdrawAmount));
        withdrawal.setWithdrawtime(LocalDateTime.now());

        // Update the balance field (current balance - withdrawn amount)
        withdrawal.setBalanceamount(String.valueOf(currentBalance - withdrawAmount));


        // Save the withdrawal record (this creates a new record)
        amountdepositRepo.save(withdrawal);

        // Step 6: Return a success response with the updated balance
        return ResponseEntity.ok("Withdrawal successful. New balance: " + (currentBalance - withdrawAmount));
    }

    /* Check Balance */
    @GetMapping("/checkbalance/{accountdetailsid}")
    public ResponseEntity<?> checkbalance(@PathVariable Integer accountdetailsid) {
        // Retrieve all deposits related to the account
        var amtinfolist = amountdepositRepo.findByAccountdetails1Accountdetailsid(accountdetailsid);

        int balance = 0;
       //List<Amountdeposit> balanceList = new ArrayList<>();  // List to store balance info

        // Calculate the balance by adding deposits and subtracting withdrawals
        for (Amountdeposit amt : amtinfolist) {
            // Safely handle null for depositamount, treating it as 0 if null
            Integer depositAmount = Optional.ofNullable(amt.getDepositamount()).map(Integer::valueOf).orElse(0);
            balance += depositAmount;

            // Safely handle null for withdrawamount, treating it as 0 if null
            Integer withdrawAmount = Optional.ofNullable(amt.getWithdrawamount()).map(Integer::valueOf).orElse(0);
            balance -= withdrawAmount;
        }

        // Check if balance is negative, and return appropriate message
        if (balance < 0) {
            return new ResponseEntity<>("Your balance is negative. Please make a deposit.", HttpStatus.BAD_REQUEST);  // Or OK depending on your design
        }

        return new ResponseEntity<>(balance, HttpStatus.OK);
    }

}
