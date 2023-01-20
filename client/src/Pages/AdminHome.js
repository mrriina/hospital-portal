import React, {useState} from "react";
import '../Home.css';

import AdminPatients from "../Components/AdminPatients";
import AdminDoctors from "../Components/AdminDoctors";
import AdminTickets from "../Components/AdminTickets";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 
function AdminHome() {
   const [patientStatus, setPatientStatus] = useState("");
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
            <Nav className="nav-content">
               <Nav.Link onClick={()=>{setPatientStatus(true); setDoctorsStatus(false); setTicketsStatus(false);}}>Patients</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(true); setTicketsStatus(false);}}>Doctors</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(false); setTicketsStatus(true);}}>Tickets</Nav.Link>
               <Nav.Link onClick={()=>{window.location.assign('http://localhost:3000/');}} id="logoutAdminHome">Logout</Nav.Link>
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