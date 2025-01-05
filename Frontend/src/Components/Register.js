import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import backgrd from '../Components/backgrd.jpg';
import Navbar from './Navbar';


export default function Register() 
{
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[mobileno,setMobileno]=useState('');
    const[emailid,setEmailid]=useState('');
    const[password,setPassword]=useState('');
    const prfx=["Mr","Mrs","Miss"];
    const[prefix,setPrefix]=useState('');



    function clearAll()
    {
        setEmailid("");
        setMobileno("");
        setPassword("");
        setfname("");
        setlname("");
        setPrefix("");
    }

    function userregistration()  /* User Registeration */
    {
      if(prefix==="")
      {
        toast.error("Please select prefix");
        return;
      }
      if(fname==="")
      {
        toast.error("Please enter fname");
        return;
      }
      if(lname==="")
        {
          toast.error("Please enter lname");
          return;
        }
      if(mobileno==="")
      {
        toast.error("Please enter mobileno");
        return;
      }
      if (!/^\+91\d{10}$/.test(mobileno)) {
        toast.error("mobile number should start with +91 and be followed by 10 digits");
        return;
      }
      if(emailid==="")
        {
          toast.error("Please enter emailid");
          return;
        }
      if(password==="")
        {
          toast.error("Please enter password");
          return;
        }
        if (password.length > 0 && password.length < 5) 
        {
          toast.error("Password should be minimum of 5 Characters");
          return;
        }
        if (password.length > 0 && (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))) 
          {
          toast.warning("Password should contain both letters and numbers");
        }
        if (!/^[A-Z]/.test(password)) {
          toast.error("Password should start with an uppercase letter");
          return;
        }
      
      const obj={prefix,fname,lname,mobileno,emailid,password};
      axios
      .post("http://localhost:8080/userregistration",obj)
      .then((res)=>{
        toast.success(res.data);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }

  return (
    <>
   <Navbar/>

    <img src={backgrd} alt="backgrd"/>
     
     <Card className='cardreg'>
     <h1 style={{textAlign:"center"}}>User Registration</h1>
      <Card.Body>
      <Form>
      <label className='form-label'>Full Name</label>
      <select className='form-select' value={prefix} onChange={(e)=>setPrefix(e.target.value)} style={{width:"250px"}}>
        <option value={0}>--Choose Prefix--</option>
        {
          prfx.map((item)=>(
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
      <p>Prefix</p>

      <Form.Group className="mb-3"  style={{width:"250px",marginTop:"-78px",marginLeft:"300px"}}>
        <Form.Control type="text" value={fname} onChange={(e)=>setfname(e.target.value)}/>
          <p>First Name</p>
      </Form.Group>

      <Form.Group className="mb-3" style={{width:"250px",marginTop:"-78px",marginLeft:"600px"}}>
        <Form.Control type="text" value={lname} onChange={(e)=>setlname(e.target.value)}/>
          <p>Last Name</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Mobileno: </Form.Label>
        <Form.Control type="text" value={mobileno} onChange={(e)=>setMobileno(e.target.value)} placeholder='+91'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Emailid: </Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)}/>
          <p style={{color:"blue"}}>example@example.com</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </Form.Group>
      </Form>
      <div className='btnss'>
        <Button className="btn btn-primary me-2" onClick={userregistration}>Submit</Button>
        <Button className="btn btn-secondary" onClick={clearAll}>Cancel</Button>
        </div>
      </Card.Body>
    </Card>
    <br></br>
    </>
  )
}
