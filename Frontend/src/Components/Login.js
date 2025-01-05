import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import banklog from '../Components/banklog.webp';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import Navbar from './Navbar';

export default function Login() 
{
  const[password,setPassword]=useState('');
  const users=["Admin","User","Bank Manager"];
 const[user,setUser]=useState('');
  const navigate=useNavigate();
  const[login,setLogin]=useState({});
  const[emailid,setEmailid]=useState('');
  

  function clearAll()
  {
    setPassword('');
    setEmailid('');
    setUser('');
  }

  function handlelogincheck()
  {
      if(user==="Admin" || user==="admin")
      {
        axios
        .get(`http://localhost:8080/adminlogincheck/${emailid}/${password}`)
        .then((res)=>{
          setLogin(res.data);
          const userid=res.data.adminid;
          sessionStorage.setItem('usrid',userid);
          navigate("/Admindashboard");
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
      }
      if(user==="User" || user==="users")
      {
        axios
        .get(`http://localhost:8080/userlogincheck/${emailid}/${password}`)
        .then((res)=>{
          setLogin(res.data);
          const userid=res.data.userid;
          sessionStorage.setItem('usrid',userid);
          navigate("/Userdashboard");
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
      }
      if(user==="Bank Manager" || user==="bank manager") 
      {
        axios
        .get(`http://localhost:8080/bankmanagerlogincheck/${emailid}/${password}`)
        .then((res)=>{
          setLogin(res.data);
          const userid=res.data.managerid;
          sessionStorage.setItem('usrid',userid);
          navigate("/Bankmanagerdashboard");
          
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
      }
  }
  

  return (
    <>
   <Navbar/>

     <img src={banklog} alt="backgrd" width="1350pxd"/>
     
     <Card className='cardlog'>
     <h1 style={{textAlign:"center"}}>Login</h1>
      <Card.Body>
      <Form>
        <label className='form-label'>Select Usertype:</label>
        <select className='form-select' value={user} onChange={(e)=>setUser(e.target.value)}>
          <option className='form-control' value={0}>--Choose Options--</option>
          {
            users.map((item,index)=>(
              <option key={index} value={item}>{item}</option>
            ))
          }
        </select><br></br>
      <Form.Group className="mb-3">
        <Form.Label>Enter Emailid: </Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)} placeholder='@gmail.com'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </Form.Group>

      </Form>
      <div className='btnss'>
        <Button className="btn btn-primary me-2" onClick={handlelogincheck}>Submit</Button>
        <Button className="btn btn-secondary" onClick={clearAll}>Cancel</Button>
        </div>
      </Card.Body>
      </Card>
    </>
  )
}
