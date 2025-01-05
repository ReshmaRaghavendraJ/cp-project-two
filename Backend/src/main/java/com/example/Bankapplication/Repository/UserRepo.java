package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.Accountdetails;
import com.example.Bankapplication.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer>
{
    Optional<User> findByEmailid(String emailid);

    boolean existsByEmailid(String emailid);
}
