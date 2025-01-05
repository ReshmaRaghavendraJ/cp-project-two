import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import  b2 from '../Components/b2.jpg';

export default function Addservices() 
{
  const[servicename,setServicename]=useState('');
  const[servicelist,setServicelist]=useState([]);   //Display all Services 
  const[hideform,setHideform]=useState(false);

  function addservices()     /* Add Services */
  {
    if(servicename==="")
    {
      toast.error("Please enter servicename");
      return;
    }
    const obj={servicename};
    axios
    .post("http://localhost:8080/addservices",obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  function getallservices()  /* Display All Services */
  {
    axios
    .get("http://localhost:8080/getallservices")
    .then((res)=>{
      setServicelist(res.data);
      setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  function clearAll()
  {
    setServicename("");
  }

  return (
    <>
    <img src={b2} alt="b2"/>
      <Card className='servicecard'>
     <Card.Body>
     <h1 style={{textAlign:"center"}}>Add Services</h1>
     <Form.Group className="mb-3">
        <Form.Label>Enter Service Name: </Form.Label>
        <Form.Control type="text" value={servicename} onChange={(e)=>setServicename(e.target.value)}/>
      </Form.Group>
      <div className='btnss'>
      <Button className='btn btn-primary me-2' onClick={addservices}>Submit</Button>
      <Button className='btn btn-warning me-2' onClick={getallservices}>Display</Button>
     </div>
      </Card.Body>
      </Card>

      {hideform && (
      <Card className='displayservices'>
        <Card.Body>
          <h1 style={{textAlign:"center"}}>List of Services:</h1>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Service id</th>
                <th>Service Name</th>
              </tr>
            </thead>
            <tbody>
              {
                servicelist.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.serviceid}</td>
                    <td>{item.servicename}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Card.Body>
      </Card>
      )}
    </>
  )
}
