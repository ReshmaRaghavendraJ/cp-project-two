import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import city from '../Components/city.jfif';

export default function Addareas()
 {
    const[areaname,setArea]=useState('');
    const[selectedcity,setSelectedcity]=useState('');
    const[citylist,setCitylist]=useState([]);  //Drop down list of cities
    const[arealist,setArealist]=useState([]); //Display list of all Areas
    const[hideform,setHideform]=useState(false);

    useEffect(()=>{
        getallcities();
    },[])

    function addarea()  /* Add Area based on City */
    {    
      if(selectedcity==="")
      {
        toast.error("please select city");
        return;
      }
      if(areaname==="")
        {
          toast.error("please enter area name");
          return;
        }
        const obj={selectedcity,areaname};
        axios
        .post(`http://localhost:8080/addarea/${selectedcity}`,obj)
        .then((res)=>{
          toast.success(res.data);
          setHideform(false);
          clearAll();
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
    }

    function getallcities()   /* Drop down list of all Cities */
    {
    axios
    .get("http://localhost:8080/getallcities")
    .then((res)=>{
      setCitylist(res.data);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
    }

    function getallareas()   /* Display all Areas */
    {
        axios
        .get("http://localhost:8080/getallareas")
        .then((res)=>{
          setArealist(res.data);
          setHideform(true);
          clearAll();
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
    }

    function clearAll()
    {
        setArea('');
        setSelectedcity('');
    }
  return (
    <>
    <img src={city} alt="cityimg"/>

    <Card className='areacard'>
     <Card.Body>
     <h1 style={{textAlign:"center"}}>Add Area</h1>
     <label className='form-label'>Select City:</label>
     <select className='form-select' value={selectedcity} onChange={(e)=>setSelectedcity(e.target.value)}>
      <option value={0}>--Choose Options--</option>
      {
        citylist.map((item,index)=>(
          <option key={index} value={item.cityid}>{item.cityid}-{item.cityname}</option>
        ))
      }
     </select><br></br>

     <Form.Group className="mb-3">
        <Form.Label>Enter Area Name: </Form.Label>
        <Form.Control type="text" value={areaname} onChange={(e)=>setArea(e.target.value)}/>
      </Form.Group>
      <div className='btnss'>
      <Button className='btn btn-primary me-2' onClick={addarea}>Submit</Button>
      <Button className='btn btn-warning me-2'onClick={getallareas}>Display</Button>
     </div>
      </Card.Body>
      </Card>


    {hideform && (
      <Card className='displayarea'>
      <Card.Body>
      <h1>Area List</h1>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Areaid</th>
          <th>Areaname</th>
          <th>Cityname</th>
        </tr>
        </thead>
            <tbody>
                {
          arealist.map((item,index)=>(
              <tr key={index}>
                <td>{item.areaid}</td>
                <td>{item.areaname}</td>
                <td>{item.city5.cityname}</td>
              </tr>
            )
          )
        }
        </tbody>
      </table>
      </Card.Body>
      </Card>
      )}
      </>
  )
}
