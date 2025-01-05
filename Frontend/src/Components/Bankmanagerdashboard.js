import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import homeicon from '../Components/homeicon.png';
import { Outlet } from 'react-router-dom';

export default function Bankmanagerdashboard() 
{
    const [activeKey, setActiveKey] = useState(''); 

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey); // Update active link
      };

  return (
    <>
    <div className='navbars'> 
     <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
       <Nav.Item>
       <img src={homeicon} alt="homeimg" style={{width:"50px",marginTop:"50px",marginLeft:"10px"}}/> 
        <Nav.Link as={Link} to="/Bankmanagerdashboard/Viewacctdetails" eventKey="Viewacctdetails" style={{marginTop:"-53px",marginLeft:"65px"}}    className={`navbar-link ${activeKey === 'Viewacctdetails' ? 'active' : ''}`}>View Accounts</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Bankmanagerdashboard/Viewapplyloandetails" eventKey="Viewapplyloandetails" className={`navbar-link ${activeKey === 'Viewapplyloandetails' ? 'active' : ''}`}>View-Appliedloans</Nav.Link> 
       </Nav.Item>

       <Nav.Item>
            <Nav.Link as={Link} to="/" style={{ marginLeft: "-10px" }}>
              Logout
            </Nav.Link>
          </Nav.Item>
     <h1 style={{color:"white",marginLeft:"-300px"}}>Bank Manager Dashboard</h1>
       </Nav>
       </div>
       <Outlet/>
       </>
  )
}
