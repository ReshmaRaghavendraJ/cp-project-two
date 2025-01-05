package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.Bankmanager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BankmanagerRepo extends JpaRepository<Bankmanager,Integer>
{
    List<Bankmanager> findByArea1Areaid(Integer areaid);

    Optional<Bankmanager> findByEmailid(String emailid);
}
