package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Admin;
import com.example.Bankapplication.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")

public class AdminController {
    @Autowired
    AdminRepo adminRepo;

    /* Admin Login check */
    @GetMapping("/adminlogincheck/{emailid}/{password}")
    public ResponseEntity<?> adminlogincheck(@PathVariable String emailid, @PathVariable String password) {
        try {
            // Find the Admin by email ID
            Admin admininfo = adminRepo.findByEmailid(emailid).orElseThrow(() -> new RuntimeException("Email ID not found"));

            // Check if the password matches
            if (!admininfo.getPassword().equals(password)) {
                return new ResponseEntity<>("Admin Password is incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                // Return Admin info if login is successful
                return new ResponseEntity<>(admininfo, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            // Handle errors gracefully
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}
