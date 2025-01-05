import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet} from 'react-router-dom';
import { useState } from 'react';
import homeicon from '../Components/homeicon.png';
import bank from '../Components/bank.jpg';


export default function Admindashboard() 
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
        <Nav.Link as={Link} to="/Admindashboard/Addcity" eventKey="Addcity" style={{marginTop:"-53px",marginLeft:"65px"}}    className={`navbar-link ${activeKey === 'Addcity' ? 'active' : ''}`}>Add-City</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Admindashboard/Addareas" eventKey="Addareas" className={`navbar-link ${activeKey === 'Addareas' ? 'active' : ''}`}>Add-Areas</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Admindashboard/Addmanagers" eventKey="Addmanagers" className={`navbar-link ${activeKey === 'Addmanagers' ? 'active' : ''}`}>Add-Managers</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Admindashboard/Addservices" eventKey="Addservices" className={`navbar-link ${activeKey === 'Addservices' ? 'active' : ''}`}>Add-Services</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Admindashboard/Addloans" eventKey="Addloans" className={`navbar-link ${activeKey === 'Addloans' ? 'active' : ''}`}>Add-Loans</Nav.Link> 
       </Nav.Item>

       <Nav.Item>
            <Nav.Link as={Link} to="/" style={{ marginLeft: "-10px" }}>
              Logout
            </Nav.Link>
          </Nav.Item>
     </Nav>
     <h1 style={{color:"white",marginLeft:"-300px"}}>Admin Dashboard</h1>
     <img src={bank} alt="bankimg" style={{marginLeft:"300px"}}/>
     </div>
     <Outlet/>
     </>
  )
}
