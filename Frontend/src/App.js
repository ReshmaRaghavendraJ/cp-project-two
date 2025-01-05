import React from 'react'
import Home from './Components/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import About from './Components/About'
import Register from './Components/Register'
import Login from './Components/Login'
import Contact from './Components/Contact'
import Admindashboard from './Components/Admindashboard'
import Userdashboard from './Components/Userdashboard'
import Addcity from './Components/Addcity'
import Addmanagers from './Components/Addmanagers'
import Addservices from './Components/Addservices'
import Createaccount from './Components/Createaccount'  
// import ServiceDetails from './Components/ServiceDetails'
import Addloans from './Components/Addloans'
import Bankmanagerdashboard from './Components/Bankmanagerdashboard'
import Viewacctdetails from './Components/Viewacctdetails'
import Viewapplyloandetails from './Components/Viewapplyloandetails'
import Viewuracct from './Components/Viewuracct'
import Viewurloans from './Components/Viewurloans'
import Addareas from './Components/Addareas'
import AmountDeposit from './Components/AmountDeposit'
import AmountWithdraw from './Components/AmountWithdraw'
import ApplyLoan from './Components/ApplyLoan'
import CheckBalances from './Components/CheckBalances'

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Contact" element={<Contact/>}/>

        <Route path="Admindashboard" element={<Admindashboard/>}>
        <Route path="Addcity" element={<Addcity/>}/>
        <Route path="Addareas" element={<Addareas/>}/>
        <Route path="Addmanagers" element={<Addmanagers/>}/>
        <Route path="Addservices" element={<Addservices/>}/>
        <Route path="Addloans" element={<Addloans/>}/>
        </Route>

        <Route path="Userdashboard" element={<Userdashboard/>}>
        <Route path="Createaccount" element={<Createaccount/>}/>
        <Route path="Viewuracct" element={<Viewuracct/>}/>
        {/* <Route path="ServiceDetails/:serviceid" element={<ServiceDetails />} /> */}
        <Route path="AmountDeposit/:serviceid" element={<AmountDeposit/>}/>
        <Route path="AmountWithdraw/:serviceid" element={<AmountWithdraw/>}/>
        <Route path="CheckBalances/:serviceid" element={<CheckBalances/>}/>
        <Route path="ApplyLoan/:serviceid" element={<ApplyLoan/>}/>
        <Route path="Viewurloans" element={<Viewurloans/>}/>
        </Route>

        <Route path="Bankmanagerdashboard" element={<Bankmanagerdashboard/>}>
        <Route path="Viewacctdetails" element={<Viewacctdetails/>}/>
        <Route path="Viewapplyloandetails" element={<Viewapplyloandetails/>}/>
        </Route>
        
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}
