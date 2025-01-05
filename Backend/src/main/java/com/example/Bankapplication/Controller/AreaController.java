package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Area;
import com.example.Bankapplication.Repository.AreaRepo;
import com.example.Bankapplication.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AreaController
{
    @Autowired
    AreaRepo areaRepo;

    @Autowired
    CityRepo cityRepo;

    /* Add Areas based on city */
    @PostMapping("/addarea/{cityid}")
    public ResponseEntity<?> addarea(@PathVariable Integer cityid, @RequestBody Area obj)
    {
        var cityinfo=cityRepo.findById(cityid).orElseThrow(()->new RuntimeException("City id not found"));
        obj.setCity5(cityinfo);
        areaRepo.save(obj);
        return new ResponseEntity<>("Area added Successfully", HttpStatus.OK);
    }

    /* Display all Areas */
    @GetMapping("/getallareas")
    public ResponseEntity<?> getallareas()
    {
        List<Area> arealist=areaRepo.findAll();
        return new ResponseEntity<>(arealist,HttpStatus.OK);
    }
}
