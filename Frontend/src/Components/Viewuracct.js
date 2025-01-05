import React, { useEffect ,useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Card } from 'react-bootstrap';


export default function Viewuracct() 
{
    const[accountlist,setAccountlist]=useState({});  //Display list of Account details
    const usrid=sessionStorage.getItem('usrid'); //Session Storage of Users
    

    useEffect(()=>{
        getacctdetails();
    },[])

    function getacctdetails()    /* Display Particular User Account details */
    {
    axios
    .get(`http://localhost:8080/getacctdetails/${usrid}`)
    .then((res)=>{
      console.log(res.data);  
      setAccountlist(res.data);
    })
    .catch((err)=>{
      toast.error(err.response?.data);
    })
    }

  return (
    <><br></br>
<Card className='viewaccts'><br></br>
<h1 style={{textAlign:"center"}}>View Your Account Details</h1>
    <Card.Body>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Account Number</th>
          <th>Accountdetailsid</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Identification</th>
          <th>Qualification</th>
          <th>Mobileno</th>
          <th>Emailid</th>
          <th>DOB</th>
          <th>Salary</th>
          <th>Photo</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {accountlist.accountdetailsid ? (
                <tr>
                  <td>{accountlist.accountno}</td>
                  <td>{accountlist.accountdetailsid}</td>
                  <td>{accountlist.user1?.fname}</td>
                  <td>{accountlist.user1?.lname}</td>
                  <td>{accountlist.identification}</td>
                  <td>{accountlist.qualification}</td>
                  <td>{accountlist.user1?.mobileno}</td>
                  <td>{accountlist.user1?.emailid}</td>
                  <td>{accountlist.dob}</td>
                  <td>{accountlist.salary}</td>
                  <td><img src={accountlist.photo} width="100" alt="imgs"/></td>
                  <td>{accountlist.status}</td>
                  </tr>
          ):(
            <tr>
                  <td colSpan="12" style={{ textAlign: 'center' }}>
                    No account details found for the user.
                  </td>
                </tr>
          )
          }
        </tbody>
        </table>
    </Card.Body>
    </Card>
    </>
  )
}
