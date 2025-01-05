import React from 'react'
import homeicon from '../Components/homeicon.png';
import bank from '../Components/bank.jpg';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function Navbar() 
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
        <Nav.Link as={Link} to="/" eventKey="/" style={{marginTop:"-53px",marginLeft:"65px"}}    className={`navbar-link ${activeKey === '/' ? 'active' : ''}`}>Home</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/About" eventKey="/About" className={`navbar-link ${activeKey === '/About' ? 'active' : ''}`}>About</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Register" eventKey="/Register" className={`navbar-link ${activeKey === '/Register' ? 'active' : ''}`}>Register</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Login" eventKey="/Login" className={`navbar-link ${activeKey === '/Login' ? 'active' : ''}`}>Login</Nav.Link> 
       </Nav.Item>
       <Nav.Item>
       <Nav.Link as={Link} to="/Contact" eventKey="/Contact" className={`navbar-link ${activeKey === '/Contact' ? 'active' : ''}`}>Contact</Nav.Link> 
       </Nav.Item>
     </Nav>
     <h1 style={{color:"white"}}>Banking Application</h1>
     <img src={bank} alt="bankimg" style={{marginLeft:"300px"}}/>
     </div>
   </>
  )
}
