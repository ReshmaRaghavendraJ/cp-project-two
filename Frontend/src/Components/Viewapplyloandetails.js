import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Viewapplyloandetails() {
  const [loanslist, setLoanlist] = useState([]);
  const mgrid = sessionStorage.getItem('usrid'); // Session Storage of Bankmanager id
  const [bankManagerDetails, setBankManagerDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [accountlist, setAccountlist] = useState([]);

  // Fetch bank manager details on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getAllBankManagersByUserId();
    };
    fetchData();
  }, []);

  // Fetch account details once bank manager data is available
  useEffect(() => {
    if (bankManagerDetails?.area1?.areaid) {
      getAccountDetails();
    }
  }, [bankManagerDetails]);

  // Fetch loan details once account details are set
  useEffect(() => {
    if (accountlist.length > 0) {
      getloandetails();
    }
  }, [accountlist]);

  async function getAllBankManagersByUserId() {
    try {
      const res = await axios.get(`http://localhost:8080/getallbankmanagersbyuserid/${mgrid}`);
      setBankManagerDetails(res.data);
    } catch (err) {
      const errorMessage = err.response ? err.response.data : 'An error occurred';
      toast.error(errorMessage);
    }
  }

  async function getAccountDetails() {
    try {
      const aid = bankManagerDetails?.area1?.areaid;
      const res = await axios.get(`http://localhost:8080/getacctdetailsbymgrareaid/${aid}`);
      setAccountlist(res.data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response ? err.response.data : 'An error occurred';
      toast.error(errorMessage);
      setLoading(false);
    }
  }

  async function getloandetails() {
    if (accountlist.length === 0) {
      toast.error("No account details found.");
      return;
    }
    try {
      // Assuming you need to send a list of account IDs to the server
      const accountIds = accountlist.map(account => account.accountdetailsid);
      const res = await axios.get(`http://localhost:8080/getloandetails/${accountIds.join(',')}`);
      setLoanlist(res.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  function approveforappliedloan(accountdetailsid) {
    axios
      .put(`http://localhost:8080/approveforappliedloan/${accountdetailsid}`)
      .then((res) => {
        toast.success(res.data);
        getloandetails();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  return (
    <>
      <br />
      <Card className='viewloans'>
        <br />
        <h1 style={{ textAlign: "center" }}>View Applied Loans</h1>
        <Card.Body>
          {loanslist.length === 0 ? (
            <div className="alert alert-warning" role="alert" style={{ textAlign: "center" }}>
              No loan applications found.
            </div>
          ) : (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Accountdetailsid</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Identification</th>
                  <th>Qualification</th>
                  <th>Mobileno</th>
                  <th>Emailid</th>
                  <th>Anual Income</th>
                  <th>Desired Loan Amount</th>
                  <th>Occupation</th>
                  <th>Photo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loanslist.map((item, index) => (
                  <tr key={index}>
                    <td>{item.accountdetails3.accountdetailsid}</td>
                    <td>{item.accountdetails3.user1.fname}</td>
                    <td>{item.accountdetails3.user1.lname}</td>
                    <td>{item.accountdetails3.identification}</td>
                    <td>{item.accountdetails3.qualification}</td>
                    <td>{item.accountdetails3.user1.mobileno}</td>
                    <td>{item.accountdetails3.user1.emailid}</td>
                    <td>{item.annualincome}</td>
                    <td>{item.desiredloanamt}</td>
                    <td>{item.occupation}</td>
                    <td><img src={item.accountdetails3.photo} width="100" alt="imgs" /></td>
                    <td>{item.status}</td>
                    <td>
                      {item.status === "Pending" ? (
                        <button className='btn btn-success' onClick={() => approveforappliedloan(item.accountdetails3.accountdetailsid)}>Approve</button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
