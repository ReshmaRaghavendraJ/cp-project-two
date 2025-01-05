import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AmountDeposit() 
{
    const [depositamount, setDepositamount] = useState('');
    const usrid=sessionStorage.getItem('usrid'); //Session Storage of Users
    const[accountlist,setAccountlist]=useState({});
    const { serviceid } = useParams(); // Get serviceid from the URL


    useEffect(()=>{
        getacctdetails();
    },[])

    const addamtdepositdetails = () => {
        const data = accountlist.accountdetailsid;
        console.log(data);
        debugger
        if (depositamount === "" || depositamount <= 0) {
            toast.error("Please enter proper data");
            return;
        }
        const obj = { serviceid, actdetlsid: data, depositamount };
        axios
            .post(`http://localhost:8080/addamtdepositdetails/${serviceid}/${data}`, obj)
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


    const ClearAll = () => setDepositamount("");

    return (
        <Card className='depositform'>
            <Card.Body>
                <h1 style={{ textAlign: "center" }}>Amount Deposit Form</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter amount to Deposit: </Form.Label>
                        <Form.Control type="text" value={depositamount} onChange={(e) => setDepositamount(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className='btnss'>
                    <Button className='btn btn-primary me-2' onClick={addamtdepositdetails}>Deposit</Button>
                    <Button className='btn btn-warning me-2' onClick={ClearAll}>Cancel</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
