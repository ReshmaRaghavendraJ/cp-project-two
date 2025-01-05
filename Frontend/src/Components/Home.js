import React from 'react'
import './styles.css';
import Carousel from 'react-bootstrap/Carousel';
import savings from '../Components/bank.webp';
import counting from '../Components/counting.webp';
import coin from '../Components/coin.jpeg';
import Navbar from './Navbar';

export default function Home() 
{

  return (
   <>
  <Navbar/>
<div className='caroselimgs'>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={savings}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5> Get an instant loan up to ₹50 lakh with low interest, flexible tenures</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={counting}
          alt="Second slide"
        />
        <Carousel.Caption>
        <h5 style={{color:"white"}}>Save for your Future Generation</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={coin}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>A bank deposit is money that is put into a bank account, either for safekeeping or to earn interest</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
   </>
  )
}
