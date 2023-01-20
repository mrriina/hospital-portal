import React, {useState} from "react";
import '../Home.css';

import Patient from "../Pages/Patient";
import Tickets from '../Pages/Tickets';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function PatientHome() {
   const [patientStatus, setPatientStatus] = useState("");
   const [ticketsStatus, setTicketsStatus] = useState("");

   function SetPatientComponent() {
      if (patientStatus) {
        return <Patient />;
      }
    }

    function SetTicketsComponent() {
      if (ticketsStatus) {
        return <Tickets />;
      }
    }

   const username = window.location.href.split("=")[1];

   return (
      <>
         <Navbar bg="dark" variant="dark" id="nav">
            <Navbar.Brand>
               <a className="aStyle">
                  <span onClick={()=>{setPatientStatus(true); setTicketsStatus(false);}}>Hospital</span>
               </a>
            </Navbar.Brand>
            <Nav className="nav-content">
               <Nav.Link onClick={()=>{setPatientStatus(true); setTicketsStatus(false);}}>Patient</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setTicketsStatus(true);}}>Tickets</Nav.Link>
               <Nav.Link onClick={()=>{window.location.assign('http://localhost:3000/');}} id="logout">Logout</Nav.Link>
            </Nav>
         </Navbar>
         <div className="body">
            <SetPatientComponent />
            <SetTicketsComponent />
         </div>
      </>
   );
}
 
export default PatientHome;