import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import city from '../Components/city.jfif';
import pig from '../Components/pig.jpg';
import rupee from '../Components/rupee.webp';
import pen from '../Components/pen.jpg';
import rupeee from '../Components/rupeee.webp';
import Navbar from './Navbar';

export default function About() 
{
  
  return (
    <>
   <Navbar/>
     <div className='grids'>
     <Container><br></br><br></br>
      <Row>
        <Col><img src={city} alt="city" width="500px" height="300px" style={{marginLeft:"60px",border:"5px solid gray"}}/></Col>
        <Col><img src={pig} alt="pig" width="400px" height="300px" style={{marginLeft:"-25px",border:"5px solid gray"}}/></Col>
      </Row>
      <Row>
        <Col><img src={rupee} alt="rupee" width="300px" height="300px" style={{marginLeft:"60px",border:"5px solid gray"}}/></Col>
        <Col><img src={pen} alt="pen" width="300px" height="300px" style={{marginLeft:"-25px",border:"5px solid gray"}}/></Col>
        <Col><img src={rupeee} alt="rupeee" width="302px" height="300px" style={{marginLeft:"-105px",border:"5px solid gray"}}/></Col>
      </Row>
    </Container>
     </div><br></br><br></br>
    </>
  )
}
