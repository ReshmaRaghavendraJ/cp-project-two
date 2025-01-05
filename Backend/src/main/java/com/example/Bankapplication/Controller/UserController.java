package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.User;
import com.example.Bankapplication.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")

public class UserController {
    @Autowired
    UserRepo userRepo;

    /* User Registration */
    @PostMapping("/userregistration")
    public ResponseEntity<?> userregistration(@RequestBody User obj) {
        if(userRepo.existsByEmailid(obj.getEmailid()))
        {
            return new ResponseEntity<>("Emailid already exists, give other name",HttpStatus.CONFLICT);
        }
        userRepo.save(obj);
        return new ResponseEntity<>("User Registered Successfully", HttpStatus.OK);
    }

    /* User Login Check */
    @GetMapping("/userlogincheck/{emailid}/{password}")
    public ResponseEntity<?> userlogincheck(@PathVariable String emailid, @PathVariable String password) {
        try {
            // Find the user by email ID
            User userinfo = userRepo.findByEmailid(emailid).orElseThrow(() -> new RuntimeException("Email ID not found"));

            // Check if the password matches
            if (!userinfo.getPassword().equals(password)) {
                return new ResponseEntity<>("User Password is incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                // Return user info if login is successful
                return new ResponseEntity<>(userinfo, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            // Handle errors gracefully
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}

