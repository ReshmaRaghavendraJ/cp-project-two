import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AmountWithdraw() 
{
    const [withdrawamount, setWithdrawamount] = useState('');
    const[accountlist,setAccountlist]=useState({});
    const usrid=sessionStorage.getItem('usrid'); //Session Storage of Users
    const{serviceid}=useParams();

    useEffect(()=>{
        getacctdetails();
    },[])

    const amountwithdraw = () =>
         {
        const data = accountlist.accountdetailsid;
        console.log(data);
        debugger
        const obj = { serviceid, actdetlsid: data, withdrawamount };
        if (withdrawamount === "" || withdrawamount <= 0) {
            toast.error("Please enter proper data");
            return;
        }
        axios
            .put(`http://localhost:8080/amountwithdraw/${serviceid}/${data}`, obj)
            .then((res) => {
                toast.success(res.data);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    const ClearAll = () => setWithdrawamount("");

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


    return (
        <Card className='withdrawform'>
            <Card.Body>
                <h1 style={{ textAlign: "center" }}>Amount Withdraw Form</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter amount: </Form.Label>
                        <Form.Control type="text" value={withdrawamount} onChange={(e) => setWithdrawamount(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className='btnss'>
                    <Button className='btn btn-primary me-2' onClick={amountwithdraw}>Withdraw</Button>
                    <Button className='btn btn-warning me-2' onClick={ClearAll}>Cancel</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
