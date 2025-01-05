import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Addmanagers()
 {
  const[arealist,setArealist]=useState([]); //Dropdown list of all Areas
  const[bankmanagerlist,setBankmanagerlist]=useState([]);  //Display Bank Manager Details
  const[managername,setManagername]=useState('');
  const[age,setAge]=useState('');
  const[gender,setGender]=useState('');
  const[qualification,setQualification]=useState('');
  const[phoneno,setPhoneno]=useState('');
  const[address,setAddress]=useState('');
  const[selectedarea,setSelectedarea]=useState('');
  const[emailid,setEmailid]=useState('');
  const[hideform,setHideform]=useState(false);


  useEffect(()=>{
    getallareas();
  },[])

  function getallareas()  /* Drop down list of Cities */
  {
    axios
    .get("http://localhost:8080/getallareas")
    .then((res)=>{
      setArealist(res.data);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

    function addbankmanager()  /* Add Bank Manager details */
    {
      if(selectedarea==="")
      {
        toast.error('please select the area');
        return;
      }
      if(managername==="")
      {
        toast.error("please enter manager name");
        return;
      }
    if(age==="")
      {
        toast.error("please enter age");
        return;
      }
      if(gender==="")
        {
          toast.error("please enter gender");
        return;
        }
        if(qualification==="")
          {
            toast.error("please enter qualification");
            return;
          }
          if(phoneno==="")
            {
              toast.error("please enter phoneno");
              return;
            }
            if (!/^\+91\d{10}$/.test(phoneno)) {
              toast.error("Phone number should start with +91 and be followed by 10 digits");
              return;
            }
            if(address==="")
            {
              toast.error("please enter address");
              return;
            }
            if(emailid==="")
            {
              toast.error("please enter emailid");
              return;
            }
      const obj={selectedarea,managername,age,gender,qualification,phoneno,address,emailid};
      axios
      .post(`http://localhost:8080/addbankmanager/${selectedarea}`,obj)
      .then((res)=>{
        toast.success(res.data);
        setHideform(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      })
    }

    function getallbankmanagers()   /* Display all Bank Manager Details */
    {
      axios
      .get("http://localhost:8080/getallbankmanagers")
      .then((res)=>{
        setBankmanagerlist(res.data);
        setHideform(true);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      })
    }
    
    function clearAll()
    {
      setAddress("");
      setAge("");
      setGender("");
      setPhoneno("");
      setQualification("");
      setSelectedarea("");
      setEmailid("");
    }

    return (
    <>
     <Card className='managercard'>
     <Card.Body>
     <h1 style={{textAlign:"center"}}>Add Managers</h1>
     <label className='form-label'>Select Area:</label>
     <select className='form-select' value={selectedarea} onChange={(e)=>setSelectedarea(e.target.value)}>
      <option value={0}>--Choose Options--</option>
      {
        arealist.map((item,index)=>(
          <option key={index} value={item.areaid}>{item.areaid}-{item.areaname}</option>
        ))
      }
     </select><br></br>
     <Form.Group className="mb-3">
        <Form.Label>Enter Manager Name: </Form.Label>
        <Form.Control type="text" value={managername} onChange={(e)=>setManagername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Age: </Form.Label>
        <Form.Control type="text" value={age} onChange={(e)=>setAge(e.target.value)}/>
      </Form.Group>

    <label className='form-label'>Gender:</label><br></br>
    <Form.Check type="radio" label="Male" name="gender" value="Male" onChange={(e) => setGender(e.target.value)}/>
    <Form.Check type="radio" label="Female" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}/>
    <Form.Check type="radio" label="Other" name="gender" value="Other" onChange={(e) => setGender(e.target.value)}/><br></br>

      <Form.Group className="mb-3">
        <Form.Label>Enter Qualification: </Form.Label>
        <Form.Control type="text" value={qualification} onChange={(e)=>setQualification(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Phoneno: </Form.Label>
        <Form.Control type="text" value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} placeholder='+91'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Address: </Form.Label>
        <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Emailid: </Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)} placeholder='@gmail.com'/>
      </Form.Group>

      <div className='btnss'>
      <Button className='btn btn-primary me-2' onClick={addbankmanager}>Submit</Button>
      <Button className='btn btn-warning me-2' onClick={getallbankmanagers}>Display</Button>
     </div>
      </Card.Body>
      </Card>

      {hideform && (
        <>
      <Card className='displaymanager'>
        <Card.Body>
          <h1 style={{textAlign:"center"}}>Bank Manager List:</h1>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Area Name</th>
                <th>Managerid</th>
                <th>Manager Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Qualification</th>
                <th>Phoneno</th>
                <th>Address</th>
                <th>Emailid</th>
              </tr>
            </thead>
            <tbody>
              {
                  bankmanagerlist.map((item,index)=>(
                    <tr key={index}>
                      <td>{item.area1.areaname}</td>
                      <td>{item.managerid}</td>
                      <td>{item.managername}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.qualification}</td>
                      <td>{item.phoneno}</td>
                      <td>{item.address}</td>
                      <td>{item.emailid}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </Card.Body>
      </Card><br></br>
      </>
      )}
    </>
  )
}
