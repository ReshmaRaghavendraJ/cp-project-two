import React from 'react'
import percent from '../Components/percent.jpg';
import Navbar from './Navbar';

export default function Contact() 
{

  return (
    <>
    <Navbar/>
     <div className='contactinfo'>
      <br></br>
      <img src={percent} alt="percent" style={{border:"5px solid Black",marginLeft:"20px"}}/>
      <div className='info'>
      <h2>Contact Us</h2>
      <p style={{textAlign:"justify"}}>At Public Bank of India, we are committed to provide best internet banking services <br></br> to our customers. 
        Please feel free to share your Internet Banking experience with <br></br>us over phone.
        Public bank now provides your Account Balance and Transaction details <br></br> over phone round the clock.
        Information on deposits & loan schemes and services <br></br>also available.</p>
     <h3 style={{color:"red"}}> 1800 1234 & 1800 2100 </h3>
    (Toll free and accessible from all landlines and mobile phones of India)
    </div>
     </div>
    </>
  )
}
