package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.Area;
import com.example.Bankapplication.Entity.City;
import com.example.Bankapplication.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountdetailsRepo extends JpaRepository<Accountdetails,Integer>
{
    Optional<Accountdetails> findByUser1(User usrinfo);

    List<Accountdetails> findByArea2(Area area);

    List<Accountdetails> findByArea2Areaid(Integer areaid);
}
