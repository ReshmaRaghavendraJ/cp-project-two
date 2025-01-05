import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Viewacctdetails() {
  const navigate = useNavigate(); // To navigate programmatically after logout
  const mgrid = sessionStorage.getItem('usrid');
  const [accountlist, setAccountlist] = useState([]);
  const [bankManagerDetails, setBankManagerDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllBankManagersByUserId();
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (bankManagerDetails?.area1?.areaid) {
      getAccountDetails();
    }
  }, [bankManagerDetails]); 
  
  
  function getAccountDetails() {
    const aid = bankManagerDetails?.area1?.areaid
    axios
      .get(`http://localhost:8080/getacctdetailsbymgrareaid/${aid}`)
      .then((res) => {
        setAccountlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data : 'An error occurred';
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  function getAllBankManagersByUserId() {
    axios
      .get(`http://localhost:8080/getallbankmanagersbyuserid/${mgrid}`) 
      .then((res) => {
        setBankManagerDetails(res.data);
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data : 'An error occurred';
        toast.error(errorMessage);
      });
  }

  function approveToCreateAccount(accountdetailsid) {
    axios
      .put(`http://localhost:8080/approvetocreateaccount/${accountdetailsid}`)
      .then((res) => {
        toast.success(res.data);
        getAccountDetails();
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data : 'An error occurred';
        toast.error(errorMessage);
      });
  }

  // Function to handle logout and clear session storage
  function handleLogout() {
    sessionStorage.clear(); // Clears all items in sessionStorage
    navigate('/'); // Redirects to the home or login page
  }

  return (
    <Card className="viewaccts">
      <Card.Body>
        <h1 style={{ textAlign: 'center' }}>View Accounts</h1>
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading...</div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Accountdetailsid</th>
                <th>Account No</th>
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
              {accountlist.length > 0 ? (
                accountlist.map((item, index) => (
                  <tr key={index}>
                    <td>{item.accountdetailsid}</td>
                    <td>{item.accountno === 'Waiting for Approval' ? 'Waiting for Approval' : item.accountno}</td>
                    <td>{item.user1.fname}</td>
                    <td>{item.user1.lname}</td>
                    <td>{item.identification}</td>
                    <td>{item.qualification}</td>
                    <td>{item.user1.mobileno}</td>
                    <td>{item.user1.emailid}</td>
                    <td>{item.dob}</td>
                    <td>{item.salary}</td>
                    <td>
                      <img src={item.photo} width="100" alt="User" />
                    </td>
                    <td>{item.status}</td>
                    <td>
                    {item.status === 'Pending' ? (
                        <button
                          className="btn btn-success"
                          onClick={() => approveToCreateAccount(item.accountdetailsid)}
                        >
                          Approve
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center' }}>No account details available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <button onClick={handleLogout} className="btn btn-danger">
          Logout 
        </button> /*This logout required to clear the managerid which i set  */
      </Card.Body>
    </Card>
  );
}
