import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Addloans() 
{
    const[loanname,setLoanname]=useState('');
    const[loanlist,setLoanlist]=useState([]);  //List all Loans
    const[hideform,setHideform]=useState(false);

    function addloans()  /* Add Loans */
    {
      if(loanname==="")
      {
        toast.error('please enter the loanname');
        return;
      }
        const obj={loanname};
      axios
      .post("http://localhost:8080/addloans",obj)
      .then((res)=>{
        toast.success(res.data);
        setHideform(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      })
    }

    function getallloans()    /* Display all Loans */
    {
      axios
      .get("http://localhost:8080/getallloans")
      .then((res)=>{
        setLoanlist(res.data);
        setHideform(true);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      })
    }


    function clearAll()
    {
        setLoanname('');
    }

  return (
    <>
     <Card className='addloan'>
     <Card.Body>
     <h1 style={{textAlign:"center"}}>Add Loans</h1>
     <Form.Group className="mb-3">
        <Form.Label>Enter Loan Name: </Form.Label>
        <Form.Control type="text" value={loanname} onChange={(e)=>setLoanname(e.target.value)}/>
      </Form.Group>
      <div className='btnss'>
      <Button className='btn btn-primary me-2' onClick={addloans}>Submit</Button>
      <Button className='btn btn-warning me-2'onClick={getallloans}>Display</Button>
     </div>
      </Card.Body>
      </Card>

    {hideform && (
      <Card className='displayloan'>
      <Card.Body>
      <h1 style={{textAlign:"center"}}>List of Loans:</h1>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Loanid</th>
          <th>Loanname</th>
        </tr>
        </thead>
            <tbody>
                {
          loanlist.map((item,index)=>(
              <tr key={index}>
                <td>{item.loanid}</td>
                <td>{item.loanname}</td>
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
