import React, {useState} from "react";
import '../Home.css';

import Patient from "../Pages/Patient";
import Tickets from '../Pages/Tickets';
import PatientElectronicCard from "../Components/PatientElectronicCard";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';

function PatientHome() {
   const patientusername = window.location.href.split("=")[1];
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

   return (
      <>
         <Navbar bg="dark" variant="dark" id="nav">
            <Navbar.Brand>
               <a className="aStyle">
                  <span onClick={()=>{setPatientStatus(true); setTicketsStatus(false);}}>Hospital</span>
               </a>
            </Navbar.Brand>
            {/* <Nav className="nav-content">
               <Nav.Link onClick={()=>{setPatientStatus(true); setTicketsStatus(false);}}>Patient</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setTicketsStatus(true);}}>Tickets</Nav.Link>
               <Nav.Link onClick={()=>{window.location.assign('http://localhost:3000/');}} id="logout">Logout</Nav.Link>
            </Nav> */}
            <Nav id="navprofile">
               <Image src='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
                            rounded
                            height='30'
                            className="mt-2"></Image>
               <NavDropdown
                    title={patientusername}
                    menuVariant="dark">
                  <NavDropdown.Item onClick={()=>{setPatientStatus(true); setTicketsStatus(false);}}>My profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setPatientStatus(false); setTicketsStatus(true);}}>Tickets</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{window.location.assign('http://localhost:3000/');}}>Logout</NavDropdown.Item>
               </NavDropdown>
            </Nav>
         </Navbar>
         <div className="body">
            <SetPatientComponent />
            <SetTicketsComponent />
            {/* <PatientElectronicCard  username={username}/> */}
         </div>
      </>
   );
}
 
export default PatientHome;