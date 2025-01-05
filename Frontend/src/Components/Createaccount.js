import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format  } from 'date-fns';



export default function Createaccount() 
{
  const[identification,setIdentification]=useState('');
  const[age,setAge]=useState('');
  const[qualification,setQualification]=useState('');
  const[gender,setGender]=useState('');
  const[photo,setPhoto]=useState('');
  const usrid=sessionStorage.getItem('usrid');
  const[arealist,setArealist]=useState([]);  //Dropdown list of Citylist
  const[selectedarea,setSelectedarea]=useState('');
  const[dob,setDob]=useState('');
  const[postalcode,setPostalcode]=useState('');
  const[salary,setSalary]=useState('');

  useEffect(() => {
    getallareas();
  
  },[]);

  function createaccount()   /* Create a Bank Account */
  {
    if(dob==="")
    {
      toast.error("Please select date of birth");
      return;
    }
    if(age==="")
      {
        toast.error("Please select date of birth");
        return;
      }
      if(gender==="")
        {
          toast.error("Please select date of birth");
          return;
        }
        if(selectedarea==="")
          {
            toast.error("Please select date of birth");
            return;
          }
          if(postalcode==="")
            {
              toast.error("Please select date of birth");
              return;
            }
            if(identification==="")
              {
                toast.error("Please select date of birth");
                return;
              }
              if(qualification==="")
                {
                  toast.error("Please select date of birth");
                  return;
                }
                if(salary==="")
                {
                  toast.error("please enter your salary details");
                  return;
                }
                if(photo==="")
                {
                    toast.error("please upload your photos");
                    return;
                }
    const obj={usrid,dob,selectedarea,postalcode,age,identification,qualification,gender,salary,photo};
    axios
    .post(`http://localhost:8080/createaccount/${usrid}/${selectedarea}`,obj)
    .then((res)=>{
      toast.success("Account Created");
      console.log(res.data);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }


  function getallareas()  /* Dropdown list of Area list */
  {
    axios
    .get("http://localhost:8080/getallareas")
    .then((res)=>{
      setArealist(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

 
  const Image = (e) => {
    const file = e.target.files[0];
    setPhoto(file); // Keep the file object for upload
    const reader=new FileReader();
  reader.readAsDataURL(file);
  reader.onload=()=>{
    setPhoto(reader.result);
  };
};

function clearAll()
{
  setIdentification("");
  setAge("");
  setGender("");
  setPhoto("");
  setQualification("");
  setSelectedarea("");
  setDob("");
  setPostalcode("");
}

const handleCheckboxChange = (e) => {
  setIdentification(e.target.value);  // Set it to a single value (no array)
};


const handleDatechange = (date) => {
  const formattedDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  setDob(formattedDate);
};

  return (
<><br></br>
<Card className='createacct'><br></br>
<h1 style={{textAlign:"center"}}>Account Opening Form</h1>
    <Card.Body>
      <h3>Personal Information</h3><hr></hr>
    <Form>
   
  <label className='form-label'><h6>Date of Birth:</h6></label>
  <input className='form-control'  type="datetime-local" value={dob}   onChange={(e) => handleDatechange(e.target.value)}/>

  <Form.Group className="mb-3">
    <Form.Label><h6>Enter Age: </h6></Form.Label>
    <Form.Control type="text" value={age} onChange={(e)=>setAge(e.target.value)}/>
    </Form.Group>

    <label className='form-label'><h6>Gender:</h6></label><br></br>
    <Form.Check type="radio" label="Male" name="gender" value="Male" onChange={(e) => setGender(e.target.value)}/>
    <Form.Check type="radio" label="Female" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}/>
    <Form.Check type="radio" label="Other" name="gender" value="Other" onChange={(e) => setGender(e.target.value)}/><br></br>


    <Form.Group className="mb-3" style={{width:"500px"}}>
    <Form.Label><h6>Select Area: </h6></Form.Label>
    <select className='form-select' value={selectedarea} onChange={(e)=>setSelectedarea(e.target.value)}>
    <option value={0}>--Choose Options--</option>
    {
      arealist.map((item,index)=>(
        <option key={index} value={item.areaid}>{item.areaid}-{item.areaname}</option>
      ))
    }
  </select>
  </Form.Group>
  <br></br>

    <Form.Group className="mb-3" style={{width:"500px",marginLeft:"600px",marginTop:'-110px'}}>
    <Form.Label><h6>Postal/Zip Code : </h6></Form.Label>
    <Form.Control type="text" value={postalcode} onChange={(e)=>setPostalcode(e.target.value)}/>
    </Form.Group>


    <Form.Group className="mb-3" >
    <Form.Label><h6>Form of Identification: </h6></Form.Label>
    <Form.Check
      type="checkbox"
      label="Aadharcard"
      value="Aadharcard"
      onChange={(e) => handleCheckboxChange(e)}
    />
     <Form.Check
      type="checkbox"
      label="Driver's License"
      value="Driver's License"
      onChange={(e) => handleCheckboxChange(e)}
    />
    <Form.Check
      type="checkbox"
      label="Passport"
      value="Passport"
      onChange={(e) => handleCheckboxChange(e)}
    />
     <Form.Check
      type="checkbox"
      label="Student ID"
      value="Student ID"
      onChange={(e) => handleCheckboxChange(e)}
    />
    </Form.Group>

  
    <label><h6>Education Level : </h6></label>
    <Form.Check type="radio" label="High School or Below" name="qualification" value="High School or Below" onChange={(e) => setQualification(e.target.value)}/>
    <Form.Check type="radio" label="Undergraduate" name="qualification" value="Undergraduate" onChange={(e) => setQualification(e.target.value)}/>
    <Form.Check type="radio" label="Masters Degree" name="qualification" value="Masters Degree" onChange={(e) => setQualification(e.target.value)}/>
    <Form.Check type="radio" label="PhD" name="qualification" value="PhD" onChange={(e) => setQualification(e.target.value)}/>
   

    <Form.Group className="mb-3">
    <Form.Label><h6>Monthly Salary: </h6></Form.Label>
    <Form.Control type="text" value={salary} onChange={(e)=>setSalary(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label><h6>Choose Photo: </h6></Form.Label>
    <Form.Control type="File" accept="image/*" onChange={Image}/>
    </Form.Group>
    </Form><br></br>


    <div className='btnss'>
    <Button className='btn btn-primary me-2' onClick={createaccount}>Submit</Button>
    <Button className='btn btn-secondary me-2' onClick={clearAll}>Cancel</Button>
    </div><br></br>
    </Card.Body>
    </Card><br></br>
</>
  )
}
