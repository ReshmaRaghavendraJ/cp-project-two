package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.City;
import com.example.Bankapplication.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class CityController
{
    @Autowired
    CityRepo cityRepo;

    /* Add City */
    @PostMapping("/addcity")
    public ResponseEntity<?> addcity(@RequestBody City obj)
    {
        if(cityRepo.existsByCityname(obj.getCityname()))
        {
            return new ResponseEntity<>("City already added",HttpStatus.CONFLICT);
        }
        cityRepo.save(obj);
        return new ResponseEntity<>("City Added Successfully", HttpStatus.OK);
    }

    /* Display all City */
    @GetMapping("/getallcities")
    public ResponseEntity<?> getallcities()
    {
        List<City> citylist=cityRepo.findAll();
        return new ResponseEntity<>(citylist,HttpStatus.OK);
    }
}
