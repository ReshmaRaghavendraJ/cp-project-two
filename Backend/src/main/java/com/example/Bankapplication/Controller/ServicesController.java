package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Services;
import com.example.Bankapplication.Repository.ServicesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class ServicesController
{
    @Autowired
    ServicesRepo servicesRepo;

    /* Add Services */
    @PostMapping("/addservices")
    public ResponseEntity<?> addservices(@RequestBody Services obj)
    {
        servicesRepo.save(obj);
        return new ResponseEntity<>("Services added Successfully", HttpStatus.OK);
    }

    /* Display all Services */
    @GetMapping("/getallservices")
    public ResponseEntity<?> getallservices()
    {
        List<Services> servicesList=servicesRepo.findAll();
        return new ResponseEntity<>(servicesList,HttpStatus.OK);
    }
}
