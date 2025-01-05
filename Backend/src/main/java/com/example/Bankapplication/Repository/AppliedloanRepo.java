package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppliedloanRepo extends JpaRepository<Appliedloan,Integer>
{
    List<Appliedloan> findByAccountdetails3_Area2(Area areainfo);


    Optional<Appliedloan> findByAccountdetails3_Accountdetailsid(Integer accountdetailsid);

   // Optional<Appliedloan> findByAccountdetails3_User1(Integer userid);

    Optional<Object> findByAccountdetails3_User1_userid(Integer userid);

    List<Appliedloan> findByAccountdetails3(Accountdetails accountdetails);
}
