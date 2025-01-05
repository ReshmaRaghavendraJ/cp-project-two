import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Viewurloans() {
    const [loanslist, setLoanlist] = useState({});
    const usrid = sessionStorage.getItem('usrid'); // Session Storage for users

    useEffect(() => {
        Viewmyloandetails();
    }, []); // Add dependency array to ensure useEffect runs only once

    function Viewmyloandetails() { // View Users (own) Loan - Viewurloans
        axios
            .get(`http://localhost:8080/Viewmyloandetails/${usrid}`)
            .then((res) => {
                setLoanlist(res.data);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }

    return (
        <><br></br>
            <Card className='viewloans'><br></br>
                <h1 style={{ textAlign: "center" }}>View Applied Loans</h1>
                <Card.Body>
                    {/* Check if loanslist is empty or null */}
                    {Object.keys(loanslist).length === 0 ? (
                        <p style={{ textAlign: "center" }}>No loan applications found.</p>
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
                                <tr>
                                    <td>{loanslist.accountdetails3?.accountdetailsid}</td>
                                    <td>{loanslist.accountdetails3?.user1?.fname}</td>
                                    <td>{loanslist.accountdetails3?.user1?.lname}</td>
                                    <td>{loanslist.accountdetails3?.identification}</td>
                                    <td>{loanslist.accountdetails3?.qualification}</td>
                                    <td>{loanslist.accountdetails3?.user1?.mobileno}</td>
                                    <td>{loanslist.accountdetails3?.user1?.emailid}</td>
                                    <td>{loanslist.annualincome}</td>
                                    <td>{loanslist.desiredloanamt}</td>
                                    <td>{loanslist.occupation}</td>
                                    <td><img src={loanslist.accountdetails3?.photo} width="100" alt="img" /></td>
                                    <td>{loanslist?.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}
