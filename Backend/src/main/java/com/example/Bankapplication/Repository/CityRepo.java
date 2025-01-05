package com.example.Bankapplication.Repository;

import com.example.Bankapplication.Entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<City,Integer>
{
    boolean existsByCityname(String cityname);
}
