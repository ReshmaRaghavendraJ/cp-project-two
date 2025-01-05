package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.Amountdeposit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AmountdepositRepo extends JpaRepository<Amountdeposit,Integer>
{

    /* Check Balance */
    public List<Amountdeposit> findByAccountdetails1Accountdetailsid(Integer actinfo);


}
