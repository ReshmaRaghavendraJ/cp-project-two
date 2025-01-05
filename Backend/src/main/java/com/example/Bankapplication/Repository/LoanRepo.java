package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepo extends JpaRepository<Loan,Integer>
{
}
