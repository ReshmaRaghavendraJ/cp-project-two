import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import city from '../Components/city.jfif';

export default function Addcity()
 {
    const[cityname,setCity]=useState('');
    const[citylist,setCitylist]=useState([]);
    const[hideform,setHideform]=useState(false);

    function addcity()   /* Add City */
    {
      if(cityname==="")
      {
        toast.error("please enter city name");
        return;
      }
      const obj={cityname};
      axios
      .post("http://localhost:8080/addcity",obj)
      .then((res)=>{
        toast.success(res.data);
        setHideform(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      })
    }

      function getallcities()    /* Display all Cities */
      {
        axios
        .get("http://localhost:8080/getallcities")
        .then((res)=>{
          setCitylist(res.data);
          setHideform(true);
          clearAll();
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
      }


    function clearAll()
    {
        setCity("");
    }

  return (
    <>
    <img src={city} alt="cityimg"/>

    <Card className='citycard'>
     <Card.Body>
     <h1 style={{textAlign:"center"}}>Add City</h1>
     <Form.Group className="mb-3">
        <Form.Label>Enter City Name: </Form.Label>
        <Form.Control type="text" value={cityname} onChange={(e)=>setCity(e.target.value)}/>
      </Form.Group>
      <div className='btnss'>
      <Button className='btn btn-primary me-2' onClick={addcity}>Submit</Button>
      <Button className='btn btn-warning me-2'onClick={getallcities}>Display</Button>
     </div>
      </Card.Body>
      </Card>

    {hideform && (
      <Card className='displaycard'>
      <Card.Body>
      <h1>City List</h1>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Cityid</th>
          <th>Cityname</th>
        </tr>
        </thead>
            <tbody>
                {
          citylist.map((item,index)=>(
              <tr key={index}>
                <td>{item.cityid}</td>
                <td>{item.cityname}</td>
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
