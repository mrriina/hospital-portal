import React, {useState} from "react";
import '../Home.css';

import AdminPatients from "../Components/AdminPatients";
import AdminDoctors from "../Components/AdminDoctors";
import AdminTickets from "../Components/AdminTickets";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';
 
function AdminHome() {
   const adminusername = window.location.href.split("=")[1];
   const [patientStatus, setPatientStatus] = useState("true");
   const [doctorsStatus, setDoctorsStatus] = useState("");
   const [ticketsStatus, setTicketsStatus] = useState("");

   function SetPatientComponent() {
      if (patientStatus) {
        return <AdminPatients />;
      }
    }

    function SetDoctorComponent() {
      if (doctorsStatus) {
        return <AdminDoctors />;
      }
    }

    function SetTicketComponent() {
        if (ticketsStatus) {
          return <AdminTickets />;
        }
      }
   
   return (
      <>
         <Navbar bg="dark" variant="dark" id="nav">
            <Navbar.Brand>
               <a className="aStyle">
                  <span>Hospital</span>
               </a>
            </Navbar.Brand>
            {/* <Nav className="nav-content">
               <Nav.Link onClick={()=>{setPatientStatus(true); setDoctorsStatus(false); setTicketsStatus(false);}}>Patients</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(true); setTicketsStatus(false);}}>Doctors</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(false); setTicketsStatus(true);}}>Tickets</Nav.Link>
               <Nav.Link onClick={()=>{window.location.assign('http://localhost:3000/');}} id="logoutAdminHome">Logout</Nav.Link>
            </Nav> */}
            <Nav id="navprofile">
               <Image src='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
                            rounded
                            height='30'
                            className="mt-2"></Image>
               <NavDropdown
                    title={adminusername}
                    menuVariant="dark">
                  <NavDropdown.Item onClick={()=>{setPatientStatus(true); setDoctorsStatus(false); setTicketsStatus(false);}}>Patients</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setPatientStatus(false); setDoctorsStatus(true); setTicketsStatus(false);}}>Doctors</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setPatientStatus(false); setDoctorsStatus(false); setTicketsStatus(true);}}>Tickets</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{window.location.assign('http://localhost:3000/');}}>Logout</NavDropdown.Item>
               </NavDropdown>
            </Nav>
         </Navbar>
         <div className="body">
            <SetPatientComponent />
            <SetDoctorComponent />
            <SetTicketComponent />
         </div>
      </>
   );
}
 
export default AdminHome;