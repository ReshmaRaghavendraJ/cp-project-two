import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ApplyLoan() 
{
    const [selectedloan, setSelectedloan] = useState('');
    const [maritalstatus, setMaritalstatus] = useState('');
    const [homeownership, setHomeownership] = useState('');
    const [desiredloanamt, setDesiredloanamt] = useState('');
    const [annualincome, setAnnualincome] = useState('');
    const [occupation, setOccupation] = useState('');
    const [leasestatus, setLeasestatus] = useState('');
    const[loanlist,setLoanlist]=useState([]);  //Dropdown list of all loans
    const usrid=sessionStorage.getItem('usrid'); //Session Storage of Users
    const{serviceid}=useParams();
    const[accountlist,setAccountlist]=useState({});

    useEffect(()=>{
        getallloans();
      },[])

      useEffect(()=>{
        getacctdetails();
    },[])

    function getallloans()  /* Dropdown list of all Loans */
{
    axios
    .get("http://localhost:8080/getallloans")
    .then((res)=>{
        setLoanlist(res.data);
        debugger
    })
    .catch((err)=>{
    toast.error(err.response.data);
    })
}

    const applyloan = () => 
        {
        const data = accountlist.accountdetailsid;
        console.log(data);
        debugger
        if (!selectedloan || !maritalstatus || !homeownership || !desiredloanamt || !annualincome || !occupation || !leasestatus) {
            toast.error("Please fill all fields.");
            return;
        }
        const obj = { serviceid, actdetlsid: data, selectedloan, maritalstatus, homeownership, desiredloanamt, annualincome, occupation, leasestatus };
        axios
            .post(`http://localhost:8080/applyloan/${serviceid}/${data}/${selectedloan}`, obj)
            .then((res) => {
                toast.success(res.data);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    function getacctdetails()    /* Display Particular User Account details */
    {
        debugger;
    axios
    .get(`http://localhost:8080/getacctdetails/${usrid}`)
    .then((res)=>{
        const accountDetails = res.data;
        if (accountDetails && accountDetails.accountdetailsid) {
            setAccountlist(accountDetails); // Set the full account details
        } else {
            toast.error("Account details are missing.");
        }
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
    }


    const ClearAll = () => {
        setSelectedloan('');
        setMaritalstatus('');
        setHomeownership('');
        setDesiredloanamt('');
        setAnnualincome('');
        setOccupation('');
        setLeasestatus('');
    };

    return (
        <Card className='applyloan'>
        <Card.Body>
        <h1 style={{textAlign:"center"}}>Apply for Loan</h1>
        <Form>
        <label className='form-label'>Loan will be used for:</label>
        <select className='form-select' value={selectedloan} onChange={(e)=>setSelectedloan(e.target.value)}>
        <option key={0}>--Choose Options--</option>
        {
            loanlist.map((item,index)=>(
                <option key={index} value={item.loanid}>{item.loanid}-{item.loanname}</option>
            ))
        }
        </select><br></br>
        
        <label className='form-label'>Marital Status:</label><br></br>
        <Form.Check type="radio" label="Single" name="maritalstatus" value="Single" onChange={(e) => setMaritalstatus(e.target.value)}/>
        <Form.Check type="radio" label="Married" name="maritalstatus" value="Married" onChange={(e) => setMaritalstatus(e.target.value)}/>
        <Form.Check type="radio" label="Other" name="maritalstatus" value="Other" onChange={(e) => setMaritalstatus(e.target.value)}/><br></br>
    
        <label className='form-label'>Home Ownership:</label><br></br>
        <Form.Check type="radio" label="Owned" name="homeownership" value="Owned" onChange={(e) => setHomeownership(e.target.value)}/>
        <Form.Check type="radio" label="Rented" name="homeownership" value="Rented" onChange={(e) => setHomeownership(e.target.value)}/>
        <Form.Check type="radio" label="Amortized" name="homeownership" value="Amortized" onChange={(e) => setHomeownership(e.target.value)}/>
        <Form.Check type="radio" label="Living with Parents" name="homeownership" value="Living with Parents" onChange={(e) => setHomeownership(e.target.value)}/><br></br>
    
            <Form.Group className="mb-3">
            <Form.Label>Desired loan amount: </Form.Label>
            <Form.Control type="text" value={desiredloanamt} onChange={(e)=>setDesiredloanamt(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
            <Form.Label>Annual Income: </Form.Label>
            <Form.Control type="text" value={annualincome} onChange={(e)=>setAnnualincome(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
            <Form.Label>Occupation: </Form.Label>
            <Form.Control type="text" value={occupation} onChange={(e)=>setOccupation(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" >
        <Form.Label>Consent</Form.Label>
        <p style={{textAlign:"justify"}}>I authorize prospective Credit Grantors/Lending/Leasing Companies to obtain personal and credit information about me from my employer and credit bureau, or credit reporting agency, any person who has or may have any financial dealing with me, or from any references I have provided. This information, as well as that provided by me in the application, will be referred to in connection with this lease and any other relationships we may establish from time to time. Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies.</p>
       <br></br>
       <p>I hereby agree that the information given is true, accurate and complete as of the date of this application submission.</p>
        <Form.Check
          type="checkbox"
          label="Yes"
          value="Yes"
          onChange={(e) => setLeasestatus(e.target.value)}
        />
    </Form.Group>
    
    <Form.Group className="mb-3"  style={{marginTop:"-40px",marginLeft:"60px"}}>
        <Form.Check
          type="checkbox"
          label="No"
          value="No"
          onChange={(e) => setLeasestatus(e.target.value)}
        />
        </Form.Group>
        </Form>
        <div className='btnss'>
        <Button className='btn btn-primary me-2' onClick={applyloan}>Apply Loan</Button>
        <Button className='btn btn-warning me-2' onClick={ClearAll}>Cancel</Button>
        </div>
        </Card.Body>
        </Card>
    );
}
