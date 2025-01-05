import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function CheckBalances() {
    const [balancelist, setBalancelist] = useState('');  // Display Single user's Balance Amount
    const [accountlist, setAccountlist] = useState({});
    const usrid = sessionStorage.getItem('usrid'); // Session Storage of Users

    // Fetch account details on mount
    useEffect(() => {
        const getAcctDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/getacctdetails/${usrid}`);
                const accountDetails = res.data;
                if (accountDetails && accountDetails.accountdetailsid) {
                    setAccountlist(accountDetails); // Set account details
                } else {
                    toast.error("Account details are missing.");
                }
            } catch (err) {
                toast.error(err.response ? err.response.data : 'An error occurred');
            }
        };

        if (usrid) {
            getAcctDetails(); // Fetch account details when component mounts
        }
    }, [usrid]); // Dependency on `usrid`

    // Fetch balance when `accountlist` is updated
    useEffect(() => {
        const checkbalance = async () => {
            try {
                if (accountlist.accountdetailsid) {
                    const res = await axios.get(`http://localhost:8080/checkbalance/${accountlist.accountdetailsid}`);
                    setBalancelist(res.data); // Set balance from response
                } else {
                    toast.error("Account details are not available.");
                }
            } catch (err) {
                toast.error(err.response ? err.response.data : 'An error occurred');
            }
        };

        // This checkBalance function is used here within this useEffect
        if (accountlist.accountdetailsid) {
            checkbalance(); // Fetch balance if account details are available
        }
    }, [accountlist]); // Dependency on `accountlist`

    return (
        <Card className="checkbalance">
            <Card.Body>
                <h1 style={{ textAlign: "center" }}>Your Balance Amount:</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Balance Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{balancelist}</td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
}
