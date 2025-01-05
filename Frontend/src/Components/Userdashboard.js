import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import homeicon from '../Components/homeicon.png';
import bank from '../Components/bank.jpg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Userdashboard()
 {
  const [activeKey, setActiveKey] = useState(''); 
  const[servicelist,setServicelist]=useState([]);
  const navigate = useNavigate();  // useNavigate hook for navigation

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey); // Update active link
      };

      function getallservices()  /* Display under dropdown */
      {
        axios
        .get("http://localhost:8080/getallservices")
        .then((res)=>{
          setServicelist(res.data);
        })
        .catch((err)=>{
          toast.error(err.response.data);
        })
      }

        // Handle service click to navigate to service details
        const handleServiceClick = (serviceid, servicename) => {
          const service = { serviceid, servicename };
          sessionStorage.setItem("service", JSON.stringify(service)); // Save the service object
          if(servicename==="Amount Deposit")
          {
            navigate(`/Userdashboard/AmountDeposit/${serviceid}`);
          }
          else if(servicename==="Amount Withdraw")
          {
            navigate(`/Userdashboard/AmountWithdraw/${serviceid}`);
          }
          else if(servicename==="Check Balance")
            {
              navigate(`/Userdashboard/CheckBalances/${serviceid}`);
            }
            else if(servicename==="Apply for loan")
              {
                navigate(`/Userdashboard/ApplyLoan/${serviceid}`);
              }
        };

  return (
    <>
    <div className='navbars'> 
     <Nav activeKey={activeKey} onSelect={handleSelect}>
       <Nav.Item>
       <img src={homeicon} alt="homeimg" style={{width:"50px",marginTop:"50px",marginLeft:"10px"}}/> 
        <Nav.Link as={Link} to="/Userdashboard/Createaccount" eventKey="Createaccount" style={{marginTop:"-53px",marginLeft:"65px"}}  className={`navbar-link ${activeKey === 'Createaccount' ? 'active' : ''}`}>Create-Account</Nav.Link> 
       </Nav.Item>

       <Nav.Item>
       <Nav.Link as={Link} to="/Userdashboard/Viewuracct" eventKey="Viewuracct" className={`navbar-link ${activeKey === 'Viewuracct' ? 'active' : ''}`}>View-Your-Account</Nav.Link> 
       </Nav.Item>

       <NavDropdown title="Services" id="nav-dropdown" onClick={getallservices}>
        {
            servicelist.map((item,index)=>(
              <NavDropdown.Item key={index} onClick={()=>handleServiceClick(item.serviceid,item.servicename)}>{item.servicename}</NavDropdown.Item>
            ))
        }
      
        </NavDropdown>

        <Nav.Item>
       <Nav.Link as={Link} to="/Userdashboard/Viewurloans" eventKey="Viewurloans" className={`navbar-link ${activeKey === 'Viewurloans' ? 'active' : ''}`}>View-Your-Loans</Nav.Link> 
       </Nav.Item>

       <Nav.Item>
            <Nav.Link as={Link} to="/" style={{ marginLeft: "-10px" }}>
              Logout
            </Nav.Link>
          </Nav.Item>
     </Nav>
     <h1 style={{color:"white",marginLeft:"-300px"}}>User Dashboard</h1>
     <img src={bank} alt="bankimg" style={{marginLeft:"300px"}}/>
     </div>
     <Outlet/>
     </>
  )
}
