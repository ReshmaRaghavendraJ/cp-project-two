package com.example.Bankapplication.Controller;

import com.example.Bankapplication.Entity.Bankmanager;
import com.example.Bankapplication.Repository.AreaRepo;
import com.example.Bankapplication.Repository.BankmanagerRepo;
import com.example.Bankapplication.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")

public class BankmanagerController {
    @Autowired
    BankmanagerRepo bankmanagerRepo;

    @Autowired
    AreaRepo areaRepo;


    /* Bankmanager Login Check */
    @GetMapping("/bankmanagerlogincheck/{emailid}/{password}")
    public ResponseEntity<?> bankmanagerlogincheck(@PathVariable String emailid, @PathVariable String password) {
        try {
            // Find the Bankmanager by email ID
            Bankmanager mgrinfo = bankmanagerRepo.findByEmailid(emailid).orElseThrow(() -> new RuntimeException("Email ID not found"));

            // Check if the password matches
            if (!mgrinfo.getPassword().equals(password)) {
                return new ResponseEntity<>("Bankmanager Password is incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                // Return Bankmanager info if login is successful
                return new ResponseEntity<>(mgrinfo, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            // Handle errors gracefully
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    /* Add Bank Manager details based on bank */
    @PostMapping("/addbankmanager/{areaid}")
    public ResponseEntity<?> addbankmanager(@PathVariable Integer areaid,@RequestBody Bankmanager obj)
    {
        var areainfo=areaRepo.findById(areaid).orElseThrow(()->new RuntimeException("areaid not found"));
        obj.setArea1(areainfo);
        bankmanagerRepo.save(obj);
        return new ResponseEntity<>("Bank Manager details added Successfully",HttpStatus.OK);
    }

    /* Get all Bankmanager details */
    @GetMapping("/getallbankmanagers")
    public ResponseEntity<?> getallbankmanagers()
    {
        List<Bankmanager> bankmanagerList=bankmanagerRepo.findAll();
        return new ResponseEntity<>(bankmanagerList,HttpStatus.OK);
    }


    @GetMapping("/getallbankmanagersbyuserid/{id}")
    public ResponseEntity<?> getallbankmanagersbyuserid(@PathVariable Integer id)
    {
        var data=bankmanagerRepo.findById(id);
        return new ResponseEntity<>(data,HttpStatus.OK);
    }
}
