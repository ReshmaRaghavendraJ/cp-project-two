package com.example.Bankapplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class City
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cityid;
    private String cityname;

    public City()
    {
    }

    public City(Integer cityid, String cityname, List<Area> area5) {
        this.cityid = cityid;
        this.cityname = cityname;
        this.area5 = area5;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }


    public List<Area> getArea5() {
        return area5;
    }

    public void setArea5(List<Area> area5) {
        this.area5 = area5;
    }

    @OneToMany(mappedBy = "city5")
    @JsonIgnore
    private List<Area> area5;
}
